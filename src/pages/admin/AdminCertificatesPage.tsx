import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Plus, Trash2, ChevronDown, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AdminPageContainer } from "@/components/admin/AdminPageContainer";
import { certificates as defaultCertificates } from "@/data/certificatesData";
import { useToast } from "@/components/admin/Toast";
import { AutoSaveIndicator } from "@/components/admin/AutoSaveIndicator";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { EmptyState } from "@/components/admin/EmptyState";
import { cn } from "@/utils/cn";
import type { Certificate } from "@/types";

export function AdminCertificatesPage() {
  const [certs, setCerts] = useState<Certificate[]>(defaultCertificates);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (status !== "idle") return;
    const t = setTimeout(() => { setStatus("saving"); setTimeout(() => setStatus("saved"), 600); }, 800);
    return () => clearTimeout(t);
  }, [status, certs]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if ((e.ctrlKey || e.metaKey) && e.key === "s") { e.preventDefault(); handleSave(); } };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const handleSave = () => { setStatus("saving"); setTimeout(() => { setStatus("saved"); toast("Certificates saved", "success"); }, 600); };

  const addCertificate = () => {
    const id = Date.now().toString();
    setCerts([...certs, { id, title: "", issuer: "", date: "", image: "", credentialUrl: "", skills: [] }]);
    setExpanded(id);
  };

  const confirmDelete = () => { setCerts(certs.filter((c) => c.id !== deleteId)); setDeleteId(null); toast("Certificate deleted", "success"); };

  const update = (i: number, patch: Partial<Certificate>) => {
    const n = [...certs]; n[i] = { ...n[i], ...patch }; setCerts(n); setStatus("idle");
  };

  return (
    <AdminPageContainer maxWidth="xl">
      <div className="space-y-6">
        <div className="mb-8 flex items-center justify-between">
          <div><h2 className="text-2xl font-bold text-text-primary">Manage Certificates</h2>
            <p className="mt-1 text-text-secondary">Add, edit, or remove certifications.</p></div>
          <div className="flex items-center gap-3"><AutoSaveIndicator status={status} />
            <Button onClick={handleSave}><Save className="h-4 w-4" />Save Changes</Button></div>
        </div>

        <Button variant="secondary" onClick={addCertificate} className="mb-6"><Plus className="h-4 w-4" />Add Certificate</Button>

        {certs.length === 0 ? <EmptyState title="No certificates" description="Add your first certificate." icon="certificates" /> : (
          <div className="space-y-4">
            {certs.map((cert, i) => (
              <motion.div key={cert.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="glass rounded-2xl overflow-hidden">
                <div className="flex items-center gap-3 p-4 cursor-pointer" onClick={() => setExpanded(expanded === cert.id ? null : cert.id)}>
                  <GripVertical className="h-4 w-4 text-text-muted flex-shrink-0" />
                  {cert.image ? <img src={cert.image} alt="" className="h-10 w-10 rounded-lg object-cover" /> : <div className="h-10 w-10 rounded-lg bg-surface-elevated" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">{cert.title || "Untitled Certificate"}</p>
                    <p className="text-xs text-text-muted">{cert.issuer}</p>
                  </div>
                  <ChevronDown className={cn("h-4 w-4 text-text-muted transition-transform", expanded === cert.id && "rotate-180")} />
                  <button onClick={(e) => { e.stopPropagation(); setDeleteId(cert.id); }} className="rounded-lg p-1.5 text-text-muted hover:bg-error/10 hover:text-error transition-colors"><Trash2 className="h-4 w-4" /></button>
                </div>

                <AnimatePresence>
                  {expanded === cert.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="border-t border-border/30 p-5">
                      <div className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Input label="Title" value={cert.title} onChange={(e) => update(i, { title: e.target.value })} />
                          <Input label="Issuer" value={cert.issuer} onChange={(e) => update(i, { issuer: e.target.value })} />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Input label="Date" type="date" value={cert.date} onChange={(e) => update(i, { date: e.target.value })} />
                          <Input label="Credential URL" value={cert.credentialUrl} onChange={(e) => update(i, { credentialUrl: e.target.value })} />
                        </div>
                        <Input label="Image URL" value={cert.image} onChange={(e) => update(i, { image: e.target.value })} />
                        <Input label="Skills (comma separated)" value={cert.skills.join(", ")} onChange={(e) => update(i, { skills: e.target.value.split(",").map((s) => s.trim()) })} />
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
        title="Delete Certificate" description="This action cannot be undone." confirmLabel="Delete" variant="danger" />
    </AdminPageContainer>
  );
}
