"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown, PanelLeftOpen, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  adminNavigationSections,
  type AdminNavigationSection,
} from "@/components/admin/admin-navigation";
import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";

type AdminSidebarProps = {
  adminName: string;
  adminEmail: string;
};

function isItemActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === href : pathname.startsWith(href);
}

function getInitialSections(pathname: string) {
  return adminNavigationSections.reduce<Record<string, boolean>>(
    (accumulator, section) => {
      accumulator[section.id] =
        section.id === "dashboard" ||
        section.items.some((item) => isItemActive(pathname, item.href));

      return accumulator;
    },
    {},
  );
}

export function AdminSidebar({
  adminName,
  adminEmail,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSections, setOpenSections] = useState(() =>
    getInitialSections(pathname),
  );

  const activeSections = useMemo(
    () =>
      adminNavigationSections.reduce<Record<string, boolean>>(
        (accumulator, section) => {
          accumulator[section.id] = section.items.some((item) =>
            isItemActive(pathname, item.href),
          );

          return accumulator;
        },
        {},
      ),
    [pathname],
  );

  function toggleSection(sectionId: AdminNavigationSection["id"]) {
    setOpenSections((current) => ({
      ...current,
      [sectionId]: !current[sectionId],
    }));
  }

  return (
    <aside className="xl:sticky xl:top-24 xl:self-start">
      <GlassPanel tone="elevated" glow="violet" className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/18 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.28em] text-primary">
              <Sparkles className="size-3.5" />
              Control Mesh
            </div>
            <h2 className="font-display mt-4 text-2xl font-semibold text-foreground">
              Admin Navigation
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {adminName}
            </p>
            <p className="text-xs text-muted-foreground/80">{adminEmail}</p>
          </div>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-2xl border border-border/70 bg-background/70 text-foreground transition hover:bg-background lg:hidden"
            onClick={() => setMobileOpen((current) => !current)}
            aria-label="Toggle admin navigation"
          >
            <PanelLeftOpen className="size-4" />
          </button>
        </div>

        <div className={cn("mt-6 space-y-3", !mobileOpen && "hidden lg:block")}>
          {adminNavigationSections.map((section) => {
            const SectionIcon = section.icon;
            const isOpen = openSections[section.id];
            const isSectionActive = activeSections[section.id];

            return (
              <div
                key={section.id}
                className="rounded-[24px] border border-border/60 bg-background/45 p-2"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 rounded-[18px] px-3 py-3 text-left transition hover:bg-background/70"
                  onClick={() => toggleSection(section.id)}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex size-10 items-center justify-center rounded-2xl border border-border/70 bg-card/80 text-muted-foreground transition",
                        isSectionActive && "border-primary/28 bg-primary/12 text-primary",
                      )}
                    >
                      <SectionIcon className="size-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-foreground">
                        {section.title}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {section.items.length} destinations
                      </span>
                    </span>
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-4 text-muted-foreground transition",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>

                <div className={cn("space-y-1 px-1 pb-1", !isOpen && "hidden")}>
                  {section.items.map((item) => {
                    const ItemIcon = item.icon;
                    const isActive = isItemActive(pathname, item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "group flex items-center gap-3 rounded-[18px] border px-3 py-3 transition",
                          isActive
                            ? "border-primary/28 bg-primary/12 shadow-[0_16px_38px_rgba(96,165,250,0.18)]"
                            : "border-transparent text-muted-foreground hover:border-border/70 hover:bg-card/80 hover:text-foreground",
                        )}
                      >
                        <span
                          className={cn(
                            "inline-flex size-10 items-center justify-center rounded-2xl border border-border/70 bg-background/70 text-muted-foreground transition",
                            isActive && "border-primary/28 bg-primary/10 text-primary",
                          )}
                        >
                          <ItemIcon className="size-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-foreground">
                            {item.title}
                          </span>
                          <span className="block truncate text-xs text-muted-foreground">
                            {item.description}
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </GlassPanel>
    </aside>
  );
}
