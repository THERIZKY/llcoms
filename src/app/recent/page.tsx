import Link from "next/link";
import { ArchiveCard } from "@/components/archive-cards";
import { getRecentConcerts } from "@/lib/archive-data";

export default function RecentConcertsPage() {
  const recentConcerts = getRecentConcerts(20);

  return (
    <main className="px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <section className="space-y-2">
          <h1 className="text-2xl font-semibold">Recent Concerts</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Recently added concert events with group and date metadata.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recentConcerts.map((concert) => (
            <div key={concert.id} className="space-y-2">
              <ArchiveCard
                title={concert.title}
                meta={`${concert.eventYear} • ${concert.groupSlug}`}
                imageSrc={concert.thumbnail}
                href={`/concerts/${concert.slug}`}
              />
              <p className="text-xs text-zinc-500 dark:text-zinc-300">
                Date added: {new Date(concert.createdAt).toLocaleDateString("en-US")}
              </p>
            </div>
          ))}
        </section>

        <Link
          href="/latest"
          className="inline-block text-sm font-medium text-zinc-700 underline underline-offset-4 dark:text-zinc-300"
        >
          Open latest uploaded videos
        </Link>
      </div>
    </main>
  );
}
