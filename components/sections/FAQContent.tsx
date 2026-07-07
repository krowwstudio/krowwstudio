"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";
import { PageHero } from "./PageHero";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";

export function FAQContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <PageHero
        eyebrow="FAQs"
        title="Questions we get asked a lot"
        description="Everything you need to know about working with KROWW Studio. Can't find what you're looking for? Send us a message."
      />

      <section className="section-padding bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer(0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex flex-col gap-3"
          >
            {FAQ_ITEMS.map((faq, i) => {
              const isOpen = openIndex === i;

              return (
                <motion.div
                  key={i}
                  variants={fadeUp(i * 0.04)}
                  className={cn(
                    "rounded-2xl border bg-white transition-all duration-300",
                    isOpen ? "border-primary/20 shadow-glow-xs" : "border-border hover:border-primary/10"
                  )}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-start justify-between gap-4 p-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className={cn(
                      "font-heading font-semibold text-base leading-snug transition-colors duration-200",
                      isOpen ? "text-primary" : "text-foreground"
                    )}>
                      {faq.question}
                    </span>
                    <span
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
                        isOpen
                          ? "bg-primary text-white rotate-0"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className="h-px bg-border mb-4" />
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            variants={fadeUp(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="mt-14 text-center p-8 rounded-3xl bg-muted border border-border"
          >
            <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
              Still have questions?
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              We&apos;re happy to answer anything. Book a free call or send us a message.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-white text-sm font-semibold hover:bg-foreground/85 transition-colors"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
