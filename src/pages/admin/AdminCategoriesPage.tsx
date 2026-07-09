import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AdminPageContainer } from "@/components/admin/AdminPageContainer";
import { projectCategories as defaultCategories } from "@/data/projectsData";
import { useToast } from "@/components/admin/Toast";
import { AutoSaveIndicator } from "@/components/admin/AutoSaveIndicator";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { EmptyState } from "@/components/admin/EmptyState";
import type { ProjectCategory } from "@/types";

export function AdminCategoriesPage() {
  const [categories, setCategories] = useState<ProjectCategory[]>(defaultCategories);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (status !== "idle") return;
    const t = setTimeout(() => { setStatus("saving"); setTimeout(() => setStatus("saved"), 600); }, 800);
    return () => clearTimeout(t);
  }, [status, categories]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if ((e.ctrlKey || e.metaKey) && e.key === "s") { e.preventDefault(); handleSave(); } };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const handleSave = () => { setStatus("saving"); setTimeout(() => { setStatus("saved"); toast("Categories saved", "success"); }, 600); };

  const addCategory = () => {
    setCategories([...categories, { id: Date.now().toString(), name: "", slug: "", description: "" }]);
  };

  const confirmDelete = () => { setCategories(categories.filter((c) => c.id !== deleteId)); setDeleteId(null); toast("Category deleted", "success"); };

  return (
    <AdminPageContainer maxWidth="xl">
      <div className="space-y-6">
        <div className="mb-8 flex items-center justify-between">
          <div><h2 className="text-2xl font-bold text-text-primary">Manage Categories</h2>
            <p className="mt-1 text-text-secondary">Add, edit, or remove project categories.</p></div>
          <div className="flex items-center gap-3"><AutoSaveIndicator status={status} />
            <Button onClick={handleSave}><Save className="h-4 w-4" />Save Changes</Button></div>
        </div>

        <Button variant="secondary" onClick={addCategory} className="mb-6"><Plus className="h-4 w-4" />Add Category</Button>

        {categories.length === 0 ? <EmptyState title="No categories" description="Add your first project category." icon="skills" /> : (
          <div className="space-y-3">
            {categories.map((cat, i) => (
              <motion.div key={cat.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="glass flex items-center gap-3 rounded-2xl p-4">
                <div className="flex flex-1 items-center gap-3">
                  <Input placeholder="Name" value={cat.name}
                    onChange={(e) => { const n = [...categories]; n[i] = { ...n[i], name: e.target.value }; setCategories(n); setStatus("idle"); }}
                    className="flex-1" />
                  <Input placeholder="Slug" value={cat.slug}
                    onChange={(e) => { const n = [...categories]; n[i] = { ...n[i], slug: e.target.value }; setCategories(n); setStatus("idle"); }}
                    className="w-32" />
                  <Input placeholder="Description" value={cat.description}
                    onChange={(e) => { const n = [...categories]; n[i] = { ...n[i], description: e.target.value }; setCategories(n); setStatus("idle"); }}
                    className="flex-1" />
                </div>
                <button onClick={() => setDeleteId(cat.id)} className="rounded-lg p-1.5 text-text-muted hover:bg-error/10 hover:text-error transition-colors"><Trash2 className="h-4 w-4" /></button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={confirmDelete}
        title="Delete Category" description="This action cannot be undone." confirmLabel="Delete" variant="danger" />
    </AdminPageContainer>
  );
}
