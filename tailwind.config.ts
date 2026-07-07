import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAFAFA",
        foreground: "#0A0A0A",
        primary: {
          DEFAULT: "#5B5BFF",
          foreground: "#FFFFFF",
          hover: "#4747E8",
        },
        accent: {
          purple: "#7F5AF0",
          green: "#2CB67D",
          blue: "#5B5BFF",
        },
        surface: {
          dark: "#0A0A0F",
          "dark-2": "#111118",
          "dark-3": "#1A1A2E",
        },
        muted: {
          DEFAULT: "#F5F5F7",
          foreground: "#6B6B6B",
          dark: "#1C1C28",
        },
        border: {
          DEFAULT: "#E5E5E7",
          dark: "#2A2A35",
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": [
          "clamp(3.5rem, 9vw, 9rem)",
          { lineHeight: "1.0", letterSpacing: "-0.04em", fontWeight: "700" },
        ],
        "display-xl": [
          "clamp(2.75rem, 7vw, 7rem)",
          { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        "display-lg": [
          "clamp(2.25rem, 5.5vw, 5.5rem)",
          { lineHeight: "1.08", letterSpacing: "-0.025em", fontWeight: "700" },
        ],
        "display-md": [
          "clamp(1.875rem, 4.5vw, 4rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "display-sm": [
          "clamp(1.5rem, 3vw, 2.75rem)",
          { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #7F5AF0 0%, #2CB67D 100%)",
        "gradient-brand-hover": "linear-gradient(135deg, #6B45DC 0%, #23A669 100%)",
        "gradient-hero": "radial-gradient(ellipse at top, #1A0D2E 0%, #0A0A0F 60%)",
        "gradient-dark": "linear-gradient(160deg, #0A0A0F 0%, #1A0D2E 50%, #0D1A0A 100%)",
        "gradient-radial-purple": "radial-gradient(ellipse at center, rgba(127,90,240,0.15) 0%, transparent 70%)",
        "gradient-radial-green": "radial-gradient(ellipse at center, rgba(44,182,125,0.12) 0%, transparent 70%)",
        "gradient-cta": "linear-gradient(135deg, #0A0A0F 0%, #1A0D2E 100%)",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        marquee: "marquee 28s linear infinite",
        "marquee-reverse": "marquee-reverse 28s linear infinite",
        "spin-slow": "spin 12s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "border-beam": "border-beam 4s linear infinite",
        shimmer: "shimmer 2s linear infinite",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-up": "slide-up 0.6s cubic-bezier(0.22,1,0.36,1) forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-18px) rotate(1deg)" },
          "66%": { transform: "translateY(-8px) rotate(-1deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.08)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "border-beam": {
          "0%": { "offset-distance": "0%" },
          "100%": { "offset-distance": "100%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        "glow-xs": "0 0 12px rgba(91, 91, 255, 0.12)",
        "glow-sm": "0 0 24px rgba(91, 91, 255, 0.18)",
        "glow-md": "0 0 48px rgba(91, 91, 255, 0.25)",
        "glow-lg": "0 0 80px rgba(91, 91, 255, 0.35)",
        "glow-purple": "0 0 40px rgba(127, 90, 240, 0.3)",
        "glow-green": "0 0 40px rgba(44, 182, 125, 0.25)",
        card: "0 2px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
        "card-hover": "0 12px 48px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)",
        "card-dark": "0 4px 24px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.2)",
        glass: "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5)",
        "glass-dark": "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
        "nav-light": "0 1px 0 rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
      },
      transitionTimingFunction: {
        "bounce-out": "cubic-bezier(0.22, 1, 0.36, 1)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "88": "22rem",
        "100": "25rem",
        "112": "28rem",
        "128": "32rem",
      },
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
