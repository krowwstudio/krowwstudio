import type { Metadata } from "next";
import dynamic from "next/dynamic";

const FAQContent = dynamic(() =>
  import("@/components/sections/FAQContent").then(m => ({ default: m.FAQContent }))
);
const CTASection = dynamic(() =>
  import("@/components/sections/CTASection").then(m => ({ default: m.CTASection }))
);

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Answers to the most common questions about working with KROWW Studio — pricing, timelines, hosting, SEO, support, and more.",
};

export default function FAQsPage() {
  return (
    <>
      <FAQContent />
      <CTASection />
    </>
  );
}
