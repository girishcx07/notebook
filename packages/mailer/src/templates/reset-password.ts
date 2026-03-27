/**
 * Reset-password email template
 *
 * Self-contained, inline-CSS HTML — compatible with Gmail, Outlook, Apple Mail.
 */
export function resetPasswordTemplate(resetUrl: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Your Password</title>
</head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#0f1117;color:#e2e8f0;margin:0;padding:0;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="560" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#1a1d27;border-radius:12px;overflow:hidden;border:1px solid #2d3148;max-width:560px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#6c63ff 0%,#4f46e5 100%);padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px;">🔐 Reset Your Password</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 16px;color:#cbd5e1;font-size:15px;line-height:1.7;">Hi there,</p>
              <p style="margin:0 0 24px;color:#cbd5e1;font-size:15px;line-height:1.7;">
                We received a request to reset the password for your account. Click the button below to choose a new password.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td align="center">
                    <a href="${resetUrl}" style="display:inline-block;background:linear-gradient(135deg,#6c63ff 0%,#4f46e5 100%);color:#ffffff;text-decoration:none;padding:14px 36px;border-radius:8px;font-size:15px;font-weight:600;letter-spacing:0.3px;">
                      Reset Password →
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:28px 0 8px;color:#94a3b8;font-size:13px;line-height:1.6;">
                This link expires in <strong style="color:#e2e8f0;">1 hour</strong>. If you didn't request a password reset, you can safely ignore this email.
              </p>
              <p style="margin:16px 0 0;color:#64748b;font-size:12px;line-height:1.6;">
                Or copy and paste this URL into your browser:<br />
                <a href="${resetUrl}" style="color:#94a3b8;word-break:break-all;">${resetUrl}</a>
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #2d3148;text-align:center;color:#64748b;font-size:12px;">
              <p style="margin:0;">© ${new Date().getFullYear()} Acme Inc. · Automated message — please do not reply.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
