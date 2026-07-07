import nodemailer from "nodemailer";

interface MailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendMail(opts: MailOptions) {
  const resendKey = process.env.RESEND_API_KEY;
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  // Resend preferred — verified domain = inbox delivery guaranteed
  if (resendKey) {
    const { Resend } = await import("resend");
    const resend = new Resend(resendKey);
    await resend.emails.send({
      from: "KROWW Studio <noreply@krowwstudio.com>",
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      replyTo: opts.replyTo,
    });
    return;
  }

  // Gmail OAuth2 (trusted by Google — inbox delivery)
  const clientId = process.env.GMAIL_CLIENT_ID;
  const clientSecret = process.env.GMAIL_CLIENT_SECRET;
  const refreshToken = process.env.GMAIL_REFRESH_TOKEN;
  const oauthReady = clientId && !clientId.includes("your-") && clientSecret && !clientSecret.includes("your-") && refreshToken && !refreshToken.includes("your-");

  if (gmailUser && oauthReady) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: gmailUser,
        clientId,
        clientSecret,
        refreshToken,
      },
    });
    await transporter.sendMail({
      from: `"KROWW Studio" <${gmailUser}>`,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      replyTo: opts.replyTo,
    });
    return;
  }

  // Gmail App Password fallback
  if (gmailUser && gmailPass) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPass },
    });
    await transporter.sendMail({
      from: `"KROWW Studio" <${gmailUser}>`,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      replyTo: opts.replyTo,
    });
    return;
  }

  console.log("[Mailer Dev] No email provider configured. Mail details:", opts);
}
