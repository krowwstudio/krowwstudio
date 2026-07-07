"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Palette, Code2, Target, Sparkles, Layers, MousePointerClick,
  Zap, TrendingUp, Shield, Check, ArrowRight,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { PageHero } from "./PageHero";
import { staggerContainer, fadeUp, viewportConfig } from "@/lib/animations";

const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  Palette, Code2, Target, Sparkles, Layers, MousePointerClick,
  Zap, TrendingUp, Shield,
};

export function ServicesContent() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything your digital presence needs"
        description="From initial concept to post-launch support, we handle every aspect of your digital presence — beautifully and at speed."
      />

      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex flex-col gap-6"
          >
            {SERVICES.map((service, i) => {
              const Icon = iconMap[service.icon] ?? Zap;
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={service.id}
                  variants={fadeUp(i * 0.05)}
                  id={service.id}
                  className="group grid grid-cols-1 lg:grid-cols-5 gap-8 p-8 md:p-10 rounded-3xl border border-border bg-white hover:shadow-card-hover hover:border-primary/15 transition-all duration-500 items-center"
                >
                  {/* Icon (span 1) */}
                  <div className="lg:col-span-1">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${service.color}12` }}
                    >
                      <Icon className="w-7 h-7" style={{ color: service.color }} />
                    </div>
                  </div>

                  {/* Content (span 3) */}
                  <div className="lg:col-span-3">
                    <h2 className="font-heading font-bold text-xl text-foreground mb-2">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-5">
                      {service.description}
                    </p>
                    <ul className="grid grid-cols-2 gap-2">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-foreground/70">
                          <Check size={14} className="text-primary shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA (span 1) */}
                  <div className="lg:col-span-1 flex justify-start lg:justify-end">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 text-primary text-sm font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group/btn"
                    >
                      Get Started
                      <ArrowRight size={13} className="transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}
