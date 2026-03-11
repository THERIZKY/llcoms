import { Activity, Clock3, Logs } from "lucide-react";
import { AdminModulePlaceholder } from "@/components/admin/admin-module-placeholder";

export default function AdminLogsPage() {
  return (
    <AdminModulePlaceholder
      eyebrow="System"
      title="Logs"
      description="Placeholder untuk audit trail, event logs, dan observability ringan yang dapat dipasang tanpa mengubah alur admin utama."
      stats={[
        {
          label: "Audit trail",
          value: "Placeholder",
          detail: "Ruang untuk event log saat auth atau content actions berjalan.",
          glow: "amber",
        },
        {
          label: "Timeline",
          value: "Chronological",
          detail: "Komponen feed dapat memakai pola visual yang sama dengan dashboard.",
          glow: "cyan",
        },
        {
          label: "Alerts",
          value: "Expandable",
          detail: "Notifikasi sistem dan incident states bisa ditambahkan di sini.",
          glow: "rose",
        },
      ]}
      tasks={[
        {
          title: "Event feed",
          description: "Daftar activity log dan severity badges bisa ditanamkan pada area ini.",
          icon: Activity,
        },
        {
          title: "Retention view",
          description: "Tambahkan filter waktu, scope, dan operator pada iterasi berikutnya.",
          icon: Clock3,
        },
        {
          title: "Audit exports",
          description: "Tempat untuk tindakan export log atau shared reports.",
          icon: Logs,
        },
      ]}
    />
  );
}
