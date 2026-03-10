import Link from "next/link";

type CardProps = {
  title: string;
  subtitle: string;
  gradient: string;
  href: string;
};

export function ArchiveCard({ title, subtitle, gradient, href }: CardProps) {
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className={`h-28 bg-gradient-to-br ${gradient}`} />
      <div className="space-y-1 p-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>
        <p className="line-clamp-2 text-xs text-zinc-600 dark:text-zinc-400">
          {subtitle}
        </p>
      </div>
    </Link>
  );
}
