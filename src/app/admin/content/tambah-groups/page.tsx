import { Hash, ImageIcon, Palette, Rows3, Users } from "lucide-react";
import { AdminPlaceholderForm } from "@/components/admin/admin-placeholder-form";

export default function AdminTambahGroupsPage() {
  return (
    <AdminPlaceholderForm
      eyebrow="Content Management"
      title="Tambah Groups"
      description="Atur identitas grup, urutan tampilan, dan aksen visual yang akan dipakai di katalog publik serta dashboard konten."
      fields={[
        {
          label: "Nama group",
          name: "name",
          icon: Users,
          placeholder: "Hasu no Sora",
        },
        {
          label: "Slug",
          name: "slug",
          icon: Hash,
          placeholder: "hasu-no-sora",
        },
        {
          label: "Accent color",
          name: "accentColor",
          icon: Palette,
          placeholder: "#22d3ee",
        },
        {
          label: "Sort order",
          name: "sortOrder",
          icon: Rows3,
          type: "number",
          placeholder: "5",
        },
        {
          label: "Thumbnail URL",
          name: "thumbnail",
          icon: ImageIcon,
          placeholder: "/images/groups/hasu-no-sora.svg",
          span: "full",
        },
        {
          label: "Ringkasan grup",
          name: "description",
          icon: Users,
          kind: "textarea",
          placeholder: "Deskripsi singkat karakter panggung, nuansa visual, dan posisi grup di archive.",
          span: "full",
        },
      ]}
      insights={[
        {
          title: "Brand consistency",
          description:
            "Accent color dan deskripsi grup disatukan agar tampilan publik bisa tetap konsisten saat group baru ditambahkan.",
        },
        {
          title: "Archive ordering",
          description:
            "Sort order placeholder ini membantu memetakan panel admin dan tampilan homepage dalam satu arah desain.",
        },
      ]}
    />
  );
}
