"use client";

import { motion } from "framer-motion";
import { TECH_STACK } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { staggerContainer, fadeUp, viewportConfig } from "@/lib/animations";

const categories = ["Framework", "Library", "Language", "Styling", "Animation", "Design", "Deployment", "Database", "ORM", "Payments", "Email", "Backend"];

export function TechStackSection() {
  const grouped = categories.reduce<Record<string, typeof TECH_STACK>>((acc, cat) => {
    const items = TECH_STACK.filter((t) => t.category === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {});

  return (
    <section className="section-padding bg-background" id="tech">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Stack"
          title="Built with the best tools on Earth"
          description="We work exclusively with modern, best-in-class technologies that deliver speed, reliability, and developer experience."
          className="mb-16"
        />

        <motion.div
          variants={staggerContainer(0.04)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-wrap justify-center gap-3"
        >
          {TECH_STACK.map((tech, i) => (
            <motion.div
              key={tech.name}
              variants={fadeUp(i * 0.03)}
              className="group flex flex-col items-center gap-2 px-5 py-4 rounded-2xl border border-border bg-white hover:border-primary/25 hover:shadow-glow-xs hover:bg-primary/2 transition-all duration-300 cursor-default"
            >
              <span className="font-heading font-semibold text-sm text-foreground/80 group-hover:text-primary transition-colors">
                {tech.name}
              </span>
              <span className="text-[10px] text-muted-foreground">{tech.category}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          variants={fadeUp(0.3)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center text-muted-foreground text-xs mt-10"
        >
          And whatever else your project needs. We always choose the right tool for the job.
        </motion.p>
      </div>
    </section>
  );
}
