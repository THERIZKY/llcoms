import { Suspense, type ReactNode } from "react";
import { requireAdminUser } from "@/auth/session";
import { AdminShellSkeleton } from "@/components/loading-skeletons";
import { AdminShell } from "@/components/admin/admin-shell";

type AdminLayoutProps = {
  children: ReactNode;
};

async function AdminLayoutContent({ children }: AdminLayoutProps) {
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

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  return (
    <Suspense fallback={<AdminShellSkeleton />}>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </Suspense>
  );
}
