import type { Metadata } from "next";
import dynamic from "next/dynamic";

const AboutContent = dynamic(() =>
  import("@/components/sections/AboutContent").then(m => ({ default: m.AboutContent }))
);
const TeamSection = dynamic(() =>
  import("@/components/sections/TeamSection").then(m => ({ default: m.TeamSection }))
);
const CTASection = dynamic(() =>
  import("@/components/sections/CTASection").then(m => ({ default: m.CTASection }))
);

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about KROWW Studio — a premium digital agency helping startups, founders, and businesses build extraordinary online presences.",
};

export default function AboutPage() {
  return (
    <>
      <AboutContent />
      <TeamSection />
      <CTASection />
    </>
  );
}
