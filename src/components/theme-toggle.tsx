"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const currentTheme = resolvedTheme === "light" ? "light" : "dark";

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-card/75 p-1 backdrop-blur-xl">
      <Button
        variant={currentTheme === "light" ? "soft" : "ghost"}
        size="sm"
        className="rounded-full px-3"
        onClick={() => setTheme("light")}
        aria-label="Use light mode"
        title="Use light mode"
      >
        <Sun className="size-4" />
        <span className="hidden sm:inline">Light</span>
      </Button>
      <Button
        variant={currentTheme === "dark" ? "neon" : "ghost"}
        size="sm"
        className="rounded-full px-3"
        onClick={() => setTheme("dark")}
        aria-label="Use dark mode"
        title="Use dark mode"
      >
        <Moon className="size-4" />
        <span className="hidden sm:inline">Dark</span>
      </Button>
    </div>
  );
}
