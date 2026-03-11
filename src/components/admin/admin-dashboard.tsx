import {
  Activity,
  BarChart3,
  DatabaseZap,
  Radar,
  Settings2,
  Shield,
  Users,
  Waves,
} from "lucide-react";

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

const navigationItems = [
  { label: "Overview", icon: Radar, accent: "text-cyan-200" },
  { label: "Stream Management", icon: Waves, accent: "text-sky-200" },
  { label: "User Management", icon: Users, accent: "text-fuchsia-200" },
  { label: "Analytics", icon: BarChart3, accent: "text-violet-200" },
  { label: "System Settings", icon: Settings2, accent: "text-emerald-200" },
];

const statCards = (stats: AdminDashboardProps["stats"]) => [
  {
    label: "Registered Users",
    value: stats.userCount,
    detail: `${stats.verifiedUserCount} verified`,
    icon: Users,
    accent:
      "from-cyan-400/16 via-cyan-300/8 to-transparent text-cyan-100 shadow-cyan-500/10",
  },
  {
    label: "Admin Operators",
    value: stats.adminCount,
    detail: "role-protected access",
    icon: Shield,
    accent:
      "from-violet-400/16 via-violet-300/8 to-transparent text-violet-100 shadow-violet-500/10",
  },
  {
    label: "Archive Streams",
    value: stats.concertCount,
    detail: `${stats.videoCount} total videos`,
    icon: DatabaseZap,
    accent:
      "from-sky-400/16 via-sky-300/8 to-transparent text-sky-100 shadow-sky-500/10",
  },
  {
    label: "Engagement Events",
    value: stats.likeCount + stats.bookmarkCount,
    detail: `${stats.likeCount} likes · ${stats.bookmarkCount} bookmarks`,
    icon: Activity,
    accent:
      "from-fuchsia-400/16 via-rose-300/8 to-transparent text-fuchsia-100 shadow-fuchsia-500/10",
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
    <main className="relative isolate overflow-hidden bg-[#02040b] px-4 py-6 text-zinc-100 sm:px-6 sm:py-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_24%),radial-gradient(circle_at_78%_14%,rgba(168,85,247,0.18),transparent_24%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.12),transparent_28%),linear-gradient(180deg,#02040b_0%,#071021_54%,#02040b_100%)]" />
      <div className="mx-auto grid w-full max-w-7xl gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(4,10,24,0.92),rgba(6,11,20,0.82))] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl">
          <div className="rounded-[24px] border border-cyan-400/20 bg-cyan-400/8 p-4 shadow-[0_0_0_1px_rgba(34,211,238,0.1)]">
            <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200">
              Control Node
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-white">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              Welcome back, {adminName}. Neon glass panels below are wired to
              live archive metrics and role-protected controls.
            </p>
          </div>

          <nav className="mt-6 space-y-2">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  type="button"
                  className={`group flex w-full items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-left transition hover:border-white/16 hover:bg-white/[0.06] animate-in fade-in slide-in-from-left-4 duration-700 ${index === 0 ? "border-cyan-400/24 bg-cyan-400/10" : ""}`}
                  style={{
                    animationDelay: `${index * 70}ms`,
                  }}
                >
                  <span className={`inline-flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-black/20 ${item.accent}`}>
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white">{item.label}</p>
                    <p className="text-xs text-zinc-500">UI placeholder</p>
                  </div>
                </button>
              );
            })}
          </nav>

          <div className="mt-6 rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
              Service Status
            </p>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Google OAuth</span>
                <span className={googleEnabled ? "text-emerald-200" : "text-amber-200"}>
                  {googleEnabled ? "Online" : "Config needed"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Email Verification</span>
                <span
                  className={
                    emailVerificationEnabled ? "text-emerald-200" : "text-amber-200"
                  }
                >
                  {emailVerificationEnabled ? "Online" : "Log fallback"}
                </span>
              </div>
            </div>
          </div>
        </aside>

        <section className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card, index) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.label}
                  className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.34)] transition hover:-translate-y-0.5 hover:border-white/16 animate-in fade-in slide-in-from-bottom-4 duration-700 ${card.accent}`}
                  style={{
                    animationDelay: `${index * 90}ms`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/6 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-500">
                        {card.label}
                      </p>
                      <p className="mt-4 text-3xl font-semibold text-white">
                        {card.value}
                      </p>
                      <p className="mt-2 text-sm text-zinc-400">{card.detail}</p>
                    </div>
                    <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
                      <Icon className="size-5" />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_360px]">
            <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(7,14,30,0.92),rgba(6,9,18,0.82))] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-500">
                    User Management
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">
                    Recent account activity
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    Live data surface for account intake, verification status,
                    and role distribution.
                  </p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300">
                  {stats.verifiedUserCount}/{stats.userCount} verified
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="grid gap-3 rounded-[24px] border border-white/8 bg-black/20 p-4 transition hover:border-white/14 hover:bg-white/[0.04] md:grid-cols-[minmax(0,1fr)_120px_160px]"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">
                        {user.name ?? "Unnamed user"}
                      </p>
                      <p className="mt-1 truncate text-sm text-zinc-400">
                        {user.email}
                      </p>
                    </div>
                    <div className="text-sm">
                      <p className="text-zinc-500">Role</p>
                      <p className="mt-1 text-zinc-200">{user.role}</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-zinc-500">Verification</p>
                      <p className="mt-1 text-zinc-200">
                        {user.emailVerified ? "Verified" : "Pending"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="space-y-6">
              <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(5,13,28,0.92),rgba(5,9,18,0.84))] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl">
                <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-500">
                  Analytics
                </p>
                <h2 className="mt-3 text-xl font-semibold text-white">
                  Engagement pulse
                </h2>
                <div className="mt-5 space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm text-zinc-400">
                      <span>Likes</span>
                      <span>{stats.likeCount}</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-white/8">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,rgba(34,211,238,0.9),rgba(59,130,246,0.9))]"
                        style={{
                          width: `${Math.min(100, stats.likeCount * 8)}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm text-zinc-400">
                      <span>Bookmarks</span>
                      <span>{stats.bookmarkCount}</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-white/8">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,rgba(168,85,247,0.9),rgba(244,114,182,0.9))]"
                        style={{
                          width: `${Math.min(100, stats.bookmarkCount * 8)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(5,13,28,0.92),rgba(5,9,18,0.84))] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl">
                <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-500">
                  Stream Management
                </p>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="rounded-2xl border border-cyan-400/16 bg-cyan-400/8 p-4 text-zinc-200">
                    Upload queues, moderation tools, and publish scheduling can
                    plug into this panel next.
                  </div>
                  <div className="rounded-2xl border border-violet-400/16 bg-violet-400/8 p-4 text-zinc-200">
                    Use this area for playlist curation, thumbnail audits, and
                    archive rotation workflows.
                  </div>
                </div>
              </section>

              <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(5,13,28,0.92),rgba(5,9,18,0.84))] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl">
                <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-500">
                  System Settings
                </p>
                <div className="mt-4 space-y-3 text-sm text-zinc-300">
                  <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
                    <span>Auth mode</span>
                    <span className="text-cyan-200">Credentials + Google</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
                    <span>Email verification</span>
                    <span className="text-zinc-200">
                      {emailVerificationEnabled ? "Required" : "Dev log mode"}
                    </span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
