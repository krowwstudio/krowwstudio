# KROWW Studio

Premium creative digital agency website built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

**Live URL:** https://krowwstudio.com  
**Design reference:** Awwwards-level aesthetic — dark/light section rhythm, fluid typography, spring-physics animations.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 with custom design system |
| Animation | Framer Motion v11 |
| Smooth scroll | Lenis v1 |
| Forms | React Hook Form + Zod |
| Email | Resend |
| Icons | Lucide React |
| Fonts | Space Grotesk (headings) · Inter (body) via `next/font` |
| Analytics | Vercel Analytics + Speed Insights |
| Deployment | Vercel |

---

## Quick Start

### Prerequisites
- Node.js 20+
- npm 9+

### Installation

```bash
git clone https://github.com/your-org/kroww-studio.git
cd kroww-studio
npm install
```

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes | Resend API key for email sending |
| `CONTACT_EMAIL` | Yes | Email address to receive contact form submissions |
| `NEXT_PUBLIC_SITE_URL` | Yes | Full site URL (e.g. `https://krowwstudio.com`) |

### Development

```bash
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Production build
npm run start     # Serve production build
npm run lint      # ESLint check
```

---

## Project Structure

```
kroww/
├── app/                        # Next.js App Router
│   ├── api/
│   │   ├── contact/route.ts    # Contact form endpoint
│   │   └── newsletter/route.ts # Newsletter signup endpoint
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── faqs/page.tsx
│   ├── portfolio/page.tsx
│   ├── process/page.tsx
│   ├── services/page.tsx
│   ├── testimonials/page.tsx
│   ├── globals.css             # Design tokens, utilities, animations
│   ├── layout.tsx              # Root layout — fonts, metadata, providers
│   ├── not-found.tsx           # Custom 404 page
│   └── page.tsx                # Home page
│
├── components/
│   ├── forms/
│   │   └── ContactForm.tsx     # RHF + Zod form with loading/success states
│   ├── layout/
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx          # Scroll-aware glass nav + mobile menu
│   ├── sections/               # One file per page section
│   │   ├── Hero.tsx
│   │   ├── TrustedBy.tsx       # CSS marquee
│   │   ├── ServicesSection.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── PortfolioPreview.tsx
│   │   ├── ProcessSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── IndustriesSection.tsx
│   │   ├── TechStackSection.tsx
│   │   ├── TeamSection.tsx
│   │   ├── InsightsSection.tsx
│   │   ├── CTASection.tsx
│   │   ├── PageHero.tsx        # Reusable inner-page hero
│   │   ├── AboutContent.tsx
│   │   ├── ServicesContent.tsx
│   │   ├── PortfolioContent.tsx
│   │   ├── TestimonialsContent.tsx
│   │   ├── FAQContent.tsx
│   │   └── ContactContent.tsx
│   └── ui/
│       ├── AnimatedCounter.tsx # useInView + rAF easing
│       ├── AnimatedText.tsx    # Word/char split animations
│       ├── Badge.tsx
│       ├── Button.tsx          # Polymorphic, magnetic-ready
│       ├── CustomCursor.tsx    # Spring cursor (desktop only)
│       ├── MagneticButton.tsx  # useSpring mouse tracking
│       ├── SectionHeader.tsx   # Eyebrow + h2 + description
│       └── SmoothScroll.tsx    # Lenis wrapper
│
├── lib/
│   ├── animations.ts           # Framer Motion variant factories + viewport config
│   ├── constants.ts            # All static data (services, portfolio, team, etc.)
│   ├── utils.ts                # cn(), formatDate, slugify, lerp, mapRange
│   └── validations.ts          # Zod schemas shared by form + API
│
├── types/
│   └── index.ts                # TypeScript interfaces for all data shapes
│
├── public/                     # Static assets (favicon, OG image)
├── next.config.ts
├── tailwind.config.ts          # Full design system
├── next-sitemap.config.js      # SEO sitemap config
└── .env.local.example
```

---

## Architecture

### Rendering Strategy

- **Server Components by default** — all pages and static sections are RSC
- **Client Components** (`"use client"`) only for interactive elements: Navbar, CustomCursor, SmoothScroll, animation-heavy sections, forms
- **API Routes** — `/api/contact` and `/api/newsletter` are Edge-compatible dynamic routes

