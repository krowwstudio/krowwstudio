import { NextRequest, NextResponse } from "next/server";
import { generateOtp, createOtpToken } from "@/lib/otp-store";
import { sendMail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const otp = generateOtp();
    const token = createOtpToken(email, otp);

    await sendMail({
      to: email,
      subject: "Your KROWW Studio verification code",
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#FAFAFA;">
          <div style="text-align:center;margin-bottom:28px;">
            <div style="display:inline-block;background:linear-gradient(135deg,#7F5AF0,#2CB67D);padding:2px;border-radius:14px;">
              <div style="background:white;border-radius:12px;padding:12px 24px;">
                <span style="font-size:20px;font-weight:800;letter-spacing:-0.5px;color:#0A0A0A;">KROWW<span style="color:#5B5BFF;">.</span></span>
              </div>
            </div>
          </div>
          <h2 style="color:#0A0A0A;font-size:22px;font-weight:700;text-align:center;margin:0 0 8px;">Verify your email</h2>
          <p style="color:#6B6B6B;font-size:14px;text-align:center;margin:0 0 32px;">Enter this code to submit your project enquiry</p>
          <div style="background:linear-gradient(135deg,#7F5AF020,#2CB67D20);border:1px solid #7F5AF040;border-radius:16px;padding:28px;text-align:center;margin-bottom:28px;">
            <p style="font-size:44px;font-weight:800;letter-spacing:10px;color:#0A0A0A;margin:0;font-variant-numeric:tabular-nums;">${otp}</p>
          </div>
          <p style="color:#9B9B9B;font-size:12px;text-align:center;margin:0;">This code expires in <strong>10 minutes</strong>. If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
    });

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error("send-otp error:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
