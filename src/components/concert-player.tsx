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
}: ConcertPlayerProps) {
  const [activeVideoId, setActiveVideoId] = useState(videos[0]?.id ?? "");
  const activeVideoIndex = videos.findIndex((video) => video.id === activeVideoId);
  const activeVideo = useMemo(
    () => videos.find((video) => video.id === activeVideoId) ?? videos[0],
    [videos, activeVideoId],
  );

  if (!activeVideo) {
    return (
      <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 text-sm text-zinc-300">
        Belum ada video untuk konser ini.
      </div>
    );
  }

  const canGoPrev = activeVideoIndex > 0;
  const canGoNext = activeVideoIndex < videos.length - 1;

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_360px]">
      <div className="space-y-5">
        <div className="overflow-hidden rounded-[30px] border border-white/10 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,transparent_18%,transparent_82%,rgba(0,0,0,0.24)_100%)]" />
            <iframe
              src={activeVideo.driveUrl}
              title={activeVideo.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="aspect-video w-full bg-black"
            />
          </div>
        </div>

        <div
          id="details"
          className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.28)]"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-400">
                <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-zinc-200">
                  Stream Info
                </span>
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
                  {groupLabel}
                </span>
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
                  {eventYear}
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-white">
                  {concertTitle}
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
                  {concertDescription}
                </p>
              </div>

              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
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
                    <p className="text-sm font-semibold text-white">{groupLabel}</p>
                    <p className="text-xs text-zinc-400">
                      Private concert archive channel
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs text-zinc-300">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2">
                    <Users className="size-3.5 text-zinc-400" />
                    Private viewers
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2">
                    <ListVideo className="size-3.5 text-zinc-400" />
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
          className="rounded-[26px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_16px_48px_rgba(0,0,0,0.24)]"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-rose-500/12 text-rose-200">
                <ListVideo className="size-4" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-white">Daftar Video</h3>
                <p className="text-xs text-zinc-400">
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
                className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 bg-black/25 text-zinc-300 transition hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
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
                className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 bg-black/25 text-zinc-300 transition hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
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
                      ? "border-rose-400/35 bg-rose-500/12 text-white shadow-[0_10px_30px_rgba(244,63,94,0.14)]"
                      : "border-white/8 bg-black/20 text-zinc-200 hover:border-white/15 hover:bg-white/[0.06]"
                  }`}
                >
                  <span
                    className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                      isActive
                        ? "bg-white text-zinc-950"
                        : "bg-white/10 text-zinc-300"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{video.title}</p>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-zinc-400">
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
