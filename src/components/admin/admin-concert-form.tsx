"use client";

import { useActionState, useState } from "react";
import { Clapperboard, Hash, ImageIcon, Tag } from "lucide-react";
import { createConcertAction } from "@/app/admin/content/actions";
import { initialAdminContentActionState } from "@/app/admin/content/action-state";
import {
  AdminFieldError,
  AdminFormMessage,
} from "@/components/admin/admin-form-feedback";
import { Button } from "@/components/ui/button";
import {
  PremiumInput,
  premiumFieldShellClassName,
} from "@/components/ui/premium-input";
import type { Group } from "@/lib/archive-types";
import { slugify } from "@/lib/slug";
import { cn } from "@/lib/utils";

type AdminConcertFormProps = {
  groups: Group[];
};

export function AdminConcertForm({ groups }: AdminConcertFormProps) {
  const [state, formAction, isPending] = useActionState(
    createConcertAction,
    initialAdminContentActionState,
  );
  const [title, setTitle] = useState("");
  const slugPreview = slugify(title);

  return (
    <form action={formAction} className="space-y-5">
      <AdminFormMessage state={state} />

      <label className="block space-y-2">
        <span className="text-sm font-medium text-foreground">Concert Name</span>
        <PremiumInput
          name="title"
          icon={Clapperboard}
          placeholder="mu's Final LoveLive!"
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
          Concert Thumbnail
        </span>
        <PremiumInput
          name="thumbnail"
          icon={ImageIcon}
          placeholder="/images/concerts/new-concert.svg or https://..."
        />
        <AdminFieldError errors={state.fieldErrors?.thumbnail} />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-foreground">Group</span>
        <span className={cn(premiumFieldShellClassName, "h-14")}>
          <Tag className="size-4 shrink-0 text-muted-foreground transition group-focus-within:text-primary" />
          <select
            name="groupId"
            defaultValue=""
            className="h-14 w-full appearance-none bg-transparent text-sm text-foreground outline-none"
          >
            <option value="">Cross-generation concert</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </span>
        <p className="text-xs text-muted-foreground">
          Biarkan kosong jika konser termasuk cross-generation.
        </p>
        <AdminFieldError errors={state.fieldErrors?.groupId} />
      </label>

      <div className="flex flex-wrap gap-3 pt-2">
        <Button
          type="submit"
          variant="neon"
          size="lg"
          disabled={isPending}
          className="rounded-[20px]"
        >
          {isPending ? "Menyimpan konser..." : "Tambah konser"}
        </Button>
      </div>
    </form>
  );
}
