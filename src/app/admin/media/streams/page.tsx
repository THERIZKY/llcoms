import { RadioTower, ShieldCheck, Waves } from "lucide-react";
import { AdminModulePlaceholder } from "@/components/admin/admin-module-placeholder";

export default function AdminStreamsPage() {
  return (
    <AdminModulePlaceholder
      eyebrow="Media / Streams"
      title="Streams"
      description="Placeholder operasional untuk quality checks, publish readiness, dan observasi health stream tanpa menyentuh logic streaming yang sudah berjalan."
      stats={[
        {
          label: "Monitoring",
          value: "Passive",
          detail: "Ruang untuk uptime, buffering, dan auth gating metrics.",
          glow: "cyan",
        },
        {
          label: "Review mode",
          value: "Curated",
          detail: "Panel review bisa ditambahkan untuk penjadwalan publish.",
          glow: "violet",
        },
        {
          label: "Security",
          value: "Role-gated",
          detail: "Kontrol admin tetap dibatasi tanpa mengubah player flow.",
          glow: "amber",
        },
      ]}
      tasks={[
        {
          title: "Health overlays",
          description: "Tambahkan uptime indicators, availability checks, dan fallback notes di sini.",
          icon: RadioTower,
        },
        {
          title: "Moderation queue",
          description: "Siapkan ruang untuk review stream sebelum publis atau re-publish.",
          icon: ShieldCheck,
        },
        {
          title: "Playback insights",
          description: "Widget ini bisa dihubungkan ke analytics ringan ketika datanya tersedia.",
          icon: Waves,
        },
      ]}
    />
  );
}
