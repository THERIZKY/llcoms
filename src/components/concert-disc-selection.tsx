import Link from "next/link";
import { Disc3, PlayCircle } from "lucide-react";
import type { Concert, ConcertDisc } from "@/lib/archive-types";
import { GlassPanel } from "@/components/ui/glass-panel";

type ConcertDiscSelectionProps = {
  concert: Concert;
  discs: ConcertDisc[];
};

const discTypeOrder: ConcertDisc["type"][] = ["BD", "DVD", "Bonus"];

function groupDiscsByType(discs: ConcertDisc[]) {
  return discTypeOrder
    .map((type) => ({
      type,
      items: discs.filter((disc) => disc.type === type),
    }))
    .filter((section) => section.items.length > 0);
}

function getSectionTitle(type: ConcertDisc["type"]) {
  switch (type) {
    case "Bonus":
      return "Bonus";
    case "DVD":
      return "DVD";
    default:
      return "BD";
  }
}

export function ConcertDiscSelection({
  concert,
  discs,
}: ConcertDiscSelectionProps) {
  const sections = groupDiscsByType(discs);

  return (
    <GlassPanel className="p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-primary">
            Disc Selection
          </p>
          <h2 className="font-display mt-3 text-2xl font-semibold text-foreground">
            Pilih versi atau disc
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Setiap pilihan akan membuka halaman streaming bawaan tanpa
            mengubah player yang sudah ada.
          </p>
        </div>

        <div className="rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm text-foreground">
          {discs.length} stream tersedia
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {sections.map((section) => (
          <section key={section.type} className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-2xl border border-primary/18 bg-primary/10 text-primary">
                <Disc3 className="size-4" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {getSectionTitle(section.type)}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {section.items.length} pilihan
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {section.items.map((disc) => (
                <Link
                  key={disc.id}
                  href={`/concerts/${concert.slug}/${disc.id}`}
                  className="group rounded-[24px] border border-border/70 bg-background/65 p-4 transition hover:-translate-y-0.5 hover:border-primary/30 hover:bg-background/80 hover:shadow-[0_18px_48px_rgba(34,211,238,0.12)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                        Stream {disc.sortOrder}
                      </p>
                      <h4 className="mt-2 text-base font-semibold text-foreground">
                        {disc.title}
                      </h4>
                    </div>
                    <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-primary/18 bg-primary/10 text-primary transition group-hover:bg-primary/14">
                      <PlayCircle className="size-5" />
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-muted-foreground">
                    {disc.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </GlassPanel>
  );
}
