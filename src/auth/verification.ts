import "server-only";
import { randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { getAppBaseUrl, sendVerificationEmail } from "@/auth/email";

const EMAIL_VERIFICATION_TTL_MS = 1000 * 60 * 60 * 24;

function generateVerificationToken() {
  return randomBytes(32).toString("hex");
}

export async function issueVerificationEmail(user: {
  email: string;
  name?: string | null;
}) {
  const expires = new Date(Date.now() + EMAIL_VERIFICATION_TTL_MS);
  const token = generateVerificationToken();

  await prisma.verificationToken.deleteMany({
    where: {
      identifier: user.email,
    },
  });

  await prisma.verificationToken.create({
    data: {
      identifier: user.email,
      token,
      expires,
    },
  });

  const verificationUrl = new URL("/verify-email", getAppBaseUrl());
  verificationUrl.searchParams.set("email", user.email);
  verificationUrl.searchParams.set("token", token);

  await sendVerificationEmail({
    email: user.email,
    name: user.name,
    verificationUrl: verificationUrl.toString(),
  });

  return {
    email: user.email,
    expires,
    verificationUrl: verificationUrl.toString(),
  };
}

export async function verifyEmailAddress(email: string, token: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const verificationToken = await prisma.verificationToken.findUnique({
    where: {
      identifier_token: {
        identifier: normalizedEmail,
        token,
      },
    },
  });

  if (!verificationToken) {
    return {
      status: "invalid",
    } as const;
  }

  if (verificationToken.expires < new Date()) {
    await prisma.verificationToken.deleteMany({
      where: {
        identifier: normalizedEmail,
      },
    });

    return {
      status: "expired",
    } as const;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
    select: {
      name: true,
    },
  });

  if (!user) {
    await prisma.verificationToken.deleteMany({
      where: {
        identifier: normalizedEmail,
      },
    });

    return {
      status: "invalid",
    } as const;
  }

  await prisma.$transaction([
    prisma.user.update({
      where: {
        email: normalizedEmail,
      },
      data: {
        emailVerified: new Date(),
      },
    }),
    prisma.verificationToken.deleteMany({
      where: {
        identifier: normalizedEmail,
      },
    }),
  ]);

  return {
    status: "success",
    userName: user.name,
  } as const;
}
