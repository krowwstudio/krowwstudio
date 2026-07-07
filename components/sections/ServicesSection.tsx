"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Palette, Code2, Target, Sparkles, Layers, MousePointerClick,
  Zap, TrendingUp, Shield, ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SERVICES } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { staggerContainer, fadeUp, viewportConfig } from "@/lib/animations";

const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  Palette, Code2, Target, Sparkles, Layers, MousePointerClick,
  Zap, TrendingUp, Shield,
};

export function ServicesSection() {
  return (
    <section className="section-padding bg-background" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="What We Do"
          title="Services built for growth"
          description="From pixels to production — every service we offer is engineered to make your brand look premium and your business perform."
          className="mb-16"
        />

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {SERVICES.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Zap;
            return (
              <motion.div
                key={service.id}
                variants={fadeUp(i * 0.04)}
                className="group relative overflow-hidden rounded-2xl border border-border bg-white p-7 hover:border-primary/20 hover:shadow-card-hover transition-all duration-500 cursor-default"
              >
                {/* Hover gradient bg */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at top left, ${service.color}08 0%, transparent 60%)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <Icon
                    className="w-5 h-5 transition-colors duration-300"
                    style={{ color: service.color }}
                  />
                </div>

                {/* Content */}
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2.5 group-hover:text-foreground/90">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="flex flex-col gap-1.5 mb-5">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span
                        className="w-1 h-1 rounded-full shrink-0"
                        style={{ backgroundColor: service.color }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/services#${service.id}`}
                  className={cn(
                    "inline-flex items-center gap-1.5 text-xs font-semibold",
                    "opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0",
                    "transition-all duration-300"
                  )}
                  style={{ color: service.color }}
                >
                  Learn more
                  <ArrowUpRight size={13} />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          variants={fadeUp(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-12 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border text-sm font-semibold text-foreground hover:bg-foreground hover:text-white hover:border-foreground transition-all duration-300 group"
          >
            View All Services
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
