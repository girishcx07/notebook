/**
 * @acme/mailer – environment variables
 *
 * Extend this in any app that sends email:
 *   import { mailerEnv } from "@acme/mailer/env";
 *   export const env = createEnv({ extends: [mailerEnv(), ...], ... });
 */

import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v4";

export function mailerEnv() {
  return createEnv({
    server: {
      /**
       * Resend API key – https://resend.com/api-keys
       * Required in production; optional in development (sends will fail gracefully).
       */
      RESEND_API_KEY:
        process.env.NODE_ENV === "production"
          ? z.string().min(1)
          : z.string().min(1).optional(),

      /**
       * "From" address shown to the email recipient.
       * Use "onboarding@resend.dev" for local testing (no domain verification).
       * For production: "Acme <noreply@yourdomain.com>"
       */
      EMAIL_FROM: z.string().optional(),
    },
    runtimeEnv: process.env,
    skipValidation:
      !!process.env.CI || process.env.npm_lifecycle_event === "lint",
  });
}
