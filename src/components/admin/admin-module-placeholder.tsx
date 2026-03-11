import type { LucideIcon } from "lucide-react";
import { Activity, Gauge, Sparkles } from "lucide-react";
import { AdminViewShell } from "@/components/admin/admin-view-shell";
import { GlassPanel } from "@/components/ui/glass-panel";
import { DashboardMetricCard } from "@/components/ui/dashboard-metric-card";

type PlaceholderStat = {
  label: string;
  value: string;
  detail: string;
  glow: "cyan" | "violet" | "rose" | "emerald" | "amber";
};

type PlaceholderTask = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type AdminModulePlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
  stats: PlaceholderStat[];
  tasks: PlaceholderTask[];
};

export function AdminModulePlaceholder({
  eyebrow,
  title,
  description,
  stats,
  tasks,
}: AdminModulePlaceholderProps) {
  return (
    <AdminViewShell eyebrow={eyebrow} title={title} description={description}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat, index) => (
          <DashboardMetricCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            detail={stat.detail}
            icon={index % 2 === 0 ? Gauge : Activity}
            glow={stat.glow}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <GlassPanel className="p-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-primary/18 bg-primary/10 text-primary">
              <Sparkles className="size-5" />
            </span>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Module roadmap
              </h2>
              <p className="text-sm text-muted-foreground">
                Placeholder ini memberi ruang untuk integrasi operasional berikutnya.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {tasks.map((task) => {
              const TaskIcon = task.icon;

              return (
                <div
                  key={task.title}
                  className="rounded-[24px] border border-border/70 bg-background/60 p-5"
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-2xl border border-border/70 bg-card/80 text-primary">
                    <TaskIcon className="size-4" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {task.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {task.description}
                  </p>
                </div>
              );
            })}
          </div>
        </GlassPanel>

        <GlassPanel tone="muted" glow="amber" className="p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
            Ready State
          </p>
          <h3 className="mt-3 text-lg font-semibold text-foreground">
            UI placeholder only
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Halaman ini sengaja fokus pada struktur, pola visual, dan ruang
            integrasi. Backend logic bisa ditambahkan per modul tanpa mengubah
            shell visual admin.
          </p>
        </GlassPanel>
      </div>
    </AdminViewShell>
  );
}
