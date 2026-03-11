import Link from "next/link";
import { getLatestVideos } from "@/lib/archive-data";
import { formatDateId } from "@/lib/utils";

export default async function LatestPostsPage() {
  const latestVideos = await getLatestVideos(20);

  return (
    <main className="px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <section className="space-y-2">
          <h1 className="text-2xl font-semibold">Video Terbaru</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Daftar video konser yang paling baru diunggah, diurutkan berdasarkan
            tanggal unggah.
          </p>
        </section>

        <section className="grid gap-3">
          {latestVideos.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-700 dark:bg-zinc-800"
            >
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-300">
                  {formatDateId(item.uploadedAt)}
                </p>
                <h2 className="text-sm font-semibold">{item.title}</h2>
                <p className="text-xs text-zinc-600 dark:text-zinc-300">
                  {item.concert?.title ?? "Konser tidak dikenal"}
                </p>
              </div>
              <Link
                href={`/concerts/${item.concertSlug}`}
                className="rounded-md bg-zinc-900 px-3 py-2 text-center text-sm font-medium text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
              >
                Tonton
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
