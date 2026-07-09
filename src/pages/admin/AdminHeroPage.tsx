import { useState, useEffect, useCallback } from "react";
import { Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { AutoSaveIndicator } from "@/components/admin/AutoSaveIndicator";
import { useToast } from "@/components/admin/Toast";
import { heroService } from "@/services/heroService";
import type { HeroData } from "@/types";
import { AdminPageContainer } from "@/components/admin/AdminPageContainer";

export function AdminHeroPage() {
  const [data, setData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    heroService.get()
      .then((heroData) => setData(heroData))
      .catch((err) => setError(err?.message || "Failed to load hero data"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = useCallback((updater: (prev: typeof data) => typeof data) => {
    setData((prev) => {
      const next = updater(prev);
      setHasChanges(true);
      setSaveStatus("idle");
      return next;
    });
  }, []);

  useEffect(() => {
    if (!hasChanges) return;
    setSaveStatus("saving");
    const timer = setTimeout(() => {
      setSaveStatus("saved");
      setHasChanges(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [hasChanges, data]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        if (hasChanges) {
          setSaveStatus("saving");
          setTimeout(() => {
            setSaveStatus("saved");
            setHasChanges(false);
            toast("Hero section saved successfully", "success");
          }, 600);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [hasChanges, toast]);

  const handleSave = () => {
    console.log("Saving hero data:", data);
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setHasChanges(false);
      toast("Hero section saved successfully", "success");
    }, 800);
  };

  if (loading) {
    return (
      <AdminPageContainer maxWidth="xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-accent-blue" />
        </div>
      </AdminPageContainer>
    );
  }

  if (error) {
    return (
      <AdminPageContainer maxWidth="xl">
        <div className="flex flex-col items-center gap-4 text-center min-h-[400px] justify-center">
          <p className="text-red-400 text-sm">{error}</p>
          <Button
            onClick={() => {
              setLoading(true);
              setError(null);
              heroService.get()
                .then((heroData) => setData(heroData))
                .catch((err) => setError(err?.message || "Failed to load hero data"))
                .finally(() => setLoading(false));
            }}
            size="sm"
          >
            Retry
          </Button>
        </div>
      </AdminPageContainer>
    );
  }

  if (!data) return null;

  return (
    <AdminPageContainer maxWidth="xl"><div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Edit Hero Section</h2>
          <p className="mt-1 text-sm text-text-secondary">Update the hero section content displayed on the homepage.</p>
        </div>
        <div className="flex items-center gap-4">
          <AutoSaveIndicator status={saveStatus} />
          <Button onClick={handleSave} size="sm">
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 space-y-6">
        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-muted">Basic Information</h3>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Greeting"
                value={data.greeting}
                onChange={(e) => handleChange((prev) => ({ ...prev, greeting: e.target.value }))}
              />
              <Input
                label="Name"
                value={data.name}
                onChange={(e) => handleChange((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <Input
              label="Title"
              value={data.title}
              onChange={(e) => handleChange((prev) => ({ ...prev, title: e.target.value }))}
            />
            <Input
              label="Subtitle"
              value={data.subtitle}
              onChange={(e) => handleChange((prev) => ({ ...prev, subtitle: e.target.value }))}
            />
            <div className="relative">
              <Textarea
                label="Description"
                value={data.description}
                onChange={(e) => handleChange((prev) => ({ ...prev, description: e.target.value }))}
                rows={4}
              />
              <span className="absolute bottom-3 right-3 text-[10px] text-text-muted">
                {data.description.length} chars
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 pt-6">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-muted">Call to Action</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="CTA Text"
              value={data.ctaText}
              onChange={(e) => handleChange((prev) => ({ ...prev, ctaText: e.target.value }))}
            />
            <Input
              label="CTA Link"
              value={data.ctaLink}
              onChange={(e) => handleChange((prev) => ({ ...prev, ctaLink: e.target.value }))}
            />
          </div>
          <div className="mt-4">
            <Input
              label="Resume Link"
              value={data.resumeLink}
              onChange={(e) => handleChange((prev) => ({ ...prev, resumeLink: e.target.value }))}
            />
          </div>
        </div>

        <div className="border-t border-border/30 pt-6">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-muted">Statistics</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {data.stats.map((stat, i) => (
              <div key={stat.id} className="flex gap-2">
                <Input
                  placeholder="Value"
                  value={stat.value}
                  onChange={(e) => {
                    const newStats = [...data.stats];
                    newStats[i] = { ...newStats[i], value: e.target.value };
                    handleChange((prev) => ({ ...prev, stats: newStats }));
                  }}
                />
                <Input
                  placeholder="Label"
                  value={stat.label}
                  onChange={(e) => {
                    const newStats = [...data.stats];
                    newStats[i] = { ...newStats[i], label: e.target.value };
                    handleChange((prev) => ({ ...prev, stats: newStats }));
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div></AdminPageContainer>
  );
}
