import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Plus, Trash2, ChevronDown, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { AdminPageContainer } from "@/components/admin/AdminPageContainer";
import { projects as defaultProjects } from "@/data/projectsData";
import { useToast } from "@/components/admin/Toast";
import { AutoSaveIndicator } from "@/components/admin/AutoSaveIndicator";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { EmptyState } from "@/components/admin/EmptyState";
import { cn } from "@/utils/cn";
import type { Project } from "@/types";

export function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (status !== "idle") return;
    const t = setTimeout(() => { setStatus("saving"); setTimeout(() => setStatus("saved"), 600); }, 800);
    return () => clearTimeout(t);
  }, [status, projects]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if ((e.ctrlKey || e.metaKey) && e.key === "s") { e.preventDefault(); handleSave(); } };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const handleSave = () => { setStatus("saving"); setTimeout(() => { setStatus("saved"); toast("Projects saved", "success"); }, 600); };

  const addProject = () => {
    const id = Date.now().toString();
    setProjects([...projects, { id, title: "", shortDescription: "", description: "", image: "", tags: [], category: "llm", featured: false }]);
    setExpanded(id);
  };

  const removeProject = (id: string) => { setDeleteId(id); };

  const update = (i: number, patch: Partial<Project>) => {
    const n = [...projects]; n[i] = { ...n[i], ...patch }; setProjects(n); setStatus("idle");
  };

  const confirmDelete = () => { setProjects(projects.filter((p) => p.id !== deleteId)); setDeleteId(null); toast("Project deleted", "success"); };

  return (
    <AdminPageContainer maxWidth="xl">
      <div className="space-y-6">
        <div className="mb-8 flex items-center justify-between">
          <div><h2 className="text-2xl font-bold text-text-primary">Manage Projects</h2>
            <p className="mt-1 text-text-secondary">Add, edit, or remove portfolio projects.</p></div>
          <div className="flex items-center gap-3"><AutoSaveIndicator status={status} />
            <Button onClick={handleSave}><Save className="h-4 w-4" />Save Changes</Button></div>
        </div>

        <Button variant="secondary" onClick={addProject} className="mb-6"><Plus className="h-4 w-4" />Add Project</Button>

        {projects.length === 0 ? <EmptyState title="No projects" description="Add your first project." icon="projects" /> : (
          <div className="space-y-4">
            {projects.map((project, i) => (
              <motion.div key={project.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="glass rounded-2xl overflow-hidden">
                <div className="flex items-center gap-3 p-4 cursor-pointer" onClick={() => setExpanded(expanded === project.id ? null : project.id)}>
                  <GripVertical className="h-4 w-4 text-text-muted flex-shrink-0" />
                  {project.image ? <img src={project.image} alt="" className="h-10 w-10 rounded-lg object-cover" /> : <div className="h-10 w-10 rounded-lg bg-surface-elevated" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">{project.title || "Untitled Project"}</p>
                    <p className="text-xs text-text-muted truncate">{project.category}</p>
                  </div>
                  {project.featured && <span className="text-[10px] font-medium bg-accent-blue/10 text-accent-blue px-2 py-0.5 rounded-full">Featured</span>}
                  <ChevronDown className={cn("h-4 w-4 text-text-muted transition-transform", expanded === project.id && "rotate-180")} />
                  <button onClick={(e) => { e.stopPropagation(); removeProject(project.id); }} className="rounded-lg p-1.5 text-text-muted hover:bg-error/10 hover:text-error transition-colors"><Trash2 className="h-4 w-4" /></button>
                </div>

                <AnimatePresence>
                  {expanded === project.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="border-t border-border/30 p-5">
                      <div className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Input label="Title" value={project.title} onChange={(e) => update(i, { title: e.target.value })} />
                          <Input label="Category" value={project.category} onChange={(e) => update(i, { category: e.target.value })} />
                        </div>
                        <Input label="Short Description" value={project.shortDescription} onChange={(e) => update(i, { shortDescription: e.target.value })} />
                        <Textarea label="Full Description" value={project.description} onChange={(e) => update(i, { description: e.target.value })} rows={4} />
                        <Input label="Image URL" value={project.image} onChange={(e) => update(i, { image: e.target.value })} />
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Input label="Live URL" value={project.liveUrl || ""} onChange={(e) => update(i, { liveUrl: e.target.value })} />
                          <Input label="GitHub URL" value={project.githubUrl || ""} onChange={(e) => update(i, { githubUrl: e.target.value })} />
                        </div>
                        <Input label="Tags (comma separated)" value={project.tags.join(", ")} onChange={(e) => update(i, { tags: e.target.value.split(",").map((s) => s.trim()) })} />
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={project.featured} onChange={(e) => update(i, { featured: e.target.checked })} className="h-4 w-4 rounded border-border accent-accent-blue" />
                          <span className="text-sm text-text-secondary">Featured Project</span>
                        </label>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={confirmDelete}
        title="Delete Project" description="This action cannot be undone." confirmLabel="Delete" variant="danger" />
    </AdminPageContainer>
  );
}
