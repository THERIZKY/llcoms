"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ListVideo,
  Play,
  Users,
} from "lucide-react";
import type { Video } from "@/lib/archive-types";
import { StreamEngagementControls } from "@/components/stream/stream-engagement-controls";
import { Skeleton } from "@/components/ui/skeleton";
import type { StreamEngagementState } from "@/types/stream";

type ConcertPlayerProps = {
  concertId: string;
  videos: Video[];
  concertTitle: string;
  concertDescription: string;
  groupLabel: string;
  thumbnailSrc: string;
  eventYear: number;
  loginHref: string;
  canInteract: boolean;
  initialEngagement: StreamEngagementState;
  initialVideoId?: string;
};

export function ConcertPlayer({
  concertId,
  videos,
  concertTitle,
  concertDescription,
  groupLabel,
  thumbnailSrc,
  eventYear,
  loginHref,
  canInteract,
  initialEngagement,
  initialVideoId,
}: ConcertPlayerProps) {
  const [activeVideoId, setActiveVideoId] = useState(
    initialVideoId ?? videos[0]?.id ?? "",
  );
  const [loadedVideoId, setLoadedVideoId] = useState<string | null>(null);
  const activeVideoIndex = videos.findIndex((video) => video.id === activeVideoId);
  const activeVideo = useMemo(
    () => videos.find((video) => video.id === activeVideoId) ?? videos[0],
    [videos, activeVideoId],
  );

  if (!activeVideo) {
    return (
      <div className="rounded-[28px] border border-border/70 bg-card/75 p-6 text-sm text-muted-foreground backdrop-blur-xl">
        Belum ada video untuk konser ini.
      </div>
    );
  }

  const canGoPrev = activeVideoIndex > 0;
  const canGoNext = activeVideoIndex < videos.length - 1;
  const isFrameLoading = loadedVideoId !== activeVideo.id;

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,2.25fr)_340px] 2xl:grid-cols-[minmax(0,2.45fr)_360px]">
      <div className="space-y-5">
        <div className="overflow-hidden rounded-[30px] border border-border/70 bg-black shadow-[0_24px_80px_rgba(15,23,42,0.18)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,transparent_18%,transparent_82%,rgba(0,0,0,0.24)_100%)]" />
            {isFrameLoading ? (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/65 backdrop-blur-sm">
                <div className="space-y-3 text-center">
                  <Skeleton className="mx-auto h-14 w-14 rounded-full bg-slate-800" />
                  <p className="text-sm font-medium text-slate-100">
                    Menyiapkan media player...
                  </p>
                </div>
              </div>
            ) : null}
            <iframe
              src={activeVideo.driveUrl}
              title={activeVideo.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="aspect-video w-full bg-black"
              onLoad={() => setLoadedVideoId(activeVideo.id)}
            />
          </div>
        </div>

        <div
          id="details"
          className="rounded-[28px] border border-border/70 bg-card/75 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.1)] backdrop-blur-2xl dark:shadow-[0_18px_60px_rgba(0,0,0,0.32)]"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                <span className="rounded-full border border-primary/18 bg-primary/10 px-3 py-1 text-foreground">
                  Stream Info
                </span>
                <span className="rounded-full border border-border/70 bg-background/65 px-3 py-1 text-foreground">
                  {groupLabel}
                </span>
                <span className="rounded-full border border-border/70 bg-background/65 px-3 py-1 text-foreground">
                  {eventYear}
                </span>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                  {concertTitle}
                </h2>
                <p className="mt-2 text-sm font-medium text-primary">
                  {activeVideo.title}
                </p>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                  {activeVideo.description || concertDescription}
                </p>
              </div>

              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-border/70 bg-background/70">
                    <Image
                      src={thumbnailSrc}
                      alt={groupLabel}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/35" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{groupLabel}</p>
                    <p className="text-xs text-muted-foreground">
                      Private concert archive channel
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs text-foreground">
                  <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/65 px-3 py-2">
                    <Users className="size-3.5 text-muted-foreground" />
                    Private viewers
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/65 px-3 py-2">
                    <ListVideo className="size-3.5 text-muted-foreground" />
                    {videos.length} video
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full max-w-sm shrink-0">
              <StreamEngagementControls
                concertId={concertId}
                loginHref={loginHref}
                canInteract={canInteract}
                initialState={initialEngagement}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="xl:sticky xl:top-24 xl:self-start">
        <div
          id="playlist"
          className="rounded-[26px] border border-border/70 bg-card/75 p-4 shadow-[0_16px_48px_rgba(15,23,42,0.1)] backdrop-blur-2xl dark:shadow-[0_16px_48px_rgba(0,0,0,0.3)]"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-2xl border border-primary/18 bg-primary/10 text-primary">
                <ListVideo className="size-4" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Daftar Video</h3>
                <p className="text-xs text-muted-foreground">
                  Video {activeVideoIndex + 1} dari {videos.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  canGoPrev ? setActiveVideoId(videos[activeVideoIndex - 1].id) : undefined
                }
                disabled={!canGoPrev}
                className="inline-flex size-9 items-center justify-center rounded-full border border-border/70 bg-background/70 text-muted-foreground transition hover:bg-background hover:text-foreground disabled:cursor-not-allowed disabled:opacity-35"
                aria-label="Video sebelumnya"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  canGoNext ? setActiveVideoId(videos[activeVideoIndex + 1].id) : undefined
                }
                disabled={!canGoNext}
                className="inline-flex size-9 items-center justify-center rounded-full border border-border/70 bg-background/70 text-muted-foreground transition hover:bg-background hover:text-foreground disabled:cursor-not-allowed disabled:opacity-35"
                aria-label="Video berikutnya"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 max-h-[28rem] space-y-2 overflow-auto pr-1">
            {videos.map((video, idx) => {
              const isActive = video.id === activeVideo.id;

              return (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => setActiveVideoId(video.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition ${
                    isActive
                      ? "border-primary/30 bg-primary/12 text-foreground shadow-[0_10px_30px_rgba(96,165,250,0.18)]"
                      : "border-border/60 bg-background/60 text-foreground hover:border-border/90 hover:bg-background/78"
                  }`}
                >
                  <span
                    className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                      isActive
                        ? "bg-foreground text-background"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{video.title}</p>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                      <Play className="size-3" />
                      <span>{isActive ? "Sedang diputar" : `Bagian ${video.order}`}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
