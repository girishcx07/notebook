/**
 * @repo/mailer
 *
 * Transactional email sending for the Acme monorepo.
 * Powered by Resend – https://resend.com
 *
 * Usage in any package/app:
 *   import { sendPasswordResetEmail } from "@repo/mailer";
 *
 * Environment variables (validated via mailerEnv()):
 *   RESEND_API_KEY – your Resend API key
 *   EMAIL_FROM     – "Acme <noreply@yourdomain.com>" (optional)
 */

import { Resend } from "resend";

import { mailerEnv } from "../env";
import { resetPasswordTemplate } from "./templates/reset-password";
import { verifyEmailTemplate } from "./templates/verify-email";
import { welcomeTemplate } from "./templates/welcome";

// ─── Resend client (lazy-init) ────────────────────────────────────────────────

let _resend: Resend | null = null;
let _env: ReturnType<typeof mailerEnv> | null = null;

function getEnv() {
  _env ??= mailerEnv();
  return _env;
}

function getResend(): Resend {
  if (!_resend) {
    const key = getEnv().RESEND_API_KEY;
    if (!key) {
      throw new Error(
        "[mailer] RESEND_API_KEY is not set. Add it to your .env file.",
      );
    }
    _resend = new Resend(key);
  }
  return _resend;
}

function defaultFrom(): string {
  // Falls back to Resend sandbox — works without domain verification.
  return getEnv().EMAIL_FROM ?? "Acme <onboarding@resend.dev>";
}

// ─── Low-level primitive ──────────────────────────────────────────────────────

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  from?: string;
}

export async function sendEmail(options: SendEmailOptions): Promise<void> {
  const { error } = await getResend().emails.send({
    from: options.from ?? defaultFrom(),
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  });

  if (error) {
    console.error("[mailer] Failed to send email:", error);
    throw new Error(`[mailer] ${error.message}`);
  }
}

// ─── Auth emails ──────────────────────────────────────────────────────────────

/**
 * Send a password-reset email with a tokenised reset URL.
 * Called by @repo/auth inside the `sendResetPassword` callback.
 */
export async function sendPasswordResetEmail(
  to: string,
  resetUrl: string,
): Promise<void> {
  await sendEmail({
    to,
    subject: "Reset your password",
    html: resetPasswordTemplate(resetUrl),
    text: `Reset your password by visiting this link: \n${resetUrl}`,
  });
}

/**
 * Send an email-verification email with a tokenised verify URL.
 * Called by @repo/auth inside the `sendVerificationEmail` callback.
 */
export async function sendVerificationEmail(
  to: string,
  verifyUrl: string,
): Promise<void> {
  await sendEmail({
    to,
    subject: "Verify your email address",
    html: verifyEmailTemplate(verifyUrl),
    text: `Please verify your email address by visiting this link: \n${verifyUrl}`,
  });
}

// ─── Product emails ───────────────────────────────────────────────────────────

/**
 * Send a welcome email after a user successfully signs up.
 * Non-fatal — failure is logged but never propagated.
 */
export async function sendWelcomeEmail(
  to: string,
  name: string,
): Promise<void> {
  try {
    await sendEmail({
      to,
      subject: "Welcome to Acme! 🎉",
      html: welcomeTemplate(name),
      text: `Hi ${name},\n\nWelcome to Acme! We're excited to have you on board.`,
    });
  } catch (err) {
    // Welcome email is non-critical; log but never crash the signup flow.
    console.error("[mailer] Failed to send welcome email:", err);
  }
}
