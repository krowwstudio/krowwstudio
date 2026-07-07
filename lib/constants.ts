import type {
  Service,
  PortfolioProject,
  Testimonial,
  TeamMember,
  ProcessStep,
  FAQItem,
  Insight,
  Industry,
  Stat,
  NavLink,
} from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
];

export const SERVICES: Service[] = [
  {
    id: "website-design",
    icon: "Palette",
    title: "Website Design",
    description:
      "Pixel-perfect designs that command attention. Every element crafted to convert visitors into loyal customers.",
    features: ["Custom UI Design", "Brand Consistency", "Mobile-First", "Conversion Focused"],
    color: "#5B5BFF",
  },
  {
    id: "website-development",
    icon: "Code2",
    title: "Website Development",
    description:
      "Lightning-fast, production-grade websites built with Next.js, React, and modern best practices.",
    features: ["Next.js / React", "TypeScript", "SEO Optimized", "99+ Performance Score"],
    color: "#7F5AF0",
  },
  {
    id: "landing-pages",
    icon: "Target",
    title: "Landing Pages",
    description:
      "High-converting landing pages engineered to turn traffic into revenue. Every pixel fights for conversion.",
    features: ["A/B Testing Ready", "CRO Optimized", "Fast Load Time", "Analytics Ready"],
    color: "#2CB67D",
  },
  {
    id: "logo-design",
    icon: "Sparkles",
    title: "Logo Design",
    description:
      "Iconic logos that tell your story at a glance. Memorable, versatile, and built to last a decade.",
    features: ["Multiple Concepts", "Vector Files", "Brand Guide", "Unlimited Revisions"],
    color: "#F59E0B",
  },
  {
    id: "ui-ux-design",
    icon: "MousePointerClick",
    title: "UI/UX Design",
    description:
      "User experiences so intuitive, your customers won't even notice how seamless every interaction feels.",
    features: ["User Research", "Wireframing", "Prototyping", "Usability Testing"],
    color: "#06B6D4",
  },
  {
    id: "saas-websites",
    icon: "Zap",
    title: "SaaS Websites",
    description:
      "Marketing websites for SaaS products that speak to developers, founders, and decision-makers alike.",
    features: ["Pricing Pages", "Feature Showcases", "Integrations", "Documentation Ready"],
    color: "#8B5CF6",
  },
  {
    id: "seo-optimization",
    icon: "TrendingUp",
    title: "SEO Optimization",
    description:
      "Get found by the right people. Technical SEO, content strategy, and performance optimization.",
    features: ["Technical SEO", "Core Web Vitals", "Schema Markup", "Keyword Strategy"],
    color: "#10B981",
  },
  {
    id: "website-maintenance",
    icon: "Shield",
    title: "Website Maintenance",
    description:
      "Keep your site secure, fast, and up-to-date. We handle the tech so you can focus on your business.",
    features: ["Security Updates", "Performance Checks", "Content Updates", "24/7 Monitoring"],
    color: "#F97316",
  },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "pokeleague",
    title: "PokeLeague",
    category: "Web App",
    description:
      "Real-time Pokémon battles with Gen filters, rule customization, team draft, and intense 1v1 action — built for speed and scale.",
    image: "/pokeleague.png",
    tags: ["React", "Go", "PostgreSQL", "WebSocket", "Gaming"],
    link: "https://pokeleague.kroww.com/",
    featured: true,
  },
  {
    id: "battledex",
    title: "BattleDex",
    category: "Web App",
    description:
      "A comprehensive Pokémon Go platform offering detailed rankings and perfect movesets by league — helping players optimize battle strategies.",
    image: "/battledex.png",
    tags: ["React", "Pokémon Go", "Rankings"],
    link: "https://battle-dex.vercel.app/",
    featured: true,
  },
  {
    id: "algomate",
    title: "AlgoMate",
    category: "Developer Tool",
    description:
      "A comprehensive coding platform with social features, platform integrations, and centralized Redux state — aggregating user stats from top coding platforms.",
    image: "/algomate.jpg",
    tags: ["React", "Redux", "Node.js", "MongoDB", "Developer Platform"],
    link: "https://algomate.kroww.com/",
    featured: true,
  },
  {
    id: "wanderlust",
    title: "WanderLust",
    category: "Full Stack",
    description:
      "A fullstack space-listing and rental platform with user authentication, listing management, image uploads, and a clean responsive interface.",
    image: "/wanderlust.png",
    tags: ["Node.js", "Express.js", "MongoDB", "EJS"],
    link: "https://wanderlust-4-vmpt.onrender.com/",
    featured: true,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    role: "Founder & CEO",
    company: "Nexus Capital",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Mitchell&background=5B5BFF&color=fff&size=120",
    content:
      "KROWW Studio completely transformed our online presence. Our new website has a 340% increase in qualified leads. The attention to detail is extraordinary — every pixel feels intentional.",
    rating: 5,
    result: "340% increase in leads",
  },
  {
    id: "2",
    name: "Marcus Chen",
    role: "Co-Founder",
    company: "Pulse Analytics",
    avatar: "https://ui-avatars.com/api/?name=Marcus+Chen&background=7F5AF0&color=fff&size=120",
    content:
      "Working with KROWW was effortless. They understood our SaaS product deeply and created a site that converts. Our trial signups went from 1.2% to 4.8% conversion rate.",
    rating: 5,
    result: "4.8% conversion rate",
  },
  {
    id: "3",
    name: "Priya Sharma",
    role: "Marketing Director",
    company: "MediCore Health",
    avatar: "https://ui-avatars.com/api/?name=Priya+Sharma&background=2CB67D&color=fff&size=120",
    content:
      "The KROWW team delivered a healthcare website that is not just beautiful but fully accessible and HIPAA-aware. Patient trust has never been higher.",
    rating: 5,
    result: "92% patient satisfaction",
  },
  {
    id: "4",
    name: "James Rodriguez",
    role: "Owner",
    company: "Luxe Realty Group",
    avatar: "https://ui-avatars.com/api/?name=James+Rodriguez&background=F59E0B&color=fff&size=120",
    content:
      "Our property listings look stunning on the new website. The search UX is flawless and mobile performance is perfect. Sold two properties in the first week after launch.",
    rating: 5,
    result: "2 sales in first week",
  },
  {
    id: "5",
    name: "Aisha Okonkwo",
    role: "Creative Director",
    company: "Nova Creative",
    avatar: "https://ui-avatars.com/api/?name=Aisha+Okonkwo&background=EC4899&color=fff&size=120",
    content:
      "As a creative agency ourselves, our standards are impossibly high. KROWW exceeded them. The animations, the typography, the detail — it belongs on Awwwards.",
    rating: 5,
    result: "Featured on Awwwards",
  },
  {
    id: "6",
    name: "David Park",
    role: "Founder",
    company: "Verde Restaurant Group",
    avatar: "https://ui-avatars.com/api/?name=David+Park&background=10B981&color=fff&size=120",
    content:
      "The reservation system integration is seamless. Online bookings are up 280% and our Google rating improved because customers can now easily leave reviews through the site.",
    rating: 5,
    result: "280% more reservations",
  },
];

