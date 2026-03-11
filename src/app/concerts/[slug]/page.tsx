import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, Clapperboard } from "lucide-react";
import { buildLoginHref } from "@/auth/redirects";
import { ConcertPlayer } from "@/components/concert-player";
import {
  getConcertBySlug,
  getGroupBySlug,
  getVideosByConcert,
} from "@/lib/archive-data";
import { getStreamEngagementState } from "@/lib/stream-interactions";

type ConcertPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ConcertPage({ params }: ConcertPageProps) {
  const { slug } = await params;
  const concert = await getConcertBySlug(slug);
  if (!concert) {
    notFound();
  }

  const [{ engagement, sessionUser }, concertVideos, group] = await Promise.all([
    getStreamEngagementState(concert.id),
    getVideosByConcert(slug),
    getGroupBySlug(concert.groupSlug),
  ]);
  const groupLabel = group?.name ?? "Lintas generasi";
  const loginHref = buildLoginHref(`/concerts/${slug}`);

  return (
    <main className="relative isolate overflow-hidden bg-[#05070b] px-4 py-6 text-zinc-100 sm:px-6 sm:py-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(244,63,94,0.18),transparent_28%),radial-gradient(circle_at_88%_14%,_rgba(59,130,246,0.16),transparent_24%),linear-gradient(180deg,#05070b_0%,#0a0f16_40%,#05070b_100%)]" />
      <div className="mx-auto w-full max-w-7xl space-y-6">
        <section className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur">
          <div className="grid lg:grid-cols-[minmax(0,1.45fr)_360px]">
            <div className="relative min-h-[320px] overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
              <Image
                src={concert.thumbnail}
                alt={concert.title}
                fill
                className="object-cover opacity-35"
                sizes="(max-width: 1024px) 100vw, 70vw"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(5,7,11,0.35)_0%,rgba(5,7,11,0.78)_45%,rgba(5,7,11,0.98)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.14),transparent_32%)]" />
              <div className="relative z-10 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-200">
                  <span className="inline-flex items-center gap-2 rounded-full border border-rose-400/35 bg-rose-500/15 px-3 py-1 text-rose-100">
                    <span className="h-2 w-2 rounded-full bg-rose-400" />
                    Live Archive
                  </span>
                  <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-zinc-200">
                    {groupLabel}
                  </span>
                </div>
                <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {concert.title}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
                  {concert.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3 text-sm text-zinc-100">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2">
                    <CalendarDays className="size-4 text-zinc-300" />
                    {concert.eventYear}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2">
                    <Clapperboard className="size-4 text-zinc-300" />
                    {concertVideos.length} video
                  </span>
                </div>
              </div>
            </div>

            <div className="relative min-h-[240px] border-t border-white/10 lg:border-t-0 lg:border-l lg:border-white/10">
              <Image
                src={concert.thumbnail}
                alt={`Thumbnail ${concert.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 360px"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,11,0.08)_0%,rgba(5,7,11,0.82)_100%)]" />
              <div className="absolute inset-x-6 bottom-6 rounded-[28px] border border-white/10 bg-black/55 p-4 backdrop-blur-md">
                <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-400">
                  Video Thumbnail
                </p>
                <p className="mt-2 text-lg font-semibold text-white">{concert.title}</p>
                <p className="mt-1 text-sm text-zinc-300">{groupLabel}</p>
              </div>
            </div>
          </div>
        </section>

        <ConcertPlayer
          concertId={concert.id}
          videos={concertVideos}
          concertTitle={concert.title}
          concertDescription={concert.description}
          groupLabel={groupLabel}
          thumbnailSrc={group?.thumbnail ?? concert.thumbnail}
          eventYear={concert.eventYear}
          loginHref={loginHref}
          canInteract={Boolean(sessionUser)}
          initialEngagement={engagement}
        />
      </div>
    </main>
  );
}
