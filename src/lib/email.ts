import "server-only";

type Mail = { to: string; subject: string; text: string };

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character]!);
}

export function renderBrandEmail(subject: string, text: string) {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.homebiogaskenya.co.ke").replace(/\/$/, "");
  const body = escapeHtml(text).replace(/\n/g, "<br>");

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;background:#f5f1e7;color:#121412;font-family:Arial,sans-serif">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f1e7;padding:32px 16px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #d8d2c4">
        <tr><td style="background:#121412;padding:24px 32px;border-bottom:4px solid #86c440">
          <img src="${siteUrl}/brand/home-biogas-kenya-logo.png" width="190" alt="Home Biogas Kenya" style="display:block;background:#ffffff;padding:8px">
        </td></tr>
        <tr><td style="padding:36px 32px">
          <p style="margin:0 0 10px;color:#1685b8;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase">Powered vitality. Naturally.</p>
          <h1 style="margin:0 0 24px;font-size:26px;line-height:1.25">${escapeHtml(subject)}</h1>
          <div style="font-size:15px;line-height:1.75;color:#372b22">${body}</div>
          <p style="margin:30px 0 0"><a href="${siteUrl}/en/contact" style="display:inline-block;background:#86c440;color:#121412;text-decoration:none;font-weight:bold;padding:13px 20px">Contact the engineering team</a></p>
        </td></tr>
        <tr><td style="background:#eae5d8;padding:22px 32px;font-size:12px;line-height:1.7;color:#5b584f">
          Home Biogas Kenya · +254 724 738 393 · info@homebiogaskenya.co.ke<br>
          Kenya House Complex, Koinange Street, Nairobi
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

/**
 * Sends transactional email through Resend when configured.
 * Without an API key the message is logged so local flows never break.
 */
export async function sendMail(mail: Mail): Promise<{ delivered: boolean }> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from || !mail.to) {
    console.info("[email:skipped]", mail.subject, "->", mail.to || "(no recipient)");
    return { delivered: false };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [mail.to],
        subject: mail.subject,
        text: mail.text,
        html: renderBrandEmail(mail.subject, mail.text),
      }),
    });
    return { delivered: res.ok };
  } catch (error) {
    console.error("[email:failed]", error);
    return { delivered: false };
  }
}
