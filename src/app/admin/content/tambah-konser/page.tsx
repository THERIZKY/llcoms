import { CalendarDays, Clapperboard, ImageIcon, Link2, Tag } from "lucide-react";
import { AdminPlaceholderForm } from "@/components/admin/admin-placeholder-form";

export default function AdminTambahKonserPage() {
  return (
    <AdminPlaceholderForm
      eyebrow="Content Management"
      title="Tambah Konser"
      description="Siapkan entri konser baru dengan metadata utama, identitas grup, dan cover art sebelum dihubungkan ke alur publish yang sebenarnya."
      fields={[
        {
          label: "Judul konser",
          name: "title",
          icon: Clapperboard,
          placeholder: "Liella 5th Live Tour",
        },
        {
          label: "Slug",
          name: "slug",
          icon: Link2,
          placeholder: "liella-5th-live-tour",
        },
        {
          label: "Group",
          name: "group",
          icon: Tag,
          kind: "select",
          placeholder: "Pilih group",
          options: [
            { label: "mu's", value: "muse" },
            { label: "Aqours", value: "aqours" },
            { label: "Nijigasaki", value: "nijigasaki" },
            { label: "Liella", value: "liella" },
          ],
        },
        {
          label: "Tahun event",
          name: "year",
          icon: CalendarDays,
          type: "number",
          placeholder: "2026",
        },
        {
          label: "Thumbnail URL",
          name: "thumbnail",
          icon: ImageIcon,
          placeholder: "/images/concerts/new-concert.svg",
          span: "full",
        },
        {
          label: "IDDRIVE",
          name: "driveFileId",
          icon: Link2,
          placeholder: "1YCTRkFrG68vXTLYwrHxM3Zcnl0V5RG9o",
          description: "Isi Google Drive file ID untuk sumber playback utama. Gunakan ID file, bukan URL penuh.",
          span: "full",
        },
        {
          label: "Deskripsi konser",
          name: "description",
          icon: Clapperboard,
          kind: "textarea",
          placeholder: "Ringkasan nuansa panggung, konsep visual, dan momen utama konser.",
          span: "full",
        },
      ]}
      insights={[
        {
          title: "Metadata first",
          description:
            "Gunakan form ini untuk memvalidasi urutan field dan layout sebelum aksi create Prisma dihubungkan.",
        },
        {
          title: "Visual consistency",
          description:
            "Thumbnail, slug, dan group dipisahkan agar operator bisa memeriksa tampilan katalog dari awal.",
        },
        {
          title: "Playback source",
          description:
            "Field IDDRIVE disiapkan supaya sumber video utama sudah tercatat sejak entri konser dibuat dan tidak tertinggal saat proses publish.",
        },
      ]}
    />
  );
}
