import "server-only";
import { cache } from "react";
import type {
  Concert,
  ConcertDisc,
  Group,
  GroupVideoSection,
  Video,
} from "@/lib/archive-types";
import { buildDrivePreviewUrl } from "@/lib/google-drive";
import { prisma } from "@/lib/prisma";

type GroupRecord = {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  createdAt: Date;
  accentColor: string | null;
};

type ConcertRecord = {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  year: number;
  createdAt: Date;
  description: string;
  group: {
    id?: string;
    slug: string;
    name: string;
  } | null;
};

type ConcertDiscRecord = {
  id: string;
  concertId: string;
  title: string;
  slug: string;
  description: string;
  driveId: string;
  type: "BD" | "DVD" | "Bonus";
  sortOrder: number;
  createdAt: Date;
  concert: {
    slug: string;
  } | null;
};

function mapGroup(group: GroupRecord): Group {
  return {
    id: group.id,
    name: group.name,
    slug: group.slug,
    description: group.description,
    thumbnail: group.thumbnail,
    createdAt: group.createdAt.toISOString(),
    accentColor: group.accentColor ?? undefined,
  };
}

function mapConcert(concert: ConcertRecord): Concert {
  return {
    id: concert.id,
    title: concert.title,
    slug: concert.slug,
    groupSlug: concert.group?.slug,
    groupName: concert.group?.name,
    thumbnail: concert.thumbnail,
    year: concert.year,
    createdAt: concert.createdAt.toISOString(),
    description: concert.description,
    isCrossGeneration: !concert.group,
  };
}

function mapConcertDisc(
  disc: ConcertDiscRecord,
  fallbackConcertSlug?: string,
): ConcertDisc {
  return {
    id: disc.id,
    concertId: disc.concertId,
    concertSlug: disc.concert?.slug ?? fallbackConcertSlug ?? "",
    title: disc.title,
    slug: disc.slug,
    description: disc.description,
    driveId: disc.driveId,
    type: disc.type,
    sortOrder: disc.sortOrder,
    createdAt: disc.createdAt.toISOString(),
  };
}

function mapVideo(disc: ConcertDiscRecord, fallbackConcertSlug?: string): Video {
  return {
    id: disc.id,
    concertSlug: disc.concert?.slug ?? fallbackConcertSlug ?? "",
    title: disc.title,
    slug: disc.slug,
    description: disc.description,
    driveId: disc.driveId,
    driveUrl: buildDrivePreviewUrl(disc.driveId),
    order: disc.sortOrder,
    uploadedAt: disc.createdAt.toISOString(),
    type: disc.type,
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
      description: true,
      thumbnail: true,
      createdAt: true,
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
      description: true,
      thumbnail: true,
      createdAt: true,
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
      year: true,
      createdAt: true,
      description: true,
      group: {
        select: {
          slug: true,
          name: true,
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
    orderBy: [{ year: "desc" }, { title: "asc" }],
    select: {
      id: true,
      title: true,
      slug: true,
      thumbnail: true,
      year: true,
      createdAt: true,
      description: true,
      group: {
        select: {
          slug: true,
          name: true,
        },
      },
    },
  });

  return concerts.map(mapConcert);
});

