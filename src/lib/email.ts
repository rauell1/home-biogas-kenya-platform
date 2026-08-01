import "server-only";

type Mail = { to: string; subject: string; text: string };

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
      body: JSON.stringify({ from, to: [mail.to], subject: mail.subject, text: mail.text }),
    });
    return { delivered: res.ok };
  } catch (error) {
    console.error("[email:failed]", error);
    return { delivered: false };
  }
}