### Design System

The design system lives in `tailwind.config.ts`. Key tokens:

```
Colors:
  primary:       #5B5BFF   (electric blue-violet)
  accent-purple: #7F5AF0
  accent-green:  #2CB67D
  surface-dark:  #0A0A0F   (near-black)
  background:    #FAFAFA

Shadows: glow-xs/sm/md/lg, card, card-hover, glass, glass-dark
Radius:  4xl (2rem), 5xl (2.5rem), 6xl (3rem)
Easing:  bounce-out, spring (CSS cubic-bezier values)
```

Global CSS utilities in `app/globals.css`:
- `.gradient-text` — `background-clip: text` gradient
- `.glass` / `.glass-dark` / `.glass-nav` — glassmorphism variants
- `.noise` — SVG noise texture overlay
- `.section-padding` — responsive vertical padding via clamp

### Animation Conventions

All motion variants are in `lib/animations.ts` and follow this pattern:

```typescript
// Use with whileInView:
<motion.div
  variants={fadeUp(0.1)}         // delay in seconds
  initial="hidden"
  whileInView="visible"
  viewport={viewportConfig}       // once: true, margin: "-80px"
>

// Use with stagger:
<motion.div variants={staggerContainer(0.08)}>
  <motion.div variants={fadeUp()} />  // no delay needed — parent staggers
</motion.div>
```

Available variant factories: `fadeUp`, `fadeIn`, `scaleUp`, `slideLeft`, `slideRight`, `staggerContainer`

---

## Customization Guide

### Updating Site Content

All static data is in `lib/constants.ts`. Edit arrays for:
- `SERVICES` — service cards + features
- `PORTFOLIO_PROJECTS` — portfolio grid + images
- `TESTIMONIALS` — testimonial slider
- `TEAM` — team section
- `PROCESS_STEPS` — process timeline
- `FAQ_ITEMS` — FAQ accordion
- `INSIGHTS` — blog preview cards
- `TRUSTED_BY` — marquee logos
- `INDUSTRIES` — industries served
- `STATS` — animated counter values

### Changing Colors

Edit `tailwind.config.ts` under `theme.extend.colors`. The primary brand color cascades through the entire site via the `primary` token.

### Adding a New Page

1. Create `app/your-page/page.tsx` with a `Metadata` export
2. Add to `NAV_LINKS` in `lib/constants.ts`
3. Add to `next-sitemap.config.js` if it needs custom priority

### Replacing Placeholder Images

Portfolio images use Unsplash CDN. Replace `image` values in `PORTFOLIO_PROJECTS` with your own URLs and add the hostname to `next.config.ts → images.remotePatterns`.

---

## Deployment

### Vercel (recommended)

```bash
npm i -g vercel
vercel --prod
```

Set the three environment variables in the Vercel dashboard under Settings → Environment Variables.

### Manual

```bash
npm run build    # Outputs to .next/
npm run start    # Serves on port 3000
```

Point your reverse proxy (Nginx / Caddy) at port 3000 and ensure the three env vars are set in your environment.

---

## SEO

- Full OpenGraph + Twitter card metadata on every page (`app/layout.tsx`)
- Sitemap auto-generated post-build via `next-sitemap` → `public/sitemap*.xml`
- Robots.txt generated automatically at `public/robots.txt`
- Structured JSON-LD can be added per page inside a `<script type="application/ld+json">` tag in each page's metadata

---

## Performance

Production build scores (target):

| Metric | Target |
|--------|--------|
| Performance | 95+ |
| Accessibility | 98+ |
| Best Practices | 100 |
| SEO | 100 |

Key optimizations baked in:
- `next/image` with AVIF/WebP formats + lazy loading
- `next/font` with `display: swap` for zero layout shift
- Framer Motion animations trigger only when in viewport (`whileInView`)
- CSS `will-change` applied sparingly via Framer Motion's transform layer
- `removeConsole: true` in production compiler config
- `optimizePackageImports` for Framer Motion + Lucide React

---

## License

Private — all rights reserved. Contact hello@krowwstudio.com for licensing inquiries.
