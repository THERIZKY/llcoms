import { BadgeCheck, UserRoundSearch, Users } from "lucide-react";
import { AdminModulePlaceholder } from "@/components/admin/admin-module-placeholder";

export default function AdminUserListPage() {
  return (
    <AdminModulePlaceholder
      eyebrow="Users"
      title="User List"
      description="Placeholder untuk pencarian akun, verifikasi status, dan tindakan admin ringan pada daftar pengguna."
      stats={[
        {
          label: "Directory",
          value: "Indexed",
          detail: "Ruang untuk search, filters, dan batch review user.",
          glow: "cyan",
        },
        {
          label: "Verification",
          value: "Visible",
          detail: "Tambahkan badge verifikasi dan status aktif di tabel user.",
          glow: "emerald",
        },
        {
          label: "Role signals",
          value: "Contextual",
          detail: "Komponen list bisa reuse palette admin saat data tumbuh.",
          glow: "violet",
        },
      ]}
      tasks={[
        {
          title: "Search and filter",
          description: "Panel ini siap untuk search email, role, dan verification state.",
          icon: UserRoundSearch,
        },
        {
          title: "Account badges",
          description: "Badge verified, pending, atau suspended dapat ditambahkan tanpa merombak shell.",
          icon: BadgeCheck,
        },
        {
          title: "Bulk actions",
          description: "Nantinya cocok untuk select-many dan aksi administratif ringan.",
          icon: Users,
        },
      ]}
    />
  );
}
