import { useState } from "react";
import { motion } from "framer-motion";
import { Palette, Type, Layout, Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/admin/Toast";
import { AutoSaveIndicator } from "@/components/admin/AutoSaveIndicator";
import { cn } from "@/utils/cn";
import { AdminPageContainer } from "@/components/admin/AdminPageContainer";

type Tab = "colors" | "typography" | "layout" | "effects";
const tabs: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "colors", label: "Colors", icon: Palette },
  { id: "typography", label: "Typography", icon: Type },
  { id: "layout", label: "Layout", icon: Layout },
  { id: "effects", label: "Effects", icon: Sparkles },
];

const presetColors = [
  { name: "Electric", primary: "#3b82f6", secondary: "#8b5cf6" },
  { name: "Emerald", primary: "#10b981", secondary: "#06b6d4" },
  { name: "Rose", primary: "#f43f5e", secondary: "#ec4899" },
  { name: "Amber", primary: "#f59e0b", secondary: "#ef4444" },
  { name: "Cyan", primary: "#06b6d4", secondary: "#3b82f6" },
];

const fontOptions = ["Inter", "Space Grotesk", "Plus Jakarta Sans", "Satoshi", "General Sans"];
const radiusOptions = ["0.5rem", "0.75rem", "1rem", "1.25rem", "1.5rem"];
const shadowOptions = ["none", "sm", "md", "lg", "xl"];

