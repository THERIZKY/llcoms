import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/latest", label: "Latest Posts" },
  { href: "/recent", label: "Recent Concerts" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-zinc-100/95 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-800/95">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="text-sm font-semibold tracking-wide">
          Love Live Concert Archive
        </Link>
        <nav className="flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-zinc-700 transition hover:bg-zinc-200 dark:text-zinc-100 dark:hover:bg-zinc-700"
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
