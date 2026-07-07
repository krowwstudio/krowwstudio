import { NextRequest, NextResponse } from "next/server";
import { verifyOtpToken } from "@/lib/otp-store";
import { contactFormSchema } from "@/lib/validations";
import { sendMail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, otp, formData } = body;

    if (!token || !otp || !formData) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const result = contactFormSchema.safeParse(formData);
    if (!result.success) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    const { name, email, company, service, budget, message } = result.data;

    if (!verifyOtpToken(token, email, otp)) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
    }

    const contactEmail = process.env.CONTACT_EMAIL ?? "krowwstudio@gmail.com";

    await sendMail({
      to: contactEmail,
      replyTo: email,
      subject: `New Project Enquiry: ${service} — ${name}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#FAFAFA;">
          <div style="background:linear-gradient(135deg,#7F5AF0,#2CB67D);padding:2px;border-radius:16px;margin-bottom:24px;">
            <div style="background:white;border-radius:14px;padding:24px;">
              <h1 style="color:#0A0A0A;font-size:20px;font-weight:700;margin:0 0 4px;">New Project Enquiry</h1>
              <p style="color:#6B6B6B;font-size:14px;margin:0;">via KROWW Studio website · email verified ✓</p>
            </div>
          </div>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;font-size:14px;color:#6B6B6B;width:120px;">Name</td><td style="padding:8px 0;font-size:14px;color:#0A0A0A;font-weight:500;">${name}</td></tr>
            <tr><td style="padding:8px 0;font-size:14px;color:#6B6B6B;">Email</td><td style="padding:8px 0;font-size:14px;color:#0A0A0A;font-weight:500;">${email}</td></tr>
            ${company ? `<tr><td style="padding:8px 0;font-size:14px;color:#6B6B6B;">Company</td><td style="padding:8px 0;font-size:14px;color:#0A0A0A;font-weight:500;">${company}</td></tr>` : ""}
            <tr><td style="padding:8px 0;font-size:14px;color:#6B6B6B;">Service</td><td style="padding:8px 0;"><span style="display:inline-block;background:#EEF0FF;color:#5B5BFF;padding:2px 10px;border-radius:99px;font-size:12px;font-weight:600;">${service}</span></td></tr>
            ${budget ? `<tr><td style="padding:8px 0;font-size:14px;color:#6B6B6B;">Budget</td><td style="padding:8px 0;font-size:14px;color:#0A0A0A;font-weight:500;">${budget}</td></tr>` : ""}
          </table>
          <div style="margin-top:20px;padding:16px;background:#F5F5F7;border-radius:12px;border-left:3px solid #5B5BFF;">
            <p style="font-size:13px;color:#6B6B6B;margin:0 0 8px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Message</p>
            <p style="font-size:14px;color:#0A0A0A;margin:0;line-height:1.6;white-space:pre-wrap;">${message}</p>
          </div>
          <div style="margin-top:24px;padding-top:20px;border-top:1px solid #E5E5E7;text-align:center;">
            <a href="mailto:${email}" style="display:inline-block;padding:10px 24px;background:#0A0A0A;color:white;text-decoration:none;border-radius:99px;font-size:13px;font-weight:600;">Reply to ${name}</a>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("verify-otp error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
