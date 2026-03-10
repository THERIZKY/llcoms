export type Group = {
    id: string;
    name: string;
    slug: string;
    thumbnail: string;
    summary: string;
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

export type Marker = {
    id: string;
    videoId: string;
    timestamp: number;
    label: string;
};

export const groups: Group[] = [
    {
        id: "grp_muse",
        name: "mu's",
        slug: "muse",
        thumbnail: "/images/groups/muse.svg",
        summary: "School idol pioneers with classic live performances.",
    },
    {
        id: "grp_aqours",
        name: "Aqours",
        slug: "aqours",
        thumbnail: "/images/groups/aqours.svg",
        summary: "Energetic seaside-era concerts and dome-level stages.",
    },
    {
        id: "grp_nijigasaki",
        name: "Nijigasaki",
        slug: "nijigasaki",
        thumbnail: "/images/groups/nijigasaki.svg",
        summary: "Solo-idol focused shows with diverse stage styles.",
    },
    {
        id: "grp_liella",
        name: "Liella",
        slug: "liella",
        thumbnail: "/images/groups/liella.svg",
        summary: "Modern era concerts with crisp choreography and visuals.",
    },
];

export const concerts: Concert[] = [
    {
        id: "con_muse_final",
        title: "mu's Final LoveLive!",
        slug: "muse-final-lovelive",
        groupSlug: "muse",
        thumbnail: "/images/concerts/muse-final-lovelive.svg",
        eventYear: 2016,
        createdAt: "2026-03-03T08:00:00.000Z",
        description: "A historic final stage performance from mu's.",
        isCrossGeneration: false,
    },
    {
        id: "con_aqours_6th",
        title: "Aqours 6th LoveLive! WINDY STAGE",
        slug: "aqours-6th-windy-stage",
        groupSlug: "aqours",
        thumbnail: "/images/concerts/aqours-6th-windy-stage.svg",
        eventYear: 2022,
        createdAt: "2026-03-05T08:00:00.000Z",
        description: "Aqours arena show with high-energy unit tracks.",
        isCrossGeneration: false,
    },
    {
        id: "con_niji_5th",
        title: "Nijigasaki 5th Live",
        slug: "nijigasaki-5th-live",
        groupSlug: "nijigasaki",
        thumbnail: "/images/concerts/nijigasaki-5th-live.svg",
        eventYear: 2023,
        createdAt: "2026-03-06T08:00:00.000Z",
        description:
            "Colorful solo stages and crowd call-and-response moments.",
        isCrossGeneration: false,
    },
    {
        id: "con_liella_4th",
        title: "Liella 4th LoveLive! brand new Sparkle",
        slug: "liella-4th-brand-new-sparkle",
        groupSlug: "liella",
        thumbnail: "/images/concerts/liella-4th-brand-new-sparkle.svg",
        eventYear: 2025,
        createdAt: "2026-03-09T08:00:00.000Z",
        description: "Recent Liella show with polished modern production.",
        isCrossGeneration: false,
    },
    {
        id: "con_ll_fes",
        title: "Love Live! Fest",
        slug: "love-live-fest",
        groupSlug: "cross-generation",
        thumbnail: "/images/concerts/love-live-fest.svg",
        eventYear: 2020,
        createdAt: "2026-03-08T08:00:00.000Z",
        description: "Cross-generation festival featuring multiple groups.",
        isCrossGeneration: true,
    },
    {
        id: "con_unit_live",
        title: "Love Live! Unit Live Adventure",
        slug: "unit-live-adventure",
        groupSlug: "cross-generation",
        thumbnail: "/images/concerts/unit-live-adventure.svg",
        eventYear: 2024,
        createdAt: "2026-03-10T08:00:00.000Z",
        description: "Special unit collaboration concert event.",
        isCrossGeneration: true,
    },
];

export const videos: Video[] = [
    {
        id: "vid_muse_final_day1_disc1",
        concertSlug: "muse-final-lovelive",
        title: "mu's Final LoveLive! Day 1 (Disc 1)",
        driveUrl:
            "https://drive.google.com/file/d/1YCTRkFrG68vXTLYwrHxM3Zcnl0V5RG9o/preview",
        order: 1,
        uploadedAt: "2026-03-03T10:00:00.000Z",
    },
    {
        id: "vid_muse_final_day1_disc2",
        concertSlug: "muse-final-lovelive",
        title: "mu's Final LoveLive! Day 1 (Disc 2)",
        driveUrl:
            "https://drive.google.com/file/d/1xnT1GIOxMuJnjvON0qUjWquc6wo_BFrH/preview",
        order: 2,
        uploadedAt: "2026-03-03T10:10:00.000Z",
    },
    {
        id: "vid_muse_final_day1_disc3",
        concertSlug: "muse-final-lovelive",
        title: "mu's Final LoveLive! Day 1 (Disc 3)",
        driveUrl:
            "https://drive.google.com/file/d/1aH_pHyOsu3UaGuthXE2jlI0FEHLwI7CO/preview",
        order: 3,
        uploadedAt: "2026-03-03T10:20:00.000Z",
    },
    {
        id: "vid_muse_final_day2_disc4",
        concertSlug: "muse-final-lovelive",
        title: "mu's Final LoveLive! Day 2 (Disc 4)",
        driveUrl:
            "https://drive.google.com/file/d/1XS9u_-tf7ZryzO9s1q0rw-Mg06U9_BQY/preview",
        order: 4,
        uploadedAt: "2026-03-03T10:30:00.000Z",
    },
    {
        id: "vid_muse_final_day2_disc5",
        concertSlug: "muse-final-lovelive",
        title: "mu's Final LoveLive! Day 2 (Disc 5)",
        driveUrl:
            "https://drive.google.com/file/d/1gRy_A7u9kHTHR_qO2fDYcNUivq8NXQcq/preview",
        order: 5,
        uploadedAt: "2026-03-03T10:40:00.000Z",
    },
    {
        id: "vid_muse_final_day2_disc6",
        concertSlug: "muse-final-lovelive",
        title: "mu's Final LoveLive! Day 2 (Disc 6)",
        driveUrl:
            "https://drive.google.com/file/d/1WVUuZF4-ASbXfPPi3Cyk79dXo1GEfZMI/preview",
        order: 6,
        uploadedAt: "2026-03-03T10:50:00.000Z",
    },
    {
        id: "vid_aqours_6th_day2",
        concertSlug: "aqours-6th-windy-stage",
        title: "Day 2 Full Concert",
        driveUrl: "https://drive.google.com/file/d/DRIVE_FILE_ID_2/preview",
        order: 1,
        uploadedAt: "2026-03-05T12:00:00.000Z",
    },
    {
        id: "vid_niji_5th_day1",
        concertSlug: "nijigasaki-5th-live",
        title: "Day 1 Full Concert",
        driveUrl: "https://drive.google.com/file/d/DRIVE_FILE_ID_3/preview",
        order: 1,
        uploadedAt: "2026-03-06T11:00:00.000Z",
    },
    {
        id: "vid_ll_fes_main",
        concertSlug: "love-live-fest",
        title: "Main Stage",
        driveUrl: "https://drive.google.com/file/d/DRIVE_FILE_ID_4/preview",
        order: 1,
        uploadedAt: "2026-03-08T09:30:00.000Z",
    },
    {
        id: "vid_liella_4th_day1",
        concertSlug: "liella-4th-brand-new-sparkle",
        title: "Day 1 Full Concert",
        driveUrl: "https://drive.google.com/file/d/DRIVE_FILE_ID_5/preview",
        order: 1,
        uploadedAt: "2026-03-09T14:00:00.000Z",
    },
    {
        id: "vid_unit_live_main",
        concertSlug: "unit-live-adventure",
        title: "Main Collaboration Stage",
        driveUrl: "https://drive.google.com/file/d/DRIVE_FILE_ID_6/preview",
        order: 1,
        uploadedAt: "2026-03-10T11:00:00.000Z",
    },
];

export const markers: Marker[] = [
    {
        id: "m_1",
        videoId: "vid_unit_live_main",
        timestamp: 0,
        label: "Opening",
    },
    {
        id: "m_2",
        videoId: "vid_unit_live_main",
        timestamp: 312,
        label: "Song 1",
    },
    {
        id: "m_3",
        videoId: "vid_unit_live_main",
        timestamp: 645,
        label: "Song 2",
    },
];

export function getGroupBySlug(slug: string) {
    return groups.find((group) => group.slug === slug);
}

export function getConcertBySlug(slug: string) {
    return concerts.find((concert) => concert.slug === slug);
}

export function getConcertsByGroup(slug: string) {
    return concerts
        .filter((concert) => concert.groupSlug === slug)
        .sort((a, b) => b.eventYear - a.eventYear);
}

export function getCrossGenerationConcerts() {
    return concerts
        .filter((concert) => concert.isCrossGeneration)
        .sort((a, b) => b.eventYear - a.eventYear);
}

export function getRecentConcerts(limit = 12) {
    return [...concerts]
        .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
        .slice(0, limit);
}

export function getLatestVideos(limit = 12) {
    return [...videos]
        .sort((a, b) => +new Date(b.uploadedAt) - +new Date(a.uploadedAt))
        .slice(0, limit)
        .map((video) => ({
            ...video,
            concert: getConcertBySlug(video.concertSlug),
        }));
}

export function getVideosByConcert(slug: string) {
    return videos
        .filter((video) => video.concertSlug === slug)
        .sort((a, b) => a.order - b.order);
}

export function getMarkersByVideo(videoId: string) {
    return markers
        .filter((marker) => marker.videoId === videoId)
        .sort((a, b) => a.timestamp - b.timestamp);
}
