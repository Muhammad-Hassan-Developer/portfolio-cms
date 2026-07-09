import { useState } from "react";
import { motion } from "framer-motion";
import { User, Shield, Bell, Monitor } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/admin/Toast";
import { AutoSaveIndicator } from "@/components/admin/AutoSaveIndicator";
import { cn } from "@/utils/cn";
import { AdminPageContainer } from "@/components/admin/AdminPageContainer";

type Tab = "profile" | "security" | "preferences";
const tabs: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "preferences", label: "Preferences", icon: Bell },
];

export function AdminProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const { toast } = useToast();

  const [profile, setProfile] = useState({ name: "Admin", role: "Portfolio Owner", email: "admin@portfolio.dev", bio: "" });
  const [password, setPassword] = useState({ current: "", new: "", confirm: "" });
  const [preferences, setPreferences] = useState({ emailNotifications: true, compactMode: false, showOnlineStatus: true });

  const handleSave = () => {
    setStatus("saving");
    setTimeout(() => { setStatus("saved"); toast("Profile updated", "success"); }, 800);
  };

  return (
    <AdminPageContainer maxWidth="xl"><div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold text-text-primary">Profile & Settings</h2>
          <p className="mt-1 text-sm text-text-secondary">Manage your account and preferences.</p></div>
        <AutoSaveIndicator status={status} />
      </div>

      <div className="glass rounded-2xl p-1">
        <div className="flex gap-1 border-b border-border/30 px-2 pt-2">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={cn("relative flex items-center gap-2 rounded-t-xl px-4 py-2.5 text-sm font-medium transition-colors",
                activeTab === t.id ? "text-text-primary" : "text-text-muted hover:text-text-secondary")}>
              <t.icon className="h-4 w-4" />{t.label}
              {activeTab === t.id && <motion.div layoutId="profile-tab" className="absolute inset-x-0 -bottom-[calc(0.5px+1px)] h-[2px] bg-accent-blue" />}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple text-2xl font-bold text-white">{profile.name.charAt(0)}</div>
                  <button onClick={() => toast("Avatar upload ready for Supabase", "info")}
                    className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="text-xs font-medium text-white">Change</span>
                  </button>
                </div>
                <div><p className="text-sm text-text-primary font-medium">{profile.name}</p><p className="text-xs text-text-muted">{profile.role}</p></div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Full Name" value={profile.name} onChange={(e) => { setProfile({ ...profile, name: e.target.value }); setStatus("idle"); }} />
                <Input label="Role" value={profile.role} onChange={(e) => setProfile({ ...profile, role: e.target.value })} />
              </div>
              <Input label="Email" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
              <div><label className="mb-1.5 block text-sm font-medium text-text-secondary">Bio</label>
                <textarea value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="h-24 w-full rounded-xl border border-border bg-surface-elevated px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-blue resize-none" />
              </div>
              <div className="flex justify-end"><Button onClick={handleSave}>Save Profile</Button></div>
            </motion.div>
          )}

          {activeTab === "security" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="rounded-xl border border-border/50 bg-surface-elevated/50 p-4">
                <div className="flex items-center gap-3"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10 text-success"><Shield className="h-4 w-4" /></div>
                  <div><p className="text-sm font-medium text-text-primary">Password</p><p className="text-xs text-text-muted">Last changed 30 days ago</p></div>
                  <button className="ml-auto text-xs text-accent-blue hover:underline">Change</button></div>
              </div>
              <Input label="Current Password" type="password" value={password.current} onChange={(e) => setPassword({ ...password, current: e.target.value })} placeholder="••••••••" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="New Password" type="password" value={password.new} onChange={(e) => setPassword({ ...password, new: e.target.value })} placeholder="••••••••" />
                <Input label="Confirm Password" type="password" value={password.confirm} onChange={(e) => setPassword({ ...password, confirm: e.target.value })} placeholder="••••••••" />
              </div>
              <div className="rounded-xl border border-warning/20 bg-warning/5 p-4"><p className="text-xs text-warning">For demo purposes, password changes are simulated.</p></div>
              <div className="flex justify-end"><Button onClick={handleSave}>Update Password</Button></div>
            </motion.div>
          )}

          {activeTab === "preferences" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {([
                { key: "emailNotifications" as const, label: "Email Notifications", desc: "Receive email when someone contacts you", icon: Bell },
                { key: "compactMode" as const, label: "Compact Mode", desc: "Reduce padding and spacing in the dashboard", icon: Monitor },
                { key: "showOnlineStatus" as const, label: "Online Status", desc: "Show your online status to visitors", icon: User },
              ]).map((item) => (
                <div key={item.key} className="flex items-center justify-between rounded-xl border border-border/50 bg-surface-elevated/50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-hover text-text-muted"><item.icon className="h-4 w-4" /></div>
                    <div><p className="text-sm font-medium text-text-primary">{item.label}</p><p className="text-xs text-text-muted">{item.desc}</p></div>
                  </div>
                  <button onClick={() => setPreferences({ ...preferences, [item.key]: !preferences[item.key] })}
                    className={cn("relative h-6 w-11 rounded-full transition-colors", preferences[item.key] ? "bg-accent-blue" : "bg-border")}>
                    <div className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform", preferences[item.key] ? "translate-x-[22px]" : "translate-x-0.5")} />
                  </button>
                </div>
              ))}
              <div className="flex justify-end pt-2"><Button onClick={handleSave}>Save Preferences</Button></div>
            </motion.div>
          )}
        </div>
      </div>
    </div></AdminPageContainer>
  );
}
