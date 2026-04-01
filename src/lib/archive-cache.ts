export const archiveCacheProfiles = {
  catalog: "days",
  feed: "hours",
} as const;

export const archiveCacheTags = {
  archive: "archive",
  groups: "archive:groups",
  concerts: "archive:concerts",
  videos: "archive:videos",
  concertOptions: "archive:concert-options",
  crossGeneration: "archive:cross-generation",
  recentConcerts: "archive:recent-concerts",
  latestVideos: "archive:latest-videos",
  groupedVideos: "archive:grouped-videos",
} as const;

export function getGroupTag(groupSlug: string) {
  return `archive:group:${groupSlug}`;
}

export function getGroupConcertsTag(groupSlug: string) {
  return `archive:group:${groupSlug}:concerts`;
}

export function getConcertTag(concertSlug: string) {
  return `archive:concert:${concertSlug}`;
}

export function getConcertDiscsTag(concertSlug: string) {
  return `archive:concert:${concertSlug}:discs`;
}

export function getConcertMutationTags({
  groupSlug,
}: {
  groupSlug?: string;
}) {
  const tags = new Set<string>([
    archiveCacheTags.archive,
    archiveCacheTags.concerts,
    archiveCacheTags.concertOptions,
    archiveCacheTags.recentConcerts,
  ]);

  if (groupSlug) {
    tags.add(getGroupConcertsTag(groupSlug));
  } else {
    tags.add(archiveCacheTags.crossGeneration);
  }

  return [...tags];
}

export function getVideoMutationTags({
  concertSlug,
  groupSlug,
}: {
  concertSlug: string;
  groupSlug?: string;
}) {
  const tags = new Set<string>([
    archiveCacheTags.archive,
    archiveCacheTags.videos,
    archiveCacheTags.latestVideos,
    getConcertTag(concertSlug),
    getConcertDiscsTag(concertSlug),
  ]);

  if (groupSlug) {
    tags.add(archiveCacheTags.groupedVideos);
  }

  return [...tags];
}
