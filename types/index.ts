export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  color: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  result?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    dribbble?: string;
    instagram?: string;
    website?: string;
  };
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
  duration: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface Insight {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  slug: string;
}

export interface Industry {
  name: string;
  icon: string;
  description: string;
  count: string;
}

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
  prefix?: string;
}

export interface TechItem {
  name: string;
  category: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}
