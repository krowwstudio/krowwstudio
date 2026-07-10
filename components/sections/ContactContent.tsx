"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Twitter, Instagram, Linkedin, Dribbble, Clock, ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { fadeUp, viewportConfig, staggerContainer } from "@/lib/animations";

const contactInfo = [
  { icon: Mail, label: "Email", value: "krowwstudio@gmail.com", href: "mailto:krowwstudio@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 72481 73392 · +91 90999 19454", href: "tel:+917248173392" },
  { icon: MapPin, label: "Location", value: "Udyog Vihar, Gurugram, Haryana", href: "#" },
  { icon: Clock, label: "Response Time", value: "We reply within 24 hours", href: null },
];

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/krowwstudio" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/krowwstudio" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/krowwstudio" },
  { icon: Dribbble, label: "Dribbble", href: "https://dribbble.com/krowwstudio" },
];

export function ContactContent() {
  return (
    <section className="pt-36 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            animate="visible"
            className="mb-5"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Let&apos;s Talk
            </span>
          </motion.div>
          <motion.h1
            variants={fadeUp(0.06)}
            initial="hidden"
            animate="visible"
            className="font-heading font-bold text-display-lg text-foreground mb-5 max-w-3xl mx-auto"
          >
            Start your project today
          </motion.h1>
          <motion.p
            variants={fadeUp(0.12)}
            initial="hidden"
            animate="visible"
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            Tell us about your project. We&apos;ll review it and get back to you within 24 hours with a clear plan and honest quote.
          </motion.p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Left: Info */}
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            {/* Contact details */}
            <div className="p-8 rounded-3xl bg-muted border border-border">
              <h2 className="font-heading font-bold text-lg text-foreground mb-6">Get in touch</h2>
              <div className="flex flex-col gap-5">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <motion.div key={label} variants={fadeUp()} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium mb-0.5">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-foreground">{value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Follow us — commented out
            <div className="p-8 rounded-3xl bg-muted border border-border">
              <h3 className="font-semibold text-sm text-foreground mb-5">Follow us</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-white text-muted-foreground text-xs font-medium hover:text-primary hover:border-primary/20 hover:bg-primary/3 transition-all duration-200 group"
                  >
                    <Icon size={14} />
                    {label}
                    <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
            */}

            {/* Trust */}
            <div className="p-6 rounded-3xl bg-surface-dark border border-white/6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                <span className="text-white/90 text-xs font-medium">Currently accepting new projects</span>
              </div>
              <p className="text-white/70 text-xs leading-relaxed">
                We have limited availability. Book your spot before we fill up for the next quarter.
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="lg:col-span-3 p-8 md:p-10 rounded-3xl bg-white border border-border shadow-card"
          >
            <h2 className="font-heading font-bold text-xl text-foreground mb-8">
              Tell us about your project
            </h2>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
