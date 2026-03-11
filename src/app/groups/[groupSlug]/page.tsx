import { notFound } from "next/navigation";
import { ArchiveCard } from "@/components/archive-cards";
import { GroupHero } from "@/components/group-hero";
import { GlassPanel } from "@/components/ui/glass-panel";
import { getConcertsByGroup, getGroupBySlug } from "@/lib/archive-data";

type GroupPageProps = {
  params: Promise<{ groupSlug: string }>;
};

export default async function GroupPage({ params }: GroupPageProps) {
  const { groupSlug } = await params;
  const [group, concerts] = await Promise.all([
    getGroupBySlug(groupSlug),
    getConcertsByGroup(groupSlug),
  ]);

  if (!group) {
    notFound();
  }

  return (
    <main className="px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <GroupHero group={group} concertCount={concerts.length} />

        <GlassPanel className="p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-primary">
                Concert List
              </p>
              <h2 className="font-display mt-3 text-2xl font-semibold text-foreground">
                Arsip konser {group.name}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Pilih konser untuk membuka halaman detail dan menentukan disc
                atau versi stream sebelum menonton.
              </p>
            </div>

            <div className="rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm text-foreground">
              {concerts.length} konser tersedia
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {concerts.map((concert) => (
              <ArchiveCard
                key={concert.id}
                title={concert.title}
                meta={String(concert.year)}
                imageSrc={concert.thumbnail}
                href={`/concerts/${concert.slug}`}
              />
            ))}
          </div>
        </GlassPanel>
      </div>
    </main>
  );
}
