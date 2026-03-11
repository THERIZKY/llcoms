"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  Lock,
  Mail,
  MoveRight,
  UserRound,
} from "lucide-react";
import {
  registerAction,
} from "@/auth/actions";
import {
  initialAuthActionState,
  type AuthActionState,
} from "@/auth/action-state";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";

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
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-300">
          Registration
        </div>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            Create account
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Buat akun untuk mengakses arsip, menyukai stream, dan menyimpan
            bookmark personal.
          </p>
        </div>
      </div>

      <MessageBlock state={state} />

      {!emailVerificationEnabled ? (
        <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">
          SMTP belum dikonfigurasi. Pada mode development, tautan verifikasi
          akan dicetak ke log server setelah registrasi.
        </div>
      ) : null}

      <form action={formAction} className="space-y-4">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-zinc-200">Name</span>
          <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-zinc-300 transition focus-within:border-rose-300/35">
            <UserRound className="size-4 text-zinc-500" />
            <input
              type="text"
              name="name"
              placeholder="Nama tampilan"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
            />
          </span>
          <FieldError errors={state.fieldErrors?.name} />
        </label>

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
          <FieldError errors={state.fieldErrors?.email} />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-zinc-200">Password</span>
          <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-zinc-300 transition focus-within:border-rose-300/35">
            <Lock className="size-4 text-zinc-500" />
            <input
              type="password"
              name="password"
              placeholder="Minimal 8 karakter"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
            />
          </span>
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

      <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-zinc-400">
        Setelah registrasi, kami akan mengirim email verifikasi. Login dengan
        password akan dibuka hanya setelah email tersebut dikonfirmasi.
      </div>

      <Link
        href="/login"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
      >
        Sudah punya akun? Sign in
        <MoveRight className="size-4" />
      </Link>
    </div>
  );
}