export const getCrossGenerationConcerts = cache(async () => {
  const concerts = await prisma.concert.findMany({
    where: {
      groupId: null,
    },
    orderBy: [{ year: "desc" }, { title: "asc" }],
    select: {
      id: true,
      title: true,
      slug: true,
      thumbnail: true,
      year: true,
      createdAt: true,
      description: true,
      group: {
        select: {
          slug: true,
          name: true,
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
      year: true,
      createdAt: true,
      description: true,
      group: {
        select: {
          slug: true,
          name: true,
        },
      },
    },
  });

  return concerts.map(mapConcert);
});

export const getConcertOptions = cache(async () => {
  const concerts = await prisma.concert.findMany({
    orderBy: [{ title: "asc" }],
    select: {
      id: true,
      title: true,
      slug: true,
      thumbnail: true,
      year: true,
      createdAt: true,
      description: true,
      group: {
        select: {
          slug: true,
          name: true,
        },
      },
    },
  });

  return concerts.map(mapConcert);
});

export const getConcertDiscsByConcertSlug = cache(async (concertSlug: string) => {
  const discs = await prisma.concertDisc.findMany({
    where: {
      concert: {
        slug: concertSlug,
      },
    },
    orderBy: {
      sortOrder: "asc",
    },
    select: {
      id: true,
      concertId: true,
      title: true,
      slug: true,
      description: true,
      driveId: true,
      type: true,
      sortOrder: true,
      createdAt: true,
      concert: {
        select: {
          slug: true,
        },
      },
    },
  });

  return discs.map((disc) => mapConcertDisc(disc, concertSlug));
});

export const getConcertDiscById = cache(
  async (concertSlug: string, discId: string) => {
    const disc = await prisma.concertDisc.findFirst({
      where: {
        id: discId,
        concert: {
          slug: concertSlug,
        },
      },
      select: {
        id: true,
        concertId: true,
        title: true,
        slug: true,
        description: true,
        driveId: true,
        type: true,
        sortOrder: true,
        createdAt: true,
        concert: {
          select: {
            id: true,
            title: true,
            slug: true,
            thumbnail: true,
            year: true,
            createdAt: true,
            description: true,
            group: {
              select: {
                slug: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!disc) {
      return undefined;
    }

    const concertDiscs = await prisma.concertDisc.findMany({
      where: {
        concertId: disc.concert.id,
      },
      orderBy: {
        sortOrder: "asc",
      },
      select: {
        id: true,
        concertId: true,
        title: true,
        slug: true,
        description: true,
        driveId: true,
        type: true,
        sortOrder: true,
        createdAt: true,
        concert: {
          select: {
            slug: true,
          },
        },
      },
    });

    return {
      disc: mapConcertDisc(disc, concertSlug),
      concert: mapConcert(disc.concert),
      videos: concertDiscs.map((item) => mapVideo(item, concertSlug)),
    };
  },
);

export const getLatestVideos = cache(async (limit = 12) => {
  const discs = await prisma.concertDisc.findMany({
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      concertId: true,
      title: true,
      slug: true,
      description: true,
      driveId: true,
      type: true,
      sortOrder: true,
      createdAt: true,
      concert: {
        select: {
          id: true,
          title: true,
          slug: true,
          thumbnail: true,
          year: true,
          createdAt: true,
          description: true,
          group: {
            select: {
              slug: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return discs.map((disc) => ({
    ...mapVideo(disc),
    concert: mapConcert(disc.concert),
  }));
});

export const getVideosGroupedByGroup = cache(async (limitPerGroup?: number) => {
  const [groups, discs] = await Promise.all([
    prisma.group.findMany({
      orderBy: {
        videoSectionOrder: "asc",
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        thumbnail: true,
        createdAt: true,
        accentColor: true,
      },
    }),
    prisma.concertDisc.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        concertId: true,
        title: true,
        slug: true,
        description: true,
        driveId: true,
        type: true,
        sortOrder: true,
        createdAt: true,
        concert: {
          select: {
            id: true,
            title: true,
            slug: true,
            thumbnail: true,
            year: true,
            createdAt: true,
            description: true,
            group: {
              select: {
                id: true,
                slug: true,
                name: true,
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

  for (const disc of discs) {
    const groupId = disc.concert.group?.id;

    if (!groupId) {
      continue;
    }

    const section = sections.get(groupId);

    if (!section) {
      continue;
    }

    section.videos.push({
      ...mapVideo(disc),
      concert: mapConcert(disc.concert),
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

export type { Concert, ConcertDisc, Group, GroupVideoSection, Video };
