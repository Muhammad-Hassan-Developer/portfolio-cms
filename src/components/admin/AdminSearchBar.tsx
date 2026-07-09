import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, FileText, FolderOpen, Award, Code2 } from "lucide-react";
import { cn } from "@/utils/cn";
import { projects } from "@/data/projectsData";
import { certificates } from "@/data/certificatesData";
import { skillCategories } from "@/data/skillsData";

interface SearchResult {
  id: string;
  title: string;
  type: "project" | "certificate" | "skill" | "category";
  section: string;
}

interface AdminSearchBarProps {
  className?: string;
}

export function AdminSearchBar({ className }: AdminSearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const results: SearchResult[] = [];
  if (query.length > 1) {
    const q = query.toLowerCase();
    projects.forEach((p) => {
      if (p.title.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q))) {
        results.push({ id: p.id, title: p.title, type: "project", section: "Projects" });
      }
    });
    certificates.forEach((c) => {
      if (c.title.toLowerCase().includes(q) || c.issuer.toLowerCase().includes(q)) {
        results.push({ id: c.id, title: c.title, type: "certificate", section: "Certificates" });
      }
    });
    skillCategories.forEach((cat) => {
      if (cat.name.toLowerCase().includes(q)) {
        results.push({ id: cat.id, title: cat.name, type: "category", section: "Skills" });
      }
      cat.skills.forEach((s) => {
        if (s.name.toLowerCase().includes(q)) {
          results.push({ id: s.id, title: s.name, type: "skill", section: "Skills" });
        }
      });
    });
  }

  const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    project: FolderOpen,
    certificate: Award,
    skill: Code2,
    category: FileText,
  };

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 100);
        }}
        className={cn(
          "flex h-9 items-center gap-2 rounded-xl border border-border bg-surface-elevated/50 px-3 text-sm text-text-muted transition-all hover:border-accent-blue/30 hover:text-text-secondary",
          className
        )}
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="ml-2 hidden rounded-md border border-border bg-surface px-1.5 py-0.5 text-[10px] text-text-muted sm:inline">
          Ctrl+K
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-start justify-center pt-[20vh]"
            onClick={() => setIsOpen(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-lg rounded-2xl border border-border/50 bg-surface/95 shadow-2xl backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-border/30 px-4">
                <Search className="h-4 w-4 text-text-muted" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects, skills, certificates..."
                  className="flex-1 bg-transparent py-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                />
                {query && (
                  <button onClick={() => setQuery("")} className="text-text-muted hover:text-text-primary">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="max-h-[300px] overflow-y-auto p-2">
                {results.length === 0 && query.length > 1 && (
                  <div className="py-8 text-center text-sm text-text-muted">
                    No results found for "{query}"
                  </div>
                )}
                {results.map((result) => {
                  const Icon = typeIcons[result.type];
                  return (
                    <button
                      key={result.id}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-surface-elevated"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-elevated text-text-muted">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary">{result.title}</p>
                        <p className="text-xs text-text-muted">{result.section}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
