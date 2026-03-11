import type { ReactNode } from "react";
import Link from "next/link";
import {
  Heart,
  Music4,
  Radio,
  ShieldCheck,
} from "lucide-react";

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
    accent:
      "from-sky-400/16 via-sky-300/8 to-transparent text-sky-100 ring-sky-300/18",
  },
  {
    title: "Curated Archive",
    description: "Streaming arsip tetap rapi dan fokus ke konser.",
    icon: Radio,
    accent:
      "from-rose-400/16 via-pink-300/8 to-transparent text-rose-100 ring-rose-300/18",
  },
  {
    title: "Soft Idol Touch",
    description: "Pastel glow halus tanpa terasa seperti fan page.",
    icon: Heart,
    accent:
      "from-amber-300/16 via-orange-200/8 to-transparent text-amber-50 ring-amber-200/18",
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
    <main className="relative isolate overflow-hidden bg-[#02050d] px-4 py-8 text-zinc-100 sm:px-6 sm:py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(251,191,211,0.18),transparent_28%),radial-gradient(circle_at_82%_14%,rgba(125,211,252,0.14),transparent_24%),radial-gradient(circle_at_bottom,rgba(251,146,60,0.08),transparent_32%),linear-gradient(180deg,#02050d_0%,#06101d_52%,#02050d_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <div className="mx-auto grid min-h-[calc(100vh-9rem)] w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.08fr)_480px]">
        <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(253,164,175,0.12),transparent_34%),radial-gradient(circle_at_100%_0%,rgba(125,211,252,0.10),transparent_28%)]" />
          <div className="relative flex h-full flex-col justify-between gap-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-200">
                <Music4 className="size-3.5 text-rose-200" />
                {badge}
              </div>

              <div className="max-w-2xl space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  {title}
                </h1>
                <p className="max-w-xl text-sm leading-7 text-zinc-300 sm:text-base">
                  {description}
                </p>
              </div>

              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/25 px-4 py-3 text-sm text-zinc-200">
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-white/10 text-pink-100">
                  <Heart className="size-4" />
                </span>
                A clean, low-glow entrance tuned for a private archive experience.
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {featureCards.map((card, index) => {
                const Icon = card.icon;

                return (
                  <article
                    key={card.title}
                    className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 ring-1 ${card.accent} animate-in fade-in slide-in-from-bottom-6 duration-700`}
                    style={{
                      animationDelay: `${index * 80}ms`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/6 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                    <div className="relative space-y-3">
                      <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
                        <Icon className="size-5" />
                      </span>
                      <div>
                        <h2 className="text-sm font-semibold text-white">
                          {card.title}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-zinc-400">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(7,12,23,0.88),rgba(5,8,17,0.96))] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">
          {children}

          <p className="mt-6 text-sm text-zinc-400">
            {footerPrompt}{" "}
            <Link
              href={footerHref}
              className="font-medium text-rose-200 transition hover:text-white"
            >
              {footerLabel}
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
