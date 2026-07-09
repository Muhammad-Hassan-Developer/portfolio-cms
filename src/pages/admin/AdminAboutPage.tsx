import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { AdminPageContainer } from "@/components/admin/AdminPageContainer";
import { aboutData as defaultAbout } from "@/data/aboutData";
import { useToast } from "@/components/admin/Toast";
import { AutoSaveIndicator } from "@/components/admin/AutoSaveIndicator";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { EmptyState } from "@/components/admin/EmptyState";

export function AdminAboutPage() {
  const [data, setData] = useState(defaultAbout);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteType, setDeleteType] = useState<"experience" | "highlight">("experience");
  const { toast } = useToast();

  const triggerChange = useCallback(() => setStatus("idle"), []);

  useEffect(() => {
    if (status !== "idle") return;
    const t = setTimeout(() => { setStatus("saving"); setTimeout(() => setStatus("saved"), 600); }, 800);
    return () => clearTimeout(t);
  }, [status, data]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if ((e.ctrlKey || e.metaKey) && e.key === "s") { e.preventDefault(); handleSave(); } };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const handleSave = () => { setStatus("saving"); setTimeout(() => { setStatus("saved"); toast("About section saved", "success"); }, 600); };

  const addExperience = () => {
    setData({ ...data, experience: [...data.experience, { id: Date.now().toString(), role: "", company: "", period: "", description: "", technologies: [] }] });
  };

  const removeExperience = (id: string) => { setDeleteId(id); setDeleteType("experience"); };

  const confirmDelete = () => {
    if (deleteType === "experience") setData({ ...data, experience: data.experience.filter((e) => e.id !== deleteId) });
    else setData({ ...data, highlights: data.highlights.filter((h) => h.id !== deleteId) });
    setDeleteId(null);
    toast("Item removed", "success");
  };

  return (
    <AdminPageContainer maxWidth="xl">
      <div className="space-y-6">
        <div className="mb-8 flex items-center justify-between">
          <div><h2 className="text-2xl font-bold text-text-primary">Edit About Section</h2>
            <p className="mt-1 text-text-secondary">Update the about section and experience timeline.</p></div>
          <div className="flex items-center gap-3"><AutoSaveIndicator status={status} />
            <Button onClick={handleSave}><Save className="h-4 w-4" />Save Changes</Button></div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-6">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">About Content</h3>
            <div className="space-y-4">
              <Input label="Headline" value={data.headline} onChange={(e) => { setData({ ...data, headline: e.target.value }); triggerChange(); }} />
              <Textarea label="Description" value={data.description} onChange={(e) => { setData({ ...data, description: e.target.value }); triggerChange(); }} rows={3} />
              <Textarea label="Long Description" value={data.longDescription} onChange={(e) => { setData({ ...data, longDescription: e.target.value }); triggerChange(); }} rows={5} />
              <Input label="Profile Image URL" value={data.image} onChange={(e) => { setData({ ...data, image: e.target.value }); triggerChange(); }} />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-6">
            <div className="mb-4 flex items-center justify-between"><h3 className="text-lg font-semibold text-text-primary">Highlights</h3></div>
            {data.highlights.length === 0 ? <EmptyState title="No highlights" description="Add key points about yourself." icon="skills" /> : (
              <div className="space-y-3">
                {data.highlights.map((highlight, i) => (
                  <div key={highlight.id} className="flex gap-2">
                    <Input placeholder="Title" value={highlight.title} onChange={(e) => { const n = [...data.highlights]; n[i] = { ...n[i], title: e.target.value }; setData({ ...data, highlights: n }); triggerChange(); }} />
                    <Input placeholder="Icon" value={highlight.icon} onChange={(e) => { const n = [...data.highlights]; n[i] = { ...n[i], icon: e.target.value }; setData({ ...data, highlights: n }); triggerChange(); }} />
                    <button onClick={() => { setDeleteId(highlight.id); setDeleteType("highlight"); }} className="rounded-lg p-2 text-text-muted hover:bg-error/10 hover:text-error transition-colors"><Trash2 className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-2xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary">Experience</h3>
              <Button variant="secondary" size="sm" onClick={addExperience}><Plus className="h-3 w-3" />Add</Button>
            </div>
            {data.experience.length === 0 ? <EmptyState title="No experience" description="Add your work experience." icon="skills" /> : (
              <div className="space-y-4">
                {data.experience.map((exp, i) => (
                  <div key={exp.id} className="rounded-xl border border-border/30 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-text-muted">Experience {i + 1}</span>
                      <button onClick={() => removeExperience(exp.id)} className="rounded-lg p-1.5 text-text-muted hover:bg-error/10 hover:text-error transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Input placeholder="Role" value={exp.role} onChange={(e) => { const n = [...data.experience]; n[i] = { ...n[i], role: e.target.value }; setData({ ...data, experience: n }); triggerChange(); }} />
                      <Input placeholder="Company" value={exp.company} onChange={(e) => { const n = [...data.experience]; n[i] = { ...n[i], company: e.target.value }; setData({ ...data, experience: n }); triggerChange(); }} />
                      <Input placeholder="Period" value={exp.period} onChange={(e) => { const n = [...data.experience]; n[i] = { ...n[i], period: e.target.value }; setData({ ...data, experience: n }); triggerChange(); }} />
                      <Input placeholder="Technologies (comma separated)" value={exp.technologies.join(", ")} onChange={(e) => { const n = [...data.experience]; n[i] = { ...n[i], technologies: e.target.value.split(",").map((s) => s.trim()) }; setData({ ...data, experience: n }); triggerChange(); }} />
                    </div>
                    <Textarea placeholder="Description" value={exp.description} onChange={(e) => { const n = [...data.experience]; n[i] = { ...n[i], description: e.target.value }; setData({ ...data, experience: n }); triggerChange(); }} rows={2} className="mt-3" />
                  </div>
                ))}
              </div>
            )}
           </motion.div>
        </div>
      </div>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={confirmDelete}
        title={`Delete ${deleteType}`} description="This action cannot be undone." confirmLabel="Delete" variant="danger" />
    </AdminPageContainer>
  );
}
