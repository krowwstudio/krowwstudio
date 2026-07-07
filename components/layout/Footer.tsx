"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Twitter,
  Instagram,
  Linkedin,
  Dribbble,
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const footerLinks = {
  Pages: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Process", href: "/process" },
    { label: "Contact", href: "/contact" },
  ],
  Services: [
    { label: "Website Design", href: "/services#design" },
    { label: "Website Development", href: "/services#development" },
    { label: "Landing Pages", href: "/services#landing" },
    { label: "Brand Identity", href: "/services#branding" },
    { label: "UI/UX Design", href: "/services#ui-ux" },
    { label: "SEO Optimization", href: "/services#seo" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "FAQs", href: "/faqs" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socials = [
  { icon: Twitter, href: "https://twitter.com/krowwstudio", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/krowwstudio", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/krowwstudio", label: "LinkedIn" },
  { icon: Dribbble, href: "https://dribbble.com/krowwstudio", label: "Dribbble" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <footer className="bg-surface-dark text-white relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-accent-green/5 blur-[80px] pointer-events-none" />

      {/* Top CTA bar */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-lg">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                Ready to build something{" "}
                <span className="gradient-text">extraordinary?</span>
              </h2>
              <p className="text-white/50 text-sm leading-relaxed">
                Let&apos;s turn your vision into a website that drives real results.
                Free discovery call, no commitment.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 h-14 px-8 rounded-full bg-white text-foreground font-semibold text-sm shrink-0 hover:bg-white/90 transition-colors group"
            >
              Book Free Call
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Brand col */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 group mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center">
                <span className="font-heading font-bold text-white text-base">K</span>
              </div>
              <span className="font-heading font-bold text-xl text-white tracking-tight">
                KROWW<span className="text-primary">.</span>
              </span>
            </Link>

            <p className="text-white/45 text-sm leading-relaxed mb-8 max-w-sm">
              We help startups, founders, and businesses build premium digital
              presences. Modern design, fast development, real results.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-3 mb-8">
              {[
                { icon: Mail, text: "krowwstudio@gmail.com", href: "mailto:krowwstudio@gmail.com" },
                { icon: Phone, text: "+91 72481 73392 · +91 90999 19454", href: "tel:+917248173392" },
                { icon: MapPin, text: "Udyog Vihar, Gurugram, Haryana", href: "#" },
              ].map(({ icon: Icon, text, href }) => (
                <a
                  key={text}
                  href={href}
                  className="flex items-center gap-2.5 text-white/45 hover:text-white/70 text-sm transition-colors group"
                >
                  <Icon size={14} className="text-primary shrink-0" />
                  {text}
                </a>
              ))}
            </div>

          </div>

          {/* Links */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <p className="text-white/80 font-semibold text-xs uppercase tracking-widest mb-5">
                  {title}
                </p>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-white/40 hover:text-white text-sm transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>



        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} KROWW Studio. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Crafted with care ·{" "}
            <span className="gradient-text font-medium">Built to convert.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
