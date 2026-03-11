import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { likeStream } from "@/lib/stream-interactions";
import { prisma } from "@/lib/prisma";

type LikeRouteContext = {
  params: Promise<{
    concertId: string;
  }>;
};

export async function POST(_request: Request, context: LikeRouteContext) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      {
        message: "Anda harus login untuk menyukai stream ini.",
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

  const engagement = await likeStream(concertId, session.user.id);

  return NextResponse.json(engagement);
}
