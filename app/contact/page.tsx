import type { Metadata } from "next";
import dynamic from "next/dynamic";

const ContactContent = dynamic(() =>
  import("@/components/sections/ContactContent").then(m => ({ default: m.ContactContent }))
);

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Start your project with KROWW Studio. Book a free discovery call or send us a message — we respond within 24 hours.",
};

export default function ContactPage() {
  return <ContactContent />;
}
