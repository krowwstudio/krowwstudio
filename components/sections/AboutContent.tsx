"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Award, Users, Zap } from "lucide-react";
import { PageHero } from "./PageHero";
import { fadeUp, viewportConfig, staggerContainer, slideLeft, slideRight } from "@/lib/animations";

const values = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "We never ship work we wouldn't be proud to add to our own portfolio. If it's not our best, it goes back to the drawing board.",
    color: "#5B5BFF",
  },
  {
    icon: Zap,
    title: "Speed & Precision",
    description: "Fast delivery without cutting corners. Our process is refined to eliminate wasted time without sacrificing any quality.",
    color: "#7F5AF0",
  },
  {
    icon: Users,
    title: "True Partnership",
    description: "We treat every client's project as if it were our own business. Your success is literally our success.",
    color: "#2CB67D",
  },
  {
    icon: CheckCircle2,
    title: "Zero Surprises",
    description: "Fixed pricing, clear milestones, and constant communication. You always know exactly where your project stands.",
    color: "#F59E0B",
  },
];

export function AboutContent() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="Built by people who care about craft"
        description="KROWW Studio was founded on a simple belief: every business deserves a digital presence that commands respect."
      />

      {/* Story section */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              variants={slideLeft(0)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-cta overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent-green/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-12">
                    <div className="font-heading font-bold text-8xl mb-4 gradient-text">1+</div>
                    <div className="text-white/60 text-sm uppercase tracking-widest font-semibold">Years of Craft</div>
                  </div>
                </div>
                {/* Floating stats */}
                <div className="absolute bottom-6 left-6 right-6 flex gap-2">
                  {[["2+", "Projects"], ["98%", "Satisfaction"], ["2+", "Awards"]].map(([val, label]) => (
                    <div key={label} className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10">
                      <div className="font-heading font-bold text-white text-lg">{val}</div>
                      <div className="text-white/50 text-[10px]">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={slideRight(0)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="flex flex-col gap-6"
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                <span className="w-8 h-px bg-primary" />
                The KROWW Way
              </span>

              <h2 className="font-heading font-bold text-display-sm text-foreground leading-[1.1]">
                We founded KROWW Studio because the web deserved better.
              </h2>

              <div className="flex flex-col gap-4 text-muted-foreground text-base leading-relaxed">
                <p>
                  Too many businesses were settling for generic templates, offshore assembly lines, or agencies that treated them like ticket numbers instead of partners.
                </p>
                <p>
                  We built KROWW Studio to be the agency we always wished existed — one that combines the creativity of a design studio, the rigor of an engineering firm, and the communication of a trusted colleague.
                </p>
                <p>
                  2+ projects in, that mission hasn&apos;t changed. Every project we take on is our best work yet.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Our Values
            </span>
            <h2 className="font-heading font-bold text-display-sm text-foreground">What we stand for</h2>
          </div>

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                variants={fadeUp(i * 0.08)}
                className="group p-7 rounded-2xl bg-white border border-border hover:border-primary/20 hover:shadow-card-hover transition-all duration-400"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${value.color}12` }}
                >
                  <value.icon size={20} style={{ color: value.color }} />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
