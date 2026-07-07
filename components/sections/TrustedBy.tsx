import { TRUSTED_BY } from "@/lib/constants";

export function TrustedBy() {
  const doubled = [...TRUSTED_BY, ...TRUSTED_BY];

  return (
    <section className="bg-muted border-y border-border py-8 overflow-hidden" aria-label="Trusted by">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <p className="text-muted-foreground text-xs font-semibold uppercase tracking-widest">
          Trusted by ambitious brands worldwide
        </p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-muted to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-muted to-transparent z-10 pointer-events-none" />

        <div className="flex gap-0 overflow-hidden">
          <ul
            className="flex items-center gap-0 shrink-0 animate-marquee"
            aria-hidden="true"
          >
            {doubled.map((name, i) => (
              <li
                key={i}
                className="flex items-center gap-8 px-10 border-r border-border last:border-r-0"
              >
                <span className="font-heading font-semibold text-sm text-foreground/30 whitespace-nowrap tracking-tight hover:text-foreground/60 transition-colors duration-300 cursor-default">
                  {name}
                </span>
              </li>
            ))}
          </ul>
          {/* Duplicate for seamless loop */}
          <ul
            className="flex items-center gap-0 shrink-0 animate-marquee"
            aria-hidden="true"
          >
            {doubled.map((name, i) => (
              <li
                key={i}
                className="flex items-center gap-8 px-10 border-r border-border last:border-r-0"
              >
                <span className="font-heading font-semibold text-sm text-foreground/30 whitespace-nowrap tracking-tight hover:text-foreground/60 transition-colors duration-300 cursor-default">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
