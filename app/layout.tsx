import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://krowwstudio.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "KROWW Studio — Premium Digital Agency",
    template: "%s | KROWW Studio",
  },
  description:
    "KROWW Studio is a premium digital agency specializing in custom website design, development, brand identity, and UI/UX design. We build websites that grow businesses.",
  keywords: [
    "web design agency",
    "website development",
    "digital agency",
    "brand identity",
    "UI UX design",
    "Next.js agency",
    "landing page design",
    "SEO optimization",
    "startup website",
    "SaaS website design",
  ],
  authors: [{ name: "KROWW Studio", url: siteUrl }],
  creator: "KROWW Studio",
  publisher: "KROWW Studio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "KROWW Studio",
    title: "KROWW Studio — Premium Digital Agency",
    description:
      "We build websites that grow businesses. Custom design, development, and branding for startups, founders, and businesses.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KROWW Studio — Premium Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KROWW Studio — Premium Digital Agency",
    description:
      "Premium websites, unforgettable branding, and digital experiences that grow businesses.",
    images: ["/og-image.jpg"],
    creator: "@krowwstudio",
    site: "@krowwstudio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0A0A0F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body antialiased overflow-x-hidden">
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
