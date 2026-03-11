import "dotenv/config";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../src/generated/prisma/client";
import { getRuntimeDatabaseUrl } from "../src/lib/database-url";
import { UserRole } from "../src/generated/prisma/enums";
import { hashPassword } from "../src/lib/password";

const prisma = new PrismaClient({
  adapter: new PrismaLibSql({
    url: getRuntimeDatabaseUrl(process.env.DATABASE_URL),
  }),
});

const groups = [
  {
    id: "grp_muse",
    name: "mu's",
    slug: "muse",
    thumbnail: "/images/groups/muse.svg",
    summary: "Pelopor school idol dengan konser-konser klasik yang ikonis.",
    accentColor: "#f43f5e",
    sortOrder: 1,
    videoSectionOrder: 2,
  },
  {
    id: "grp_aqours",
    name: "Aqours",
    slug: "aqours",
    thumbnail: "/images/groups/aqours.svg",
    summary: "Panggung energik era Sunshine dengan nuansa laut dan skala besar.",
    accentColor: "#0ea5e9",
    sortOrder: 2,
    videoSectionOrder: 1,
  },
  {
    id: "grp_nijigasaki",
    name: "Nijigasaki",
    slug: "nijigasaki",
    thumbnail: "/images/groups/nijigasaki.svg",
    summary: "Konser dengan fokus solo idol dan warna panggung yang beragam.",
    accentColor: "#f59e0b",
    sortOrder: 3,
    videoSectionOrder: 3,
  },
  {
    id: "grp_liella",
    name: "Liella",
    slug: "liella",
    thumbnail: "/images/groups/liella.svg",
    summary: "Konser era modern dengan koreografi rapi dan visual yang bersih.",
    accentColor: "#22c55e",
    sortOrder: 4,
    videoSectionOrder: 4,
  },
] as const;

const concerts = [
  {
    id: "con_muse_final",
    title: "mu's Final LoveLive!",
    slug: "muse-final-lovelive",
    groupId: "grp_muse",
    thumbnail: "/images/concerts/muse-final-lovelive.svg",
    eventYear: 2016,
    createdAt: new Date("2026-03-03T08:00:00.000Z"),
    description: "Penampilan panggung penutup yang bersejarah dari mu's.",
    isCrossGeneration: false,
  },
  {
    id: "con_aqours_6th",
    title: "Aqours 6th LoveLive! WINDY STAGE",
    slug: "aqours-6th-windy-stage",
    groupId: "grp_aqours",
    thumbnail: "/images/concerts/aqours-6th-windy-stage.svg",
    eventYear: 2022,
    createdAt: new Date("2026-03-05T08:00:00.000Z"),
    description: "Konser arena Aqours dengan unit song dan energi panggung tinggi.",
    isCrossGeneration: false,
  },
  {
    id: "con_niji_5th",
    title: "Nijigasaki 5th Live",
    slug: "nijigasaki-5th-live",
    groupId: "grp_nijigasaki",
    thumbnail: "/images/concerts/nijigasaki-5th-live.svg",
    eventYear: 2023,
    createdAt: new Date("2026-03-06T08:00:00.000Z"),
    description:
      "Panggung solo penuh warna dengan momen call-and-response yang kuat.",
    isCrossGeneration: false,
  },
  {
    id: "con_liella_4th",
    title: "Liella 4th LoveLive! brand new Sparkle",
    slug: "liella-4th-brand-new-sparkle",
    groupId: "grp_liella",
    thumbnail: "/images/concerts/liella-4th-brand-new-sparkle.svg",
    eventYear: 2025,
    createdAt: new Date("2026-03-09T08:00:00.000Z"),
    description: "Konser Liella yang lebih baru dengan produksi modern yang rapi.",
    isCrossGeneration: false,
  },
  {
    id: "con_ll_fes",
    title: "Love Live! Fest",
    slug: "love-live-fest",
    groupId: null,
    thumbnail: "/images/concerts/love-live-fest.svg",
    eventYear: 2020,
    createdAt: new Date("2026-03-08T08:00:00.000Z"),
    description: "Festival lintas generasi yang menampilkan banyak grup.",
    isCrossGeneration: true,
  },
  {
    id: "con_unit_live",
    title: "Love Live! Unit Live Adventure",
    slug: "unit-live-adventure",
    groupId: null,
    thumbnail: "/images/concerts/unit-live-adventure.svg",
    eventYear: 2024,
    createdAt: new Date("2026-03-10T08:00:00.000Z"),
    description: "Acara konser kolaborasi unit spesial.",
    isCrossGeneration: true,
  },
] as const;