export const TEAM: TeamMember[] = [
  {
    id: "1",
    name: "Dushyant",
    role: "Co-Founder & Software Developer",
    bio: "More than a developer—I'm a problem solver with 2+ years of experience turning bold ideas into impactful digital products.",
    avatar: "/team-founder.jpg",
    social: {
      website: "https://dushyant.kroww.com/",
      instagram: "https://www.instagram.com/honey_25609?igsh=MXQxaXE0Mjd5NDVnYw%3D%3D&utm_source=qr",
      linkedin: "https://www.linkedin.com/in/dushyant-developer/",
    },
  },
  {
    id: "2",
    name: "Kunj Tyagi",
    role: "Co-Founder & Software Engineer",
    bio: "Full-stack React architect with a passion for performance. Builds the kind of interfaces users rave about.",
    avatar: "/team-member-2.jpg",
    social: {
      website: "https://kunjtyagi.netlify.app/",
      linkedin: "https://www.linkedin.com/in/kunj-tyagi-07688423b/",
      instagram: "https://www.instagram.com/kunjtyagi21?igsh=bzFlMTJ4bGNpejRy",
    },
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: "Discovery",
    description:
      "We dive deep into your business, goals, audience, and competitors. The better we understand you, the better we build for you.",
    icon: "Search",
    duration: "1–2 days",
  },
  {
    step: 2,
    title: "Research",
    description:
      "Market analysis, competitor audits, and trend research ensure your site stands out and stays ahead.",
    icon: "BarChart",
    duration: "2–3 days",
  },
  {
    step: 3,
    title: "Wireframing",
    description:
      "Low-fidelity blueprints map the structure and user flow before a single color is applied.",
    icon: "Layout",
    duration: "2–3 days",
  },
  {
    step: 4,
    title: "Design",
    description:
      "High-fidelity Figma designs bring your vision to life. Every section is crafted to impress and convert.",
    icon: "Figma",
    duration: "5–7 days",
  },
  {
    step: 5,
    title: "Development",
    description:
      "Production-quality Next.js development. Fast, accessible, SEO-optimized, and built to scale.",
    icon: "Code2",
    duration: "7–14 days",
  },
  {
    step: 6,
    title: "Testing",
    description:
      "Cross-browser, cross-device testing. Performance audits, accessibility checks, and content reviews.",
    icon: "CheckCircle",
    duration: "2–3 days",
  },
  {
    step: 7,
    title: "Launch",
    description:
      "Seamless deployment with zero downtime. DNS, hosting, SSL, and final go-live checks handled completely.",
    icon: "Rocket",
    duration: "1 day",
  },
  {
    step: 8,
    title: "Support",
    description:
      "30 days of post-launch support included. We monitor, iterate, and ensure everything performs perfectly.",
    icon: "Headphones",
    duration: "30 days",
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How long does it take to build a website?",
    answer:
      "A typical project takes 3–6 weeks depending on scope. A landing page can be live in 1–2 weeks; a full multi-page website with custom animations typically takes 4–6 weeks. We'll give you a precise timeline during our discovery call.",
    category: "Timeline",
  },
  {
    question: "How much does a website cost?",
    answer:
      "Projects start at $1,500 for landing pages and scale from there based on complexity, number of pages, animations, and integrations. We offer transparent, fixed-price quotes — no surprises. Book a free call to get an accurate quote for your project.",
    category: "Pricing",
  },
  {
    question: "Do you offer ongoing support and maintenance?",
    answer:
      "Yes. Every project includes 30 days of free post-launch support. We also offer monthly maintenance plans that cover security updates, performance monitoring, content updates, and priority support.",
    category: "Support",
  },
  {
    question: "Will my website be SEO optimized?",
    answer:
      "Absolutely. Every site we build includes technical SEO foundations: semantic HTML, proper meta tags, Open Graph, structured data (JSON-LD), fast load times, Core Web Vitals optimization, and a sitemap. We also offer ongoing SEO strategy as an add-on.",
    category: "SEO",
  },
  {
    question: "What about hosting and domain?",
    answer:
      "We recommend and can set up Vercel hosting (the best platform for Next.js). Domain registration can be done through any registrar — we'll handle all DNS configuration. We also provide guidance on the best hosting setup for your traffic needs.",
    category: "Hosting",
  },
  {
    question: "Can you redesign my existing website?",
    answer:
      "Absolutely. Website redesigns are a significant part of our work. We'll audit your current site, identify what's working and what isn't, and rebuild it with modern design, better performance, and improved conversion rates.",
    category: "Redesign",
  },
  {
    question: "Do you provide the design files?",
    answer:
      "Yes. All Figma design files are yours — delivered at project completion along with all source code in a private GitHub repository.",
    category: "Delivery",
  },
  {
    question: "What if I need changes after launch?",
    answer:
      "Within the 30-day support window, minor changes are free. After that, we offer hourly rates or monthly retainers. Most clients find a monthly maintenance plan covers everything they need.",
    category: "Support",
  },
];

