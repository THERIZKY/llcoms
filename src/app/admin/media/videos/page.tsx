import { Film, Library, Sparkles } from "lucide-react";
import { AdminModulePlaceholder } from "@/components/admin/admin-module-placeholder";

export default function AdminVideosPage() {
  return (
    <AdminModulePlaceholder
      eyebrow="Media / Streams"
      title="Videos"
      description="Placeholder untuk kurasi katalog video, rotasi thumbnail, dan quality review setelah upload asset selesai."
      stats={[
        {
          label: "Library mode",
          value: "Curated",
          detail: "Fokus ke kebersihan katalog dan struktur metadata.",
          glow: "cyan",
        },
        {
          label: "Review stage",
          value: "Ready",
          detail: "Tempat untuk menambahkan audit thumbnail dan title checks.",
          glow: "rose",
        },
        {
          label: "Operator flow",
          value: "Single pane",
          detail: "Video grid nantinya dapat ditempatkan dalam shell yang sama.",
          glow: "violet",
        },
      ]}
      tasks={[
        {
          title: "Video catalog",
          description: "Gunakan area ini untuk daftar video, filter, dan state publish.",
          icon: Film,
        },
        {
          title: "Asset grouping",
          description: "Tambahkan grouping per konser atau per unit tanpa mengubah layout utama.",
          icon: Library,
        },
        {
          title: "Visual QA",
          description: "Placeholder untuk cek cover, crop, dan konsistensi judul.",
          icon: Sparkles,
        },
      ]}
    />
  );
}
