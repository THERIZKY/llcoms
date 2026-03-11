import type { ReactNode } from "react";
import { GlassPanel } from "@/components/ui/glass-panel";

type AdminViewShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function AdminViewShell({
  eyebrow,
  title,
  description,
  actions,
  children,
}: AdminViewShellProps) {
  return (
    <div className="space-y-6">
      <GlassPanel tone="elevated" glow="cyan" className="p-6 sm:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-primary">
              {eyebrow}
            </p>
            <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              {description}
            </p>
          </div>
          {actions ? (
            <div className="flex flex-wrap gap-3 xl:justify-end">{actions}</div>
          ) : null}
        </div>
      </GlassPanel>

      {children}
    </div>
  );
}
