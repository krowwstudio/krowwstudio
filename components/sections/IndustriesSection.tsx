"use client";

import { motion } from "framer-motion";
import {
  Rocket, Building2, Heart, UtensilsCrossed, ShoppingBag,
  Briefcase, Users, Cpu,
} from "lucide-react";
import { INDUSTRIES } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { staggerContainer, fadeUp, viewportConfig } from "@/lib/animations";

const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  Rocket, Building2, Heart, UtensilsCrossed, ShoppingBag, Briefcase, Users, Cpu,
};

export function IndustriesSection() {
  return (
    <section className="pt-0 pb-24 md:pb-32 bg-muted" id="industries">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Industries We Serve"
          title="We speak every industry's language"
          description="Whether you're disrupting healthcare or serving the finest pasta in town — we know how to make your digital presence command authority."
          className="mb-16"
        />

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
        >
          {INDUSTRIES.map((industry, i) => {
            const Icon = iconMap[industry.icon] ?? Rocket;
            return (
              <motion.div
                key={industry.name}
                variants={fadeUp(i * 0.05)}
                className="group p-5 rounded-2xl bg-white border border-border hover:border-primary/20 hover:shadow-card-hover transition-all duration-400 cursor-default"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/12 transition-colors">
                    <Icon className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground font-semibold tabular-nums">
                    {industry.count}
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-foreground mb-1.5 leading-snug">
                  {industry.name}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {industry.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
