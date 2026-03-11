import Link from "next/link";
import { ArchiveCard } from "@/components/archive-cards";
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
          <h1 className="text-2xl font-semibold">Konser Terbaru</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
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
                <p className="text-xs text-zinc-500 dark:text-zinc-300">
                  Ditambahkan: {formatDateId(concert.createdAt)}
                </p>
              </div>
            );
          })}
        </section>

        <Link
          href="/latest"
          className="inline-block text-sm font-medium text-zinc-700 underline underline-offset-4 dark:text-zinc-300"
        >
          Buka daftar video terbaru
        </Link>
      </div>
    </main>
  );
}
