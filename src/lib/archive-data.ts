import "server-only";
import { cache } from "react";
import type {
  Concert,
  Group,
  GroupVideoSection,
  Video,
} from "@/lib/archive-types";
import { buildDrivePreviewUrl } from "@/lib/google-drive";
import { prisma } from "@/lib/prisma";

const CROSS_GENERATION_SLUG = "cross-generation";

type GroupRecord = {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  summary: string;
  accentColor: string | null;
};

type ConcertRecord = {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  eventYear: number;
  createdAt: Date;
  description: string;
  isCrossGeneration: boolean;
  group: {
    slug: string;
  } | null;
};

type VideoRecord = {
  id: string;
  title: string;
  driveFileId: string;
  playlistOrder: number;
  uploadedAt: Date;
  concert: {
    slug: string;
  } | null;
};

function mapGroup(group: GroupRecord): Group {
  return {
    id: group.id,
    name: group.name,
    slug: group.slug,
    thumbnail: group.thumbnail,
    summary: group.summary,
    accentColor: group.accentColor ?? undefined,
  };
}

function mapConcert(concert: ConcertRecord): Concert {
  return {
    id: concert.id,
    title: concert.title,
    slug: concert.slug,
    groupSlug: concert.group?.slug ?? CROSS_GENERATION_SLUG,
    thumbnail: concert.thumbnail,
    eventYear: concert.eventYear,
    createdAt: concert.createdAt.toISOString(),
    description: concert.description,
    isCrossGeneration: concert.isCrossGeneration,
  };
}

function mapVideo(video: VideoRecord, fallbackConcertSlug?: string): Video {
  return {
    id: video.id,
    concertSlug: video.concert?.slug ?? fallbackConcertSlug ?? "",
    title: video.title,
    driveUrl: buildDrivePreviewUrl(video.driveFileId),
    order: video.playlistOrder,
    uploadedAt: video.uploadedAt.toISOString(),
  };
}

export const getGroups = cache(async () => {
  const groups = await prisma.group.findMany({
    orderBy: {
      sortOrder: "asc",
    },
    select: {
      id: true,
      name: true,
      slug: true,
      thumbnail: true,
      summary: true,
      accentColor: true,
    },
  });

  return groups.map(mapGroup);
});

export const getGroupBySlug = cache(async (slug: string) => {
  const group = await prisma.group.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      thumbnail: true,
      summary: true,
      accentColor: true,
    },
  });

  return group ? mapGroup(group) : undefined;
});

export const getConcertCount = cache(async () => prisma.concert.count());

export const getConcertBySlug = cache(async (slug: string) => {
  const concert = await prisma.concert.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      thumbnail: true,
      eventYear: true,
      createdAt: true,
      description: true,
      isCrossGeneration: true,
      group: {
        select: {
          slug: true,
        },
      },
    },
  });

  return concert ? mapConcert(concert) : undefined;
});

export const getConcertsByGroup = cache(async (slug: string) => {
  const concerts = await prisma.concert.findMany({
    where: {
      group: {
        slug,
      },
    },
    orderBy: {
      eventYear: "desc",
    },
    select: {
      id: true,
      title: true,
      slug: true,
      thumbnail: true,
      eventYear: true,
      createdAt: true,
      description: true,
      isCrossGeneration: true,
      group: {
        select: {
          slug: true,
        },
      },
    },
  });

  return concerts.map(mapConcert);
});

export const getCrossGenerationConcerts = cache(async () => {
  const concerts = await prisma.concert.findMany({
    where: {
      isCrossGeneration: true,
    },
    orderBy: {
      eventYear: "desc",
    },
    select: {
      id: true,
      title: true,
      slug: true,
      thumbnail: true,
      eventYear: true,
      createdAt: true,
      description: true,
      isCrossGeneration: true,
      group: {
        select: {
          slug: true,
        },
      },
    },
  });

  return concerts.map(mapConcert);
});

export const getRecentConcerts = cache(async (limit = 12) => {
  const concerts = await prisma.concert.findMany({
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      slug: true,
      thumbnail: true,
      eventYear: true,
      createdAt: true,
      description: true,
      isCrossGeneration: true,
      group: {
        select: {
          slug: true,
        },
      },
    },
  });

  return concerts.map(mapConcert);
});

export const getLatestVideos = cache(async (limit = 12) => {
  const videos = await prisma.video.findMany({
    take: limit,
    orderBy: {
      uploadedAt: "desc",
    },
    select: {
      id: true,
      title: true,
      driveFileId: true,
      playlistOrder: true,
      uploadedAt: true,
      concert: {
        select: {
          id: true,
          title: true,
          slug: true,
          thumbnail: true,
          eventYear: true,
          createdAt: true,
          description: true,
          isCrossGeneration: true,
          group: {
            select: {
              slug: true,
            },
          },
        },
      },
    },
  });

  return videos.map((video) => ({
    ...mapVideo(video),
    concert: mapConcert(video.concert),
  }));
});

export const getVideosByConcert = cache(async (slug: string) => {
  const videos = await prisma.video.findMany({
    where: {
      concert: {
        slug,
      },
    },
    orderBy: {
      playlistOrder: "asc",
    },
    select: {
      id: true,
      title: true,
      driveFileId: true,
      playlistOrder: true,
      uploadedAt: true,
      concert: {
        select: {
          slug: true,
        },
      },
    },
  });

  return videos.map((video) => mapVideo(video, slug));
});

export const getVideosGroupedByGroup = cache(async (limitPerGroup?: number) => {
  const [groups, videos] = await Promise.all([
    prisma.group.findMany({
      orderBy: {
        videoSectionOrder: "asc",
      },
      select: {
        id: true,
        name: true,
        slug: true,
        thumbnail: true,
        summary: true,
        accentColor: true,
      },
    }),
    prisma.video.findMany({
      orderBy: {
        uploadedAt: "desc",
      },
      select: {
        id: true,
        title: true,
        driveFileId: true,
        playlistOrder: true,
        uploadedAt: true,
        concert: {
          select: {
            id: true,
            title: true,
            slug: true,
            thumbnail: true,
            eventYear: true,
            createdAt: true,
            description: true,
            isCrossGeneration: true,
            group: {
              select: {
                id: true,
                slug: true,
              },
            },
          },
        },
      },
    }),
  ]);

  const sections = new Map<string, GroupVideoSection>();

  for (const group of groups) {
    sections.set(group.id, {
      group: mapGroup(group),
      videos: [],
    });
  }

  for (const video of videos) {
    const groupId = video.concert.group?.id;

    if (!groupId) {
      continue;
    }

    const section = sections.get(groupId);

    if (!section) {
      continue;
    }

    section.videos.push({
      ...mapVideo(video),
      concert: mapConcert(video.concert),
    });
  }

  return groups
    .map((group) => sections.get(group.id))
    .filter((section): section is GroupVideoSection => Boolean(section?.videos.length))
    .map((section) => ({
      ...section,
      videos:
        typeof limitPerGroup === "number"
          ? section.videos.slice(0, limitPerGroup)
          : section.videos,
    }));
});

export type { Concert, Group, GroupVideoSection, Video };
