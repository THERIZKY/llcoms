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
  const activeVideo = useMemo(
    () => videos.find((video) => video.id === activeVideoId) ?? videos[0],
    [videos, activeVideoId],
  );
  const activeMarkers = activeVideo ? markersByVideo[activeVideo.id] ?? [] : [];

  if (!activeVideo) {
    return (
      <div className="rounded-xl border border-zinc-200 p-6 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
        No videos available for this concert yet.
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-black dark:border-zinc-800">
        <iframe
          src={activeVideo.driveUrl}
          title={activeVideo.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="aspect-video w-full"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-[1.3fr_1fr]">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Available Videos
          </h3>
          <div className="mt-3 space-y-2">
            {videos.map((video) => (
              <button
                key={video.id}
                type="button"
                onClick={() => setActiveVideoId(video.id)}
                className={`w-full rounded-md border px-3 py-2 text-left text-sm transition ${
                  video.id === activeVideo.id
                    ? "border-zinc-900 bg-zinc-900 text-zinc-100 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                    : "border-zinc-200 bg-zinc-50 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-800"
                }`}
              >
                {video.title}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Timeline Markers (Setlist)
          </h3>
          {activeMarkers.length > 0 ? (
            <ul className="mt-3 space-y-2 text-sm">
              {activeMarkers.map((marker) => (
                <li
                  key={marker.id}
                  className="flex items-center justify-between rounded-md bg-zinc-50 px-3 py-2 dark:bg-zinc-950"
                >
                  <span>{marker.label}</span>
                  <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    {formatTime(marker.timestamp)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
              No markers for this video yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
