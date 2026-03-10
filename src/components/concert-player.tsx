"use client";

import { useMemo, useState } from "react";
import type { Marker, Video } from "@/lib/archive-data";

function formatTime(totalSeconds: number) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

type ConcertPlayerProps = {
  videos: Video[];
  markersByVideo: Record<string, Marker[]>;
};

export function ConcertPlayer({ videos, markersByVideo }: ConcertPlayerProps) {
  const [activeVideoId, setActiveVideoId] = useState(videos[0]?.id ?? "");
  const activeVideoIndex = videos.findIndex((video) => video.id === activeVideoId);
  const activeVideo = useMemo(
    () => videos.find((video) => video.id === activeVideoId) ?? videos[0],
    [videos, activeVideoId],
  );
  const activeMarkers = activeVideo ? markersByVideo[activeVideo.id] ?? [] : [];

  if (!activeVideo) {
    return (
      <div className="rounded-xl border border-zinc-200 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
        No videos available for this concert yet.
      </div>
    );
  }

  const canGoPrev = activeVideoIndex > 0;
  const canGoNext = activeVideoIndex < videos.length - 1;

  return (
    <section className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-black dark:border-zinc-700">
        <iframe
          src={activeVideo.driveUrl}
          title={activeVideo.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="aspect-video w-full"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-[1.3fr_1fr]">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Playlist</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-300">
                Video {activeVideoIndex + 1} of {videos.length}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  canGoPrev ? setActiveVideoId(videos[activeVideoIndex - 1].id) : undefined
                }
                disabled={!canGoPrev}
                className="rounded-md border border-zinc-200 px-2 py-1 text-xs font-medium text-zinc-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() =>
                  canGoNext ? setActiveVideoId(videos[activeVideoIndex + 1].id) : undefined
                }
                disabled={!canGoNext}
                className="rounded-md border border-zinc-200 px-2 py-1 text-xs font-medium text-zinc-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300"
              >
                Next
              </button>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            {videos.map((video, idx) => {
              const isActive = video.id === activeVideo.id;

              return (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => setActiveVideoId(video.id)}
                  className={`flex w-full items-center gap-3 rounded-md border px-3 py-2 text-left transition ${
                    isActive
                      ? "border-zinc-900 bg-zinc-900 text-zinc-100 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                      : "border-zinc-200 bg-zinc-50 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-700"
                  }`}
                >
                  <span
                    className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                      isActive
                        ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100"
                        : "bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{video.title}</p>
                    {isActive ? <p className="text-[11px] opacity-80">Now Playing</p> : null}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Timeline Markers (Setlist)
          </h3>
          {activeMarkers.length > 0 ? (
            <ul className="mt-3 space-y-2 text-sm">
              {activeMarkers.map((marker) => (
                <li
                  key={marker.id}
                  className="flex items-center justify-between rounded-md bg-zinc-50 px-3 py-2 dark:bg-zinc-900"
                >
                  <span>{marker.label}</span>
                  <span className="font-mono text-xs text-zinc-500 dark:text-zinc-300">
                    {formatTime(marker.timestamp)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-300">
              No markers for this video yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
