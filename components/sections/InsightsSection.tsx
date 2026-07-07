"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { INSIGHTS } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { staggerContainer, fadeUp, viewportConfig } from "@/lib/animations";
import { formatDate } from "@/lib/utils";

export function InsightsSection() {
  return (
    <section className="section-padding bg-background" id="insights">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
          <SectionHeader
            eyebrow="Latest Insights"
            title="Thoughts from the studio"
            align="left"
            className="max-w-lg"
          />
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors shrink-0 group"
          >
            View all articles
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {INSIGHTS.map((insight, i) => (
            <motion.article
              key={insight.id}
              variants={fadeUp(i * 0.08)}
              className="group"
            >
              <Link href={`/blog/${insight.slug}`} className="block">
                {/* Image */}
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-5 bg-muted">
                  <Image
                    src={insight.image}
                    alt={insight.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Meta */}
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="default">{insight.category}</Badge>
                  <span className="flex items-center gap-1 text-muted-foreground text-xs">
                    <Clock size={11} />
                    {insight.readTime}
                  </span>
                  <span className="text-muted-foreground text-xs ml-auto">
                    {formatDate(insight.date)}
                  </span>
                </div>

                <h3 className="font-heading font-semibold text-base text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
                  {insight.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                  {insight.excerpt}
                </p>

                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary mt-4 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  Read more <ArrowUpRight size={12} />
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
