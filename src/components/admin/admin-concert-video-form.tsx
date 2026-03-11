"use client";

import { useActionState, useState } from "react";
import { Clapperboard, FileVideo2, Hash, Link2, ListVideo } from "lucide-react";
import { createConcertVideoAction } from "@/app/admin/content/actions";
import { initialAdminContentActionState } from "@/app/admin/content/action-state";
import {
  AdminFieldError,
  AdminFormMessage,
} from "@/components/admin/admin-form-feedback";
import { Button } from "@/components/ui/button";
import {
  PremiumInput,
  PremiumTextarea,
  premiumFieldShellClassName,
} from "@/components/ui/premium-input";
import type { Concert } from "@/lib/archive-types";
import { slugify } from "@/lib/slug";
import { cn } from "@/lib/utils";

type AdminConcertVideoFormProps = {
  concerts: Concert[];
};

export function AdminConcertVideoForm({
  concerts,
}: AdminConcertVideoFormProps) {
  const [state, formAction, isPending] = useActionState(
    createConcertVideoAction,
    initialAdminContentActionState,
  );
  const [title, setTitle] = useState("");
  const slugPreview = slugify(title);

  return (
    <form action={formAction} className="space-y-5">
      <AdminFormMessage state={state} />

      <label className="block space-y-2">
        <span className="text-sm font-medium text-foreground">
          Video Title
        </span>
        <PremiumInput
          name="title"
          icon={FileVideo2}
          placeholder="BD Disc 1"
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
        />
        <AdminFieldError errors={state.fieldErrors?.title} />
      </label>

      <div className="rounded-[22px] border border-border/70 bg-background/60 px-4 py-3 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-2 font-medium text-foreground">
          <Hash className="size-4 text-primary" />
          Slug preview
        </span>
        <p className="mt-2 font-mono text-sm text-primary">{slugPreview}</p>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-foreground">
          Assign Concert
        </span>
        <span className={cn(premiumFieldShellClassName, "h-14")}>
          <Clapperboard className="size-4 shrink-0 text-muted-foreground transition group-focus-within:text-primary" />
          <select
            name="concertId"
            defaultValue=""
            className="h-14 w-full appearance-none bg-transparent text-sm text-foreground outline-none"
          >
            <option value="" disabled>
              Pilih konser
            </option>
            {concerts.map((concert) => (
              <option key={concert.id} value={concert.id}>
                {concert.title}
              </option>
            ))}
          </select>
        </span>
        <AdminFieldError errors={state.fieldErrors?.concertId} />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-foreground">
          Drive ID
        </span>
        <PremiumInput
          name="driveId"
          icon={Link2}
          placeholder="ABC123XYZ"
        />
        <p className="text-xs text-muted-foreground">
          Boleh tempel full URL Google Drive. Sistem akan mengambil file ID-nya.
        </p>
        <AdminFieldError errors={state.fieldErrors?.driveId} />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-foreground">
          Description
        </span>
        <PremiumTextarea
          name="description"
          icon={ListVideo}
          placeholder="Deskripsi singkat isi video, disc, atau catatan penting untuk operator."
        />
        <AdminFieldError errors={state.fieldErrors?.description} />
      </label>

      <div className="rounded-[22px] border border-border/70 bg-background/60 px-4 py-3 text-xs leading-6 text-muted-foreground">
        Urutan playlist akan ditambahkan otomatis ke akhir daftar video konser
        yang dipilih.
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <Button
          type="submit"
          variant="neon"
          size="lg"
          disabled={isPending}
          className="rounded-[20px]"
        >
          {isPending ? "Menyimpan video..." : "Tambah video"}
        </Button>
      </div>
    </form>
  );
}
