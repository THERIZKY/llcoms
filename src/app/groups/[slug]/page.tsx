import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getConcertsByGroup, getGroupBySlug } from "@/lib/archive-data";

type GroupPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function GroupPage({ params }: GroupPageProps) {
  const { slug } = await params;
  const group = await getGroupBySlug(slug);
  if (!group) {
    notFound();
  }

  const groupConcerts = await getConcertsByGroup(slug);
  const accentColor = group.accentColor ?? "#0ea5e9";

  return (
    <main className="px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-5">
        <section
          className="mx-auto max-w-5xl rounded-2xl px-6 py-4 text-center text-white shadow-sm"
          style={{
            background: `linear-gradient(135deg, ${accentColor}, #38bdf8)`,
          }}
        >
          <h1 className="text-2xl font-semibold sm:text-3xl">
            Koleksi Konser {group.name}
          </h1>
        </section>

        <section className="mx-auto max-w-5xl rounded-[28px] border border-zinc-200 bg-zinc-100/90 p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/70 sm:p-6">
          <div className="mb-6 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              {group.summary}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {groupConcerts.map((concert) => (
              <Link
                key={concert.id}
                href={`/concerts/${concert.slug}`}
                className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-700">
                  <Image
                    src={concert.thumbnail}
                    alt={concert.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="px-2 pb-1 pt-3 text-center">
                  <p
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{ color: accentColor }}
                  >
                    {concert.eventYear}
                  </p>
                  <h2 className="mt-1 text-sm font-semibold text-zinc-700 dark:text-zinc-100">
                    {concert.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