export function AdminThemePage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>("colors");
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  const [theme, setTheme] = useState({
    primaryColor: "#3b82f6",
    secondaryColor: "#8b5cf6",
    background: "#09090b",
    surface: "#111113",
    textPrimary: "#f4f4f5",
    textSecondary: "#a1a1aa",
    font: "Inter",
    fontSize: "14px",
    headingFont: "Inter",
    navStyle: "glass",
    cardStyle: "glass",
    borderRadius: "1rem",
    shadow: "md",
    animationSpeed: "normal",
    containerWidth: "1200px",
    glassIntensity: "0.8",
  });

  const update = (patch: Partial<typeof theme>) => {
    setTheme((t) => ({ ...t, ...patch }));
    setStatus("idle");
  };

  const handleSave = () => {
    setStatus("saving");
    setTimeout(() => { setStatus("saved"); toast("Theme saved", "success"); }, 800);
  };

  const handleReset = () => {
    setTheme({
      primaryColor: "#3b82f6", secondaryColor: "#8b5cf6", background: "#09090b", surface: "#111113",
      textPrimary: "#f4f4f5", textSecondary: "#a1a1aa", font: "Inter", fontSize: "14px", headingFont: "Inter",
      navStyle: "glass", cardStyle: "glass", borderRadius: "1rem", shadow: "md", animationSpeed: "normal",
      containerWidth: "1200px", glassIntensity: "0.8",
    });
    toast("Theme reset to defaults", "success");
  };

  return (
    <AdminPageContainer maxWidth="xl"><div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold text-text-primary">Theme Customizer</h2>
          <p className="mt-1 text-sm text-text-secondary">Customize every aspect of your portfolio's appearance.</p></div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleReset}><RotateCcw className="h-3.5 w-3.5" />Reset</Button>
          <AutoSaveIndicator status={status} />
          <Button size="sm" onClick={handleSave}>Save Theme</Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        {/* Controls */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="flex gap-1 border-b border-border/30 px-3 pt-3">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={cn("relative flex items-center gap-2 rounded-t-xl px-4 py-2.5 text-sm font-medium transition-colors",
                  activeTab === t.id ? "text-text-primary" : "text-text-muted hover:text-text-secondary")}>
                <t.icon className="h-4 w-4" />{t.label}
                {activeTab === t.id && <motion.div layoutId="theme-tab" className="absolute inset-x-0 -bottom-[calc(0.5px+1px)] h-[2px] bg-accent-blue" />}
              </button>
            ))}
          </div>

          <div className="p-5 space-y-5 max-h-[60vh] overflow-y-auto custom-scrollbar">
            {activeTab === "colors" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                <div>
                  <p className="text-xs font-medium text-text-muted mb-3 uppercase tracking-wider">Presets</p>
                  <div className="grid grid-cols-5 gap-2">
                    {presetColors.map((p) => (
                      <button key={p.name} onClick={() => update({ primaryColor: p.primary, secondaryColor: p.secondary })}
                        className={cn("group flex flex-col items-center gap-1.5 rounded-xl p-2 transition-all",
                          theme.primaryColor === p.primary ? "bg-surface-elevated ring-2 ring-accent-blue" : "hover:bg-surface-elevated")}>
                        <div className="flex h-8 w-full overflow-hidden rounded-lg">
                          <div className="w-1/2" style={{ backgroundColor: p.primary }} />
                          <div className="w-1/2" style={{ backgroundColor: p.secondary }} />
                        </div>
                        <span className="text-[10px] text-text-muted">{p.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-medium text-text-muted uppercase tracking-wider">Custom Colors</p>
                  {(["primaryColor", "secondaryColor", "background", "surface", "textPrimary", "textSecondary"] as const).map((key) => (
                    <div key={key} className="flex items-center gap-3">
                      <input type="color" value={theme[key]} onChange={(e) => update({ [key]: e.target.value })}
                        className="h-8 w-8 cursor-pointer rounded-lg border border-border bg-transparent" />
                      <div className="flex-1"><Input label={key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())} value={theme[key]} onChange={(e) => update({ [key]: e.target.value })} /></div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "typography" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                <div><label className="mb-1.5 block text-sm font-medium text-text-secondary">Body Font</label>
                  <div className="grid grid-cols-2 gap-2">
                    {fontOptions.map((f) => (
                      <button key={f} onClick={() => update({ font: f })}
                        className={cn("rounded-xl border p-3 text-left text-sm transition-all", theme.font === f ? "border-accent-blue bg-accent-blue/5 text-accent-blue" : "border-border/50 text-text-secondary hover:border-accent-blue/30")}
                        style={{ fontFamily: f }}>{f}</button>
                    ))}
                  </div>
                </div>
                <div><label className="mb-1.5 block text-sm font-medium text-text-secondary">Heading Font</label>
                  <div className="grid grid-cols-2 gap-2">
                    {fontOptions.map((f) => (
                      <button key={f} onClick={() => update({ headingFont: f })}
                        className={cn("rounded-xl border p-3 text-left text-sm transition-all", theme.headingFont === f ? "border-accent-purple bg-accent-purple/5 text-accent-purple" : "border-border/50 text-text-secondary hover:border-accent-purple/30")}
                        style={{ fontFamily: f }}>{f}</button>
                    ))}
                  </div>
                </div>
                <Input label="Base Font Size" value={theme.fontSize} onChange={(e) => update({ fontSize: e.target.value })} />
              </motion.div>
            )}

            {activeTab === "layout" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                <div><label className="mb-1.5 block text-sm font-medium text-text-secondary">Nav Style</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["glass", "solid", "transparent"] as const).map((s) => (
                      <button key={s} onClick={() => update({ navStyle: s })}
                        className={cn("rounded-xl border p-3 text-sm capitalize transition-all", theme.navStyle === s ? "border-accent-blue bg-accent-blue/5 text-accent-blue" : "border-border/50 text-text-secondary")}>{s}</button>
                    ))}
                  </div>
                </div>
                <div><label className="mb-1.5 block text-sm font-medium text-text-secondary">Card Style</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["glass", "solid", "outlined"] as const).map((s) => (
                      <button key={s} onClick={() => update({ cardStyle: s })}
                        className={cn("rounded-xl border p-3 text-sm capitalize transition-all", theme.cardStyle === s ? "border-accent-blue bg-accent-blue/5 text-accent-blue" : "border-border/50 text-text-secondary")}>{s}</button>
                    ))}
                  </div>
                </div>
                <div><label className="mb-1.5 block text-sm font-medium text-text-secondary">Border Radius</label>
                  <div className="flex gap-2">
                    {radiusOptions.map((r) => (
                      <button key={r} onClick={() => update({ borderRadius: r })}
                        className={cn("flex h-10 w-10 items-center justify-center rounded-xl border transition-all",
                          theme.borderRadius === r ? "border-accent-blue bg-accent-blue/5" : "border-border/50")}
                        style={{ borderRadius: r }}><div className="h-4 w-4 bg-accent-blue" /></button>
                    ))}
                  </div>
                </div>
                <Input label="Container Width" value={theme.containerWidth} onChange={(e) => update({ containerWidth: e.target.value })} />
                <div><label className="mb-1.5 block text-sm font-medium text-text-secondary">Animation Speed</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["slow", "normal", "fast"] as const).map((s) => (
                      <button key={s} onClick={() => update({ animationSpeed: s })}
                        className={cn("rounded-xl border p-3 text-sm capitalize transition-all", theme.animationSpeed === s ? "border-accent-blue bg-accent-blue/5 text-accent-blue" : "border-border/50 text-text-secondary")}>{s}</button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "effects" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                <div><label className="mb-1.5 block text-sm font-medium text-text-secondary">Glass Intensity</label>
                  <input type="range" min="0" max="1" step="0.1" value={theme.glassIntensity}
                    onChange={(e) => update({ glassIntensity: e.target.value })}
                    className="w-full accent-accent-blue" />
                  <p className="mt-1 text-xs text-text-muted">{(parseFloat(theme.glassIntensity) * 100).toFixed(0)}% opacity</p>
                </div>
                <div><label className="mb-1.5 block text-sm font-medium text-text-secondary">Shadow</label>
                  <div className="grid grid-cols-5 gap-2">
                    {shadowOptions.map((s) => (
                      <button key={s} onClick={() => update({ shadow: s })}
                        className={cn("rounded-xl border p-3 text-xs capitalize transition-all", theme.shadow === s ? "border-accent-blue bg-accent-blue/5 text-accent-blue" : "border-border/50 text-text-secondary")}>{s || "None"}</button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Live Preview */}
        <div className="space-y-4">
          <div className="glass rounded-2xl p-4">
            <p className="text-xs font-medium text-text-muted mb-3 uppercase tracking-wider">Live Preview</p>
            <div className="overflow-hidden rounded-xl border border-border/30" style={{ backgroundColor: theme.background }}>
              {/* Preview Nav */}
              <div className={cn("flex items-center justify-between px-4 py-3",
                theme.navStyle === "glass" ? "bg-white/5 backdrop-blur-md" : theme.navStyle === "solid" ? "bg-surface" : "")}
                style={{ borderBottom: theme.navStyle === "transparent" ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                <span className="text-xs font-bold" style={{ color: theme.textPrimary, fontFamily: theme.headingFont }}>Portfolio</span>
                <div className="flex gap-3">
                  {["Home", "About", "Projects"].map((l) => (
                    <span key={l} className="text-[10px]" style={{ color: theme.textSecondary }}>{l}</span>
                  ))}
                </div>
              </div>
              {/* Preview Content */}
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-lg font-bold mb-1" style={{ color: theme.textPrimary, fontFamily: theme.headingFont }}>Hello, I'm a Developer</h3>
                  <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>Building amazing things with AI and modern technologies.</p>
                </div>
                <div className="flex gap-2">
                  <div className="rounded-lg px-3 py-1.5 text-[10px] font-medium text-white" style={{ backgroundColor: theme.primaryColor, borderRadius: theme.borderRadius }}>Get in Touch</div>
                  <div className="rounded-lg px-3 py-1.5 text-[10px] font-medium border" style={{ borderColor: theme.secondaryColor, color: theme.secondaryColor, borderRadius: theme.borderRadius }}>View Projects</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2].map((i) => (
                    <div key={i} className={cn("rounded-lg p-3", theme.cardStyle === "glass" ? "bg-white/5 backdrop-blur-sm" : theme.cardStyle === "solid" ? "" : "border border-white/10")}
                      style={{ backgroundColor: theme.cardStyle === "solid" ? theme.surface : undefined, borderRadius: theme.borderRadius }}>
                      <div className="mb-1.5 h-8 w-full rounded" style={{ backgroundColor: `${theme.primaryColor}20` }} />
                      <div className="mb-1 h-2 w-3/4 rounded" style={{ backgroundColor: `${theme.textPrimary}20` }} />
                      <div className="h-1.5 w-1/2 rounded" style={{ backgroundColor: `${theme.textSecondary}20` }} />
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  {["React", "TypeScript", "AI"].map((t) => (
                    <span key={t} className="rounded-md px-2 py-0.5 text-[9px] font-medium" style={{ backgroundColor: `${theme.primaryColor}20`, color: theme.primaryColor }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CSS Variables Preview */}
          <div className="glass rounded-2xl p-4">
            <p className="text-xs font-medium text-text-muted mb-3 uppercase tracking-wider">Generated CSS</p>
            <pre className="overflow-x-auto rounded-xl bg-surface-elevated p-3 text-[10px] leading-relaxed text-text-secondary">
              <code>{`:root {
  --accent-blue: ${theme.primaryColor};
  --accent-purple: ${theme.secondaryColor};
  --bg: ${theme.background};
  --surface: ${theme.surface};
  --text: ${theme.textPrimary};
  --font: "${theme.font}";
  --radius: ${theme.borderRadius};
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div></AdminPageContainer>
  );
}
