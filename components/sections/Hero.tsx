"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

const HEADLINE_WORDS = [
  { text: "We Build", gradient: false },
  { text: "Websites", gradient: false },
  { text: "That Grow", gradient: false },
  { text: "Businesses.", gradient: true },
];

const orbs = [
  {
    className: "absolute top-[8%] left-[12%] w-[500px] h-[500px] opacity-30",
    gradient: "radial-gradient(ellipse, #7F5AF0 0%, transparent 65%)",
    animation: { y: [0, -40, 0], x: [0, 20, 0], rotate: [0, 5, 0] },
    duration: 12,
  },
  {
    className: "absolute top-[30%] right-[8%] w-[440px] h-[440px] opacity-20",
    gradient: "radial-gradient(ellipse, #2CB67D 0%, transparent 65%)",
    animation: { y: [0, 35, 0], x: [0, -25, 0], rotate: [0, -6, 0] },
    duration: 15,
  },
  {
    className: "absolute bottom-[15%] left-[35%] w-[360px] h-[360px] opacity-15",
    gradient: "radial-gradient(ellipse, #5B5BFF 0%, transparent 65%)",
    animation: { y: [0, -25, 0], x: [0, 30, 0], rotate: [0, 8, 0] },
    duration: 18,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};


export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const yParallax = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]), {
    stiffness: 60,
    damping: 20,
  });
  const opacityParallax = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center bg-surface-dark overflow-hidden"
      aria-label="Hero"
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {orbs.map((orb, i) => (
          <motion.div
            key={i}
            className={orb.className}
            style={{ background: orb.gradient, borderRadius: "50%" }}
            animate={orb.animation}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden
      />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full"
        style={{ y: yParallax, opacity: opacityParallax }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
            Available for new projects · Est. 2024
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-8"
        >
          <h1 className="font-heading font-bold leading-[1.02] tracking-[-0.04em] text-white mx-auto max-w-5xl">
            {HEADLINE_WORDS.map((word, i) => (
              <motion.span
                key={i}
                variants={itemVariants}
                className={`inline-block mr-[0.2em] text-display-xl ${
                  word.gradient ? "gradient-text" : ""
                }`}
              >
                {word.text}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-white/55 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
        >
          Premium websites, unforgettable branding, and exceptional digital
          experiences that help businesses stand out and convert.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <MagneticButton strength={0.3}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 h-14 px-8 rounded-full bg-white text-foreground font-semibold text-sm hover:bg-white/92 transition-colors shadow-lg hover:shadow-xl group"
            >
              Book Free Call
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </MagneticButton>

          <MagneticButton strength={0.25}>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2.5 h-14 px-8 rounded-full border border-white/15 text-white font-semibold text-sm hover:bg-white/8 hover:border-white/25 transition-all group"
            >
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors">
                <Play size={12} fill="white" className="translate-x-0.5" />
              </span>
              View Portfolio
            </Link>
          </MagneticButton>
        </motion.div>

      </motion.div>



    </section>
  );
}
