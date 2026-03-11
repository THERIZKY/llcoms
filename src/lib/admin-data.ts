import "server-only";
import { UserRole } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

export async function getAdminDashboardData() {
  const [
    userCount,
    adminCount,
    concertCount,
    videoCount,
    likeCount,
    bookmarkCount,
    verifiedUserCount,
    recentUsers,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({
      where: {
        role: UserRole.admin,
      },
    }),
    prisma.concert.count(),
    prisma.video.count(),
    prisma.streamLike.count(),
    prisma.streamBookmark.count(),
    prisma.user.count({
      where: {
        emailVerified: {
          not: null,
        },
      },
    }),
    prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        emailVerified: true,
        createdAt: true,
      },
    }),
  ]);

  return {
    counts: {
      userCount,
      adminCount,
      concertCount,
      videoCount,
      likeCount,
      bookmarkCount,
      verifiedUserCount,
    },
    recentUsers,
  };
}
