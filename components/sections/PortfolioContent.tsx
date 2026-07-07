"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { PORTFOLIO_PROJECTS } from "@/lib/constants";
import { PageHero } from "./PageHero";
import { Badge } from "@/components/ui/Badge";
import { fadeUp } from "@/lib/animations";

const categories = [
  { value: "all", label: "All" },
  { value: "Web App", label: "Web App" },
  { value: "Developer Tool", label: "Developer Tool" },
  { value: "Full Stack", label: "Full Stack" },
];

export function PortfolioContent() {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all"
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === active);

  return (
    <>
      <PageHero
        eyebrow="Our Portfolio"
        title="Work that speaks for itself"
        description="Projects shipped for startups, established businesses, and everything in between. Every project is built to perform."
      />

      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActive(cat.value)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  active === cat.value
                    ? "bg-foreground text-white"
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
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative overflow-hidden rounded-2xl bg-muted border border-border hover:shadow-card-hover transition-all duration-500"
                >
                  <a
                    href={project.link ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10"
                    aria-label={`View ${project.title}`}
                  />
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-foreground font-semibold text-xs">
                        <ExternalLink size={12} />
                        View Project
                      </div>
                    </div>
                    {project.featured && (
                      <div className="absolute top-3 left-3">
                        <Badge variant="gradient" className="text-[10px]">Featured</Badge>
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-heading font-semibold text-base text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <ArrowUpRight size={15} className="text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <Badge variant="outline" className="mb-3 text-[10px]">{project.category}</Badge>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[10px]">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <motion.div
              variants={fadeUp()}
              initial="hidden"
              animate="visible"
              className="text-center py-20"
            >
              <p className="text-muted-foreground">No projects in this category yet.</p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
