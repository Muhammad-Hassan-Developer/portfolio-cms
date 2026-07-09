import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, LayoutDashboard, User, FolderOpen, Award, Palette, PanelBottom, Settings, Image, FileText, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/utils/cn";

interface CommandItem {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  section: string;
}

const commands: CommandItem[] = [
  { id: "dashboard", label: "Dashboard", description: "Admin dashboard overview", icon: LayoutDashboard, href: "/admin/dashboard", section: "Admin" },
  { id: "hero", label: "Hero Section", description: "Edit hero section content", icon: FileText, href: "/admin/hero", section: "Admin" },
  { id: "about", label: "About Section", description: "Edit about section content", icon: User, href: "/admin/about", section: "Admin" },
  { id: "skills", label: "Skills", description: "Manage skills and categories", icon: LayoutDashboard, href: "/admin/skills", section: "Admin" },
  { id: "projects", label: "Projects", description: "Manage portfolio projects", icon: FolderOpen, href: "/admin/projects", section: "Admin" },
  { id: "certificates", label: "Certificates", description: "Manage certifications", icon: Award, href: "/admin/certificates", section: "Admin" },
  { id: "theme", label: "Theme Settings", description: "Customize theme and appearance", icon: Palette, href: "/admin/theme", section: "Admin" },
  { id: "footer", label: "Footer", description: "Edit footer content", icon: PanelBottom, href: "/admin/footer", section: "Admin" },
  { id: "media", label: "Media Library", description: "Manage images and files", icon: Image, href: "/admin/media", section: "Admin" },
  { id: "settings", label: "Settings", description: "Website configuration", icon: Settings, href: "/admin/settings", section: "Admin" },
  { id: "profile", label: "Profile", description: "Edit your profile", icon: User, href: "/admin/profile", section: "Admin" },
  { id: "portfolio-home", label: "View Portfolio", description: "Go to portfolio homepage", icon: ArrowRight, href: "/", section: "Portfolio" },
  { id: "portfolio-projects", label: "View Projects", description: "Go to projects page", icon: FolderOpen, href: "/projects", section: "Portfolio" },
  { id: "portfolio-certificates", label: "View Certificates", description: "Go to certificates page", icon: Award, href: "/certificates", section: "Portfolio" },
  { id: "portfolio-contact", label: "Contact", description: "Go to contact page", icon: User, href: "/contact", section: "Portfolio" },
];

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    if (!query) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.section.toLowerCase().includes(q)
    );
  }, [query]);

  const grouped = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    filtered.forEach((item) => {
      if (!groups[item.section]) groups[item.section] = [];
      groups[item.section].push(item);
    });
    return groups;
  }, [filtered]);

  const flatList = useMemo(() => filtered, [filtered]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const executeCommand = useCallback(
    (item: CommandItem) => {
      navigate(item.href);
      handleClose();
    },
    [navigate, handleClose]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) handleClose();
        else handleOpen();
      }
      if (e.key === "Escape" && isOpen) handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, handleOpen, handleClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % flatList.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + flatList.length) % flatList.length);
      } else if (e.key === "Enter" && flatList[selectedIndex]) {
        executeCommand(flatList[selectedIndex]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, flatList, selectedIndex, executeCommand]);

  return (
    <>
      <button
        onClick={handleOpen}
        className="flex items-center gap-2 rounded-xl border border-border/50 bg-surface-elevated/50 px-3 py-2 text-sm text-text-muted transition-all hover:border-accent-blue/30 hover:text-text-secondary"
        aria-label="Open command palette"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden rounded-md bg-surface-hover px-1.5 py-0.5 text-[10px] font-medium text-text-muted sm:inline">Ctrl+K</kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[15vh]"
            onClick={handleClose}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border/50 bg-surface/95 shadow-2xl backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-border/30 px-4 py-3">
                <Search className="h-5 w-5 text-text-muted" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                  aria-label="Search commands"
                />
                <kbd className="rounded-md bg-surface-hover px-1.5 py-0.5 text-[10px] font-medium text-text-muted">ESC</kbd>
              </div>

              <div className="max-h-[300px] overflow-y-auto p-2">
                {flatList.length === 0 ? (
                  <div className="py-8 text-center text-sm text-text-muted">No results found</div>
                ) : (
                  Object.entries(grouped).map(([section, items]) => (
                    <div key={section} className="mb-2">
                      <p className="mb-1 px-3 text-[10px] font-medium uppercase tracking-wider text-text-muted">{section}</p>
                      {items.map((item) => {
                        const idx = flatList.indexOf(item);
                        return (
                          <button
                            key={item.id}
                            onClick={() => executeCommand(item)}
                            onMouseEnter={() => setSelectedIndex(idx)}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                              idx === selectedIndex ? "bg-accent-blue/10 text-accent-blue" : "text-text-secondary hover:bg-surface-elevated"
                            )}
                          >
                            <item.icon className="h-4 w-4 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{item.label}</p>
                              <p className="text-xs text-text-muted truncate">{item.description}</p>
                            </div>
                            {idx === selectedIndex && <ArrowRight className="h-3 w-3 flex-shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              <div className="flex items-center gap-4 border-t border-border/30 px-4 py-2.5 text-[10px] text-text-muted">
                <span className="flex items-center gap-1"><kbd className="rounded bg-surface-hover px-1 py-0.5">↑↓</kbd> Navigate</span>
                <span className="flex items-center gap-1"><kbd className="rounded bg-surface-hover px-1 py-0.5">↵</kbd> Select</span>
                <span className="flex items-center gap-1"><kbd className="rounded bg-surface-hover px-1 py-0.5">esc</kbd> Close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
