"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Lock, Mail, MoveRight, UserRound } from "lucide-react";
import { registerAction } from "@/auth/actions";
import {
  initialAuthActionState,
  type AuthActionState,
} from "@/auth/action-state";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";
import { GlassPanel } from "@/components/ui/glass-panel";
import { PremiumInput } from "@/components/ui/premium-input";

type RegisterFormProps = {
  emailVerificationEnabled: boolean;
};

function MessageBlock({
  state,
}: {
  state: AuthActionState;
}) {
  if (!state.message) {
    return null;
  }

  const isSuccess = state.status === "success";

  return (
    <div
      className={`rounded-[22px] border px-4 py-3 text-sm ${
        isSuccess
          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-700 dark:text-emerald-100"
          : "border-rose-400/30 bg-rose-400/10 text-rose-700 dark:text-rose-100"
      }`}
    >
      {state.message}
    </div>
  );
}

function FieldError({
  errors,
}: {
  errors?: string[];
}) {
  if (!errors?.length) {
    return null;
  }

  return <p className="text-xs text-destructive">{errors[0]}</p>;
}

export function RegisterForm({
  emailVerificationEnabled,
}: RegisterFormProps) {
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialAuthActionState,
  );

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
          Registration
        </div>
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">
            Create account
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Buat akun untuk mengakses arsip, menyukai stream, dan menyimpan
            bookmark personal.
          </p>
        </div>
      </div>

      <MessageBlock state={state} />

      {!emailVerificationEnabled ? (
        <div className="rounded-[22px] border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-100">
          SMTP belum dikonfigurasi. Pada mode development, tautan verifikasi
          akan dicetak ke log server setelah registrasi.
        </div>
      ) : null}

      <form action={formAction} className="space-y-4">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foreground">Name</span>
          <PremiumInput
            type="text"
            name="name"
            icon={UserRound}
            placeholder="Nama tampilan"
          />
          <FieldError errors={state.fieldErrors?.name} />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-foreground">Email</span>
          <PremiumInput
            type="email"
            name="email"
            icon={Mail}
            placeholder="name@example.com"
          />
          <FieldError errors={state.fieldErrors?.email} />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-foreground">Password</span>
          <PremiumInput
            type="password"
            name="password"
            icon={Lock}
            placeholder="Minimal 8 karakter"
          />
          <FieldError errors={state.fieldErrors?.password} />
        </label>

        <AuthSubmitButton
          disabled={isPending}
          pendingLabel="Creating account..."
        >
          <span className="inline-flex items-center gap-2">
            Create account
            <MoveRight className="size-4" />
          </span>
        </AuthSubmitButton>
      </form>

      <GlassPanel tone="muted" className="p-4 text-sm leading-6 text-muted-foreground">
        Setelah registrasi, kami akan mengirim email verifikasi. Login dengan
        password akan dibuka hanya setelah email tersebut dikonfirmasi.
      </GlassPanel>

      <Link
        href="/login"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
      >
        Sudah punya akun? Sign in
        <MoveRight className="size-4" />
      </Link>
    </div>
  );
}
