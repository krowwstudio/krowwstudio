import type { Variants } from "framer-motion";

// Easing curves
export const ease = {
  out: [0.22, 1, 0.36, 1] as [number, number, number, number],
  in: [0.64, 0, 0.78, 0] as [number, number, number, number],
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
  spring: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
};

// Container that staggers children
export const staggerContainer = (
  staggerChildren = 0.1,
  delayChildren = 0
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren, delayChildren },
  },
});

// Fade up — the most universal entrance animation
export const fadeUp = (delay = 0, duration = 0.6): Variants => ({
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, delay, ease: ease.out },
  },
});

// Fade in (no movement)
export const fadeIn = (delay = 0, duration = 0.5): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration, delay, ease: ease.out },
  },
});

// Scale up from slightly smaller
export const scaleUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay, ease: ease.out },
  },
});

// Slide in from left
export const slideLeft = (delay = 0): Variants => ({
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: ease.out },
  },
});

// Slide in from right
export const slideRight = (delay = 0): Variants => ({
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: ease.out },
  },
});

// Reveal text character by character
export const textReveal: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.02,
    },
  },
};

export const charReveal: Variants = {
  hidden: { opacity: 0, y: "100%", rotateX: -30 },
  visible: {
    opacity: 1,
    y: "0%",
    rotateX: 0,
    transition: { duration: 0.5, ease: ease.out },
  },
};

// Word by word reveal
export const wordReveal: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

export const wordItem: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: ease.out },
  },
};

// Card hover effect
export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 2px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
    transition: { duration: 0.3, ease: ease.out },
  },
  hover: {
    scale: 1.02,
    y: -6,
    boxShadow: "0 12px 48px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)",
    transition: { duration: 0.3, ease: ease.out },
  },
};

// Floating element
export const floating = (delay = 0, range = 20): Variants => ({
  animate: {
    y: [0, -range, 0],
    transition: {
      duration: 6,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
});

// Glow pulse
export const glowPulse: Variants = {
  animate: {
    opacity: [0.4, 0.9, 0.4],
    scale: [1, 1.1, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Viewport config for scroll-triggered animations
export const viewportConfig = {
  once: true,
  margin: "-80px",
};

export const viewportEager = {
  once: true,
  margin: "-40px",
};