export const INSIGHTS: Insight[] = [
  {
    id: "1",
    title: "Why Your Website Is Losing You Clients (And How to Fix It)",
    excerpt:
      "Most business websites fail at the one job they were built to do. Here's the 7-point audit we run on every project — and what we find.",
    category: "Design",
    readTime: "5 min read",
    date: "2025-01-15",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    slug: "why-website-losing-clients",
  },
  {
    id: "2",
    title: "The Typography Rules Behind Every Premium Website",
    excerpt:
      "The difference between a $500 website and a $50,000 website often comes down to typography. We break down exactly how we think about type.",
    category: "Typography",
    readTime: "4 min read",
    date: "2025-01-08",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    slug: "typography-rules-premium-website",
  },
  {
    id: "3",
    title: "Framer Motion vs GSAP: Which Should You Use in 2025?",
    excerpt:
      "We've shipped dozens of animated websites with both tools. Here's our honest comparison — when to use each, and what we prefer.",
    category: "Development",
    readTime: "6 min read",
    date: "2024-12-20",
    image: "https://images.unsplash.com/photo-1555066931-4365d14431b9?w=800&q=80",
    slug: "framer-motion-vs-gsap-2025",
  },
];

export const INDUSTRIES: Industry[] = [
  { name: "Startups & SaaS", icon: "Rocket", description: "Launch with a site that scales with you", count: "35+" },
  { name: "Real Estate", icon: "Building2", description: "Luxury listings that close deals faster", count: "20+" },
  { name: "Healthcare", icon: "Heart", description: "Patient-first design meets clinical trust", count: "15+" },
  { name: "Restaurants", icon: "UtensilsCrossed", description: "Immersive dining experiences online", count: "25+" },
  { name: "E-commerce", icon: "ShoppingBag", description: "Stores optimized to maximize revenue", count: "18+" },
  { name: "Agencies & Studios", icon: "Briefcase", description: "Portfolios that win more clients", count: "22+" },
  { name: "Coaches & Creators", icon: "Users", description: "Personal brands that command authority", count: "30+" },
  { name: "Tech Companies", icon: "Cpu", description: "Engineering-grade websites for dev-savvy audiences", count: "28+" },
];

