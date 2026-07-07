import type { Metadata } from "next";
import dynamic from "next/dynamic";

const TestimonialsContent = dynamic(() =>
  import("@/components/sections/TestimonialsContent").then(m => ({ default: m.TestimonialsContent }))
);
const CTASection = dynamic(() =>
  import("@/components/sections/CTASection").then(m => ({ default: m.CTASection }))
);

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Real results from real clients. Read what founders, CEOs, and business owners say about working with KROWW Studio.",
};

export default function TestimonialsPage() {
  return (
    <>
      <TestimonialsContent />
      <CTASection />
    </>
  );
}
