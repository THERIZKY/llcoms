import "server-only";
import { redirect } from "next/navigation";
import { UserRole } from "@/generated/prisma/enums";
import { auth } from "@/auth";
import { buildLoginHref } from "@/auth/redirects";

export async function getSessionUser() {
  const session = await auth();
  return session?.user ?? null;
}

export async function requireAdminUser() {
  const session = await auth();

  if (!session?.user) {
    redirect(buildLoginHref("/admin", "admin"));
  }

  if (session.user.role !== UserRole.admin) {
    redirect("/");
  }

  return session.user;
}
