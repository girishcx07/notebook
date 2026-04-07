/**
 * Welcome email template
 *
 * Self-contained, inline-CSS HTML — compatible with Gmail, Outlook, Apple Mail.
 */
export function welcomeTemplate(name: string): string {
  const displayName = name || "there";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to Acme!</title>
</head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#0f1117;color:#e2e8f0;margin:0;padding:0;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="560" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#1a1d27;border-radius:12px;overflow:hidden;border:1px solid #2d3148;max-width:560px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#6c63ff 0%,#4f46e5 100%);padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px;">🚀 Welcome to Acme!</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 16px;color:#cbd5e1;font-size:15px;line-height:1.7;">Hey ${displayName},</p>
              <p style="margin:0 0 24px;color:#cbd5e1;font-size:15px;line-height:1.7;">
                Your account is all set up and ready to go. We're thrilled to have you on board!
              </p>
              <!-- Quick-start checklist -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#12151e;border-radius:8px;border:1px solid #2d3148;">
                <tr>
                  <td style="padding:20px;">
                    <p style="margin:0 0 12px;color:#94a3b8;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Quick start</p>
                    <ul style="margin:0;padding-left:20px;color:#cbd5e1;font-size:14px;line-height:2.1;">
                      <li>Complete your profile</li>
                      <li>Explore the dashboard</li>
                      <li>Invite your team</li>
                    </ul>
                  </td>
                </tr>
              </table>
              <p style="margin:24px 0 0;color:#94a3b8;font-size:13px;line-height:1.6;">
                Have questions? Just reply to this email — we're always happy to help.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #2d3148;text-align:center;color:#64748b;font-size:12px;">
              <p style="margin:0;">© ${new Date().getFullYear()} Acme Inc.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
