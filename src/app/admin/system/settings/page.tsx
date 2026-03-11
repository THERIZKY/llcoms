import { Cpu, Settings2, ShieldCheck } from "lucide-react";
import { AdminModulePlaceholder } from "@/components/admin/admin-module-placeholder";

export default function AdminSettingsPage() {
  return (
    <AdminModulePlaceholder
      eyebrow="System"
      title="Settings"
      description="Placeholder untuk pengaturan auth, media defaults, dan konfigurasi lingkungan admin yang akan tumbuh seiring kebutuhan sistem."
      stats={[
        {
          label: "Config state",
          value: "Modular",
          detail: "Ruang untuk setting auth, email, dan branding admin.",
          glow: "cyan",
        },
        {
          label: "Environment",
          value: "Scoped",
          detail: "Setiap grup setting bisa dipisah tanpa membebani halaman.",
          glow: "amber",
        },
        {
          label: "Safety rails",
          value: "Ready",
          detail: "Confirm dialogs dan audit flows bisa ditambahkan di shell ini.",
          glow: "violet",
        },
      ]}
      tasks={[
        {
          title: "Auth tuning",
          description: "Tempat untuk toggle provider, fallback, atau pesan verifikasi.",
          icon: ShieldCheck,
        },
        {
          title: "System defaults",
          description: "Tambahkan default playback, thumbnail, dan content ordering di sini.",
          icon: Settings2,
        },
        {
          title: "Infra notes",
          description: "Gunakan panel ini untuk pengingat environment dan health configuration.",
          icon: Cpu,
        },
      ]}
    />
  );
}
