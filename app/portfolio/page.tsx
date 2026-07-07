import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PortfolioContent = dynamic(() =>
  import("@/components/sections/PortfolioContent").then(m => ({ default: m.PortfolioContent }))
);
const CTASection = dynamic(() =>
  import("@/components/sections/CTASection").then(m => ({ default: m.CTASection }))
);

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse KROWW Studio's portfolio — premium websites, brands, and digital experiences built for ambitious businesses worldwide.",
};

export default function PortfolioPage() {
  return (
    <>
      <PortfolioContent />
      <CTASection />
    </>
  );
}
