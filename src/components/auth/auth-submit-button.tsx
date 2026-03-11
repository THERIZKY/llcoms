"use client";

import type { ReactNode } from "react";

type AuthSubmitButtonProps = {
  children: ReactNode;
  pendingLabel: string;
  disabled?: boolean;
};

export function AuthSubmitButton({
  children,
  pendingLabel,
  disabled,
}: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(253,164,175,0.96),rgba(244,114,182,0.96),rgba(125,211,252,0.96))] px-5 text-sm font-semibold text-slate-950 shadow-[0_20px_45px_rgba(244,114,182,0.18)] transition hover:scale-[1.01] hover:shadow-[0_24px_56px_rgba(125,211,252,0.18)] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {disabled ? pendingLabel : children}
    </button>
  );
}
