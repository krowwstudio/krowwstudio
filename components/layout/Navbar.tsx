"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import { MagneticButton } from "@/components/ui/MagneticButton";

const menuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const linkVariants = {
  closed: { opacity: 0, x: -20 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 72);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isDark = pathname === "/" && !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "glass-nav shadow-nav-light"
          : pathname === "/"
          ? "bg-transparent"
          : "glass-nav shadow-nav-light"
      )}
      style={{ height: "var(--nav-height, 72px)" }}
    >
      <nav className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 group"
          aria-label="KROWW Studio — Home"
        >
          <span
            className={cn(
              "font-heading font-bold text-lg tracking-tight transition-colors",
              isDark ? "text-white" : "text-foreground"
            )}
          >
            KROWW
            <span className="text-primary">.</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative px-3.5 py-2 text-sm font-medium rounded-lg",
                    "transition-colors duration-200",
                    "hover:text-primary",
                    isActive
                      ? "text-primary"
                      : isDark
                      ? "text-white/80 hover:text-white"
                      : "text-foreground/70 hover:text-foreground"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <MagneticButton strength={0.25}>
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center gap-2 h-10 px-5 rounded-full text-sm font-semibold",
                "transition-all duration-300",
                pathname === "/contact"
                  ? "bg-primary text-white shadow-glow-xs"
                  : isDark
                  ? "bg-white text-foreground hover:bg-white/90"
                  : "bg-foreground text-white hover:bg-foreground/90"
              )}
            >
              Start a Project
              <ArrowUpRight size={14} />
            </Link>
          </MagneticButton>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className={cn(
            "lg:hidden relative w-10 h-10 rounded-lg flex items-center justify-center",
            "transition-colors duration-200",
            isDark ? "text-white hover:bg-white/10" : "text-foreground hover:bg-muted"
          )}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={20} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="lg:hidden overflow-hidden border-t border-border/50 bg-white/95 backdrop-blur-xl"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
              <ul className="flex flex-col gap-1 mb-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.li key={link.href} custom={i} variants={linkVariants} initial="closed" animate="open">
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium",
                        "transition-colors duration-200",
                        pathname === link.href
                          ? "bg-primary/8 text-primary"
                          : "text-foreground/70 hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {link.label}
                      {pathname === link.href && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full h-12 rounded-2xl bg-foreground text-white font-semibold text-sm"
              >
                Start a Project
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
