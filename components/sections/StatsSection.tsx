"use client";

import { motion } from "framer-motion";
import { STATS } from "@/lib/constants";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { staggerContainer, fadeUp, viewportConfig } from "@/lib/animations";

export function StatsSection() {
  return (
    <section className="py-20 bg-foreground relative overflow-hidden" id="stats">
      {/* Decorative elements */}
      <div className="absolute -top-24 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-60 h-60 rounded-full bg-accent-green/8 blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-2 lg:grid-cols-4 gap-1"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp(i * 0.08)}
              className="group flex flex-col items-center justify-center text-center py-10 px-6 rounded-2xl hover:bg-white/4 transition-colors duration-300"
            >
              <div className="font-heading font-bold text-5xl md:text-6xl text-white mb-3 tabular-nums leading-none">
                <AnimatedCounter
                  target={parseInt(stat.value)}
                  suffix={stat.suffix ?? ""}
                  prefix={stat.prefix ?? ""}
                  duration={2400}
                />
              </div>
              <p className="text-white/40 text-sm leading-snug">{stat.label}</p>
              <div className="w-8 h-0.5 rounded-full bg-primary mt-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
