"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { fadeUp, viewportConfig } from "@/lib/animations";

export function CTASection() {
  return (
    <section className="py-28 md:py-36 bg-surface-dark relative overflow-hidden" id="cta">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-40 left-1/4 w-96 h-96 rounded-full opacity-25 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #7F5AF0, transparent 70%)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.35, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 right-1/4 w-80 h-80 rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #2CB67D, transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-semibold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
            Limited spots available
          </span>
        </motion.div>

        <motion.h2
          variants={fadeUp(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="font-heading font-bold text-display-lg text-white mb-6 leading-[1.06]"
        >
          Your next website could be{" "}
          <span className="gradient-text">your best business decision.</span>
        </motion.h2>

        <motion.p
          variants={fadeUp(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-white/50 text-lg leading-relaxed max-w-2xl mx-auto mb-12"
        >
          Let&apos;s build something extraordinary together. Book a free 30-minute
          discovery call and walk away with a clear vision for your project —
          even if you don&apos;t hire us.
        </motion.p>

        <motion.div
          variants={fadeUp(0.18)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton strength={0.3}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 h-14 px-8 rounded-full bg-white text-foreground font-semibold text-sm hover:bg-white/92 transition-colors shadow-lg hover:shadow-xl group"
            >
              <Calendar size={16} />
              Book Free Discovery Call
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </MagneticButton>

          <MagneticButton strength={0.25}>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2.5 h-14 px-8 rounded-full border border-white/15 text-white font-semibold text-sm hover:bg-white/8 hover:border-white/25 transition-all"
            >
              See Our Work
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          variants={fadeUp(0.24)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-wrap items-center justify-center gap-6 mt-14 pt-10 border-t border-white/6"
        >
          {[
            "No commitment required",
            "Free consultation",
            "Reply within 24 hours",
            "100% satisfaction guaranteed",
          ].map((trust) => (
            <div key={trust} className="flex items-center gap-2 text-white/35 text-xs">
              <div className="w-1 h-1 rounded-full bg-accent-green" />
              {trust}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
