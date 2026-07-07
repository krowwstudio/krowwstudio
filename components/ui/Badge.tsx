import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "accent" | "outline" | "dark" | "gradient";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-primary/10 text-primary border border-primary/15",
  accent: "bg-accent-green/10 text-accent-green border border-accent-green/15",
  outline: "bg-transparent text-foreground border border-border",
  dark: "bg-white/10 text-white border border-white/10",
  gradient: "bg-gradient-brand text-white border-0",
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full",
        "text-xs font-medium whitespace-nowrap",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
