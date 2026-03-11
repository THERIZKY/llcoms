"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdminUser } from "@/auth/session";
import type { AdminContentActionState } from "@/app/admin/content/action-state";
import { ConcertDiscType } from "@/generated/prisma/enums";
import { extractDriveFileId } from "@/lib/google-drive";
import { prisma } from "@/lib/prisma";
import { appendSlugSuffix, slugify } from "@/lib/slug";

const concertSchema = z.object({
  title: z.string().trim().min(1, "Concert name wajib diisi."),
  thumbnail: z.string().trim().min(1, "Thumbnail wajib diisi."),
  groupId: z
    .string()
    .trim()
    .optional()
    .transform((value) => value || undefined),
});

const videoSchema = z.object({
  title: z.string().trim().min(1, "Video title wajib diisi."),
  concertId: z.string().trim().min(1, "Concert wajib dipilih."),
  driveId: z.string().trim().min(1, "Drive ID wajib diisi."),
  description: z.string().trim().min(1, "Description wajib diisi."),
});

function inferDiscType(title: string) {
  const normalizedTitle = title.toLowerCase();

  if (normalizedTitle.includes("bonus")) {
    return ConcertDiscType.Bonus;
  }

  if (normalizedTitle.includes("dvd")) {
    return ConcertDiscType.DVD;
  }

  return ConcertDiscType.BD;
}

function ensureUniqueSlug(baseSlug: string, existingSlugs: string[]) {
  const slugSet = new Set(existingSlugs);

  if (!slugSet.has(baseSlug)) {
    return baseSlug;
  }

  let suffix = 2;
  let candidate = appendSlugSuffix(baseSlug, suffix);

  while (slugSet.has(candidate)) {
    suffix += 1;
    candidate = appendSlugSuffix(baseSlug, suffix);
  }

  return candidate;
}

async function getUniqueConcertSlug(title: string) {
  const baseSlug = slugify(title);
  const existingConcerts = await prisma.concert.findMany({
    where: {
      slug: {
        startsWith: baseSlug,
      },
    },
    select: {
      slug: true,
    },
  });

  return ensureUniqueSlug(
    baseSlug,
    existingConcerts.map((concert) => concert.slug),
  );
}

async function getUniqueVideoSlug(concertId: string, title: string) {
  const baseSlug = slugify(title);
  const existingVideos = await prisma.concertDisc.findMany({
    where: {
      concertId,
      slug: {
        startsWith: baseSlug,
      },
    },
    select: {
      slug: true,
    },
  });

  return ensureUniqueSlug(
    baseSlug,
    existingVideos.map((video) => video.slug),
  );
}

function revalidateArchivePaths({
  concertSlug,
  groupSlug,
}: {
  concertSlug?: string;
  groupSlug?: string;
}) {
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/recent");
  revalidatePath("/latest");

  if (groupSlug) {
    revalidatePath(`/groups/${groupSlug}`);
  }

  if (concertSlug) {
    revalidatePath(`/concerts/${concertSlug}`);
  }
}

export async function createConcertAction(
  _previousState: AdminContentActionState,
  formData: FormData,
): Promise<AdminContentActionState> {
  await requireAdminUser();

  const parsedValues = concertSchema.safeParse({
    title: formData.get("title"),
    thumbnail: formData.get("thumbnail"),
    groupId: formData.get("groupId"),
  });

  if (!parsedValues.success) {
    return {
      status: "error",
      message: "Periksa kembali data konser.",
      fieldErrors: parsedValues.error.flatten().fieldErrors,
    };
  }

  const group = parsedValues.data.groupId
    ? await prisma.group.findUnique({
        where: {
          id: parsedValues.data.groupId,
        },
        select: {
          id: true,
          slug: true,
        },
      })
    : null;

  if (parsedValues.data.groupId && !group) {
    return {
      status: "error",
      message: "Group yang dipilih tidak ditemukan.",
      fieldErrors: {
        groupId: ["Group yang dipilih tidak valid."],
      },
    };
  }

  const slug = await getUniqueConcertSlug(parsedValues.data.title);
  const concert = await prisma.concert.create({
    data: {
      title: parsedValues.data.title,
      slug,
      thumbnail: parsedValues.data.thumbnail,
      groupId: group?.id ?? null,
      year: new Date().getFullYear(),
      description: `Archive entry for ${parsedValues.data.title}.`,
    },
    select: {
      title: true,
      slug: true,
    },
  });

  revalidateArchivePaths({
    concertSlug: concert.slug,
    groupSlug: group?.slug,
  });

  return {
    status: "success",
    message: "Konser baru berhasil ditambahkan.",
    createdHref: `/concerts/${concert.slug}`,
    createdLabel: concert.title,
  };
}

export async function createConcertVideoAction(
  _previousState: AdminContentActionState,
  formData: FormData,
): Promise<AdminContentActionState> {
  await requireAdminUser();

  const parsedValues = videoSchema.safeParse({
    title: formData.get("title"),
    concertId: formData.get("concertId"),
    driveId: formData.get("driveId"),
    description: formData.get("description"),
  });

  if (!parsedValues.success) {
    return {
      status: "error",
      message: "Periksa kembali data video konser.",
      fieldErrors: parsedValues.error.flatten().fieldErrors,
    };
  }

  const driveId = extractDriveFileId(parsedValues.data.driveId);

  if (!/^[a-zA-Z0-9_-]+$/.test(driveId)) {
    return {
      status: "error",
      message: "Drive ID tidak valid.",
      fieldErrors: {
        driveId: ["Masukkan Google Drive file ID yang valid."],
      },
    };
  }

  const concert = await prisma.concert.findUnique({
    where: {
      id: parsedValues.data.concertId,
    },
    select: {
      id: true,
      slug: true,
      title: true,
      group: {
        select: {
          slug: true,
        },
      },
    },
  });

  if (!concert) {
    return {
      status: "error",
      message: "Konser yang dipilih tidak ditemukan.",
      fieldErrors: {
        concertId: ["Pilih konser yang tersedia."],
      },
    };
  }

  const slug = await getUniqueVideoSlug(concert.id, parsedValues.data.title);
  const latestVideo = await prisma.concertDisc.findFirst({
    where: {
      concertId: concert.id,
    },
    orderBy: {
      sortOrder: "desc",
    },
    select: {
      sortOrder: true,
    },
  });

  const video = await prisma.concertDisc.create({
    data: {
      concertId: concert.id,
      title: parsedValues.data.title,
      slug,
      description: parsedValues.data.description,
      driveId,
      type: inferDiscType(parsedValues.data.title),
      sortOrder: (latestVideo?.sortOrder ?? 0) + 1,
    },
    select: {
      id: true,
      title: true,
    },
  });

  revalidateArchivePaths({
    concertSlug: concert.slug,
    groupSlug: concert.group?.slug,
  });

  return {
    status: "success",
    message: "Video konser berhasil ditambahkan ke playlist.",
    createdHref: `/concerts/${concert.slug}/${video.id}`,
    createdLabel: `${concert.title} - ${video.title}`,
  };
}
