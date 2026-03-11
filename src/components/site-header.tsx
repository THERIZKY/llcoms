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
    <header className="sticky top-0 z-40 border-b border-border/70 bg-[var(--header-bg)] backdrop-blur-2xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-[20px] bg-[linear-gradient(135deg,rgba(96,165,250,0.98),rgba(168,85,247,0.95),rgba(244,114,182,0.92))] text-xs font-black tracking-[0.24em] text-slate-950 shadow-[0_14px_30px_rgba(96,165,250,0.28)]">
            LL
          </span>
          <span className="space-y-0.5">
            <span className="block text-[10px] font-medium uppercase tracking-[0.34em] text-muted-foreground">
              Streaming Archive
            </span>
            <span className="font-display block text-sm font-semibold tracking-wide text-foreground">
              Love Live Concert Archive
            </span>
          </span>
        </Link>
        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <nav className="flex items-center gap-1 rounded-full border border-border/70 bg-card/80 p-1 backdrop-blur-xl">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition hover:bg-background/80 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            {sessionUser?.role === UserRole.admin ? (
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-foreground transition hover:bg-primary/14"
              >
                <LayoutDashboard className="size-4" />
                Admin
              </Link>
            ) : null}
          </nav>
          {sessionUser ? (
            <div className="flex items-center gap-2">
              <div className="rounded-full border border-border/70 bg-card/80 px-3 py-2 text-right backdrop-blur-xl">
                <p className="text-sm font-medium text-foreground">
                  {sessionUser.name ?? sessionUser.email}
                </p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {sessionUser.role}
                </p>
              </div>
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-4 py-2 text-sm text-foreground transition hover:-translate-y-0.5 hover:bg-card backdrop-blur-xl"
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
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-4 py-2 text-sm text-foreground transition hover:-translate-y-0.5 hover:bg-card backdrop-blur-xl"
              >
                <LogIn className="size-4" />
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full border border-primary/24 bg-primary/12 px-4 py-2 text-sm text-foreground transition hover:-translate-y-0.5 hover:bg-primary/16"
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
