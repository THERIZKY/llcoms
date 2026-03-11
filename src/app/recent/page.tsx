import Link from "next/link";
import { ArchiveCard } from "@/components/archive-cards";
import { GlassPanel } from "@/components/ui/glass-panel";
import { getGroups, getRecentConcerts } from "@/lib/archive-data";
import { formatDateId } from "@/lib/utils";

export default async function RecentConcertsPage() {
  const [recentConcerts, groups] = await Promise.all([
    getRecentConcerts(20),
    getGroups(),
  ]);
  const groupNameBySlug = new Map(groups.map((group) => [group.slug, group.name]));

  return (
    <main className="px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <section className="space-y-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-primary">
            Recently Added
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
            Konser Terbaru
          </h1>
          <p className="text-sm leading-7 text-muted-foreground">
            Kumpulan konser yang baru ditambahkan beserta informasi grup dan
            tanggal masuk arsip.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recentConcerts.map((concert) => {
            const groupLabel =
              groupNameBySlug.get(concert.groupSlug) ?? "Lintas generasi";

            return (
              <div key={concert.id} className="space-y-2">
                <ArchiveCard
                  title={concert.title}
                  meta={`${concert.eventYear} - ${groupLabel}`}
                  imageSrc={concert.thumbnail}
                  href={`/concerts/${concert.slug}`}
                />
                <p className="text-xs text-muted-foreground">
                  Ditambahkan: {formatDateId(concert.createdAt)}
                </p>
              </div>
            );
          })}
        </section>

        <GlassPanel tone="muted" className="inline-flex p-1">
          <Link
            href="/latest"
            className="rounded-full px-4 py-2 text-sm font-medium text-primary transition hover:text-foreground"
          >
            Buka daftar video terbaru
          </Link>
        </GlassPanel>
      </div>
    </main>
  );
}
