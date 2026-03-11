import type { LucideIcon } from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";

type DashboardMetricCardProps = {
  label: string;
  value: number | string;
  detail: string;
  icon: LucideIcon;
  glow?: "cyan" | "violet" | "rose" | "emerald" | "amber";
};

export function DashboardMetricCard({
  label,
  value,
  detail,
  icon: Icon,
  glow = "cyan",
}: DashboardMetricCardProps) {
  return (
    <GlassPanel glow={glow} className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
            {label}
          </p>
          <p className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground">
            {value}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
        </div>
        <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-border/70 bg-background/70 text-primary">
          <Icon className="size-5" />
        </span>
      </div>
    </GlassPanel>
  );
}
