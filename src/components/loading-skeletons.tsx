import { GlassPanel } from "@/components/ui/glass-panel";
import { Skeleton } from "@/components/ui/skeleton";

function StatPillSkeleton() {
  return <Skeleton className="h-9 w-24 rounded-full" />;
}

function SectionTitleSkeleton({ withAction = false }: { withAction?: boolean }) {
  return (
    <div className="flex items-end justify-between gap-3">
      <div className="space-y-2">
        <Skeleton className="h-3 w-24 rounded-full" />
        <Skeleton className="h-7 w-56 rounded-full" />
      </div>
      {withAction ? <Skeleton className="h-5 w-28 rounded-full" /> : null}
    </div>
  );
}

function ArchiveCardSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <div className="overflow-hidden rounded-[26px] border border-border/70 bg-card/75 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <Skeleton className={compact ? "h-24 w-full rounded-none" : "h-32 w-full rounded-none"} />
      <div className={compact ? "space-y-2 p-3" : "space-y-2 p-4"}>
        <Skeleton className="h-3 w-20 rounded-full" />
        <Skeleton className="h-4 w-full rounded-full" />
        <Skeleton className="h-4 w-2/3 rounded-full" />
      </div>
    </div>
  );
}

function ArchiveGridSkeleton({
  count,
  compact = false,
  className,
}: {
  count: number;
  compact?: boolean;
  className: string;
}) {
  return (
    <div className={className}>
      {Array.from({ length: count }, (_, index) => (
        <ArchiveCardSkeleton key={index} compact={compact} />
      ))}
    </div>
  );
}

function ShellHeadingSkeleton() {
  return (
    <section className="space-y-2">
      <Skeleton className="h-3 w-28 rounded-full" />
      <Skeleton className="h-9 w-56 rounded-full" />
      <Skeleton className="h-4 w-full max-w-2xl rounded-full" />
      <Skeleton className="h-4 w-4/5 max-w-xl rounded-full" />
    </section>
  );
}

export function SiteHeaderSkeleton() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-[var(--header-bg)] backdrop-blur-2xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-11 w-11 rounded-[20px]" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-24 rounded-full" />
            <Skeleton className="h-4 w-44 rounded-full" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-border/70 bg-card/80 p-1 backdrop-blur-xl">
            <Skeleton className="h-9 w-20 rounded-full" />
            <Skeleton className="h-9 w-24 rounded-full" />
            <Skeleton className="h-9 w-24 rounded-full" />
          </div>
          <Skeleton className="h-10 w-28 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </header>
  );
}

export function HomePageSkeleton() {
  return (
    <main className="px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <GlassPanel glow="cyan" className="p-6 sm:p-8">
          <div className="space-y-4">
            <Skeleton className="h-3 w-32 rounded-full" />
            <Skeleton className="h-10 w-64 rounded-full" />
            <Skeleton className="h-4 w-full max-w-2xl rounded-full" />
            <Skeleton className="h-4 w-4/5 max-w-xl rounded-full" />
            <div className="flex flex-wrap gap-2">
              <StatPillSkeleton />
              <StatPillSkeleton />
              <StatPillSkeleton />
            </div>
          </div>
        </GlassPanel>

        <section className="space-y-4">
          <SectionTitleSkeleton />
          <ArchiveGridSkeleton count={8} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" />
        </section>

        <section className="space-y-4">
          <SectionTitleSkeleton />
          <ArchiveGridSkeleton count={6} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" />
        </section>

        <section className="space-y-8">
          {Array.from({ length: 2 }, (_, index) => (
            <section key={index} className="space-y-3">
              <SectionTitleSkeleton withAction />
              <ArchiveGridSkeleton
                count={5}
                compact
                className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              />
            </section>
          ))}
        </section>
      </div>
    </main>
  );
}

export function RecentPageSkeleton() {
  return (
    <main className="px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <ShellHeadingSkeleton />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="space-y-2">
              <ArchiveCardSkeleton />
              <Skeleton className="h-3 w-36 rounded-full" />
            </div>
          ))}
        </div>
        <GlassPanel tone="muted" className="inline-flex p-1">
          <Skeleton className="h-10 w-40 rounded-full" />
        </GlassPanel>
      </div>
    </main>
  );
}

