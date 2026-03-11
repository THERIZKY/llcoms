import { FileText, LayoutTemplate, Link2, Sparkles, Tags } from "lucide-react";
import { AdminPlaceholderForm } from "@/components/admin/admin-placeholder-form";

export default function AdminTambahKontenPage() {
  return (
    <AdminPlaceholderForm
      eyebrow="Content Management"
      title="Tambah Konten"
      description="Gunakan placeholder ini untuk konten editorial, landing modules, atau item promosi internal yang nanti bisa dipublish ke beberapa area aplikasi."
      fields={[
        {
          label: "Judul konten",
          name: "title",
          icon: FileText,
          placeholder: "Editor spotlight: Spring tour highlights",
        },
        {
          label: "Tipe konten",
          name: "contentType",
          icon: Tags,
          kind: "select",
          placeholder: "Pilih tipe",
          options: [
            { label: "Announcement", value: "announcement" },
            { label: "Editorial", value: "editorial" },
            { label: "Homepage module", value: "homepage-module" },
          ],
        },
        {
          label: "Template visual",
          name: "template",
          icon: LayoutTemplate,
          kind: "select",
          placeholder: "Pilih layout",
          options: [
            { label: "Hero card", value: "hero-card" },
            { label: "Split panel", value: "split-panel" },
            { label: "Inline spotlight", value: "inline-spotlight" },
          ],
        },
        {
          label: "Source link",
          name: "sourceLink",
          icon: Link2,
          placeholder: "https://example.com/reference",
        },
        {
          label: "Konten ringkas",
          name: "summary",
          icon: Sparkles,
          kind: "textarea",
          placeholder: "Tulis ringkasan, mood, dan pesan utama untuk konten ini.",
          span: "full",
        },
      ]}
      insights={[
        {
          title: "Reusable content shell",
          description:
            "Bisa dipakai untuk halaman announcement, CTA cards, atau blok promosi tanpa merombak struktur admin.",
        },
        {
          title: "Editorial workflow",
          description:
            "Template visual sengaja dipisah agar nantinya lebih mudah dihubungkan ke block renderer atau CMS ringan.",
        },
      ]}
    />
  );
}
