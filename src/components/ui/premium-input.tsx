import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const premiumFieldShellClassName =
  "group flex items-center gap-3 rounded-[22px] border border-border/70 bg-background/60 px-4 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-xl transition focus-within:border-primary/45 focus-within:bg-background/86 focus-within:ring-4 focus-within:ring-primary/14 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]";

export const premiumInputClassName =
  "h-14 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/80";

export const premiumTextAreaClassName =
  "min-h-36 w-full resize-y bg-transparent py-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/80";

type PremiumInputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: LucideIcon;
  containerClassName?: string;
};

export const PremiumInput = forwardRef<HTMLInputElement, PremiumInputProps>(
  function PremiumInput(
    { className, containerClassName, icon: Icon, ...props },
    ref,
  ) {
    return (
      <span className={cn(premiumFieldShellClassName, "h-14", containerClassName)}>
        {Icon ? (
          <Icon className="size-4 shrink-0 text-muted-foreground transition group-focus-within:text-primary" />
        ) : null}
        <input ref={ref} className={cn(premiumInputClassName, className)} {...props} />
      </span>
    );
  },
);

type PremiumTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  icon?: LucideIcon;
  containerClassName?: string;
};

export const PremiumTextarea = forwardRef<
  HTMLTextAreaElement,
  PremiumTextareaProps
>(function PremiumTextarea(
  { className, containerClassName, icon: Icon, ...props },
  ref,
) {
  return (
    <span
      className={cn(
        premiumFieldShellClassName,
        "min-h-36 items-start py-0",
        containerClassName,
      )}
    >
      {Icon ? (
        <Icon className="mt-4 size-4 shrink-0 text-muted-foreground transition group-focus-within:text-primary" />
      ) : null}
      <textarea
        ref={ref}
        className={cn(premiumTextAreaClassName, className)}
        {...props}
      />
    </span>
  );
});
