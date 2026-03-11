import type { ReactNode } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2, MailCheck } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { verifyEmailAddress } from "@/auth/verification";

type VerifyEmailPageProps = {
  searchParams: Promise<{
    email?: string;
    token?: string;
  }>;
};

function StatusCard({
  icon,
  title,
  description,
  href,
  hrefLabel,
  tone,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
  hrefLabel: string;
  tone: "success" | "warning" | "neutral";
}) {
  const toneClasses =
    tone === "success"
      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
      : tone === "warning"
        ? "border-amber-300/20 bg-amber-300/10 text-amber-100"
        : "border-white/10 bg-white/[0.03] text-zinc-200";

  return (
    <div className={`rounded-[28px] border p-6 ${toneClasses}`}>
      <div className="inline-flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
        {icon}
      </div>
      <h2 className="mt-4 text-2xl font-semibold text-white">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-current/85">{description}</p>
      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-zinc-200"
      >
        {hrefLabel}
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const resolvedSearchParams = await searchParams;

  let card = (
    <StatusCard
      icon={<MailCheck className="size-5 text-sky-200" />}
      title="Check your inbox"
      description="Buka tautan verifikasi dari email yang kami kirim setelah registrasi. Setelah diverifikasi, Anda dapat login dengan credentials."
      href="/login"
      hrefLabel="Back to login"
      tone="neutral"
    />
  );

  if (
    typeof resolvedSearchParams.email === "string" &&
    typeof resolvedSearchParams.token === "string"
  ) {
    const result = await verifyEmailAddress(
      resolvedSearchParams.email,
      resolvedSearchParams.token,
    );

    if (result.status === "success") {
      card = (
        <StatusCard
          icon={<CheckCircle2 className="size-5 text-emerald-200" />}
          title="Email verified"
          description={`Akun ${result.userName ?? resolvedSearchParams.email} sudah aktif. Silakan lanjut login untuk membuka fitur arsip personal.`}
          href="/login?verified=1"
          hrefLabel="Continue to login"
          tone="success"
        />
      );
    } else if (result.status === "expired") {
      card = (
        <StatusCard
          icon={<AlertTriangle className="size-5 text-amber-200" />}
          title="Verification link expired"
          description="Tautan verifikasi ini sudah kedaluwarsa. Kembali ke halaman login dan kirim ulang email verifikasi."
          href="/login"
          hrefLabel="Go to login"
          tone="warning"
        />
      );
    } else {
      card = (
        <StatusCard
          icon={<AlertTriangle className="size-5 text-rose-200" />}
          title="Verification failed"
          description="Tautan verifikasi tidak valid atau sudah pernah dipakai. Minta tautan baru dari halaman login jika akun Anda belum aktif."
          href="/login"
          hrefLabel="Go to login"
          tone="warning"
        />
      );
    }
  }

  return (
    <AuthShell
      badge="Email Verification"
      title="One final checkpoint before access."
      description="Verifikasi email menjaga akses credentials tetap aman dan memastikan hanya alamat yang valid yang dapat masuk ke arsip."
      footerPrompt="Perlu kembali?"
      footerHref="/login"
      footerLabel="Sign in"
    >
      {card}
    </AuthShell>
  );
}
