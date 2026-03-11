import type { ReactNode } from "react";
import Link from "next/link";
import { Heart, Music4, Radio, ShieldCheck } from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";

type AuthShellProps = {
  badge: string;
  title: string;
  description: string;
  footerPrompt: string;
  footerHref: string;
  footerLabel: string;
  children: ReactNode;
};

const featureCards = [
  {
    title: "Verified Access",
    description: "Login dibuka setelah email tervalidasi.",
    icon: ShieldCheck,
    glow: "cyan" as const,
  },
  {
    title: "Curated Archive",
    description: "Streaming arsip tetap rapi dan fokus ke konser.",
    icon: Radio,
    glow: "rose" as const,
  },
  {
    title: "Soft Idol Touch",
    description: "Pastel glow halus tanpa terasa seperti fan page.",
    icon: Heart,
    glow: "amber" as const,
  },
];

export function AuthShell({
  badge,
  title,
  description,
  footerPrompt,
  footerHref,
  footerLabel,
  children,
}: AuthShellProps) {
  return (
    <main className="relative isolate overflow-hidden px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto grid min-h-[calc(100vh-9rem)] w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.08fr)_480px]">
        <GlassPanel glow="violet" className="p-6 sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,114,182,0.12),transparent_32%),radial-gradient(circle_at_100%_0%,rgba(96,165,250,0.16),transparent_28%)]" />
          <div className="relative flex h-full flex-col justify-between gap-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                <Music4 className="size-3.5 text-primary" />
                {badge}
              </div>

              <div className="max-w-2xl space-y-4">
                <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  {title}
                </h1>
                <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                  {description}
                </p>
              </div>

              <div className="inline-flex items-center gap-3 rounded-full border border-border/70 bg-background/70 px-4 py-3 text-sm text-foreground">
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-primary/12 text-primary">
                  <Heart className="size-4" />
                </span>
                A clean, low-glow entrance tuned for a private archive experience.
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {featureCards.map((card, index) => {
                const Icon = card.icon;

                return (
                  <GlassPanel
                    key={card.title}
                    glow={card.glow}
                    tone="muted"
                    className="group p-5 animate-in fade-in slide-in-from-bottom-6 duration-700"
                    style={{
                      animationDelay: `${index * 80}ms`,
                    }}
                  >
                    <div className="relative space-y-3">
                      <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-border/70 bg-background/70 text-primary">
                        <Icon className="size-5" />
                      </span>
                      <div>
                        <h2 className="text-sm font-semibold text-foreground">
                          {card.title}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </GlassPanel>
                );
              })}
            </div>
          </div>
        </GlassPanel>

        <GlassPanel
          tone="elevated"
          glow="cyan"
          className="animate-in fade-in slide-in-from-bottom-4 p-6 duration-700 sm:p-8"
        >
          {children}

          <p className="mt-6 text-sm text-muted-foreground">
            {footerPrompt}{" "}
            <Link
              href={footerHref}
              className="font-medium text-primary transition hover:text-foreground"
            >
              {footerLabel}
            </Link>
          </p>
        </GlassPanel>
      </div>
    </main>
  );
}
