import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, Disc3 } from "lucide-react";
import { ConcertDiscSelection } from "@/components/concert-disc-selection";
import {
    getConcertBySlug,
    getConcertDiscsByConcertSlug,
} from "@/lib/archive-data";

type ConcertPageProps = {
    params: Promise<{ concertSlug: string }>;
};

export default async function ConcertPage({ params }: ConcertPageProps) {
    const { concertSlug } = await params;
    const [concert, discs] = await Promise.all([
        getConcertBySlug(concertSlug),
        getConcertDiscsByConcertSlug(concertSlug),
    ]);

    if (!concert) {
        notFound();
    }

    const groupLabel = concert.groupName ?? "Cross Generation Concert";

    return (
        <main className="relative isolate overflow-hidden px-4 py-6 sm:px-6 sm:py-8">
            <div className="mx-auto w-full max-w-7xl space-y-6">
                <section className="overflow-hidden rounded-[32px] border border-border/70 bg-card/75 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:shadow-[0_24px_80px_rgba(0,0,0,0.38)]">
                    <div className="grid lg:grid-cols-[minmax(0,1.45fr)_360px]">
                        <div className="relative min-h-[320px] overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
                            <Image
                                src={concert.thumbnail}
                                alt={concert.title}
                                fill
                                className="object-cover opacity-35"
                                sizes="(max-width: 1024px) 100vw, 70vw"
                                priority
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(248,250,255,0.26)_0%,rgba(243,244,255,0.7)_35%,rgba(248,250,255,0.95)_100%)] dark:bg-[linear-gradient(115deg,rgba(5,7,11,0.35)_0%,rgba(5,7,11,0.78)_45%,rgba(5,7,11,0.98)_100%)]" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.22),transparent_32%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.14),transparent_32%)]" />

                            <div className="relative z-10 max-w-3xl">
                                <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                                    <span className="inline-flex items-center gap-2 rounded-full border border-primary/24 bg-primary/10 px-3 py-1 text-foreground">
                                        <span className="h-2 w-2 rounded-full bg-primary" />
                                        Concert Detail
                                    </span>
                                    <span className="rounded-full border border-border/70 bg-background/65 px-3 py-1 text-foreground">
                                        {groupLabel}
                                    </span>
                                </div>

                                <h1 className="font-display mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                                    {concert.title}
                                </h1>
                                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                                    {concert.description}
                                </p>

                                <div className="mt-6 flex flex-wrap gap-3 text-sm text-foreground">
                                    <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2">
                                        <CalendarDays className="size-4 text-muted-foreground" />
                                        {concert.year}
                                    </span>
                                    <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2">
                                        <Disc3 className="size-4 text-muted-foreground" />
                                        {discs.length} disc / versi
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="relative min-h-[240px] border-t border-border/70 lg:border-t-0 lg:border-l">
                            <Image
                                src={concert.thumbnail}
                                alt={`Thumbnail ${concert.title}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 360px"
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(15,23,42,0.18)_100%)] dark:bg-[linear-gradient(180deg,rgba(5,7,11,0.08)_0%,rgba(5,7,11,0.82)_100%)]" />
                            <div className="absolute inset-x-6 bottom-6 rounded-[28px] border border-border/70 bg-card/76 p-4 backdrop-blur-md">
                                <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                                    Stream Versions
                                </p>
                                <p className="mt-2 text-lg font-semibold text-foreground">
                                    {concert.title}
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Pilih disc sebelum membuka player
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <ConcertDiscSelection concert={concert} discs={discs} />
            </div>
        </main>
    );
}
