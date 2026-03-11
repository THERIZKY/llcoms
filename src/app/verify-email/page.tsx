import type { ReactNode } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2, MailCheck } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { GlassPanel } from "@/components/ui/glass-panel";
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
      ? "border-emerald-400/30 bg-emerald-400/10"
      : tone === "warning"
        ? "border-amber-300/30 bg-amber-300/10"
        : "border-border/70 bg-card/70";

  return (
    <GlassPanel
      className={`p-6 ${toneClasses}`}
      glow={tone === "success" ? "emerald" : tone === "warning" ? "amber" : "cyan"}
      tone={tone === "neutral" ? "default" : "elevated"}
    >
      <div className="inline-flex size-12 items-center justify-center rounded-2xl border border-border/70 bg-background/70 text-primary">
        {icon}
      </div>
      <h2 className="font-display mt-4 text-2xl font-semibold text-foreground">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-foreground"
      >
        {hrefLabel}
        <ArrowRight className="size-4" />
      </Link>
    </GlassPanel>
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
