import { notFound } from "next/navigation";
import { ConcertPlayer } from "@/components/concert-player";
import {
  getConcertBySlug,
  getMarkersByVideo,
  getVideosByConcert,
} from "@/lib/archive-data";

type ConcertPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ConcertPage({ params }: ConcertPageProps) {
  const { slug } = await params;
  const concert = getConcertBySlug(slug);
  if (!concert) {
    notFound();
  }

  const concertVideos = getVideosByConcert(slug);
  const markersByVideo = Object.fromEntries(
    concertVideos.map((video) => [video.id, getMarkersByVideo(video.id)]),
  );

  return (
    <main className="px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
          <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-300">
            {concert.groupSlug}
          </p>
          <h1 className="mt-1 text-2xl font-semibold">{concert.title}</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            {concert.description}
          </p>
          <div className="mt-3 text-xs text-zinc-500 dark:text-zinc-300">
            Event year: {concert.eventYear}
          </div>
        </section>

        <ConcertPlayer videos={concertVideos} markersByVideo={markersByVideo} />
      </div>
    </main>
  );
}
