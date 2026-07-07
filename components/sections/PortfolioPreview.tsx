"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { PORTFOLIO_PROJECTS } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { fadeUp, viewportConfig } from "@/lib/animations";

const categories = [
  { value: "all", label: "All Work" },
  { value: "Web App", label: "Web App" },
  { value: "Developer Tool", label: "Developer Tool" },
  { value: "Full Stack", label: "Full Stack" },
];

export function PortfolioPreview() {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all"
      ? PORTFOLIO_PROJECTS.slice(0, 6)
      : PORTFOLIO_PROJECTS.filter((p) => p.category === active).slice(0, 6);

  return (
    <section className="section-padding bg-background" id="portfolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Work"
          title="Projects that speak volumes"
          description="A selection of our finest work — each project built with intention, crafted to convert."
          className="mb-12"
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActive(cat.value)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                active === cat.value
                  ? "bg-foreground text-white shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl bg-muted border border-border hover:shadow-card-hover transition-all duration-500"
              >
              <a
                href={project.link ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10"
                aria-label={`View ${project.title}`}
              />
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-107"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* View button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-foreground font-semibold text-xs transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                      <ExternalLink size={12} />
                      View Project
                    </div>
                  </div>

                  {project.featured && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="gradient" className="text-[10px]">
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Meta */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-heading font-semibold text-base text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight
                      size={15}
                      className="text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-14 text-center"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-foreground text-white font-semibold text-sm hover:bg-foreground/90 transition-all group shadow-card hover:shadow-card-hover"
          >
            View All Projects
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
