"use client";

import { motion } from "framer-motion";
import {
  Zap, Smartphone, TrendingUp,
  Cpu, Layers, Headphones,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { staggerContainer, fadeUp, viewportConfig, slideLeft } from "@/lib/animations";

const features = [
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Most projects ship in 3–6 weeks. We don't waste time.",
    color: "#F59E0B",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Flawless on every screen size and device.",
    color: "#2CB67D",
  },
  {
    icon: TrendingUp,
    title: "SEO Optimized",
    description: "Built to rank and be found by the right people.",
    color: "#7F5AF0",
  },
  {
    icon: Cpu,
    title: "Performance First",
    description: "99+ Lighthouse scores. Speed is a feature.",
    color: "#EC4899",
  },
  {
    icon: Layers,
    title: "Scalable Solutions",
    description: "Architecture that grows with your business.",
    color: "#06B6D4",
  },
  {
    icon: Headphones,
    title: "Premium Support",
    description: "30 days of post-launch support on every project.",
    color: "#10B981",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-surface-dark relative overflow-hidden" id="why-us">
      {/* Background orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-accent-green/6 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Text */}
          <div className="lg:sticky lg:top-32">
            <motion.span
              variants={fadeUp(0)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-semibold uppercase tracking-widest mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Why KROWW
            </motion.span>

            <motion.h2
              variants={slideLeft(0.05)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="font-heading font-bold text-display-md text-white mb-6 leading-[1.08]"
            >
              Built different,{" "}
              <span className="gradient-text">by design.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="text-white/50 text-base leading-relaxed mb-8"
            >
              We&apos;re not a template shop. Every project starts with your
              business goals and ends with a product that actually moves the
              needle. Here&apos;s what makes us different.
            </motion.p>

            <motion.div
              variants={fadeUp(0.15)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="flex flex-col gap-3"
            >
              {["No templates. Ever.", "Variable pricing. No surprises.", "Experienced team."].map((point) => (
                <div key={point} className="flex items-center gap-3 text-sm text-white/60">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  {point}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Feature grid */}
          <motion.div
            variants={staggerContainer(0.07)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={fadeUp(i * 0.05)}
                className={cn(
                  "group p-5 rounded-2xl border border-white/6 bg-white/3",
                  "hover:bg-white/6 hover:border-white/12 transition-all duration-300"
                )}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <feature.icon
                    size={16}
                    style={{ color: feature.color }}
                  />
                </div>
                <h3 className="font-semibold text-white text-sm mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-white/40 text-xs leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
