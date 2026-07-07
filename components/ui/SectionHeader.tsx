"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, viewportConfig } from "@/lib/animations";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  titleClassName?: string;
  descriptionClassName?: string;
  className?: string;
  dark?: boolean;
  gradient?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  titleClassName,
  descriptionClassName,
  className,
  dark = false,
  gradient = false,
}: SectionHeaderProps) {
  const alignClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }[align];

  return (
    <div className={cn("flex flex-col gap-4", alignClass, className)}>
      {eyebrow && (
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <span
            className={cn(
              "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest",
              "px-3 py-1.5 rounded-full border",
              dark
                ? "text-primary border-primary/20 bg-primary/10"
                : "text-primary border-primary/20 bg-primary/5"
            )}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {eyebrow}
          </span>
        </motion.div>
      )}

      <motion.h2
        variants={fadeUp(0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className={cn(
          "font-heading font-bold text-balance",
          "text-display-md leading-[1.08]",
          gradient
            ? "gradient-text"
            : dark
            ? "text-white"
            : "text-foreground",
          titleClassName
        )}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          variants={fadeUp(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className={cn(
            "text-base md:text-lg leading-relaxed max-w-2xl",
            dark ? "text-white/60" : "text-muted-foreground",
            align === "center" && "mx-auto",
            descriptionClassName
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
