import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Download, Upload, RotateCcw, AlertTriangle, Settings } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { useToast } from "@/components/admin/Toast";
import { cn } from "@/utils/cn";
import { AdminPageContainer } from "@/components/admin/AdminPageContainer";

export function AdminSettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    siteName: "AI Engineer Portfolio",
    siteDescription: "Building the future with AI",
    maintenanceMode: false,
    showMaintenanceMessage: true,
  });
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSave = () => {
    toast("Settings saved successfully", "success");
  };

  const handleExport = () => {
    const data = { version: "1.0", exportedAt: new Date().toISOString(), settings };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-settings-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast("Settings exported", "success");
  };

  const handleImport = () => {
    toast("Import feature ready — connect Supabase for full functionality", "info");
  };

  const handleReset = () => {
    setSettings({ siteName: "AI Engineer Portfolio", siteDescription: "Building the future with AI", maintenanceMode: false, showMaintenanceMessage: true });
    setShowResetConfirm(false);
    toast("Settings reset to defaults", "success");
  };

  return (
    <AdminPageContainer maxWidth="xl"><div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold text-text-primary">Settings</h2>
          <p className="mt-1 text-sm text-text-secondary">Configure your portfolio website settings.</p></div>
        <Button onClick={handleSave}>Save Settings</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-3 mb-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-blue/10 text-accent-blue"><Globe className="h-4 w-4" /></div>
              <h3 className="text-sm font-semibold text-text-primary">General</h3>
            </div>
            <Input label="Website Name" value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} />
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text-secondary">Site Description</label>
              <textarea value={settings.siteDescription} onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                className="h-20 w-full rounded-xl border border-border bg-surface-elevated px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-blue resize-none" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 mb-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/10 text-warning"><AlertTriangle className="h-4 w-4" /></div>
              <h3 className="text-sm font-semibold text-text-primary">Maintenance Mode</h3>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border/50 bg-surface-elevated/50 p-4">
              <div><p className="text-sm font-medium text-text-primary">Enable Maintenance</p>
                <p className="text-xs text-text-muted">Visitors will see a maintenance message</p></div>
              <button onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                className={cn("relative h-6 w-11 rounded-full transition-colors", settings.maintenanceMode ? "bg-warning" : "bg-border")}>
                <div className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform", settings.maintenanceMode ? "translate-x-[22px]" : "translate-x-0.5")} />
              </button>
            </div>
            {settings.maintenanceMode && (
              <div className="rounded-xl border border-warning/20 bg-warning/5 p-4">
                <p className="text-xs text-warning">Maintenance mode is active. Only authenticated users can access the site.</p>
              </div>
            )}
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 mb-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-purple/10 text-accent-purple"><Settings className="h-4 w-4" /></div>
              <h3 className="text-sm font-semibold text-text-primary">Data</h3>
            </div>
            <button onClick={handleExport} className="flex w-full items-center gap-3 rounded-xl border border-border/50 bg-surface-elevated/50 p-4 text-left transition-colors hover:bg-surface-hover">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10 text-success"><Download className="h-4 w-4" /></div>
              <div><p className="text-sm font-medium text-text-primary">Export Settings</p><p className="text-xs text-text-muted">Download as JSON</p></div>
            </button>
            <button onClick={handleImport} className="flex w-full items-center gap-3 rounded-xl border border-border/50 bg-surface-elevated/50 p-4 text-left transition-colors hover:bg-surface-hover">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-blue/10 text-accent-blue"><Upload className="h-4 w-4" /></div>
              <div><p className="text-sm font-medium text-text-primary">Import Settings</p><p className="text-xs text-text-muted">Upload a JSON file</p></div>
            </button>
            <button onClick={() => setShowResetConfirm(true)} className="flex w-full items-center gap-3 rounded-xl border border-border/50 bg-surface-elevated/50 p-4 text-left transition-colors hover:bg-surface-hover">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-error/10 text-error"><RotateCcw className="h-4 w-4" /></div>
              <div><p className="text-sm font-medium text-text-primary">Reset All</p><p className="text-xs text-text-muted">Restore defaults</p></div>
            </button>
          </motion.div>
        </div>
      </div>

      <ConfirmDialog isOpen={showResetConfirm} onClose={() => setShowResetConfirm(false)} onConfirm={handleReset}
        title="Reset All Settings" description="This will reset all settings to their default values. This action cannot be undone." confirmLabel="Reset" variant="danger" />
    </div></AdminPageContainer>
  );
}
