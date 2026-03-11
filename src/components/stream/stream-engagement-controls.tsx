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
              ? "border-rose-400/30 bg-rose-500/14 text-rose-700 dark:text-rose-100"
              : "border-border/70 bg-background/70 text-foreground hover:bg-background"
          } disabled:cursor-not-allowed disabled:opacity-70`}
        >
          {isPending && pendingAction === "like" ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <Heart className="size-4" />
          )}
          {state.viewerHasLiked ? "Liked" : "Like"}
          <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-foreground">
            {state.likeCount}
          </span>
        </button>

        <button
          type="button"
          onClick={handleBookmark}
          disabled={!canInteract || isPending}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
            state.viewerHasBookmarked
              ? "border-sky-400/30 bg-sky-500/14 text-sky-700 dark:text-sky-100"
              : "border-border/70 bg-background/70 text-foreground hover:bg-background"
          } disabled:cursor-not-allowed disabled:opacity-70`}
        >
          {isPending && pendingAction === "bookmark" ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <Bookmark className="size-4" />
          )}
          {state.viewerHasBookmarked ? "Bookmarked" : "Bookmark"}
          <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-foreground">
            {state.bookmarkCount}
          </span>
        </button>
      </div>

      {!canInteract ? (
        <p className="text-sm text-muted-foreground">
          Login diperlukan untuk menyukai dan menyimpan stream.{" "}
          <Link href={loginHref} className="text-primary transition hover:text-foreground">
            Masuk sekarang
          </Link>
        </p>
      ) : null}

      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
