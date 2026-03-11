import Link from "next/link";
import { getLatestVideos } from "@/lib/archive-data";
import { GlassPanel } from "@/components/ui/glass-panel";
import { formatDateId } from "@/lib/utils";

export default async function LatestPostsPage() {
  const latestVideos = await getLatestVideos(20);

  return (
    <main className="px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <section className="space-y-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-primary">
            Latest Uploads
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
            Stream Terbaru
          </h1>
          <p className="text-sm leading-7 text-muted-foreground">
            Daftar stream konser yang paling baru diunggah, diurutkan berdasarkan
            tanggal unggah.
          </p>
        </section>

        <section className="grid gap-3">
          {latestVideos.map((item) => (
            <GlassPanel
              key={item.id}
              className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-xs text-muted-foreground">
                  {formatDateId(item.uploadedAt)}
                </p>
                <h2 className="mt-1 text-sm font-semibold text-foreground">
                  {item.title}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {item.concert?.title ?? "Konser tidak dikenal"}
                </p>
              </div>
              <Link
                href={`/concerts/${item.concertSlug}/${item.id}`}
                className="rounded-full border border-primary/24 bg-primary/10 px-4 py-2 text-center text-sm font-medium text-foreground transition hover:bg-primary/14"
              >
                Tonton
              </Link>
            </GlassPanel>
          ))}
        </section>
      </div>
    </main>
  );
}
