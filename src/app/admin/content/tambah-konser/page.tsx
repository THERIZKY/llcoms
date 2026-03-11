import { ImageIcon, Sparkles, Tag } from "lucide-react";
import { AdminConcertForm } from "@/components/admin/admin-concert-form";
import { AdminViewShell } from "@/components/admin/admin-view-shell";
import { GlassPanel } from "@/components/ui/glass-panel";
import { getGroups } from "@/lib/archive-data";

const notes = [
  {
    title: "Auto slug generation",
    description:
      "Slug dibuat otomatis dari nama konser. Duplicate slug akan diberi suffix tanpa perlu input manual.",
    icon: Sparkles,
  },
  {
    title: "Cross-generation ready",
    description:
      "Group boleh dikosongkan agar konser langsung tampil sebagai concert lintas generasi di homepage.",
    icon: Tag,
  },
  {
    title: "Thumbnail source",
    description:
      "Gunakan public path atau URL eksternal yang sudah siap dipakai oleh katalog publik.",
    icon: ImageIcon,
  },
] as const;

export default async function AdminTambahKonserPage() {
  const groups = await getGroups();

  return (
    <AdminViewShell
      eyebrow="Content Management"
      title="Tambah Konser"
      description="Buat entri konser baru untuk katalog publik tanpa mengubah flow browsing yang sudah berjalan."
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <GlassPanel className="p-6">
          <div className="mb-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-primary">
              Concert Composer
            </p>
            <h2 className="font-display mt-3 text-2xl font-semibold text-foreground">
              Metadata inti konser
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Form ini hanya meminta field yang dibutuhkan operator untuk
              membuka jalur konser baru secepat mungkin.
            </p>
          </div>

          <AdminConcertForm groups={groups} />
        </GlassPanel>

        <div className="space-y-6">
          <GlassPanel tone="muted" glow="violet" className="p-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
              Publishing Notes
            </p>

            <div className="mt-5 space-y-3">
              {notes.map((note) => (
                <div
                  key={note.title}
                  className="rounded-[22px] border border-border/70 bg-background/60 p-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-flex size-10 items-center justify-center rounded-2xl border border-primary/18 bg-primary/10 text-primary">
                      <note.icon className="size-4" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {note.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {note.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>
    </AdminViewShell>
  );
}
