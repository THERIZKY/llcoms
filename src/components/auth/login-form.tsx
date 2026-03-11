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
      className={`rounded-2xl border px-4 py-3 text-sm ${
        isSuccess
          ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
          : "border-rose-400/20 bg-rose-400/10 text-rose-100"
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

  return <p className="text-xs text-rose-200">{errors[0]}</p>;
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
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-300">
          Account Access
        </div>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            Sign in
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Masuk untuk menyukai stream, menyimpan bookmark, dan membuka area
            admin bila akun Anda memiliki akses.
          </p>
        </div>
      </div>

      {infoMessage ? (
        <div className="rounded-2xl border border-sky-400/20 bg-sky-400/10 px-4 py-3 text-sm text-sky-100">
          {infoMessage}
        </div>
      ) : null}

      <MessageBlock state={loginState} />
      <MessageBlock state={resendState} />

      {googleEnabled ? (
        <form action={signInWithGoogleAction}>
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <button
            type="submit"
            className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-5 text-sm font-medium text-white transition hover:bg-white/[0.08]"
          >
            <span className="inline-flex size-6 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-zinc-950">
              G
            </span>
            Continue with Google
          </button>
        </form>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-400">
          Google login aktif setelah `AUTH_GOOGLE_ID` dan `AUTH_GOOGLE_SECRET`
          diisi.
        </div>
      )}

      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-zinc-500">
        <span className="h-px flex-1 bg-white/10" />
        or continue with email
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <form action={loginFormAction} className="space-y-4">
        <input type="hidden" name="redirectTo" value={redirectTo} />

        <label className="block space-y-2">
          <span className="text-sm font-medium text-zinc-200">Email</span>
          <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-zinc-300 transition focus-within:border-rose-300/35">
            <Mail className="size-4 text-zinc-500" />
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
            />
          </span>
          <FieldError errors={loginState.fieldErrors?.email} />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-zinc-200">Password</span>
          <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-zinc-300 transition focus-within:border-rose-300/35">
            <Lock className="size-4 text-zinc-500" />
            <input
              type="password"
              name="password"
              placeholder="Masukkan password"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
            />
          </span>
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
          className="rounded-[26px] border border-white/10 bg-white/[0.03] p-4"
        >
          <input type="hidden" name="email" value={loginState.email} />
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-white">
                Need a new verification email?
              </h3>
              <p className="mt-1 text-sm leading-6 text-zinc-400">
                Kirim ulang tautan verifikasi ke {loginState.email}.
              </p>
              {!emailVerificationEnabled ? (
                <p className="mt-2 text-xs text-zinc-500">
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
          </div>
        </form>
      ) : null}

      <p className="text-sm leading-6 text-zinc-500">
        Dengan masuk, Anda dapat mengelola like dan bookmark stream pribadi
        secara aman.
      </p>

      <Link
        href="/register"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
      >
        Belum punya akun? Create one
        <MoveRight className="size-4" />
      </Link>
    </div>
  );
}
