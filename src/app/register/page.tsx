import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { isEmailVerificationEnabled } from "@/auth/email";
import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

export default async function RegisterPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <AuthShell
      badge="Create Your Account"
      title="Register once, verify once, keep the archive personal."
      description="Buat akun baru untuk mengakses fitur arsip personal. Verifikasi email menjadi lapisan wajib sebelum login dengan password dibuka."
      footerPrompt="Sudah punya akun?"
      footerHref="/login"
      footerLabel="Sign in"
    >
      <RegisterForm emailVerificationEnabled={isEmailVerificationEnabled()} />
    </AuthShell>
  );
}
