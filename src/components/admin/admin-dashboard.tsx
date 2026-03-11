import Link from "next/link";
import {
  Activity,
  BarChart3,
  DatabaseZap,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import {
  adminDashboardSignals,
  adminQuickActions,
} from "@/components/admin/admin-navigation";
import { AdminViewShell } from "@/components/admin/admin-view-shell";
import { buttonVariants } from "@/components/ui/button-variants";
import { GlassPanel } from "@/components/ui/glass-panel";
import { DashboardMetricCard } from "@/components/ui/dashboard-metric-card";
import { cn, formatDateId } from "@/lib/utils";

type AdminDashboardProps = {
  adminName: string;
  stats: {
    userCount: number;
    adminCount: number;
    concertCount: number;
    videoCount: number;
    likeCount: number;
    bookmarkCount: number;
    verifiedUserCount: number;
  };
  recentUsers: Array<{
    id: string;
    name: string | null;
    email: string;
    role: string;
    emailVerified: Date | null;
    createdAt: Date;
  }>;
  googleEnabled: boolean;
  emailVerificationEnabled: boolean;
};

const statCards = (stats: AdminDashboardProps["stats"]) => [
  {
    label: "Registered Users",
    value: stats.userCount,
    detail: `${stats.verifiedUserCount} verified`,
    icon: Users,
    glow: "cyan" as const,
  },
  {
    label: "Admin Operators",
    value: stats.adminCount,
    detail: "role-protected access",
    icon: Shield,
    glow: "violet" as const,
  },
  {
    label: "Archive Streams",
    value: stats.concertCount,
    detail: `${stats.videoCount} total disc streams`,
    icon: DatabaseZap,
    glow: "amber" as const,
  },
  {
    label: "Engagement Events",
    value: stats.likeCount + stats.bookmarkCount,
    detail: `${stats.likeCount} likes · ${stats.bookmarkCount} bookmarks`,
    icon: Activity,
    glow: "rose" as const,
  },
];

export function AdminDashboard({
  adminName,
  stats,
  recentUsers,
  googleEnabled,
  emailVerificationEnabled,
}: AdminDashboardProps) {
  const cards = statCards(stats);

  return (
    <AdminViewShell
      eyebrow="Admin Control"
      title={`Welcome back, ${adminName}.`}
      description="Futuristic command center untuk memantau metrik arsip, mengatur konten baru, dan menjaga auth pipeline tetap rapi tanpa mengganggu alur streaming yang sudah ada."
      actions={
        adminQuickActions.slice(0, 2).map((action, index) => (
          <Link
            key={action.href}
            href={action.href}
            className={cn(
              buttonVariants({
                variant: index === 0 ? "neon" : "glass",
                size: "lg",
                className: "rounded-[20px]",
              }),
            )}
          >
            <action.icon className="size-4" />
            {action.title}
          </Link>
        ))
      }
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <DashboardMetricCard
            key={card.label}
            label={card.label}
            value={card.value}
            detail={card.detail}
            icon={card.icon}
            glow={card.glow}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.12fr)_360px]">
        <GlassPanel className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                Recent Activity
              </p>
              <h2 className="font-display mt-3 text-2xl font-semibold text-foreground">
                Account and operator pulse
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Snapshot ringan untuk aktivitas akun terbaru dan status verifikasi.
              </p>
            </div>
            <div className="rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm text-foreground">
              {stats.verifiedUserCount}/{stats.userCount} verified
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {recentUsers.map((user) => (
              <div
                key={user.id}
                className="grid gap-3 rounded-[24px] border border-border/70 bg-background/60 p-4 transition hover:-translate-y-0.5 hover:bg-background/80 md:grid-cols-[minmax(0,1fr)_130px_180px]"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {user.name ?? "Unnamed user"}
                  </p>
                  <p className="mt-1 truncate text-sm text-muted-foreground">
                    {user.email}
                  </p>
                </div>
                <div className="text-sm">
                  <p className="text-muted-foreground">Role</p>
                  <p className="mt-1 text-foreground">{user.role}</p>
                </div>
                <div className="text-sm">
                  <p className="text-muted-foreground">Verification</p>
                  <p className="mt-1 text-foreground">
                    {user.emailVerified
                      ? `Verified • ${formatDateId(user.emailVerified)}`
                      : "Pending"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        <div className="space-y-6">
          <GlassPanel tone="muted" glow="cyan" className="p-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
              Quick Actions
            </p>
            <div className="mt-4 space-y-3">
              {adminQuickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center justify-between gap-3 rounded-[22px] border border-border/70 bg-background/60 px-4 py-4 transition hover:-translate-y-0.5 hover:bg-background/78"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-10 items-center justify-center rounded-2xl border border-primary/18 bg-primary/10 text-primary">
                      <action.icon className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {action.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                  </div>
                  <Sparkles className="size-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel tone="muted" glow="violet" className="p-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
              Service Status
            </p>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-[20px] border border-border/70 bg-background/60 px-4 py-3">
                <span className="text-muted-foreground">Google OAuth</span>
                <span className={googleEnabled ? "text-emerald-500 dark:text-emerald-300" : "text-amber-600 dark:text-amber-300"}>
                  {googleEnabled ? "Online" : "Config needed"}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-[20px] border border-border/70 bg-background/60 px-4 py-3">
                <span className="text-muted-foreground">Email Verification</span>
                <span className={emailVerificationEnabled ? "text-emerald-500 dark:text-emerald-300" : "text-amber-600 dark:text-amber-300"}>
                  {emailVerificationEnabled ? "Required" : "Log fallback"}
                </span>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <GlassPanel className="p-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-primary/18 bg-primary/10 text-primary">
              <BarChart3 className="size-5" />
            </span>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                Stream Analytics
              </p>
              <h2 className="mt-1 text-xl font-semibold text-foreground">
                Placeholder signal board
              </h2>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Likes</span>
                <span>{stats.likeCount}</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-secondary/90">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,rgba(34,211,238,0.95),rgba(59,130,246,0.95))]"
                  style={{
                    width: `${Math.min(100, stats.likeCount * 8)}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Bookmarks</span>
                <span>{stats.bookmarkCount}</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-secondary/90">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,rgba(168,85,247,0.95),rgba(244,114,182,0.95))]"
                  style={{
                    width: `${Math.min(100, stats.bookmarkCount * 8)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel tone="muted" glow="amber" className="p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
            Dashboard Notes
          </p>
          <div className="mt-4 space-y-3">
            {adminDashboardSignals.map((signal) => (
              <div
                key={signal.label}
                className="rounded-[22px] border border-border/70 bg-background/60 p-4"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-2xl border border-primary/18 bg-primary/10 text-primary">
                    <signal.icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                      {signal.label}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold text-foreground">
                      {signal.value}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {signal.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </AdminViewShell>
  );
}
