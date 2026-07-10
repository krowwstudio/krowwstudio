"use client";

import { useRef, useState, useEffect, KeyboardEvent, ClipboardEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2, ArrowLeft, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations";

const SERVICES_LIST = [
  "Website Design",
  "Website Development",
  "Landing Page",
  "Logo Design",
  "Brand Identity",
  "UI/UX Design",
  "SaaS Website",
  "SEO Optimization",
  "Website Maintenance",
  "Other",
];

const BUDGETS = [
  "₹20,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",  
  "₹1,00,000 – ₹3,00,000",
  "₹3,00,000 – ₹7,00,000",
  "₹7,00,000 – ₹15,00,000",
  "₹15,00,000+",
  "Not sure yet",
];

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
  label: string;
  error?: string;
  as?: "input" | "textarea" | "select";
  children?: React.ReactNode;
}

function Field({ label, error, as = "input", children, className, ...props }: FieldProps) {
  const base = cn(
    "w-full px-4 py-3.5 rounded-xl text-sm text-foreground",
    "bg-muted border border-border",
    "placeholder:text-muted-foreground",
    "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50",
    "transition-all duration-200",
    error && "border-red-400 focus:ring-red-300/30 focus:border-red-400",
    className
  );
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground/80">{label}</label>
      {as === "textarea" ? (
        <textarea className={cn(base, "resize-none min-h-[120px]")} {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : as === "select" ? (
        <select className={base} {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}>{children}</select>
      ) : (
        <input className={base} {...(props as React.InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {error && (
        <p className="text-red-500 text-xs flex items-center gap-1.5">
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  );
}

type Step = "form" | "otp" | "success";

export function ContactForm() {
  const [step, setStep] = useState<Step>("form");
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "error">("idle");
  const [otpStatus, setOtpStatus] = useState<"idle" | "loading" | "error" | "invalid">("idle");
  const [pendingData, setPendingData] = useState<ContactFormValues | null>(null);
  const [otpToken, setOtpToken] = useState("");
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const sendOtp = async (email: string): Promise<string | null> => {
    const res = await fetch("/api/contact/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.token ?? null;
  };

  const onSubmit = async (data: ContactFormValues) => {
    setFormStatus("loading");
    try {
      const token = await sendOtp(data.email);
      if (!token) throw new Error();
      setOtpToken(token);
      setPendingData(data);
      setDigits(["", "", "", "", "", ""]);
      setOtpStatus("idle");
      setResendCooldown(30);
      setStep("otp");
      setFormStatus("idle");
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } catch {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 5000);
    }
  };

  const handleDigitChange = (i: number, val: string) => {
    const d = val.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = d;
    setDigits(next);
    setOtpStatus("idle");
    if (d && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handleDigitKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    const next = text.split("").concat(Array(6 - text.length).fill(""));
    setDigits(next);
    setOtpStatus("idle");
    inputRefs.current[Math.min(text.length, 5)]?.focus();
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || !pendingData) return;
    const token = await sendOtp(pendingData.email);
    if (token) {
      setOtpToken(token);
      setDigits(["", "", "", "", "", ""]);
      setOtpStatus("idle");
      setResendCooldown(30);
      inputRefs.current[0]?.focus();
    }
  };

  const handleVerify = async () => {
    const otp = digits.join("");
    if (otp.length < 6 || !pendingData || !otpToken) return;
    setOtpStatus("loading");
    try {
      const res = await fetch("/api/contact/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: otpToken, otp, formData: pendingData }),
      });
      if (!res.ok) {
        const json = await res.json();
        if (json.error === "Invalid or expired OTP") {
          setOtpStatus("invalid");
        } else {
          setOtpStatus("error");
        }
        return;
      }
      setStep("success");
      reset();
    } catch {
      setOtpStatus("error");
    }
  };

  if (step === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-16 gap-4"
      >
        <div className="w-16 h-16 rounded-full bg-accent-green/10 flex items-center justify-center mb-2">
          <CheckCircle2 className="text-accent-green" size={28} />
        </div>
        <h3 className="font-heading font-bold text-xl text-foreground">Message sent!</h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          Thanks for reaching out. We&apos;ll review your project and get back to you within 24 hours.
        </p>
        <button
          onClick={() => { setStep("form"); setPendingData(null); setOtpToken(""); }}
          className="mt-4 text-primary text-sm font-semibold hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  if (step === "otp") {
    const otp = digits.join("");
    const email = pendingData?.email ?? "";
    return (
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -24 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-6"
      >
        <button
          onClick={() => { setStep("form"); setOtpStatus("idle"); }}
          className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft size={13} /> Back to form
        </button>

        <div className="flex flex-col items-center text-center gap-3 py-2">
          <div className="w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center mb-1">
            <Mail size={22} className="text-primary" />
          </div>
          <h3 className="font-heading font-bold text-xl text-foreground">Check your inbox or spam</h3>
          <p className="text-muted-foreground text-sm max-w-xs">
            We sent a 6-digit verification code to{" "}
            <span className="font-semibold text-foreground">{email}</span>
            . If you don&apos;t see it, check your spam folder.
          </p>
        </div>

        {/* OTP digit boxes */}
        <div className="flex justify-center gap-3">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => handleDigitChange(i, e.target.value)}
              onKeyDown={(e) => handleDigitKeyDown(i, e)}
              onPaste={handlePaste}
              className={cn(
                "w-12 h-14 text-center text-xl font-bold rounded-xl border-2 bg-muted",
                "focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-200",
                otpStatus === "invalid"
                  ? "border-red-400 text-red-500"
                  : d
                  ? "border-primary text-foreground"
                  : "border-border text-foreground"
              )}
            />
          ))}
        </div>

        <AnimatePresence>
          {otpStatus === "invalid" && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2 text-red-500 text-sm"
            >
              <AlertCircle size={14} /> Incorrect code. Please try again.
            </motion.p>
          )}
          {otpStatus === "error" && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2 text-red-500 text-sm"
            >
              <AlertCircle size={14} /> Something went wrong. Please try again.
            </motion.p>
          )}
        </AnimatePresence>

        <button
          onClick={handleVerify}
          disabled={otp.length < 6 || otpStatus === "loading"}
          className={cn(
            "inline-flex items-center justify-center gap-2.5 h-14 px-8 rounded-full",
            "bg-foreground text-white font-semibold text-sm",
            "hover:bg-foreground/88 transition-all duration-300",
            "disabled:opacity-50 disabled:pointer-events-none",
            "shadow-card hover:shadow-card-hover"
          )}
        >
          {otpStatus === "loading" ? (
            <><Loader2 size={16} className="animate-spin" /> Verifying…</>
          ) : (
            <><Send size={16} /> Verify &amp; Send Message</>
          )}
        </button>

        <p className="text-muted-foreground text-xs text-center">
          Didn&apos;t receive it?{" "}
          <button
            onClick={handleResend}
            disabled={resendCooldown > 0}
            className="font-semibold text-primary disabled:text-muted-foreground hover:underline transition-colors"
          >
            {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend code"}
          </button>
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="Your Name *"
          placeholder="Jane Smith"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
        <Field
          label="Email Address *"
          type="email"
          placeholder="jane@company.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="Company"
          placeholder="Acme Inc. (optional)"
          autoComplete="organization"
          {...register("company")}
        />
        <Field
          label="Service Needed *"
          as="select"
          error={errors.service?.message}
          {...register("service")}
        >
          <option value="">Select a service…</option>
          {SERVICES_LIST.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </Field>
      </div>

      <Field label="Estimated Budget" as="select" {...register("budget")}>
        <option value="">Select a budget range (optional)…</option>
        {BUDGETS.map((b) => (
          <option key={b} value={b}>{b}</option>
        ))}
      </Field>

      <Field
        label="Project Details *"
        as="textarea"
        placeholder="Tell us about your project, goals, timeline, and anything else we should know…"
        error={errors.message?.message}
        {...register("message")}
      />

      <AnimatePresence>
        {formStatus === "error" && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-red-500 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3"
          >
            <AlertCircle size={15} />
            Failed to send verification code. Please try again.
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={formStatus === "loading"}
        className={cn(
          "inline-flex items-center justify-center gap-2.5 h-14 px-8 rounded-full",
          "bg-foreground text-white font-semibold text-sm",
          "hover:bg-foreground/88 transition-all duration-300",
          "disabled:opacity-50 disabled:pointer-events-none",
          "shadow-card hover:shadow-card-hover"
        )}
      >
        {formStatus === "loading" ? (
          <><Loader2 size={16} className="animate-spin" /> Sending code…</>
        ) : (
          <><Send size={16} /> Send Message</>
        )}
      </button>

      <p className="text-muted-foreground text-xs text-center">
        We&apos;ll send a verification code to your email first · No spam, ever.
      </p>
    </form>
  );
}
