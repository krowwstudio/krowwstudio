"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { PageHero } from "./PageHero";
import { staggerContainer, fadeUp, viewportConfig } from "@/lib/animations";

export function TestimonialsContent() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Clients who trust us, results that speak"
        description="We measure our success by our clients' success. Here's what they say about working with KROWW Studio."
      />

      {/* Stats bar */}
      <section className="py-12 bg-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-12">
            {[
              { value: "3+", label: "Happy Clients" },
              { value: "98%", label: "Satisfaction Rate" },
              { value: "4.9/5", label: "Average Rating" },
              { value: "2", label: "Industry Awards" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-heading font-bold text-3xl text-white mb-1">{value}</div>
                <div className="text-white/40 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.id}
                variants={fadeUp(i * 0.07)}
                className="group flex flex-col p-7 rounded-2xl bg-white border border-border hover:shadow-card-hover hover:border-primary/15 transition-all duration-500 relative"
              >
                <Quote
                  className="absolute top-5 right-5 text-border group-hover:text-primary/10 transition-colors"
                  size={36}
                  strokeWidth={1.5}
                />

                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={13} className="fill-amber-400 text-amber-400" />
                  ))}
                  {t.result && (
                    <span className="ml-2 text-xs text-accent-green font-semibold bg-accent-green/8 px-2 py-0.5 rounded-full border border-accent-green/15">
                      {t.result}
                    </span>
                  )}
                </div>

                <blockquote className="text-foreground/80 text-sm leading-relaxed flex-1 mb-6">
                  &ldquo;{t.content}&rdquo;
                </blockquote>

                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border shrink-0">
                    <Image src={t.avatar} alt={t.name} fill sizes="40px" className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.role}, {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
