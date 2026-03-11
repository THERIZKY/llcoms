import Link from "next/link";
import { LayoutDashboard, LogIn, LogOut, UserRoundPlus } from "lucide-react";
import { auth } from "@/auth";
import { signOutAction } from "@/auth/actions";
import { UserRole } from "@/generated/prisma/enums";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/latest", label: "Latest Posts" },
  { href: "/recent", label: "Recent Concerts" },
];

export async function SiteHeader() {
  const session = await auth();
  const sessionUser = session?.user;

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#070a10]/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 via-orange-400 to-amber-300 text-xs font-black tracking-[0.24em] text-black shadow-lg shadow-rose-950/40">
            LL
          </span>
          <span className="space-y-0.5">
            <span className="block text-[10px] font-medium uppercase tracking-[0.34em] text-zinc-500">
              Streaming Archive
            </span>
            <span className="block text-sm font-semibold tracking-wide text-white">
              Love Live Concert Archive
            </span>
          </span>
        </Link>
        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <nav className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            {sessionUser?.role === UserRole.admin ? (
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-cyan-200 transition hover:bg-white/10 hover:text-white"
              >
                <LayoutDashboard className="size-4" />
                Admin
              </Link>
            ) : null}
          </nav>
          {sessionUser ? (
            <div className="flex items-center gap-2">
              <div className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-right">
                <p className="text-sm font-medium text-white">
                  {sessionUser.name ?? sessionUser.email}
                </p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                  {sessionUser.role}
                </p>
              </div>
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-zinc-200 transition hover:bg-white/10 hover:text-white"
                >
                  <LogOut className="size-4" />
                  Sign out
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-zinc-200 transition hover:bg-white/10 hover:text-white"
              >
                <LogIn className="size-4" />
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full border border-rose-300/20 bg-rose-400/10 px-4 py-2 text-sm text-rose-100 transition hover:bg-rose-400/16 hover:text-white"
              >
                <UserRoundPlus className="size-4" />
                Register
              </Link>
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
