import "dotenv/config";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../src/generated/prisma/client";
import { ConcertDiscType, UserRole } from "../src/generated/prisma/enums";
import { getRuntimeDatabaseUrl } from "../src/lib/database-url";
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
    description:
      "Pelopor school idol Love Live dengan konser ikonis dan momen penutup yang legendaris.",
    thumbnail: "/images/groups/muse.svg",
    accentColor: "#f43f5e",
    sortOrder: 1,
    videoSectionOrder: 2,
  },
  {
    id: "grp_aqours",
    name: "Aqours",
    slug: "aqours",
    description:
      "Generasi Sunshine dengan nuansa panggung laut, unit performance, dan produksi arena yang besar.",
    thumbnail: "/images/groups/aqours.svg",
    accentColor: "#0ea5e9",
    sortOrder: 2,
    videoSectionOrder: 1,
  },
  {
    id: "grp_nijigasaki",
    name: "Nijigasaki",
    slug: "nijigasaki",
    description:
      "School idol solo project dengan warna performer yang beragam dan staging yang lebih individual.",
    thumbnail: "/images/groups/nijigasaki.svg",
    accentColor: "#f59e0b",
    sortOrder: 3,
    videoSectionOrder: 3,
  },
  {
    id: "grp_liella",
    name: "Liella",
    slug: "liella",
    description:
      "Era modern Love Live dengan koreografi bersih, visual rapi, dan skala tur yang terus berkembang.",
    thumbnail: "/images/groups/liella.svg",
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
    year: 2016,
    description:
      "Penampilan panggung penutup yang bersejarah dari mu's dengan setlist panjang dan momen perpisahan besar.",
    thumbnail: "/images/concerts/muse-final-lovelive.svg",
    createdAt: new Date("2026-03-03T08:00:00.000Z"),
  },
  {
    id: "con_aqours_6th",
    title: "Aqours 6th LoveLive! WINDY STAGE",
    slug: "aqours-6th-windy-stage",
    groupId: "grp_aqours",
    year: 2022,
    description:
      "Konser arena Aqours dengan energi besar, set unit song, dan atmosfer stadion yang kuat.",
    thumbnail: "/images/concerts/aqours-6th-windy-stage.svg",
    createdAt: new Date("2026-03-05T08:00:00.000Z"),
  },
  {
    id: "con_niji_5th",
    title: "Nijigasaki 5th Live",
    slug: "nijigasaki-5th-live",
    groupId: "grp_nijigasaki",
    year: 2023,
    description:
      "Panggung penuh warna dari para solo idol Nijigasaki dengan fokus performer per member yang kuat.",
    thumbnail: "/images/concerts/nijigasaki-5th-live.svg",
    createdAt: new Date("2026-03-06T08:00:00.000Z"),
  },
  {
    id: "con_liella_4th",
    title: "Liella 4th LoveLive! brand new Sparkle",
    slug: "liella-4th-brand-new-sparkle",
    groupId: "grp_liella",
    year: 2025,
    description:
      "Konser Liella dengan produksi modern, staging bersih, dan visual yang lebih matang.",
    thumbnail: "/images/concerts/liella-4th-brand-new-sparkle.svg",
    createdAt: new Date("2026-03-09T08:00:00.000Z"),
  },
  {
    id: "con_ll_fes",
    title: "Love Live! Fest",
    slug: "love-live-fest",
    groupId: null,
    year: 2020,
    description:
      "Festival lintas generasi yang mempertemukan beberapa era Love Live dalam satu panggung besar.",
    thumbnail: "/images/concerts/love-live-fest.svg",
    createdAt: new Date("2026-03-08T08:00:00.000Z"),
  },
  {
    id: "con_unit_live",
    title: "Love Live! Unit Live Adventure",
    slug: "unit-live-adventure",
    groupId: null,
    year: 2024,
    description:
      "Konser kolaborasi unit spesial yang menonjolkan kombinasi performa lintas sub-unit.",
    thumbnail: "/images/concerts/unit-live-adventure.svg",
    createdAt: new Date("2026-03-10T08:00:00.000Z"),
  },
] as const;

