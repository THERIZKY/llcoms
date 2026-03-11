import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GlassPanel } from "@/components/ui/glass-panel";
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
          className="mx-auto max-w-5xl rounded-[32px] px-6 py-6 text-center text-slate-950 shadow-[0_24px_80px_rgba(96,165,250,0.16)]"
          style={{
            background: `linear-gradient(135deg, ${accentColor}, #a78bfa 58%, #67e8f9)`,
          }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-slate-900/60">
            Group Archive
          </p>
          <h1 className="font-display mt-3 text-2xl font-semibold sm:text-3xl">
            Koleksi Konser {group.name}
          </h1>
        </section>

        <GlassPanel className="mx-auto max-w-5xl p-4 sm:p-6">
          <div className="mb-6 text-center">
            <p className="text-sm leading-7 text-muted-foreground">
              {group.summary}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {groupConcerts.map((concert) => (
              <Link
                key={concert.id}
                href={`/concerts/${concert.slug}`}
                className="group overflow-hidden rounded-[26px] border border-border/70 bg-background/70 p-3 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_72px_rgba(96,165,250,0.16)] dark:shadow-[0_24px_72px_rgba(0,0,0,0.32)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-secondary">
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
                  <h2 className="mt-1 text-sm font-semibold text-foreground">
                    {concert.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </GlassPanel>
      </div>
    </main>
  );
}
