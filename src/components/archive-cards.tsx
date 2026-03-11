"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

type CardProps = {
  title: string;
  imageSrc: string;
  href: string;
  meta?: string;
  size?: "default" | "compact";
};

export function ArchiveCard({
  title,
  imageSrc,
  href,
  meta,
  size = "default",
}: CardProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const isCompact = size === "compact";

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2, ease: "easeOut" }}>
      <Link
        href={href}
        className="group block overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800"
      >
        <div
          className={`relative overflow-hidden bg-zinc-100 dark:bg-zinc-700 ${
            isCompact ? "h-24" : "h-32"
          }`}
        >
          {hasImageError ? (
            <div className="flex h-full items-center justify-center text-xs font-medium text-zinc-500 dark:text-zinc-300">
              Sampul
            </div>
          ) : (
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              onError={() => setHasImageError(true)}
            />
          )}
        </div>
        <div className={`space-y-1 ${isCompact ? "p-3" : "p-4"}`}>
          {meta ? (
            <p
              className={`font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-300 ${
                isCompact ? "line-clamp-1 text-[10px]" : "text-[11px]"
              }`}
            >
              {meta}
            </p>
          ) : null}
          <h3
            className={`line-clamp-2 font-semibold text-zinc-900 dark:text-zinc-100 ${
              isCompact ? "text-[13px]" : "text-sm"
            }`}
          >
            {title}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}