const videos = [
  {
    id: "vid_muse_final_day1_disc1",
    concertId: "con_muse_final",
    title: "mu's Final LoveLive! Hari 1 (Disk 1)",
    driveFileId: "1YCTRkFrG68vXTLYwrHxM3Zcnl0V5RG9o",
    playlistOrder: 1,
    uploadedAt: new Date("2026-03-03T10:00:00.000Z"),
  },
  {
    id: "vid_muse_final_day1_disc2",
    concertId: "con_muse_final",
    title: "mu's Final LoveLive! Hari 1 (Disk 2)",
    driveFileId: "1xnT1GIOxMuJnjvON0qUjWquc6wo_BFrH",
    playlistOrder: 2,
    uploadedAt: new Date("2026-03-03T10:10:00.000Z"),
  },
  {
    id: "vid_muse_final_day1_disc3",
    concertId: "con_muse_final",
    title: "mu's Final LoveLive! Hari 1 (Disk 3)",
    driveFileId: "1aH_pHyOsu3UaGuthXE2jlI0FEHLwI7CO",
    playlistOrder: 3,
    uploadedAt: new Date("2026-03-03T10:20:00.000Z"),
  },
  {
    id: "vid_muse_final_day2_disc4",
    concertId: "con_muse_final",
    title: "mu's Final LoveLive! Hari 2 (Disk 4)",
    driveFileId: "1XS9u_-tf7ZryzO9s1q0rw-Mg06U9_BQY",
    playlistOrder: 4,
    uploadedAt: new Date("2026-03-03T10:30:00.000Z"),
  },
  {
    id: "vid_muse_final_day2_disc5",
    concertId: "con_muse_final",
    title: "mu's Final LoveLive! Hari 2 (Disk 5)",
    driveFileId: "1gRy_A7u9kHTHR_qO2fDYcNUivq8NXQcq",
    playlistOrder: 5,
    uploadedAt: new Date("2026-03-03T10:40:00.000Z"),
  },
  {
    id: "vid_muse_final_day2_disc6",
    concertId: "con_muse_final",
    title: "mu's Final LoveLive! Hari 2 (Disk 6)",
    driveFileId: "1WVUuZF4-ASbXfPPi3Cyk79dXo1GEfZMI",
    playlistOrder: 6,
    uploadedAt: new Date("2026-03-03T10:50:00.000Z"),
  },
  {
    id: "vid_aqours_6th_day2",
    concertId: "con_aqours_6th",
    title: "Hari 2 - Konser Penuh",
    driveFileId: "DRIVE_FILE_ID_2",
    playlistOrder: 1,
    uploadedAt: new Date("2026-03-05T12:00:00.000Z"),
  },
  {
    id: "vid_niji_5th_day1",
    concertId: "con_niji_5th",
    title: "Hari 1 - Konser Penuh",
    driveFileId: "DRIVE_FILE_ID_3",
    playlistOrder: 1,
    uploadedAt: new Date("2026-03-06T11:00:00.000Z"),
  },
  {
    id: "vid_ll_fes_main",
    concertId: "con_ll_fes",
    title: "Panggung Utama",
    driveFileId: "DRIVE_FILE_ID_4",
    playlistOrder: 1,
    uploadedAt: new Date("2026-03-08T09:30:00.000Z"),
  },
  {
    id: "vid_liella_4th_day1",
    concertId: "con_liella_4th",
    title: "Hari 1 - Konser Penuh",
    driveFileId: "DRIVE_FILE_ID_5",
    playlistOrder: 1,
    uploadedAt: new Date("2026-03-09T14:00:00.000Z"),
  },
  {
    id: "vid_unit_live_main",
    concertId: "con_unit_live",
    title: "Panggung Kolaborasi Utama",
    driveFileId: "DRIVE_FILE_ID_6",
    playlistOrder: 1,
    uploadedAt: new Date("2026-03-10T11:00:00.000Z"),
  },
] as const;

async function main() {
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.streamLike.deleteMany();
  await prisma.streamBookmark.deleteMany();
  await prisma.user.deleteMany();
  await prisma.video.deleteMany();
  await prisma.concert.deleteMany();
  await prisma.group.deleteMany();

  await prisma.group.createMany({ data: [...groups] });
  await prisma.concert.createMany({ data: [...concerts] });
  await prisma.video.createMany({ data: [...videos] });

  const adminEmail = process.env.SEED_ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.SEED_ADMIN_PASSWORD?.trim();
  const adminName = process.env.SEED_ADMIN_NAME?.trim() || "Archive Admin";

  if (adminEmail && adminPassword) {
    await prisma.user.create({
      data: {
        name: adminName,
        email: adminEmail,
        password: await hashPassword(adminPassword),
        role: UserRole.admin,
        emailVerified: new Date(),
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
