import { Clapperboard, Scissors, TimerReset } from "lucide-react";
import { AdminModulePlaceholder } from "@/components/admin/admin-module-placeholder";

export default function AdminClipsPage() {
  return (
    <AdminModulePlaceholder
      eyebrow="Media / Streams"
      title="Clips"
      description="Placeholder untuk pengelolaan short-form clips, highlight packs, dan reuse assets untuk promosi internal."
      stats={[
        {
          label: "Clip queue",
          value: "Staged",
          detail: "Ruang untuk draft clip dan review cadence.",
          glow: "rose",
        },
        {
          label: "Export packs",
          value: "Template-ready",
          detail: "Tempat untuk preset sosial dan promo snippets.",
          glow: "amber",
        },
        {
          label: "Turnaround",
          value: "Fast lane",
          detail: "Shell ini siap menampung status edit dan publish.",
          glow: "cyan",
        },
      ]}
      tasks={[
        {
          title: "Highlight drafts",
          description: "Daftar clip draft bisa tampil di area kartu ini.",
          icon: Scissors,
        },
        {
          title: "Reusable snippets",
          description: "Bangun bank clip pendek untuk promosi atau teaser internal.",
          icon: Clapperboard,
        },
        {
          title: "Review timing",
          description: "Tambahkan SLA dan time-to-publish indicators di sini.",
          icon: TimerReset,
        },
      ]}
    />
  );
}
