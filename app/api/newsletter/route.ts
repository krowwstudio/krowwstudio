import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const { email } = result.data;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(resendApiKey);

      await resend.emails.send({
        from: "KROWW Studio <hello@krowwstudio.com>",
        to: email,
        subject: "You're subscribed to KROWW Studio insights",
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; text-align: center;">
            <div style="width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #7F5AF0, #2CB67D); margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="color: white; font-weight: 700; font-size: 20px;">K</span>
            </div>
            <h1 style="color: #0A0A0A; font-size: 22px; font-weight: 700; margin: 0 0 12px;">You're in!</h1>
            <p style="color: #6B6B6B; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
              Welcome to the KROWW Studio newsletter. You'll receive our best design insights, case studies, and tips — no spam, ever.
            </p>
            <a href="https://krowwstudio.com" style="display:inline-block;padding:12px 28px;background:#0A0A0A;color:white;text-decoration:none;border-radius:99px;font-size:14px;font-weight:600;">
              Visit the Studio →
            </a>
            <p style="color: #9CA3AF; font-size: 12px; margin-top: 24px;">
              You can unsubscribe at any time. KROWW Studio · hello@krowwstudio.com
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
