import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Home,
  User,
  Code2,
  FolderOpen,
  Tag,
  Award,
  Palette,
  PanelBottom,
  LogOut,
  Menu,
  Sparkles,
  ChevronRight,
  Image,
  Settings,
  UserCircle,
  Bell,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { ADMIN_NAV } from "@/constants";
import { CommandPalette } from "@/components/ui/CommandPalette";

const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Home, User, Code2, FolderOpen, Tag, Award, Palette, PanelBottom, Image, Settings, UserCircle,
};

const navGroups = [
  { label: "Overview", items: ADMIN_NAV.filter((n) => n.group === "main") },
  { label: "Content", items: ADMIN_NAV.filter((n) => n.group === "content") },
  { label: "Tools", items: ADMIN_NAV.filter((n) => n.group === "tools") },
  { label: "System", items: ADMIN_NAV.filter((n) => n.group === "system") },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem("admin_auth");
    navigate("/admin/login");
  }, [navigate]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    closeMobile();
  }, [location.pathname, closeMobile]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) { e.preventDefault(); closeMobile(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mobileOpen, closeMobile]);

  const breadcrumbs = location.pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => {
      const nav = ADMIN_NAV.find((n) => n.href.includes(segment));
      return nav?.label || segment.charAt(0).toUpperCase() + segment.slice(1);
    });

  const sidebarContent = (
    <>
      <div className={cn("flex h-16 items-center border-b border-border/30 px-4", collapsed ? "justify-center" : "gap-3")}>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        {!collapsed && <span className="text-base font-bold tracking-tight text-text-primary">Admin</span>}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Admin navigation">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-4">
            {!collapsed && (
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-text-muted">{group.label}</p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = iconComponents[item.icon];
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={closeMobile}
                    onMouseEnter={() => setHoveredItem(item.href)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={cn(
                      "group relative flex items-center rounded-xl text-sm font-medium transition-all duration-200",
                      collapsed ? "justify-center px-2 py-2.5" : "gap-3 px-3 py-2.5",
                      isActive ? "bg-accent-blue/10 text-accent-blue" : "text-text-secondary hover:bg-surface-elevated hover:text-text-primary"
                    )}
                  >
                    {isActive && (
                      <motion.div layoutId="activeNav" className="absolute inset-0 rounded-xl bg-accent-blue/10" transition={{ type: "spring", bounce: 0.2, duration: 0.4 }} />
                    )}
                    {Icon && (
                      <Icon className={cn("relative z-10 h-4 w-4 shrink-0 transition-colors", isActive ? "text-accent-blue" : "text-text-muted group-hover:text-text-primary")} />
                    )}
                    {!collapsed && (
                      <>
                        <span className="relative z-10 flex-1 truncate">{item.label}</span>
                        {isActive && <ChevronRight className="relative z-10 h-3 w-3 text-accent-blue" />}
                      </>
                    )}
                    {collapsed && hoveredItem === item.href && (
                      <div className="absolute left-full ml-2 z-50 whitespace-nowrap rounded-lg border border-border/50 bg-surface/95 px-3 py-1.5 text-xs font-medium text-text-primary shadow-xl backdrop-blur-xl">
                        {item.label}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-border/30 p-3">
        <button
          onClick={handleLogout}
          className={cn(
            "group flex w-full items-center rounded-xl text-sm font-medium text-text-secondary transition-all hover:bg-surface-elevated hover:text-error",
            collapsed ? "justify-center px-2 py-2.5" : "gap-3 px-3 py-2.5"
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </>
  );

  const SIDEBAR_W = 256;
  const SIDEBAR_COLLAPSED_W = 72;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex fixed inset-y-0 left-0 z-50 flex-col border-r border-border/30 bg-surface/80 backdrop-blur-xl overflow-hidden"
        style={{
          width: collapsed ? SIDEBAR_COLLAPSED_W : SIDEBAR_W,
          transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={closeMobile}
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border/30 bg-surface/95 backdrop-blur-xl lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content — margin-left matches sidebar on desktop */}
      <div
        className="flex flex-1 flex-col overflow-hidden"
        style={{
          marginLeft: collapsed ? SIDEBAR_COLLAPSED_W : SIDEBAR_W,
          transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/30 bg-surface/60 px-4 backdrop-blur-xl lg:px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-text-secondary transition-colors hover:bg-surface-elevated lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex h-9 w-9 items-center justify-center rounded-xl text-text-secondary transition-colors hover:bg-surface-elevated hover:text-text-primary"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
          </button>

          <nav className="hidden items-center gap-1 text-sm text-text-muted md:flex" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3 w-3" />}
                <span className={i === breadcrumbs.length - 1 ? "text-text-primary font-medium" : ""}>{crumb}</span>
              </span>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <CommandPalette />
            <button className="relative flex h-9 w-9 items-center justify-center rounded-xl text-text-secondary transition-colors hover:bg-surface-elevated hover:text-text-primary" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent-blue" />
            </button>
            <div className="h-6 w-px bg-border/50 hidden md:block" />
            <Link to="/" target="_blank" className="hidden items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium text-text-secondary transition-all hover:bg-surface-elevated hover:text-text-primary sm:flex">
              View Portfolio ↗
            </Link>
            <div className="flex items-center gap-2 rounded-xl bg-surface-elevated/50 px-2 py-1.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple text-xs font-bold text-white">A</div>
              <ChevronDown className="h-3 w-3 text-text-muted hidden md:block" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-background">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
