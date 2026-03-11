import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BookImage,
  Clapperboard,
  FilePlus2,
  Film,
  FolderKanban,
  LayoutDashboard,
  ListMusic,
  Logs,
  RadioTower,
  Settings2,
  ShieldCheck,
  Sparkles,
  Users,
  UserRoundCog,
} from "lucide-react";

export type AdminNavigationItem = {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
};

export type AdminNavigationSection = {
  id: string;
  title: string;
  icon: LucideIcon;
  items: AdminNavigationItem[];
};

export const adminNavigationSections: AdminNavigationSection[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
    items: [
      {
        title: "Overview",
        href: "/admin",
        description: "Ringkasan metrik dan quick actions.",
        icon: Sparkles,
      },
    ],
  },
  {
    id: "content",
    title: "Content Management",
    icon: FolderKanban,
    items: [
      {
        title: "Tambah Konser",
        href: "/admin/content/tambah-konser",
        description: "Buat entri konser baru.",
        icon: Clapperboard,
      },
      {
        title: "Tambah Playlist",
        href: "/admin/content/tambah-playlist",
        description: "Susun playlist dan urutan video.",
        icon: ListMusic,
      },
      {
        title: "Tambah Groups",
        href: "/admin/content/tambah-groups",
        description: "Kelola identitas grup.",
        icon: Users,
      },
      {
        title: "Tambah Konten",
        href: "/admin/content/tambah-konten",
        description: "Rancang konten editorial baru.",
        icon: FilePlus2,
      },
    ],
  },
  {
    id: "media",
    title: "Media / Streams",
    icon: RadioTower,
    items: [
      {
        title: "Streams",
        href: "/admin/media/streams",
        description: "Status stream dan publish flow.",
        icon: RadioTower,
      },
      {
        title: "Videos",
        href: "/admin/media/videos",
        description: "Kurasi library video.",
        icon: Film,
      },
      {
        title: "Clips",
        href: "/admin/media/clips",
        description: "Potongan highlight dan assets.",
        icon: BookImage,
      },
    ],
  },
  {
    id: "users",
    title: "Users",
    icon: UserRoundCog,
    items: [
      {
        title: "User List",
        href: "/admin/users/list",
        description: "Daftar akun dan status verifikasi.",
        icon: Users,
      },
      {
        title: "Roles / Permissions",
        href: "/admin/users/roles",
        description: "Kontrol role dan akses.",
        icon: ShieldCheck,
      },
    ],
  },
  {
    id: "system",
    title: "System",
    icon: Settings2,
    items: [
      {
        title: "Settings",
        href: "/admin/system/settings",
        description: "Konfigurasi sistem inti.",
        icon: Settings2,
      },
      {
        title: "Logs",
        href: "/admin/system/logs",
        description: "Audit trail dan health checks.",
        icon: Logs,
      },
    ],
  },
];

export const adminQuickActions = adminNavigationSections[1].items;

export const adminDashboardSignals = [
  {
    label: "Ops Focus",
    value: "Content cadence",
    detail: "Baru, playlist, dan metadata siap ditata dari satu sidebar.",
    icon: Activity,
  },
  {
    label: "Next Stage",
    value: "Stream quality",
    detail: "Placeholder analytics untuk monitoring stream dan video.",
    icon: RadioTower,
  },
];
