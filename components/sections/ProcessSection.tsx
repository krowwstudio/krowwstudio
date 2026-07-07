"use client";

import { motion } from "framer-motion";
import {
  Search, BarChart2, Layout, Figma as FigmaIcon, Code2,
  CheckCircle, Rocket, Headphones,
} from "lucide-react";
import { PROCESS_STEPS } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeUp, viewportConfig } from "@/lib/animations";

const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  Search, BarChart: BarChart2, Layout, Figma: FigmaIcon, Code2,
  CheckCircle, Rocket, Headphones,
};

// Direction-aware card entrance: left cards slide from left, right from right
const cardVariants = (side: "left" | "right") => ({
  hidden: {
    opacity: 0,
    x: side === "left" ? -60 : 60,
    y: 16,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

// Dot pops in with a slight scale
const dotVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
  },
};

const cardViewport = { once: true, margin: "-60px" };

export function ProcessSection() {
  return (
    <section className="section-padding bg-muted" id="process">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="How We Work"
          title="From idea to launch — a proven process"
          description="Eight steps refined across every project. Every phase is designed to keep you informed, involved, and confident."
          className="mb-20"
        />

        <div className="relative">
          {PROCESS_STEPS.map((step, i) => {
            const isLeft = i % 2 === 0;
            const Icon = iconMap[step.icon] ?? Rocket;

            return (
              <div
                key={step.step}
                className="relative flex items-stretch pb-6 last:pb-0"
              >
                {/* ── Desktop: three-column flex ── */}

                {/* Left half */}
                <div className="hidden md:flex flex-1 justify-end pr-10 py-2">
                  {isLeft && (
                    <motion.div
                      variants={cardVariants("left")}
                      initial="hidden"
                      whileInView="visible"
                      viewport={cardViewport}
                      className="w-full max-w-xs"
                    >
                      <StepCard step={step} Icon={Icon} align="right" />
                    </motion.div>
                  )}
                </div>

                {/* Center: dot + vertical line */}
                <div className="hidden md:flex flex-col items-center flex-shrink-0 w-12">
                  {i > 0 && <div className="w-px flex-1 bg-border mb-2" />}
                  {i === 0 && <div className="flex-1" />}

                  <motion.div
                    variants={dotVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={cardViewport}
                    className="w-12 h-12 rounded-full bg-white border-2 border-border flex items-center justify-center shadow-card z-10 shrink-0"
                  >
                    <span className="font-heading font-bold text-sm text-primary tabular-nums">
                      {String(step.step).padStart(2, "0")}
                    </span>
                  </motion.div>

                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-2" />
                  )}
                  {i === PROCESS_STEPS.length - 1 && <div className="flex-1" />}
                </div>

                {/* Right half */}
                <div className="hidden md:flex flex-1 pl-10 py-2">
                  {!isLeft && (
                    <motion.div
                      variants={cardVariants("right")}
                      initial="hidden"
                      whileInView="visible"
                      viewport={cardViewport}
                      className="w-full max-w-xs"
                    >
                      <StepCard step={step} Icon={Icon} align="left" />
                    </motion.div>
                  )}
                </div>

                {/* ── Mobile: vertical list ── */}
                <div className="flex md:hidden gap-4 w-full">
                  <div className="flex flex-col items-center">
                    <motion.div
                      variants={dotVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={cardViewport}
                      className="w-10 h-10 rounded-full bg-white border-2 border-border flex items-center justify-center shadow-card shrink-0 z-10"
                    >
                      <span className="font-heading font-bold text-xs text-primary">
                        {String(step.step).padStart(2, "0")}
                      </span>
                    </motion.div>
                    {i < PROCESS_STEPS.length - 1 && (
                      <div className="w-px flex-1 bg-border mt-2" />
                    )}
                  </div>
                  <motion.div
                    variants={fadeUp(0.1)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={cardViewport}
                    className="pb-6 flex-1"
                  >
                    <StepCard step={step} Icon={Icon} align="left" />
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  Icon,
  align,
}: {
  step: (typeof PROCESS_STEPS)[0];
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  align: "left" | "right";
}) {
  return (
    <div
      className={`group w-full p-6 rounded-2xl bg-white border border-border hover:shadow-card-hover hover:border-primary/15 transition-all duration-300 ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      <div
        className={`flex items-center gap-3 mb-3 ${
          align === "right" ? "flex-row-reverse" : ""
        }`}
      >
        <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <span className="text-xs text-muted-foreground font-medium">{step.duration}</span>
      </div>
      <h3 className="font-heading font-semibold text-base text-foreground mb-2">
        {step.title}
      </h3>
      <p className="text-muted-foreground text-xs leading-relaxed">
        {step.description}
      </p>
    </div>
  );
}
