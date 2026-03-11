import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { toggleStreamBookmark } from "@/lib/stream-interactions";

type BookmarkRouteContext = {
  params: Promise<{
    concertId: string;
  }>;
};

export async function POST(_request: Request, context: BookmarkRouteContext) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      {
        message: "Anda harus login untuk menyimpan stream ini.",
      },
      {
        status: 401,
      },
    );
  }

  const { concertId } = await context.params;
  const concert = await prisma.concert.findUnique({
    where: {
      id: concertId,
    },
    select: {
      id: true,
    },
  });

  if (!concert) {
    return NextResponse.json(
      {
        message: "Stream tidak ditemukan.",
      },
      {
        status: 404,
      },
    );
  }

  const engagement = await toggleStreamBookmark(concertId, session.user.id);

  return NextResponse.json(engagement);
}
