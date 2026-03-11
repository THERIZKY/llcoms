export type ConcertDiscType = "BD" | "DVD" | "Bonus";

export type Group = {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  createdAt: string;
  accentColor?: string;
};

export type Concert = {
  id: string;
  title: string;
  slug: string;
  groupSlug?: string;
  groupName?: string;
  thumbnail: string;
  year: number;
  createdAt: string;
  description: string;
  isCrossGeneration: boolean;
};

export type ConcertDisc = {
  id: string;
  concertId: string;
  concertSlug: string;
  title: string;
  slug: string;
  description: string;
  driveId: string;
  type: ConcertDiscType;
  sortOrder: number;
  createdAt: string;
};

export type Video = {
  id: string;
  concertSlug: string;
  title: string;
  slug: string;
  description: string;
  driveId: string;
  driveUrl: string;
  order: number;
  uploadedAt: string;
  type: ConcertDiscType;
};

export type GroupVideoSection = {
  group: Group;
  videos: Array<
    Video & {
      concert: Concert;
    }
  >;
};
