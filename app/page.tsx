import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { ServicesSection } from "@/components/sections/ServicesSection";

// Eagerly load the first 3 sections (above/near fold).
// Everything below is code-split — fetched lazily as the user scrolls.
// next/dynamic with default (ssr: true) still server-renders the HTML,
// but moves the client JS into separate chunks so it doesn't block the
// initial hydration of the above-fold content.

const WhyChooseUs = dynamic(() =>
  import("@/components/sections/WhyChooseUs").then(m => ({ default: m.WhyChooseUs }))
);
const PortfolioPreview = dynamic(() =>
  import("@/components/sections/PortfolioPreview").then(m => ({ default: m.PortfolioPreview }))
);
const ProcessSection = dynamic(() =>
  import("@/components/sections/ProcessSection").then(m => ({ default: m.ProcessSection }))
);
const TestimonialsSection = dynamic(() =>
  import("@/components/sections/TestimonialsSection").then(m => ({ default: m.TestimonialsSection }))
);
const StatsSection = dynamic(() =>
  import("@/components/sections/StatsSection").then(m => ({ default: m.StatsSection }))
);
const IndustriesSection = dynamic(() =>
  import("@/components/sections/IndustriesSection").then(m => ({ default: m.IndustriesSection }))
);
const TeamSection = dynamic(() =>
  import("@/components/sections/TeamSection").then(m => ({ default: m.TeamSection }))
);
const InsightsSection = dynamic(() =>
  import("@/components/sections/InsightsSection").then(m => ({ default: m.InsightsSection }))
);
const CTASection = dynamic(() =>
  import("@/components/sections/CTASection").then(m => ({ default: m.CTASection }))
);

export const metadata: Metadata = {
  title: "KROWW Studio — Premium Digital Agency",
  description:
    "We build premium websites, brands, and digital experiences that help businesses grow. 98% client satisfaction.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* <TrustedBy /> */}
      <ServicesSection />
      <WhyChooseUs />
      <PortfolioPreview />
      <ProcessSection />
      {/* <TestimonialsSection /> */}
      {/* <StatsSection /> */}
      <IndustriesSection />
      <TeamSection />
      {/* <InsightsSection /> */}
      <CTASection />
    </>
  );
}
