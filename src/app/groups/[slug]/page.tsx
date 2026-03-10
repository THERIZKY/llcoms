import { notFound } from "next/navigation";
import { ArchiveCard } from "@/components/archive-cards";
import { getConcertsByGroup, getGroupBySlug } from "@/lib/archive-data";

type GroupPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function GroupPage({ params }: GroupPageProps) {
  const { slug } = await params;
  const group = getGroupBySlug(slug);
  if (!group) {
    notFound();
  }

  const groupConcerts = getConcertsByGroup(slug);

  return (
    <main className="px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <section className="space-y-2">
          <h1 className="text-2xl font-semibold">{group.name}</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{group.summary}</p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groupConcerts.map((concert) => (
            <ArchiveCard
              key={concert.id}
              title={concert.title}
              subtitle={`${concert.eventYear} • ${concert.description}`}
              gradient={concert.thumbnail}
              href={`/concerts/${concert.slug}`}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
