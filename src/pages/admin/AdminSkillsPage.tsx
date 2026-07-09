import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Plus, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AdminPageContainer } from "@/components/admin/AdminPageContainer";
import { skillCategories as defaultSkills } from "@/data/skillsData";
import { useToast } from "@/components/admin/Toast";
import { AutoSaveIndicator } from "@/components/admin/AutoSaveIndicator";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { EmptyState } from "@/components/admin/EmptyState";
import type { SkillCategory } from "@/types";

export function AdminSkillsPage() {
  const [categories, setCategories] = useState<SkillCategory[]>(defaultSkills);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
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

  const handleSave = () => { setStatus("saving"); setTimeout(() => { setStatus("saved"); toast("Skills saved", "success"); }, 600); };

  const addCategory = () => {
    const id = Date.now().toString();
    setCategories([...categories, { id, name: "", icon: "Code2", skills: [] }]);
    setExpanded(id);
  };

  const removeCategory = (id: string) => { setDeleteId(id); };

  const addSkill = (catIndex: number) => {
    const n = [...categories];
    n[catIndex] = { ...n[catIndex], skills: [...n[catIndex].skills, { id: Date.now().toString(), name: "", level: 80, icon: "Code" }] };
    setCategories(n);
  };

  const removeSkill = (catIndex: number, skillId: string) => {
    const n = [...categories];
    n[catIndex] = { ...n[catIndex], skills: n[catIndex].skills.filter((s) => s.id !== skillId) };
    setCategories(n);
    toast("Skill removed", "success");
  };

  const confirmDelete = () => {
    setCategories(categories.filter((c) => c.id !== deleteId));
    setDeleteId(null);
    toast("Category deleted", "success");
  };

  return (
    <AdminPageContainer maxWidth="xl">
      <div className="space-y-6">
        <div className="mb-8 flex items-center justify-between">
          <div><h2 className="text-2xl font-bold text-text-primary">Manage Skills</h2>
            <p className="mt-1 text-text-secondary">Add, edit, or remove skill categories and skills.</p></div>
          <div className="flex items-center gap-3"><AutoSaveIndicator status={status} />
            <Button onClick={handleSave}><Save className="h-4 w-4" />Save Changes</Button></div>
        </div>

        <Button variant="secondary" onClick={addCategory} className="mb-6"><Plus className="h-4 w-4" />Add Category</Button>

        {categories.length === 0 ? <EmptyState title="No categories" description="Add your first skill category." icon="skills" /> : (
          <div className="space-y-4">
            {categories.map((cat, catIndex) => (
              <motion.div key={cat.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: catIndex * 0.05 }}
                className="glass rounded-2xl overflow-hidden">
                <div className="flex items-center gap-3 p-4 cursor-pointer" onClick={() => setExpanded(expanded === cat.id ? null : cat.id)}>
                  <GripVertical className="h-4 w-4 text-text-muted flex-shrink-0" />
                  <div className="flex-1 flex items-center gap-2">
                    <Input placeholder="Category Name" value={cat.name} onClick={(e) => e.stopPropagation()}
                      onChange={(e) => { const n = [...categories]; n[catIndex] = { ...n[catIndex], name: e.target.value }; setCategories(n); setStatus("idle"); }}
                      className="max-w-xs" />
                    <Input placeholder="Icon" value={cat.icon} onClick={(e) => e.stopPropagation()}
                      onChange={(e) => { const n = [...categories]; n[catIndex] = { ...n[catIndex], icon: e.target.value }; setCategories(n); setStatus("idle"); }}
                      className="max-w-[100px]" />
                  </div>
                  <span className="text-xs text-text-muted bg-surface-elevated px-2 py-0.5 rounded-full">{cat.skills.length} skills</span>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); addSkill(catIndex); }}><Plus className="h-3 w-3" />Skill</Button>
                    <button onClick={(e) => { e.stopPropagation(); removeCategory(cat.id); }} className="rounded-lg p-1.5 text-text-muted hover:bg-error/10 hover:text-error transition-colors"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>

                {expanded === cat.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="border-t border-border/30 p-4">
                    {cat.skills.length === 0 ? <p className="text-sm text-text-muted text-center py-4">No skills yet. Click "Skill" to add one.</p> : (
                      <div className="space-y-2">
                        {cat.skills.map((skill, si) => (
                          <div key={skill.id} className="flex items-center gap-2 group">
                            <Input placeholder="Skill name" value={skill.name}
                              onChange={(e) => { const n = [...categories]; const s = [...n[catIndex].skills]; s[si] = { ...s[si], name: e.target.value }; n[catIndex] = { ...n[catIndex], skills: s }; setCategories(n); setStatus("idle"); }}
                              className="flex-1" />
                            <input type="range" min={0} max={100} value={skill.level}
                              onChange={(e) => { const n = [...categories]; const s = [...n[catIndex].skills]; s[si] = { ...s[si], level: parseInt(e.target.value) }; n[catIndex] = { ...n[catIndex], skills: s }; setCategories(n); setStatus("idle"); }}
                              className="w-24 accent-accent-blue" />
                            <span className="w-8 text-xs text-text-muted text-right">{skill.level}</span>
                            <button onClick={() => removeSkill(catIndex, skill.id)} className="rounded-lg p-1.5 text-text-muted opacity-0 group-hover:opacity-100 hover:bg-error/10 hover:text-error transition-all"><Trash2 className="h-3 w-3" /></button>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={confirmDelete}
        title="Delete Category" description="All skills in this category will be removed." confirmLabel="Delete" variant="danger" />
    </AdminPageContainer>
  );
}
