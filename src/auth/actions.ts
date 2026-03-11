"use server";

import { AuthError } from "next-auth";
import { UserRole } from "@/generated/prisma/enums";
import type { AuthActionState } from "@/auth/action-state";
import { signIn, signOut } from "@/auth";
import { sanitizeRedirectTo } from "@/auth/redirects";
import {
  emailOnlySchema,
  loginSchema,
  registrationSchema,
} from "@/auth/validation";
import { issueVerificationEmail } from "@/auth/verification";
import { hashPassword, verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";

function getAuthErrorMessage(error: AuthError) {
  if (error.type === "CredentialsSignin") {
    return "Email atau password tidak cocok.";
  }

  return "Autentikasi gagal. Coba lagi beberapa saat lagi.";
}

export async function loginAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const redirectTo = sanitizeRedirectTo(formData.get("redirectTo"));
  const parsedValues = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsedValues.success) {
    return {
      status: "error",
      message: "Periksa kembali data login Anda.",
      fieldErrors: parsedValues.error.flatten().fieldErrors,
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: parsedValues.data.email,
    },
    select: {
      email: true,
      name: true,
      password: true,
      emailVerified: true,
    },
  });

  if (!user?.password) {
    return {
      status: "error",
      message: "Email atau password tidak cocok.",
    };
  }

  if (!user.emailVerified) {
    return {
      status: "error",
      message:
        "Email Anda belum diverifikasi. Periksa inbox lalu lanjutkan login.",
      email: user.email,
    };
  }

  const passwordMatches = await verifyPassword(
    parsedValues.data.password,
    user.password,
  );

  if (!passwordMatches) {
    return {
      status: "error",
      message: "Email atau password tidak cocok.",
    };
  }

  try {
    await signIn("credentials", {
      email: parsedValues.data.email,
      password: parsedValues.data.password,
      redirectTo,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        status: "error",
        message: getAuthErrorMessage(error),
      };
    }

    throw error;
  }

  return {};
}

export async function registerAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsedValues = registrationSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsedValues.success) {
    return {
      status: "error",
      message: "Periksa kembali data pendaftaran Anda.",
      fieldErrors: parsedValues.error.flatten().fieldErrors,
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: parsedValues.data.email,
    },
    select: {
      id: true,
      email: true,
      name: true,
      password: true,
      emailVerified: true,
      accounts: {
        select: {
          provider: true,
        },
        take: 1,
      },
    },
  });

  if (existingUser?.accounts.length && !existingUser.password) {
    return {
      status: "error",
      message:
        "Email ini sudah terhubung dengan Google. Gunakan tombol Google untuk masuk.",
    };
  }

  if (existingUser?.emailVerified) {
    return {
      status: "error",
      message: "Email ini sudah terdaftar. Silakan masuk.",
    };
  }

  if (existingUser) {
    try {
      await issueVerificationEmail({
        email: existingUser.email,
        name: existingUser.name,
      });
    } catch {
      return {
        status: "error",
        message:
          "Akun Anda sudah ada tetapi email verifikasi gagal dikirim. Coba lagi dari halaman login.",
        email: existingUser.email,
      };
    }

    return {
      status: "success",
      message:
        "Akun Anda sudah dibuat tetapi belum diverifikasi. Email verifikasi baru telah dikirim.",
      email: existingUser.email,
    };
  }

  const hashedPassword = await hashPassword(parsedValues.data.password);
  const user = await prisma.user.create({
    data: {
      name: parsedValues.data.name,
      email: parsedValues.data.email,
      password: hashedPassword,
      role: UserRole.user,
    },
  });

  try {
    await issueVerificationEmail({
      email: user.email,
      name: user.name,
    });
  } catch {
    return {
      status: "error",
      message:
        "Akun berhasil dibuat, tetapi email verifikasi gagal dikirim. Gunakan fitur kirim ulang verifikasi di halaman login.",
      email: user.email,
    };
  }

  return {
    status: "success",
    message:
      "Pendaftaran berhasil. Periksa email Anda untuk verifikasi sebelum login.",
    email: user.email,
  };
}

export async function resendVerificationAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsedValues = emailOnlySchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsedValues.success) {
    return {
      status: "error",
      message: "Masukkan alamat email yang valid.",
      fieldErrors: parsedValues.error.flatten().fieldErrors,
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: parsedValues.data.email,
    },
    select: {
      email: true,
      name: true,
      password: true,
      emailVerified: true,
      accounts: {
        select: {
          provider: true,
        },
        take: 1,
      },
    },
  });

  if (!user) {
    return {
      status: "success",
      message:
        "Jika email tersebut terdaftar, tautan verifikasi baru sudah dikirim.",
    };
  }

  if (user.emailVerified) {
    return {
      status: "success",
      message: "Email ini sudah diverifikasi. Silakan login.",
      email: user.email,
    };
  }

  if (user.accounts.length && !user.password) {
    return {
      status: "error",
      message:
        "Email ini menggunakan Google login dan tidak memerlukan verifikasi password.",
    };
  }

  try {
    await issueVerificationEmail({
      email: user.email,
      name: user.name,
    });
  } catch {
    return {
      status: "error",
      message: "Gagal mengirim ulang email verifikasi. Coba lagi.",
      email: user.email,
    };
  }

  return {
    status: "success",
    message:
      "Tautan verifikasi baru telah dikirim. Periksa inbox atau folder spam Anda.",
    email: user.email,
  };
}

export async function signInWithGoogleAction(formData: FormData) {
  const redirectTo = sanitizeRedirectTo(formData.get("redirectTo"));
  await signIn("google", {
    redirectTo,
  });
}

export async function signOutAction() {
  await signOut({
    redirectTo: "/",
  });
}
