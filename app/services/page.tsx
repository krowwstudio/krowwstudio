import type { Metadata } from "next";
import dynamic from "next/dynamic";

const ServicesContent = dynamic(() =>
  import("@/components/sections/ServicesContent").then(m => ({ default: m.ServicesContent }))
);
const CTASection = dynamic(() =>
  import("@/components/sections/CTASection").then(m => ({ default: m.CTASection }))
);

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore all KROWW Studio services: website design & development, landing pages, brand identity, UI/UX design, SEO, and website maintenance.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesContent />
      <CTASection />
    </>
  );
}
