import Link from "next/link";
import { ArchiveCard } from "@/components/archive-cards";
import { GlassPanel } from "@/components/ui/glass-panel";
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
                <GlassPanel glow="cyan" className="p-6 sm:p-8">
                    <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-primary">
                        Archive Overview
                    </p>
                    <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight text-foreground">
                        Arsip Konser Love Live
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                        Arsip konser Love Live dengan tampilan bergaya
                        streaming. Jelajahi berdasarkan grup, buka konser lintas
                        generasi, lalu tonton lewat Google Drive di halaman
                        player bawaan.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs">
                        <span className="rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-foreground">
                            Grup: {groups.length}
                        </span>
                        <span className="rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-foreground">
                            Konser: {totalConcerts}
                        </span>
                        <span className="rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-foreground">
                            Sumber: Google Drive
                        </span>
                    </div>
                </GlassPanel>

                <section className="space-y-4">
                    <div className="flex items-end justify-between">
                        <h2 className="font-display text-lg font-semibold text-foreground">
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
                        <h2 className="font-display text-lg font-semibold text-foreground">
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
                                        <h3 className="font-display text-base font-semibold text-foreground">
                                            {group.name}
                                        </h3>
                                        <p className="text-xs text-muted-foreground">
                                            Tersedia {videos.length} video
                                        </p>
                                    </div>
                                    <Link
                                        href={`/groups/${group.slug}`}
                                        className="text-sm font-medium text-primary underline underline-offset-4 hover:text-foreground"
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
