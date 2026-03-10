import Link from "next/link";
import { ArchiveCard } from "@/components/archive-cards";
import { concerts, getCrossGenerationConcerts, groups } from "@/lib/archive-data";

export default function Home() {
  const totalConcerts = concerts.length;
  const crossGeneration = getCrossGenerationConcerts();

  return (
    <main className="px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
          <h1 className="text-2xl font-semibold">Love Live Concert Archive</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-300">
            Personal streaming-style archive for Love Live concerts. Browse by
            group, open cross-generation events, and watch through Google Drive
            links in a built-in player page.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-zinc-100 px-2.5 py-1 dark:bg-zinc-700">
              Groups: {groups.length}
            </span>
            <span className="rounded-full bg-zinc-100 px-2.5 py-1 dark:bg-zinc-700">
              Concerts: {totalConcerts}
            </span>
            <span className="rounded-full bg-zinc-100 px-2.5 py-1 dark:bg-zinc-700">
              Source: Google Drive
            </span>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-end justify-between">
            <h2 className="text-lg font-semibold">Concerts by Groups</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {groups.map((group) => (
              <ArchiveCard
                key={group.id}
                title={group.name}
                imageSrc={group.thumbnail}
                href={`/groups/${group.slug}`}
              />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-end justify-between">
            <h2 className="text-lg font-semibold">Cross Generation Concerts</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {crossGeneration.map((concert) => (
              <ArchiveCard
                key={concert.id}
                title={concert.title}
                meta={String(concert.eventYear)}
                imageSrc={concert.thumbnail}
                href={`/concerts/${concert.slug}`}
              />
            ))}
          </div>
          <div className="pt-2">
            <Link
              href="/recent"
              className="text-sm font-medium text-zinc-700 underline underline-offset-4 dark:text-zinc-300"
            >
              View recently added concerts
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
