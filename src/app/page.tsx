import Link from "next/link";
import { ArchiveCard } from "@/components/archive-cards";
import {
    getConcertCount,
    getCrossGenerationConcerts,
    getGroups,
    getVideosGroupedByGroup,
} from "@/lib/archive-data";

export default async function Home() {
    const [groups, totalConcerts, crossGeneration, videosByGroup] =
        await Promise.all([
            getGroups(),
            getConcertCount(),
            getCrossGenerationConcerts(),
            getVideosGroupedByGroup(),
        ]);

    return (
        <main className="px-4 py-8 sm:px-6">
            <div className="mx-auto w-full max-w-6xl space-y-10">
                <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
                    <h1 className="text-2xl font-semibold">
                        Arsip Konser Love Live
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-300">
                        Arsip konser Love Live dengan tampilan bergaya
                        streaming. Jelajahi berdasarkan grup, buka konser lintas
                        generasi, lalu tonton lewat Google Drive di halaman
                        player bawaan.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs">
                        <span className="rounded-full bg-zinc-100 px-2.5 py-1 dark:bg-zinc-700">
                            Grup: {groups.length}
                        </span>
                        <span className="rounded-full bg-zinc-100 px-2.5 py-1 dark:bg-zinc-700">
                            Konser: {totalConcerts}
                        </span>
                        <span className="rounded-full bg-zinc-100 px-2.5 py-1 dark:bg-zinc-700">
                            Sumber: Google Drive
                        </span>
                    </div>
                </section>

                <section className="space-y-4">
                    <div className="flex items-end justify-between">
                        <h2 className="text-lg font-semibold">
                            Konser Berdasarkan Grup
                        </h2>
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
                        <h2 className="text-lg font-semibold">
                            Konser Lintas Generasi
                        </h2>
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
                </section>

                <section className="space-y-6">
                    <div className="space-y-8">
                        {videosByGroup.map(({ group, videos }) => (
                            <section key={group.id} className="space-y-3">
                                <div className="flex items-end justify-between gap-3">
                                    <div>
                                        <h3 className="text-base font-semibold">
                                            {group.name}
                                        </h3>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-300">
                                            Tersedia {videos.length} video
                                        </p>
                                    </div>
                                    <Link
                                        href={`/groups/${group.slug}`}
                                        className="text-sm font-medium text-zinc-700 underline underline-offset-4 dark:text-zinc-300"
                                    >
                                        Buka halaman grup
                                    </Link>
                                </div>

                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                    {videos.map((video) => (
                                        <ArchiveCard
                                            key={video.id}
                                            title={video.title}
                                            meta={video.concert.title}
                                            imageSrc={video.concert.thumbnail}
                                            href={`/concerts/${video.concert.slug}`}
                                            size="compact"
                                        />
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
