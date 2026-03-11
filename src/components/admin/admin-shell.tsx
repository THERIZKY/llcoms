import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

type AdminShellProps = {
  adminName: string;
  adminEmail: string;
  children: ReactNode;
};

export function AdminShell({
  adminName,
  adminEmail,
  children,
}: AdminShellProps) {
  return (
    <main className="relative isolate overflow-hidden px-4 py-6 sm:px-6 sm:py-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_26%),radial-gradient(circle_at_82%_12%,rgba(168,85,247,0.14),transparent_24%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.12),transparent_30%)]" />
      <div className="mx-auto grid w-full max-w-7xl gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <AdminSidebar adminName={adminName} adminEmail={adminEmail} />
        <div className="min-w-0 space-y-6">{children}</div>
      </div>
    </main>
  );
}