export function LatestPageSkeleton() {
  return (
    <main className="px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <ShellHeadingSkeleton />
        <div className="grid gap-3">
          {Array.from({ length: 8 }, (_, index) => (
            <GlassPanel
              key={index}
              className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-2">
                <Skeleton className="h-3 w-24 rounded-full" />
                <Skeleton className="h-5 w-56 rounded-full" />
                <Skeleton className="h-3 w-40 rounded-full" />
              </div>
              <Skeleton className="h-10 w-24 rounded-full" />
            </GlassPanel>
          ))}
        </div>
      </div>
    </main>
  );
}

export function GroupPageSkeleton() {
  return (
    <main className="px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <section className="relative overflow-hidden rounded-[34px] border border-border/70 bg-card/78 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.14)] backdrop-blur-2xl sm:p-6 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
            <Skeleton className="min-h-[240px] rounded-[28px]" />
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex gap-2">
                <StatPillSkeleton />
                <StatPillSkeleton />
              </div>
              <Skeleton className="h-10 w-56 rounded-full" />
              <Skeleton className="h-4 w-full max-w-2xl rounded-full" />
              <Skeleton className="h-4 w-4/5 max-w-xl rounded-full" />
              <Skeleton className="h-10 w-48 rounded-full" />
            </div>
          </div>
        </section>

        <GlassPanel className="p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-3">
              <Skeleton className="h-3 w-28 rounded-full" />
              <Skeleton className="h-9 w-56 rounded-full" />
              <Skeleton className="h-4 w-full max-w-2xl rounded-full" />
            </div>
            <Skeleton className="h-10 w-36 rounded-full" />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <ArchiveCardSkeleton key={index} />
            ))}
          </div>
        </GlassPanel>
      </div>
    </main>
  );
}

