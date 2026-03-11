import { isEmailVerificationEnabled, isGoogleAuthEnabled } from "@/auth/email";
import { requireAdminUser } from "@/auth/session";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { getAdminDashboardData } from "@/lib/admin-data";

export default async function AdminPage() {
  const adminUser = await requireAdminUser();
  const { counts, recentUsers } = await getAdminDashboardData();

  return (
    <AdminDashboard
      adminName={adminUser.name ?? adminUser.email ?? "Admin"}
      stats={counts}
      recentUsers={recentUsers}
      googleEnabled={isGoogleAuthEnabled()}
      emailVerificationEnabled={isEmailVerificationEnabled()}
    />
  );
}
