import Link from "next/link";
import type { AdminContentActionState } from "@/app/admin/content/action-state";

export function AdminFormMessage({
  state,
}: {
  state: AdminContentActionState;
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
      <p>{state.message}</p>
      {isSuccess && state.createdHref && state.createdLabel ? (
        <Link
          href={state.createdHref}
          className="mt-2 inline-flex text-sm font-medium underline underline-offset-4"
        >
          Buka {state.createdLabel}
        </Link>
      ) : null}
    </div>
  );
}

export function AdminFieldError({
  errors,
}: {
  errors?: string[];
}) {
  if (!errors?.length) {
    return null;
  }

  return <p className="text-xs text-destructive">{errors[0]}</p>;
}
