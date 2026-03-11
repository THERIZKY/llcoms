import "server-only";
import { auth } from "@/auth";
import type { StreamEngagementState } from "@/types/stream";
import { prisma } from "@/lib/prisma";

export async function getStreamEngagementStateForUser(
  concertId: string,
  userId?: string | null,
): Promise<StreamEngagementState> {
  const [likeCount, bookmarkCount, viewerLike, viewerBookmark] =
    await Promise.all([
      prisma.streamLike.count({
        where: {
          concertId,
        },
      }),
      prisma.streamBookmark.count({
        where: {
          concertId,
        },
      }),
      userId
        ? prisma.streamLike.findUnique({
            where: {
              userId_concertId: {
                userId,
                concertId,
              },
            },
            select: {
              id: true,
            },
          })
        : null,
      userId
        ? prisma.streamBookmark.findUnique({
            where: {
              userId_concertId: {
                userId,
                concertId,
              },
            },
            select: {
              id: true,
            },
          })
        : null,
    ]);

  return {
    likeCount,
    bookmarkCount,
    viewerHasLiked: Boolean(viewerLike),
    viewerHasBookmarked: Boolean(viewerBookmark),
  };
}

export async function getStreamEngagementState(concertId: string) {
  const session = await auth();

  return {
    sessionUser: session?.user ?? null,
    engagement: await getStreamEngagementStateForUser(
      concertId,
      session?.user?.id ?? null,
    ),
  };
}

export async function likeStream(concertId: string, userId: string) {
  await prisma.streamLike.upsert({
    where: {
      userId_concertId: {
        userId,
        concertId,
      },
    },
    update: {},
    create: {
      userId,
      concertId,
    },
  });

  return getStreamEngagementStateForUser(concertId, userId);
}

export async function toggleStreamBookmark(concertId: string, userId: string) {
  const existingBookmark = await prisma.streamBookmark.findUnique({
    where: {
      userId_concertId: {
        userId,
        concertId,
      },
    },
    select: {
      id: true,
    },
  });

  if (existingBookmark) {
    await prisma.streamBookmark.delete({
      where: {
        userId_concertId: {
          userId,
          concertId,
        },
      },
    });
  } else {
    await prisma.streamBookmark.create({
      data: {
        userId,
        concertId,
      },
    });
  }

  return getStreamEngagementStateForUser(concertId, userId);
}