export function ConcertPageSkeleton() {
  return (
    <main className="relative isolate overflow-hidden px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-7xl space-y-6">
        <section className="overflow-hidden rounded-[32px] border border-border/70 bg-card/75 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl">
          <div className="grid lg:grid-cols-[minmax(0,1.45fr)_360px]">
            <div className="space-y-5 px-6 py-8 sm:px-8 sm:py-10">
              <div className="flex gap-2">
                <StatPillSkeleton />
                <StatPillSkeleton />
              </div>
              <Skeleton className="h-10 w-2/3 rounded-full" />
              <Skeleton className="h-4 w-full max-w-2xl rounded-full" />
              <Skeleton className="h-4 w-5/6 max-w-xl rounded-full" />
              <div className="flex gap-3">
                <StatPillSkeleton />
                <StatPillSkeleton />
              </div>
            </div>
            <div className="border-t border-border/70 p-6 lg:border-t-0 lg:border-l">
              <Skeleton className="min-h-[240px] rounded-[28px]" />
            </div>
          </div>
        </section>

        <GlassPanel className="p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-3">
              <Skeleton className="h-3 w-28 rounded-full" />
              <Skeleton className="h-9 w-52 rounded-full" />
              <Skeleton className="h-4 w-full max-w-2xl rounded-full" />
            </div>
            <Skeleton className="h-10 w-32 rounded-full" />
          </div>

          <div className="mt-6 space-y-6">
            {Array.from({ length: 2 }, (_, sectionIndex) => (
              <section key={sectionIndex} className="space-y-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-2xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20 rounded-full" />
                    <Skeleton className="h-3 w-16 rounded-full" />
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 3 }, (_, cardIndex) => (
                    <div
                      key={cardIndex}
                      className="rounded-[24px] border border-border/70 bg-background/65 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-2">
                          <Skeleton className="h-3 w-20 rounded-full" />
                          <Skeleton className="h-5 w-40 rounded-full" />
                        </div>
                        <Skeleton className="h-11 w-11 rounded-2xl" />
                      </div>
                      <Skeleton className="mt-4 h-4 w-full rounded-full" />
                      <Skeleton className="mt-2 h-4 w-4/5 rounded-full" />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </GlassPanel>
      </div>
    </main>
  );
}

export function ConcertPlayerSkeleton() {
  return (
    <main className="relative isolate overflow-hidden px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-[1500px]">
        <section className="grid gap-6 xl:grid-cols-[minmax(0,2.25fr)_340px] 2xl:grid-cols-[minmax(0,2.45fr)_360px]">
          <div className="space-y-5">
            <div className="overflow-hidden rounded-[30px] border border-border/70 bg-black shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
              <div className="relative aspect-video">
                <Skeleton className="h-full w-full rounded-none bg-slate-900/80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="space-y-3 text-center">
                    <Skeleton className="mx-auto h-14 w-14 rounded-full" />
                    <Skeleton className="h-4 w-36 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <GlassPanel className="p-5">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <StatPillSkeleton />
                  <StatPillSkeleton />
                  <StatPillSkeleton />
                </div>
                <Skeleton className="h-8 w-2/3 rounded-full" />
                <Skeleton className="h-5 w-40 rounded-full" />
                <Skeleton className="h-4 w-full max-w-3xl rounded-full" />
                <Skeleton className="h-4 w-5/6 max-w-2xl rounded-full" />
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-14 w-14 rounded-2xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-28 rounded-full" />
                      <Skeleton className="h-3 w-36 rounded-full" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <StatPillSkeleton />
                    <StatPillSkeleton />
                  </div>
                </div>
              </div>
            </GlassPanel>
          </div>

          <div className="xl:sticky xl:top-24 xl:self-start">
            <GlassPanel className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-2xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28 rounded-full" />
                    <Skeleton className="h-3 w-20 rounded-full" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <Skeleton className="h-9 w-9 rounded-full" />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {Array.from({ length: 6 }, (_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/60 px-3 py-3"
                  >
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="min-w-0 flex-1 space-y-2">
                      <Skeleton className="h-4 w-full rounded-full" />
                      <Skeleton className="h-3 w-24 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </div>
        </section>
      </div>
    </main>
  );
}

export function AdminShellSkeleton() {
  return (
    <main className="relative isolate overflow-hidden px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto grid w-full max-w-7xl gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <GlassPanel tone="elevated" glow="violet" className="p-4">
          <div className="space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-6 w-32 rounded-full" />
              <Skeleton className="h-8 w-44 rounded-full" />
              <Skeleton className="h-4 w-32 rounded-full" />
              <Skeleton className="h-3 w-44 rounded-full" />
            </div>
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className="rounded-[24px] border border-border/60 bg-background/45 p-3"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-2xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28 rounded-full" />
                    <Skeleton className="h-3 w-20 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        <div className="space-y-6">
          <GlassPanel className="p-6">
            <div className="space-y-3">
              <Skeleton className="h-3 w-28 rounded-full" />
              <Skeleton className="h-9 w-64 rounded-full" />
              <Skeleton className="h-4 w-full max-w-2xl rounded-full" />
            </div>
          </GlassPanel>
          <div className="grid gap-6 lg:grid-cols-2">
            {Array.from({ length: 4 }, (_, index) => (
              <GlassPanel key={index} className="p-6">
                <div className="space-y-3">
                  <Skeleton className="h-3 w-24 rounded-full" />
                  <Skeleton className="h-8 w-20 rounded-full" />
                  <Skeleton className="h-4 w-full rounded-full" />
                  <Skeleton className="h-4 w-3/4 rounded-full" />
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export function AuthPageSkeleton() {
  return (
    <main className="relative isolate overflow-hidden px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto grid min-h-[calc(100vh-9rem)] w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.08fr)_480px]">
        <GlassPanel glow="violet" className="p-6 sm:p-8">
          <div className="flex h-full flex-col justify-between gap-10">
            <div className="space-y-6">
              <Skeleton className="h-10 w-40 rounded-full" />
              <div className="space-y-4">
                <Skeleton className="h-12 w-3/4 rounded-full" />
                <Skeleton className="h-4 w-full max-w-xl rounded-full" />
                <Skeleton className="h-4 w-5/6 max-w-lg rounded-full" />
              </div>
              <Skeleton className="h-14 w-80 rounded-full" />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {Array.from({ length: 3 }, (_, index) => (
                <GlassPanel key={index} tone="muted" className="p-5">
                  <div className="space-y-3">
                    <Skeleton className="h-11 w-11 rounded-2xl" />
                    <Skeleton className="h-4 w-24 rounded-full" />
                    <Skeleton className="h-4 w-full rounded-full" />
                    <Skeleton className="h-4 w-3/4 rounded-full" />
                  </div>
                </GlassPanel>
              ))}
            </div>
          </div>
        </GlassPanel>

        <GlassPanel tone="elevated" glow="cyan" className="p-6 sm:p-8">
          <div className="space-y-5">
            <Skeleton className="h-10 w-32 rounded-full" />
            <Skeleton className="h-12 w-full rounded-2xl" />
            <Skeleton className="h-12 w-full rounded-2xl" />
            <Skeleton className="h-12 w-40 rounded-full" />
            <Skeleton className="h-4 w-36 rounded-full" />
          </div>
        </GlassPanel>
      </div>
    </main>
  );
}
