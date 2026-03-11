import { Clock3, Link2, ListMusic, PlaySquare, Rows3 } from "lucide-react";
import { AdminPlaceholderForm } from "@/components/admin/admin-placeholder-form";

export default function AdminTambahPlaylistPage() {
  return (
    <AdminPlaceholderForm
      eyebrow="Content Management"
      title="Tambah Playlist"
      description="Susun rangkaian playlist konser, tautan sumber, dan urutan penayangan dengan pola UI yang siap dipakai untuk operasional media."
      fields={[
        {
          label: "Nama playlist",
          name: "playlistName",
          icon: ListMusic,
          placeholder: "Day 1 Full Concert",
        },
        {
          label: "Konser terkait",
          name: "concert",
          icon: PlaySquare,
          kind: "select",
          placeholder: "Pilih konser",
          options: [
            { label: "mu's Final LoveLive!", value: "muse-final" },
            { label: "Aqours 6th", value: "aqours-6th" },
            { label: "Love Live! Fest", value: "ll-fest" },
          ],
        },
        {
          label: "Urutan playlist",
          name: "order",
          icon: Rows3,
          type: "number",
          placeholder: "1",
        },
        {
          label: "Durasi estimasi",
          name: "duration",
          icon: Clock3,
          placeholder: "2h 34m",
        },
        {
          label: "Sumber Drive / URL",
          name: "source",
          icon: Link2,
          placeholder: "https://drive.google.com/...",
          span: "full",
        },
        {
          label: "Catatan operator",
          name: "notes",
          icon: ListMusic,
          kind: "textarea",
          placeholder: "Catatan transisi, status subtitle, atau kebutuhan quality check.",
          span: "full",
        },
      ]}
      insights={[
        {
          title: "Playlist structure",
          description:
            "Cocok untuk tahap awal sebelum menambahkan multiple video rows atau drag-and-drop sorting.",
        },
        {
          title: "Future extensions",
          description:
            "Komponen ini bisa diperluas menjadi editor playlist lengkap tanpa mengganti shell visual yang sudah dibuat.",
        },
      ]}
    />
  );
}
