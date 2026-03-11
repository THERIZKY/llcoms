export type Group = {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  summary: string;
  accentColor?: string;
};

export type Concert = {
  id: string;
  title: string;
  slug: string;
  groupSlug: string;
  thumbnail: string;
  eventYear: number;
  createdAt: string;
  description: string;
  isCrossGeneration: boolean;
};

export type Video = {
  id: string;
  concertSlug: string;
  title: string;
  driveUrl: string;
  order: number;
  uploadedAt: string;
};

export type GroupVideoSection = {
  group: Group;
  videos: Array<
    Video & {
      concert: Concert;
    }
  >;
};