const discs = [
  {
    id: "muse-final-bd-disc-1",
    concertId: "con_muse_final",
    title: "BD Disc 1",
    slug: "bd-disc-1",
    description: "Bagian pembuka konser untuk mu's Final LoveLive!.",
    driveId: "1YCTRkFrG68vXTLYwrHxM3Zcnl0V5RG9o",
    type: ConcertDiscType.BD,
    sortOrder: 1,
    createdAt: new Date("2026-03-03T10:00:00.000Z"),
  },
  {
    id: "muse-final-bd-disc-2",
    concertId: "con_muse_final",
    title: "BD Disc 2",
    slug: "bd-disc-2",
    description: "Lanjutan setlist utama untuk mu's Final LoveLive!.",
    driveId: "1xnT1GIOxMuJnjvON0qUjWquc6wo_BFrH",
    type: ConcertDiscType.BD,
    sortOrder: 2,
    createdAt: new Date("2026-03-03T10:10:00.000Z"),
  },
  {
    id: "muse-final-bd-disc-3",
    concertId: "con_muse_final",
    title: "BD Disc 3",
    slug: "bd-disc-3",
    description: "Bagian tengah konser untuk mu's Final LoveLive!.",
    driveId: "1aH_pHyOsu3UaGuthXE2jlI0FEHLwI7CO",
    type: ConcertDiscType.BD,
    sortOrder: 3,
    createdAt: new Date("2026-03-03T10:20:00.000Z"),
  },
  {
    id: "muse-final-bd-disc-4",
    concertId: "con_muse_final",
    title: "BD Disc 4",
    slug: "bd-disc-4",
    description: "Setlist hari berikutnya untuk mu's Final LoveLive!.",
    driveId: "1XS9u_-tf7ZryzO9s1q0rw-Mg06U9_BQY",
    type: ConcertDiscType.BD,
    sortOrder: 4,
    createdAt: new Date("2026-03-03T10:30:00.000Z"),
  },
  {
    id: "muse-final-bd-disc-5",
    concertId: "con_muse_final",
    title: "BD Disc 5",
    slug: "bd-disc-5",
    description: "Penutupan set utama untuk mu's Final LoveLive!.",
    driveId: "1gRy_A7u9kHTHR_qO2fDYcNUivq8NXQcq",
    type: ConcertDiscType.BD,
    sortOrder: 5,
    createdAt: new Date("2026-03-03T10:40:00.000Z"),
  },
  {
    id: "muse-final-bonus-disc",
    concertId: "con_muse_final",
    title: "Bonus Disc",
    slug: "bonus-disc",
    description: "Konten bonus tambahan untuk mu's Final LoveLive!.",
    driveId: "1WVUuZF4-ASbXfPPi3Cyk79dXo1GEfZMI",
    type: ConcertDiscType.Bonus,
    sortOrder: 6,
    createdAt: new Date("2026-03-03T10:50:00.000Z"),
  },
  {
    id: "aqours-6th-bd-disc-1",
    concertId: "con_aqours_6th",
    title: "BD Disc 1",
    slug: "bd-disc-1",
    description: "Stream utama untuk Aqours 6th LoveLive! WINDY STAGE.",
    driveId: "DRIVE_FILE_ID_2",
    type: ConcertDiscType.BD,
    sortOrder: 1,
    createdAt: new Date("2026-03-05T12:00:00.000Z"),
  },
  {
    id: "nijigasaki-5th-bd-disc-1",
    concertId: "con_niji_5th",
    title: "BD Disc 1",
    slug: "bd-disc-1",
    description: "Stream utama untuk Nijigasaki 5th Live.",
    driveId: "DRIVE_FILE_ID_3",
    type: ConcertDiscType.BD,
    sortOrder: 1,
    createdAt: new Date("2026-03-06T11:00:00.000Z"),
  },
  {
    id: "love-live-fest-bd-disc-1",
    concertId: "con_ll_fes",
    title: "BD Disc 1",
    slug: "bd-disc-1",
    description: "Stream utama untuk Love Live! Fest.",
    driveId: "DRIVE_FILE_ID_4",
    type: ConcertDiscType.BD,
    sortOrder: 1,
    createdAt: new Date("2026-03-08T09:30:00.000Z"),
  },
  {
    id: "liella-4th-bd-disc-1",
    concertId: "con_liella_4th",
    title: "BD Disc 1",
    slug: "bd-disc-1",
    description: "Stream utama untuk Liella 4th LoveLive! brand new Sparkle.",
    driveId: "DRIVE_FILE_ID_5",
    type: ConcertDiscType.BD,
    sortOrder: 1,
    createdAt: new Date("2026-03-09T14:00:00.000Z"),
  },
  {
    id: "unit-live-adventure-bd-disc-1",
    concertId: "con_unit_live",
    title: "BD Disc 1",
    slug: "bd-disc-1",
    description: "Stream utama untuk Love Live! Unit Live Adventure.",
    driveId: "DRIVE_FILE_ID_6",
    type: ConcertDiscType.BD,
    sortOrder: 1,
    createdAt: new Date("2026-03-10T11:00:00.000Z"),
  },
] as const;

async function main() {
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.streamLike.deleteMany();
  await prisma.streamBookmark.deleteMany();
  await prisma.user.deleteMany();
  await prisma.concertDisc.deleteMany();
  await prisma.concert.deleteMany();
  await prisma.group.deleteMany();

  await prisma.group.createMany({ data: [...groups] });
  await prisma.concert.createMany({ data: [...concerts] });
  await prisma.concertDisc.createMany({ data: [...discs] });

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
