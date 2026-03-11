import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type GlassPanelProps = HTMLAttributes<HTMLDivElement> & {
  tone?: "default" | "elevated" | "muted";
  glow?: "none" | "cyan" | "violet" | "rose" | "emerald" | "amber";
};

const toneClasses: Record<NonNullable<GlassPanelProps["tone"]>, string> = {
  default: "border-border/70 bg-card/72",
  elevated: "border-border/80 bg-popover/86",
  muted: "border-border/60 bg-secondary/72",
};

const glowClasses: Record<NonNullable<GlassPanelProps["glow"]>, string> = {
  none: "shadow-[0_24px_72px_rgba(15,23,42,0.08)] dark:shadow-[0_24px_72px_rgba(0,0,0,0.34)]",
  cyan: "shadow-[0_24px_72px_rgba(34,211,238,0.14)] dark:shadow-[0_24px_72px_rgba(34,211,238,0.18)]",
  violet: "shadow-[0_24px_72px_rgba(168,85,247,0.14)] dark:shadow-[0_24px_72px_rgba(168,85,247,0.18)]",
  rose: "shadow-[0_24px_72px_rgba(244,114,182,0.14)] dark:shadow-[0_24px_72px_rgba(244,114,182,0.18)]",
  emerald: "shadow-[0_24px_72px_rgba(16,185,129,0.14)] dark:shadow-[0_24px_72px_rgba(16,185,129,0.18)]",
  amber: "shadow-[0_24px_72px_rgba(251,191,36,0.16)] dark:shadow-[0_24px_72px_rgba(251,191,36,0.2)]",
};

export function GlassPanel({
  className,
  tone = "default",
  glow = "none",
  children,
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[28px] border backdrop-blur-2xl",
        toneClasses[tone],
        glowClasses[glow],
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.24),transparent_34%)] opacity-80 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_34%)]" />
      <div className="relative">{children}</div>
    </div>
  );
}
