import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Grid3X3, List, Upload, Trash2, Eye, Copy, ImageIcon, Film, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { EmptyState } from "@/components/admin/EmptyState";
import { useToast } from "@/components/admin/Toast";
import { cn } from "@/utils/cn";
import { AdminPageContainer } from "@/components/admin/AdminPageContainer";

interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: "image" | "video" | "document";
  size: string;
  uploadedAt: string;
}

const placeholderMedia: MediaItem[] = [
  { id: "1", name: "hero-bg.jpg", url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop", type: "image", size: "2.4 MB", uploadedAt: "2 hours ago" },
  { id: "2", name: "project-neural.jpg", url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop", type: "image", size: "1.8 MB", uploadedAt: "1 day ago" },
  { id: "3", name: "about-photo.jpg", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop", type: "image", size: "3.1 MB", uploadedAt: "3 days ago" },
  { id: "4", name: "cert-aws.png", url: "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=400&h=300&fit=crop", type: "image", size: "890 KB", uploadedAt: "1 week ago" },
  { id: "5", name: "demo-video.mp4", url: "", type: "video", size: "12.5 MB", uploadedAt: "2 weeks ago" },
  { id: "6", name: "resume-2024.pdf", url: "", type: "document", size: "420 KB", uploadedAt: "1 month ago" },
];

type FilterType = "all" | "image" | "video" | "document";
const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = { image: ImageIcon, video: Film, document: FileText };

export function AdminMediaPage() {
  const [media] = useState<MediaItem[]>(placeholderMedia);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  const filtered = media.filter((item) => {
    if (filter !== "all" && item.type !== filter) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <AdminPageContainer maxWidth="xl"><div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Media Library</h2>
          <p className="mt-1 text-sm text-text-secondary">Manage your images, videos, and documents.</p>
        </div>
        <Button size="sm" onClick={() => toast("Upload feature ready for Supabase integration", "info")}>
          <Upload className="h-4 w-4" /> Upload
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search media..."
            className="h-10 w-full rounded-xl border border-border bg-surface-elevated pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-blue" />
        </div>
        <div className="flex items-center gap-2">
          {(["all", "image", "video", "document"] as FilterType[]).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={cn("rounded-lg px-3 py-1.5 text-xs font-medium transition-all", filter === f ? "bg-accent-blue text-white" : "bg-surface-elevated text-text-secondary hover:text-text-primary")}>
              {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1) + "s"}
            </button>
          ))}
          <div className="h-5 w-px bg-border mx-1" />
          <button onClick={() => setViewMode("grid")} className={cn("rounded-lg p-1.5 transition-colors", viewMode === "grid" ? "bg-surface-elevated text-text-primary" : "text-text-muted")}><Grid3X3 className="h-4 w-4" /></button>
          <button onClick={() => setViewMode("list")} className={cn("rounded-lg p-1.5 transition-colors", viewMode === "list" ? "bg-surface-elevated text-text-primary" : "text-text-muted")}><List className="h-4 w-4" /></button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No media found" description="Upload images, videos, or documents to get started." icon="media" />
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((item, i) => {
            const Icon = typeIcons[item.type];
            return (
              <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}
                onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
                className={cn("group relative cursor-pointer overflow-hidden rounded-xl border transition-all duration-300", selectedId === item.id ? "border-accent-blue shadow-lg shadow-accent-blue/10" : "border-border/50 hover:border-accent-blue/30")}>
                {item.type === "image" && item.url ? (
                  <div className="aspect-square overflow-hidden"><img src={item.url} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" /></div>
                ) : (
                  <div className="aspect-square flex items-center justify-center bg-surface-elevated"><Icon className="h-8 w-8 text-text-muted" /></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="text-xs font-medium text-white truncate">{item.name}</p>
                  <p className="text-[10px] text-white/60">{item.size}</p>
                </div>
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button onClick={(e) => { e.stopPropagation(); toast("URL copied", "success"); }} className="flex h-6 w-6 items-center justify-center rounded-md bg-black/50 text-white backdrop-blur-sm hover:bg-black/70"><Copy className="h-3 w-3" /></button>
                  <button onClick={(e) => { e.stopPropagation(); setDeleteId(item.id); }} className="flex h-6 w-6 items-center justify-center rounded-md bg-black/50 text-white backdrop-blur-sm hover:bg-error/70"><Trash2 className="h-3 w-3" /></button>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="glass overflow-hidden rounded-2xl">
          <table className="w-full">
            <thead><tr className="border-b border-border/30">
              {["Name", "Type", "Size", "Uploaded", "Actions"].map((h) => (
                <th key={h} className={cn("px-4 py-3 text-xs font-medium text-text-muted", h === "Actions" ? "text-right" : "text-left")}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map((item) => {
                const Icon = typeIcons[item.type];
                return (
                  <tr key={item.id} className="border-b border-border/10 transition-colors hover:bg-surface-elevated/50">
                    <td className="px-4 py-3"><div className="flex items-center gap-3">
                      {item.type === "image" && item.url ? <img src={item.url} alt="" className="h-8 w-8 rounded-lg object-cover" /> : <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-elevated"><Icon className="h-4 w-4 text-text-muted" /></div>}
                      <span className="text-sm text-text-primary">{item.name}</span>
                    </div></td>
                    <td className="px-4 py-3 text-xs text-text-secondary capitalize">{item.type}</td>
                    <td className="px-4 py-3 text-xs text-text-secondary">{item.size}</td>
                    <td className="px-4 py-3 text-xs text-text-secondary">{item.uploadedAt}</td>
                    <td className="px-4 py-3 text-right"><div className="flex items-center justify-end gap-1">
                      <button className="rounded-lg p-1.5 text-text-muted hover:bg-surface-elevated hover:text-text-primary"><Eye className="h-3.5 w-3.5" /></button>
                      <button onClick={() => setDeleteId(item.id)} className="rounded-lg p-1.5 text-text-muted hover:bg-error/10 hover:text-error"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {selectedId && (
        <div className="glass fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-2xl px-6 py-4 shadow-2xl">
          <span className="text-sm text-text-primary">{filtered.find((m) => m.id === selectedId)?.name}</span>
          <div className="h-5 w-px bg-border" />
          <button onClick={() => { navigator.clipboard.writeText(filtered.find((m) => m.id === selectedId)?.url || ""); toast("URL copied", "success"); }} className="text-xs text-accent-blue hover:underline">Copy URL</button>
          <button onClick={() => setDeleteId(selectedId)} className="text-xs text-error hover:underline">Delete</button>
          <button onClick={() => setSelectedId(null)} className="text-xs text-text-muted hover:text-text-primary">Deselect</button>
        </div>
      )}

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => { toast("Media deleted", "success"); setDeleteId(null); setSelectedId(null); }} title="Delete Media" description="Are you sure you want to delete this file? This action cannot be undone." confirmLabel="Delete" />
    </div></AdminPageContainer>
  );
}
