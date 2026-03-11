import { KeyRound, ShieldCheck, UserRoundCog } from "lucide-react";
import { AdminModulePlaceholder } from "@/components/admin/admin-module-placeholder";

export default function AdminRolesPage() {
  return (
    <AdminModulePlaceholder
      eyebrow="Users"
      title="Roles / Permissions"
      description="Placeholder untuk manajemen role, permission matrix, dan guardrail akses operator sebelum logika kebijakan ditambahkan."
      stats={[
        {
          label: "Access mode",
          value: "Role-based",
          detail: "Panel ini disiapkan untuk role admin dan aturan granular berikutnya.",
          glow: "violet",
        },
        {
          label: "Change safety",
          value: "Reviewed",
          detail: "Ruang untuk approval flow sebelum role diterapkan.",
          glow: "amber",
        },
        {
          label: "Audit context",
          value: "Available",
          detail: "Integrasi ke logs bisa ditambahkan tanpa mengubah halaman.",
          glow: "cyan",
        },
      ]}
      tasks={[
        {
          title: "Role matrix",
          description: "Bisa diisi permission grid atau grouped toggles per modul admin.",
          icon: UserRoundCog,
        },
        {
          title: "Security review",
          description: "Tambahkan review state sebelum role escalation dijalankan.",
          icon: ShieldCheck,
        },
        {
          title: "Key scopes",
          description: "Cocok untuk future API scopes atau operator capabilities.",
          icon: KeyRound,
        },
      ]}
    />
  );
}
