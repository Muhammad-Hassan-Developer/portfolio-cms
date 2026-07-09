import type { NavLink } from "@/types";

export const PORTFOLIO_NAV: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Certificates", href: "/certificates" },
  { label: "Contact", href: "/contact" },
];

export const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "LayoutDashboard", group: "main" },
  { label: "Hero", href: "/admin/hero", icon: "Home", group: "content" },
  { label: "About", href: "/admin/about", icon: "User", group: "content" },
  { label: "Skills", href: "/admin/skills", icon: "Code2", group: "content" },
  { label: "Projects", href: "/admin/projects", icon: "FolderOpen", group: "content" },
  { label: "Categories", href: "/admin/categories", icon: "Tag", group: "content" },
  { label: "Certificates", href: "/admin/certificates", icon: "Award", group: "content" },
  { label: "Media Library", href: "/admin/media", icon: "Image", group: "tools" },
  { label: "Theme", href: "/admin/theme", icon: "Palette", group: "tools" },
  { label: "Footer", href: "/admin/footer", icon: "PanelBottom", group: "tools" },
  { label: "Profile", href: "/admin/profile", icon: "UserCircle", group: "system" },
  { label: "Settings", href: "/admin/settings", icon: "Settings", group: "system" },
];

export const ADMIN_CREDENTIALS = {
  email: "admin@portfolio.dev",
  password: "admin123",
};
