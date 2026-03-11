import { cva } from "class-variance-authority"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_14px_34px_rgba(59,130,246,0.22)] hover:-translate-y-0.5 hover:bg-primary/92 hover:shadow-[0_18px_42px_rgba(59,130,246,0.26)]",
        outline:
          "border-border/70 bg-background/70 hover:border-primary/30 hover:bg-muted/80 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/55 dark:hover:bg-input/80",
        secondary:
          "bg-secondary/90 text-secondary-foreground hover:-translate-y-0.5 hover:bg-secondary aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted/70 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/70",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
        glass:
          "border-border/70 bg-card/70 text-foreground shadow-[0_16px_44px_rgba(15,23,42,0.08)] backdrop-blur-xl hover:-translate-y-0.5 hover:border-primary/25 hover:bg-card/90 dark:shadow-[0_16px_44px_rgba(0,0,0,0.28)]",
        neon:
          "border-primary/30 bg-[linear-gradient(135deg,rgba(96,165,250,0.95),rgba(168,85,247,0.92),rgba(244,114,182,0.9))] text-slate-950 shadow-[0_18px_48px_rgba(96,165,250,0.28)] hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_24px_64px_rgba(96,165,250,0.34)]",
        soft:
          "border-primary/18 bg-primary/10 text-foreground shadow-[0_12px_30px_rgba(96,165,250,0.10)] hover:-translate-y-0.5 hover:bg-primary/14 dark:text-primary-foreground",
      },
      size: {
        default:
          "h-9 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-11 gap-2 px-5 text-sm has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export { buttonVariants }
