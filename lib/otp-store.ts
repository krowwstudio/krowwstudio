import { createHmac } from "crypto";

const SECRET = process.env.OTP_SECRET ?? "kroww-otp-dev-secret";
const TTL_MS = 10 * 60 * 1000; // 10 minutes

export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function createOtpToken(email: string, otp: string): string {
  const expires = Date.now() + TTL_MS;
  const payload = `${email}|${otp}|${expires}`;
  const sig = createHmac("sha256", SECRET).update(payload).digest("hex");
  return `${Buffer.from(payload).toString("base64url")}.${sig}`;
}

export function verifyOtpToken(token: string, email: string, otp: string): boolean {
  try {
    const dotIdx = token.lastIndexOf(".");
    const b64 = token.slice(0, dotIdx);
    const sig = token.slice(dotIdx + 1);
    const payload = Buffer.from(b64, "base64url").toString();
    const parts = payload.split("|");
    if (parts.length !== 3) return false;
    const [storedEmail, storedOtp, expiresStr] = parts;
    if (storedEmail !== email || storedOtp !== otp) return false;
    if (Date.now() > parseInt(expiresStr, 10)) return false;
    const expectedSig = createHmac("sha256", SECRET).update(payload).digest("hex");
    return sig === expectedSig;
  } catch {
    return false;
  }
}