export const STATS: Stat[] = [
  { value: "150", label: "Projects Delivered", suffix: "+" },
  { value: "98", label: "Client Satisfaction", suffix: "%" },
  { value: "5", label: "Years of Experience", suffix: "+" },
  { value: "12", label: "Industry Awards", suffix: "" },
];

export const TECH_STACK = [
  { name: "Next.js", category: "Framework" },
  { name: "React", category: "Library" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Framer Motion", category: "Animation" },
  { name: "Figma", category: "Design" },
  { name: "Vercel", category: "Deployment" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Prisma", category: "ORM" },
  { name: "Stripe", category: "Payments" },
  { name: "Resend", category: "Email" },
  { name: "Supabase", category: "Backend" },
];

export const TRUSTED_BY = [
  "Nexus Capital",
  "Pulse Analytics",
  "MediCore Health",
  "Luxe Realty",
  "Nova Creative",
  "Verde Group",
  "Apex Fitness",
  "Erudite Academy",
  "TechForge Labs",
  "Summit Ventures",
];

export const SOCIAL_LINKS = {
  twitter: "https://twitter.com/krowwstudio",
  instagram: "https://instagram.com/krowwstudio",
  linkedin: "https://linkedin.com/company/krowwstudio",
  dribbble: "https://dribbble.com/krowwstudio",
  behance: "https://behance.net/krowwstudio",
};
