"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Mail, Lock, MoveRight } from "lucide-react";
import {
  loginAction,
  resendVerificationAction,
  signInWithGoogleAction,
} from "@/auth/actions";
import {
  initialAuthActionState,
  type AuthActionState,
} from "@/auth/action-state";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Button } from "@/components/ui/button";
import { PremiumInput } from "@/components/ui/premium-input";

type LoginFormProps = {
  redirectTo: string;
  googleEnabled: boolean;
  emailVerificationEnabled: boolean;
  infoMessage?: string;
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

export function LoginForm({
  redirectTo,
  googleEnabled,
  emailVerificationEnabled,
  infoMessage,
}: LoginFormProps) {
  const [loginState, loginFormAction, isLoginPending] = useActionState(
    loginAction,
    initialAuthActionState,
  );
  const [resendState, resendFormAction, isResendPending] = useActionState(
    resendVerificationAction,
    initialAuthActionState,
  );

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
          Account Access
        </div>
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">
            Sign in
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Masuk untuk menyukai stream, menyimpan bookmark, dan membuka area
            admin bila akun Anda memiliki akses.
          </p>
        </div>
      </div>

      {infoMessage ? (
        <div className="rounded-[22px] border border-sky-400/30 bg-sky-400/10 px-4 py-3 text-sm text-sky-700 dark:text-sky-100">
          {infoMessage}
        </div>
      ) : null}

      <MessageBlock state={loginState} />
      <MessageBlock state={resendState} />

      {googleEnabled ? (
        <form action={signInWithGoogleAction}>
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <Button
            type="submit"
            variant="glass"
            size="lg"
            className="w-full rounded-[22px]"
          >
            <span className="inline-flex size-6 items-center justify-center rounded-full bg-background text-[11px] font-semibold text-foreground">
              G
            </span>
            Continue with Google
          </Button>
        </form>
      ) : (
        <div className="rounded-[22px] border border-dashed border-border/70 bg-secondary/60 px-4 py-3 text-sm text-muted-foreground">
          Google login aktif setelah `AUTH_GOOGLE_ID` dan `AUTH_GOOGLE_SECRET`
          diisi.
        </div>
      )}

      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or continue with email
        <span className="h-px flex-1 bg-border" />
      </div>

      <form action={loginFormAction} className="space-y-4">
        <input type="hidden" name="redirectTo" value={redirectTo} />

        <label className="block space-y-2">
          <span className="text-sm font-medium text-foreground">Email</span>
          <PremiumInput
            type="email"
            name="email"
            icon={Mail}
            placeholder="name@example.com"
          />
          <FieldError errors={loginState.fieldErrors?.email} />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-foreground">Password</span>
          <PremiumInput
            type="password"
            name="password"
            icon={Lock}
            placeholder="Masukkan password"
          />
          <FieldError errors={loginState.fieldErrors?.password} />
        </label>

        <AuthSubmitButton
          disabled={isLoginPending}
          pendingLabel="Signing in..."
        >
          <span className="inline-flex items-center gap-2">
            Sign in
            <MoveRight className="size-4" />
          </span>
        </AuthSubmitButton>
      </form>

      {loginState.email ? (
        <form
          action={resendFormAction}
          className="rounded-[26px]"
        >
          <input type="hidden" name="email" value={loginState.email} />
          <GlassPanel tone="muted" className="space-y-3 p-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Need a new verification email?
              </h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Kirim ulang tautan verifikasi ke {loginState.email}.
              </p>
              {!emailVerificationEnabled ? (
                <p className="mt-2 text-xs text-muted-foreground">
                  SMTP belum dikonfigurasi. Pada mode development, tautan akan
                  dicetak ke log server.
                </p>
              ) : null}
            </div>
            <AuthSubmitButton
              disabled={isResendPending}
              pendingLabel="Sending link..."
            >
              Send verification link
            </AuthSubmitButton>
          </GlassPanel>
        </form>
      ) : null}

      <p className="text-sm leading-6 text-muted-foreground">
        Dengan masuk, Anda dapat mengelola like dan bookmark stream pribadi
        secara aman.
      </p>

      <Link
        href="/register"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
      >
        Belum punya akun? Create one
        <MoveRight className="size-4" />
      </Link>
    </div>
  );
}
