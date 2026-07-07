import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found | KROWW Studio",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-surface-dark flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <p className="font-heading font-bold text-[8rem] leading-none text-white/5 select-none mb-4">
          404
        </p>
        <h1 className="font-heading font-bold text-2xl text-white mb-4">
          Page not found
        </h1>
        <p className="text-white/50 text-sm leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white/70 text-sm font-medium hover:text-white hover:border-white/30 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
