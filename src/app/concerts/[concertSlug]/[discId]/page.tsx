import { notFound } from "next/navigation";
import { buildLoginHref } from "@/auth/redirects";
import { ConcertPlayer } from "@/components/concert-player";
import { getConcertDiscById, getGroupBySlug } from "@/lib/archive-data";
import { getStreamEngagementState } from "@/lib/stream-interactions";

type DiscPlayerPageProps = {
  params: Promise<{ concertSlug: string; discId: string }>;
};

export default async function DiscPlayerPage({ params }: DiscPlayerPageProps) {
  const { concertSlug, discId } = await params;
  const stream = await getConcertDiscById(concertSlug, discId);

  if (!stream) {
    notFound();
  }

  const [{ engagement, sessionUser }, group] = await Promise.all([
    getStreamEngagementState(stream.concert.id),
    stream.concert.groupSlug
      ? getGroupBySlug(stream.concert.groupSlug)
      : Promise.resolve(undefined),
  ]);

  const groupLabel = group?.name ?? "Cross Generation Concert";
  const loginHref = buildLoginHref(`/concerts/${concertSlug}/${discId}`);

  return (
    <main className="relative isolate overflow-hidden px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-[1500px]">
        <ConcertPlayer
          key={stream.disc.id}
          concertId={stream.concert.id}
          videos={stream.videos}
          initialVideoId={stream.disc.id}
          concertTitle={stream.concert.title}
          concertDescription={stream.concert.description}
          groupLabel={groupLabel}
          thumbnailSrc={group?.thumbnail ?? stream.concert.thumbnail}
          eventYear={stream.concert.year}
          loginHref={loginHref}
          canInteract={Boolean(sessionUser)}
          initialEngagement={engagement}
        />
      </div>
    </main>
  );
}
