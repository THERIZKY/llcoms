import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-muted/80",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.6s_infinite] before:content-['']",
        "before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.34),transparent)]",
        "dark:before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)]",
        className,
      )}
      {...props}
    />
  );
}
