import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { PageHero } from "@/components/sections/PageHero";

const ProcessSection = dynamic(() =>
  import("@/components/sections/ProcessSection").then(m => ({ default: m.ProcessSection }))
);
const CTASection = dynamic(() =>
  import("@/components/sections/CTASection").then(m => ({ default: m.CTASection }))
);

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "Discover the 8-step KROWW Studio process — from discovery and research through design, development, launch, and ongoing support.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="How We Work"
        title="Our proven 8-step process"
        description="Every project follows the same rigorous process — designed to ensure on-time delivery, zero surprises, and results that exceed expectations."
      />
      <ProcessSection />
      <CTASection />
    </>
  );
}
