"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [hasImageError, setHasImageError] = useState(false);
  const isCompact = size === "compact";

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2, ease: "easeOut" }}>
      <Link
        href={href}
        className="group block overflow-hidden rounded-[26px] border border-border/70 bg-card/75 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-[0_24px_72px_rgba(96,165,250,0.16)] dark:shadow-[0_24px_72px_rgba(0,0,0,0.32)]"
      >
        <div
          className={`relative overflow-hidden bg-secondary ${
            isCompact ? "h-24" : "h-32"
          }`}
        >
          {isImageLoading ? (
            <div className="absolute inset-0 z-10">
              <Skeleton className="h-full w-full rounded-none" />
            </div>
          ) : null}
          {hasImageError ? (
            <div className="flex h-full items-center justify-center text-xs font-medium text-muted-foreground">
              Sampul
            </div>
          ) : (
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              onError={() => {
                setHasImageError(true);
                setIsImageLoading(false);
              }}
              onLoad={() => setIsImageLoading(false)}
            />
          )}
        </div>
        <div className={`space-y-1 ${isCompact ? "p-3" : "p-4"}`}>
          {meta ? (
            <p
              className={`font-medium uppercase tracking-wide text-muted-foreground ${
                isCompact ? "line-clamp-1 text-[10px]" : "text-[11px]"
              }`}
            >
              {meta}
            </p>
          ) : null}
          <h3
            className={`line-clamp-2 font-semibold text-foreground ${
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
