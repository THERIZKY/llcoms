import type { LucideIcon } from "lucide-react";
import { AlertCircle, Sparkles } from "lucide-react";
import { AdminViewShell } from "@/components/admin/admin-view-shell";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Button } from "@/components/ui/button";
import {
  PremiumInput,
  PremiumTextarea,
  premiumFieldShellClassName,
} from "@/components/ui/premium-input";
import { cn } from "@/lib/utils";

type PlaceholderField = {
  label: string;
  name: string;
  icon: LucideIcon;
  placeholder?: string;
  type?: string;
  description?: string;
  span?: "full" | "half";
  kind?: "input" | "textarea" | "select";
  options?: Array<{
    label: string;
    value: string;
  }>;
};

type PlaceholderInsight = {
  title: string;
  description: string;
};

type AdminPlaceholderFormProps = {
  eyebrow: string;
  title: string;
  description: string;
  fields: PlaceholderField[];
  insights: PlaceholderInsight[];
};

function renderField(field: PlaceholderField) {
  if (field.kind === "textarea") {
    return (
      <PremiumTextarea
        name={field.name}
        icon={field.icon}
        placeholder={field.placeholder}
      />
    );
  }

  if (field.kind === "select") {
    const Icon = field.icon;

    return (
      <span className={cn(premiumFieldShellClassName, "h-14")}>
        <Icon className="size-4 shrink-0 text-muted-foreground transition group-focus-within:text-primary" />
        <select
          name={field.name}
          defaultValue=""
          className="h-14 w-full appearance-none bg-transparent text-sm text-foreground outline-none"
        >
          <option value="" disabled>
            {field.placeholder ?? "Pilih opsi"}
          </option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </span>
    );
  }

  return (
    <PremiumInput
      type={field.type ?? "text"}
      name={field.name}
      icon={field.icon}
      placeholder={field.placeholder}
    />
  );
}

export function AdminPlaceholderForm({
  eyebrow,
  title,
  description,
  fields,
  insights,
}: AdminPlaceholderFormProps) {
  return (
    <AdminViewShell
      eyebrow={eyebrow}
      title={title}
      description={description}
      actions={
        <>
          <Button variant="glass" size="lg" className="rounded-[20px]">
            Preview Layout
          </Button>
          <Button variant="neon" size="lg" className="rounded-[20px]">
            Save Draft
          </Button>
        </>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <GlassPanel className="p-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-primary/18 bg-primary/10 text-primary">
              <Sparkles className="size-5" />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Draft composer
              </h2>
              <p className="text-sm text-muted-foreground">
                Form placeholder ini siap dihubungkan ke backend berikutnya.
              </p>
            </div>
          </div>

          <form className="mt-6 grid gap-4 md:grid-cols-2">
            {fields.map((field) => (
              <label
                key={field.name}
                className={cn(
                  "space-y-2",
                  field.span === "full" ? "md:col-span-2" : "",
                )}
              >
                <span className="text-sm font-medium text-foreground">
                  {field.label}
                </span>
                {renderField(field)}
                {field.description ? (
                  <p className="text-xs text-muted-foreground">
                    {field.description}
                  </p>
                ) : null}
              </label>
            ))}

            <div className="flex flex-wrap gap-3 pt-2 md:col-span-2">
              <Button variant="neon" size="lg" type="button" className="rounded-[20px]">
                Publish Queue
              </Button>
              <Button variant="glass" size="lg" type="button" className="rounded-[20px]">
                Invite Review
              </Button>
            </div>
          </form>
        </GlassPanel>

        <div className="space-y-6">
          <GlassPanel tone="muted" glow="violet" className="p-5">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-2xl border border-border/70 bg-background/70 text-primary">
                <AlertCircle className="size-4" />
              </span>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                  Publishing Notes
                </p>
                <h3 className="mt-1 text-lg font-semibold text-foreground">
                  Operator checklist
                </h3>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {insights.map((insight) => (
                <div
                  key={insight.title}
                  className="rounded-[22px] border border-border/70 bg-background/60 p-4"
                >
                  <h4 className="text-sm font-semibold text-foreground">
                    {insight.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {insight.description}
                  </p>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>
    </AdminViewShell>
  );
}
