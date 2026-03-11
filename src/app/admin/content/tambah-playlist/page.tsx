import { FileVideo2, Link2, ListVideo } from "lucide-react";
import { AdminConcertVideoForm } from "@/components/admin/admin-concert-video-form";
import { AdminViewShell } from "@/components/admin/admin-view-shell";
import { GlassPanel } from "@/components/ui/glass-panel";
import { getConcertOptions } from "@/lib/archive-data";

const notes = [
  {
    title: "Playlist aware",
    description:
      "Video baru akan ditambahkan otomatis ke akhir urutan playlist konser yang dipilih.",
    icon: ListVideo,
  },
  {
    title: "Drive ID source",
    description:
      "Sistem menyimpan Google Drive file ID dan membangun preview URL untuk player dari data itu.",
    icon: Link2,
  },
  {
    title: "Disc selection flow",
    description:
      "Setiap video yang dibuat akan muncul di halaman detail konser dan juga panel playlist pada halaman streaming.",
    icon: FileVideo2,
  },
] as const;

export default async function AdminTambahPlaylistPage() {
  const concerts = await getConcertOptions();

  return (
    <AdminViewShell
      eyebrow="Content Management"
      title="Tambah Video Konser"
      description="Tambahkan disc atau item playlist ke konser yang sudah ada tanpa mengubah struktur route publik."
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <GlassPanel className="p-6">
          <div className="mb-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-primary">
              Video Composer
            </p>
            <h2 className="font-display mt-3 text-2xl font-semibold text-foreground">
              Disc dan playlist item
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Gunakan halaman ini untuk menambahkan stream per disc ke konser
              yang sudah ada.
            </p>
          </div>

          <AdminConcertVideoForm concerts={concerts} />
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
