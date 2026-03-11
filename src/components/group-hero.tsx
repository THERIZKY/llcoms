import Image from "next/image";
import type { Group } from "@/lib/archive-types";

type GroupHeroProps = {
  group: Group;
  concertCount: number;
};

export function GroupHero({ group, concertCount }: GroupHeroProps) {
  const accentColor = group.accentColor ?? "#22d3ee";

  return (
    <section className="relative overflow-hidden rounded-[34px] border border-border/70 bg-card/78 shadow-[0_24px_80px_rgba(15,23,42,0.14)] backdrop-blur-2xl dark:shadow-[0_24px_80px_rgba(0,0,0,0.36)]">
      <div
        className="absolute inset-0 opacity-95"
        style={{
          background: `linear-gradient(120deg, ${accentColor}1f 0%, rgba(15,23,42,0.16) 32%, rgba(15,23,42,0.02) 100%)`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.16),transparent_28%)]" />

      <div className="relative grid gap-6 p-5 sm:p-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:p-8">
        <div className="relative min-h-[240px] overflow-hidden rounded-[28px] border border-white/12 bg-secondary shadow-[0_18px_50px_rgba(15,23,42,0.2)]">
          <Image
            src={group.thumbnail}
            alt={group.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 300px"
            priority
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(2,6,23,0.5)_100%)]" />
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-foreground">
              Group Archive
            </span>
            <span className="rounded-full border border-border/70 bg-background/65 px-3 py-1 text-foreground">
              {concertCount} konser
            </span>
          </div>

          <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {group.name}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            {group.description}
          </p>

          <div className="mt-6 inline-flex w-fit items-center gap-3 rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm text-foreground">
            <span
              className="size-2.5 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            Modern concert archive page
          </div>
        </div>
      </div>
    </section>
  );
}
