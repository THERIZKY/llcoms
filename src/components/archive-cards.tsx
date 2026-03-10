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
};

export function ArchiveCard({ title, imageSrc, href, meta }: CardProps) {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2, ease: "easeOut" }}>
      <Link
        href={href}
        className="group block overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800"
      >
        <div className="relative h-32 overflow-hidden bg-zinc-100 dark:bg-zinc-700">
          {hasImageError ? (
            <div className="flex h-full items-center justify-center text-xs font-medium text-zinc-500 dark:text-zinc-300">
              Thumbnail
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
        <div className="space-y-1 p-4">
          {meta ? (
            <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-300">
              {meta}
            </p>
          ) : null}
          <h3 className="line-clamp-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}
