import { redirect } from "next/navigation";
import { UserRole } from "@/generated/prisma/enums";
import { auth } from "@/auth";
import { isEmailVerificationEnabled, isGoogleAuthEnabled } from "@/auth/email";
import { sanitizeRedirectTo } from "@/auth/redirects";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

type LoginPageProps = {
  searchParams: Promise<{
    redirectTo?: string;
    reason?: string;
    verified?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await auth();

  if (session?.user) {
    redirect(session.user.role === UserRole.admin ? "/admin" : "/");
  }

  const resolvedSearchParams = await searchParams;
  const redirectTo = sanitizeRedirectTo(resolvedSearchParams.redirectTo);
  const infoMessage =
    resolvedSearchParams.verified === "1"
      ? "Email berhasil diverifikasi. Silakan login untuk melanjutkan."
      : resolvedSearchParams.reason === "admin"
        ? "Masuk dengan akun admin untuk membuka dashboard."
        : undefined;

  return (
    <AuthShell
      badge="Private Archive Access"
      title="A quieter way into the archive."
      description="Masuk ke arsip konser dengan antarmuka yang bersih, gelap, dan profesional, dengan aksen pastel halus yang menjaga nuansa Love Live tetap elegan."
      footerPrompt="Belum punya akun?"
      footerHref="/register"
      footerLabel="Register"
    >
      <LoginForm
        redirectTo={redirectTo}
        googleEnabled={isGoogleAuthEnabled()}
        emailVerificationEnabled={isEmailVerificationEnabled()}
        infoMessage={infoMessage}
      />
    </AuthShell>
  );
}
