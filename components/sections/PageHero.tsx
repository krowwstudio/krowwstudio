"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, viewportConfig } from "@/lib/animations";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  dark?: boolean;
}

export function PageHero({ eyebrow, title, description, className, dark = false }: PageHeroProps) {
  const bg = dark ? "bg-surface-dark" : "bg-muted";
  const textColor = dark ? "text-white" : "text-foreground";

  return (
    <section
      className={cn(
        "pt-40 pb-20 relative overflow-hidden",
        bg,
        className
      )}
    >
      {dark && (
        <>
          <div className="absolute -top-20 left-1/3 w-96 h-96 rounded-full bg-primary/8 blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-10 right-1/4 w-72 h-72 rounded-full bg-accent-green/6 blur-[90px] pointer-events-none" />
        </>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {eyebrow && (
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            animate="visible"
            className="mb-5"
          >
            <span
              className={cn(
                "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-widest",
                dark
                  ? "border-white/10 bg-white/5 text-white/60"
                  : "border-primary/20 bg-primary/5 text-primary"
              )}
            >
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  dark ? "bg-primary" : "bg-primary"
                )}
              />
              {eyebrow}
            </span>
          </motion.div>
        )}

        <motion.h1
          variants={fadeUp(0.06)}
          initial="hidden"
          animate="visible"
          className={cn(
            "font-heading font-bold text-display-lg mb-6 max-w-3xl mx-auto",
            dark ? "text-white" : textColor
          )}
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            variants={fadeUp(0.12)}
            initial="hidden"
            animate="visible"
            className={cn(
              "text-base md:text-lg leading-relaxed max-w-2xl mx-auto",
              dark ? "text-white/50" : "text-muted-foreground"
            )}
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
