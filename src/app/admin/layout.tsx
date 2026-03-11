import type { ReactNode } from "react";
import { requireAdminUser } from "@/auth/session";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const adminUser = await requireAdminUser();

  return (
    <AdminShell
      adminName={adminUser.name ?? "Admin"}
      adminEmail={adminUser.email ?? "admin@llcoms.local"}
    >
      {children}
    </AdminShell>
  );
}
