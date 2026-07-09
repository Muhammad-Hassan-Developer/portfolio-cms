import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { AdminPageContainer } from "@/components/admin/AdminPageContainer";
import { footerData as defaultFooter } from "@/data/footerData";
import { useToast } from "@/components/admin/Toast";
import { AutoSaveIndicator } from "@/components/admin/AutoSaveIndicator";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { EmptyState } from "@/components/admin/EmptyState";
import type { FooterData } from "@/types";

export function AdminFooterPage() {
  const [data, setData] = useState<FooterData>(defaultFooter);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

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

  const handleSave = () => { setStatus("saving"); setTimeout(() => { setStatus("saved"); toast("Footer saved", "success"); }, 600); };

  const addSocialLink = () => {
    setData({ ...data, socialLinks: [...data.socialLinks, { id: Date.now().toString(), platform: "", url: "", icon: "" }] });
  };

  const confirmDelete = () => { setData({ ...data, socialLinks: data.socialLinks.filter((l) => l.id !== deleteId) }); setDeleteId(null); toast("Link removed", "success"); };

  return (
    <AdminPageContainer maxWidth="xl">
      <div className="space-y-6">
        <div className="mb-8 flex items-center justify-between">
          <div><h2 className="text-2xl font-bold text-text-primary">Edit Footer</h2>
            <p className="mt-1 text-text-secondary">Update footer content and social links.</p></div>
          <div className="flex items-center gap-3"><AutoSaveIndicator status={status} />
            <Button onClick={handleSave}><Save className="h-4 w-4" />Save Changes</Button></div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-6">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Footer Content</h3>
            <div className="space-y-4">
              <Textarea label="Tagline" value={data.tagline} onChange={(e) => { setData({ ...data, tagline: e.target.value }); setStatus("idle"); }} rows={2} />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Email" value={data.email} onChange={(e) => { setData({ ...data, email: e.target.value }); setStatus("idle"); }} />
                <Input label="Phone" value={data.phone} onChange={(e) => { setData({ ...data, phone: e.target.value }); setStatus("idle"); }} />
              </div>
              <Input label="Copyright" value={data.copyright} onChange={(e) => { setData({ ...data, copyright: e.target.value }); setStatus("idle"); }} />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary">Social Links</h3>
              <Button variant="secondary" size="sm" onClick={addSocialLink}><Plus className="h-3 w-3" />Add Link</Button>
            </div>
            {data.socialLinks.length === 0 ? <EmptyState title="No social links" description="Add links to your social profiles." icon="skills" /> : (
              <div className="space-y-3">
                {data.socialLinks.map((link, i) => (
                  <div key={link.id} className="flex items-center gap-2">
                    <Input placeholder="Platform" value={link.platform}
                      onChange={(e) => { const n = [...data.socialLinks]; n[i] = { ...n[i], platform: e.target.value }; setData({ ...data, socialLinks: n }); setStatus("idle"); }}
                      className="w-32" />
                    <Input placeholder="URL" value={link.url}
                      onChange={(e) => { const n = [...data.socialLinks]; n[i] = { ...n[i], url: e.target.value }; setData({ ...data, socialLinks: n }); setStatus("idle"); }}
                      className="flex-1" />
                    <Input placeholder="Icon" value={link.icon}
                      onChange={(e) => { const n = [...data.socialLinks]; n[i] = { ...n[i], icon: e.target.value }; setData({ ...data, socialLinks: n }); setStatus("idle"); }}
                      className="w-24" />
                    <button onClick={() => setDeleteId(link.id)} className="rounded-lg p-1.5 text-text-muted hover:bg-error/10 hover:text-error transition-colors"><Trash2 className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={confirmDelete}
        title="Delete Social Link" description="This action cannot be undone." confirmLabel="Delete" variant="danger" />
    </AdminPageContainer>
  );
}
