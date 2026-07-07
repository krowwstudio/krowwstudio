"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Twitter, Linkedin, Github, Dribbble, Instagram, Globe } from "lucide-react";
import { TEAM } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { staggerContainer, fadeUp, viewportConfig } from "@/lib/animations";

const socialIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
  dribbble: Dribbble,
  instagram: Instagram,
  website: Globe,
};

export function TeamSection() {
  return (
    <section className="pt-0 pb-24 md:pb-32 bg-muted" id="team">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Team"
          title="The minds behind the magic"
          description="A small, senior team obsessed with craft. No juniors, no outsourcing — just experienced designers and engineers who care."
          className="mb-16"
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
        >
          {TEAM.map((member, i) => (
            <motion.div
              key={member.id}
              variants={fadeUp(i * 0.1)}
              className="group relative overflow-hidden rounded-3xl h-[420px] cursor-pointer border border-border"
            >
              {/* Full-bleed image */}
              <Image
                src={member.avatar}
                alt={member.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                style={{
                  objectPosition: member.avatar.startsWith("/") ? "50% 30%" : "center",
                }}
              />

              {/* Ambient colour tint (always on) */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `radial-gradient(ellipse at top, ${["#5B5BFF", "#7F5AF0"][i] ?? "#2CB67D"}60, transparent 70%)`,
                }}
              />

              {/* Base gradient — keeps name/role always readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Hover overlay — deepens on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Default label — name + role, always visible at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 group-hover:opacity-0 group-hover:translate-y-3 transition-all duration-400 ease-out">
                <h3 className="font-heading font-bold text-lg text-white mb-0.5">{member.name}</h3>
                <p
                  className="text-xs font-semibold"
                  style={{ color: ["#818CF8", "#A78BFA"][i] ?? "#6EE7B7" }}
                >
                  {member.role}
                </p>
              </div>

              {/* Hover panel — slides up from below */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <h3 className="font-heading font-bold text-xl text-white mb-1">{member.name}</h3>
                <p
                  className="text-xs font-semibold mb-4"
                  style={{ color: ["#818CF8", "#A78BFA"][i] ?? "#6EE7B7" }}
                >
                  {member.role}
                </p>
                <p className="text-white/80 text-sm leading-relaxed mb-5">{member.bio}</p>

                {/* Social links */}
                <div className="flex items-center gap-2">
                  {(Object.entries(member.social) as [keyof typeof socialIcons, string][]).map(
                    ([platform, href]) => {
                      const Icon = socialIcons[platform];
                      if (!Icon || !href) return null;
                      return (
                        <a
                          key={platform}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on ${platform}`}
                          className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-foreground transition-all duration-200"
                        >
                          <Icon size={13} />
                        </a>
                      );
                    }
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
