"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Bookmark, Heart, LoaderCircle } from "lucide-react";
import type { StreamEngagementState } from "@/types/stream";

type StreamEngagementControlsProps = {
  concertId: string;
  loginHref: string;
  canInteract: boolean;
  initialState: StreamEngagementState;
};

type ApiErrorPayload = {
  message?: string;
};

async function readErrorMessage(response: Response) {
  const payload = (await response.json().catch(() => null)) as
    | ApiErrorPayload
    | null;

  return payload?.message ?? "Permintaan gagal diproses.";
}

export function StreamEngagementControls({
  concertId,
  loginHref,
  canInteract,
  initialState,
}: StreamEngagementControlsProps) {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<"like" | "bookmark" | null>(
    null,
  );
  const [isPending, startTransition] = useTransition();

  function handleLike() {
    if (!canInteract || state.viewerHasLiked || isPending) {
      return;
    }

    const previousState = state;
    const optimisticState = {
      ...state,
      viewerHasLiked: true,
      likeCount: state.likeCount + 1,
    };

    setState(optimisticState);
    setError(null);
    setPendingAction("like");

    startTransition(async () => {
      try {
        const response = await fetch(`/api/streams/${concertId}/like`, {
          method: "POST",
        });

        if (!response.ok) {
          setState(previousState);
          setError(await readErrorMessage(response));
          setPendingAction(null);
          return;
        }

        const nextState = (await response.json()) as StreamEngagementState;
        setState(nextState);
        setPendingAction(null);
      } catch {
        setState(previousState);
        setError("Koneksi gagal. Coba lagi.");
        setPendingAction(null);
      }
    });
  }

  function handleBookmark() {
    if (!canInteract || isPending) {
      return;
    }

    const previousState = state;
    const nextBookmarked = !state.viewerHasBookmarked;
    const optimisticState = {
      ...state,
      viewerHasBookmarked: nextBookmarked,
      bookmarkCount: Math.max(
        0,
        state.bookmarkCount + (nextBookmarked ? 1 : -1),
      ),
    };

    setState(optimisticState);
    setError(null);
    setPendingAction("bookmark");

    startTransition(async () => {
      try {
        const response = await fetch(`/api/streams/${concertId}/bookmark`, {
          method: "POST",
        });

        if (!response.ok) {
          setState(previousState);
          setError(await readErrorMessage(response));
          setPendingAction(null);
          return;
        }

        const nextState = (await response.json()) as StreamEngagementState;
        setState(nextState);
        setPendingAction(null);
      } catch {
        setState(previousState);
        setError("Koneksi gagal. Coba lagi.");
        setPendingAction(null);
      }
    });
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleLike}
          disabled={!canInteract || state.viewerHasLiked || isPending}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
            state.viewerHasLiked
              ? "border-rose-300/30 bg-rose-500/14 text-rose-100"
              : "border-white/10 bg-white/[0.06] text-white hover:bg-white/[0.1]"
          } disabled:cursor-not-allowed disabled:opacity-70`}
        >
          {isPending && pendingAction === "like" ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <Heart className="size-4" />
          )}
          {state.viewerHasLiked ? "Liked" : "Like"}
          <span className="rounded-full bg-black/20 px-2 py-0.5 text-[11px] text-zinc-200">
            {state.likeCount}
          </span>
        </button>

        <button
          type="button"
          onClick={handleBookmark}
          disabled={!canInteract || isPending}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
            state.viewerHasBookmarked
              ? "border-sky-300/30 bg-sky-500/14 text-sky-100"
              : "border-white/10 bg-white/[0.06] text-white hover:bg-white/[0.1]"
          } disabled:cursor-not-allowed disabled:opacity-70`}
        >
          {isPending && pendingAction === "bookmark" ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <Bookmark className="size-4" />
          )}
          {state.viewerHasBookmarked ? "Bookmarked" : "Bookmark"}
          <span className="rounded-full bg-black/20 px-2 py-0.5 text-[11px] text-zinc-200">
            {state.bookmarkCount}
          </span>
        </button>
      </div>

      {!canInteract ? (
        <p className="text-sm text-zinc-400">
          Login diperlukan untuk menyukai dan menyimpan stream.{" "}
          <Link href={loginHref} className="text-rose-200 transition hover:text-white">
            Masuk sekarang
          </Link>
        </p>
      ) : null}

      {error ? <p className="text-sm text-rose-200">{error}</p> : null}
    </div>
  );
}
