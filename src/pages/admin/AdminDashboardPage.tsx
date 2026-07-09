import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FolderOpen,
  Award,
  Code2,
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  ArrowUpRight,
  Activity,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { projects } from "@/data/projectsData";
import { certificates } from "@/data/certificatesData";
import { skillCategories } from "@/data/skillsData";
import { cn } from "@/utils/cn";
import { AdminPageContainer } from "@/components/admin/AdminPageContainer";

function AnimatedCounter({ value, delay = 0 }: { value: string; delay?: number }) {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const duration = 1000;
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        setCount(Math.floor(progress * numericValue));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timer);
  }, [numericValue, delay]);

  return <span>{count}{suffix}</span>;
}

const stats = [
  {
    label: "Total Projects",
    value: projects.length.toString(),
    icon: FolderOpen,
    color: "from-accent-blue to-blue-600",
    iconColor: "text-accent-blue",
    change: "+2 this month",
  },
  {
    label: "Featured",
    value: projects.filter((p) => p.featured).length.toString(),
    icon: TrendingUp,
    color: "from-accent-purple to-violet-600",
    iconColor: "text-accent-purple",
    change: "Active",
  },
  {
    label: "Certificates",
    value: certificates.length.toString(),
    icon: Award,
    color: "from-success to-emerald-600",
    iconColor: "text-success",
    change: "+1 recent",
  },
  {
    label: "Skill Categories",
    value: skillCategories.length.toString(),
    icon: Code2,
    color: "from-warning to-amber-600",
    iconColor: "text-warning",
    change: "Updated",
  },
  {
    label: "Total Skills",
    value: skillCategories.reduce((acc, c) => acc + c.skills.length, 0).toString(),
    icon: BarChart3,
    color: "from-pink-500 to-rose-600",
    iconColor: "text-pink-500",
    change: "All fields",
  },
  {
    label: "Experience",
    value: "8+",
    icon: Users,
    color: "from-cyan-500 to-blue-600",
    iconColor: "text-cyan-500",
    change: "Years",
  },
];

const activityLog = [
  { time: "2 min ago", action: "Updated Hero section", icon: CheckCircle2, color: "text-success" },
  { time: "15 min ago", action: "Added new project \"NeuralChat\"", icon: FolderOpen, color: "text-accent-blue" },
  { time: "1 hour ago", action: "Modified theme colors", icon: Activity, color: "text-accent-purple" },
  { time: "3 hours ago", action: "Uploaded 3 images", icon: Globe, color: "text-warning" },
  { time: "Yesterday", action: "Updated certificates", icon: Award, color: "text-success" },
];

const quickActions = [
  { label: "Edit Hero", href: "/admin/hero", icon: "01", color: "from-accent-blue/20 to-accent-blue/5" },
  { label: "Manage Projects", href: "/admin/projects", icon: "02", color: "from-accent-purple/20 to-accent-purple/5" },
  { label: "Upload Media", href: "/admin/media", icon: "03", color: "from-success/20 to-success/5" },
  { label: "Theme Settings", href: "/admin/theme", icon: "04", color: "from-warning/20 to-warning/5" },
];

export function AdminDashboardPage() {
  return (
    <AdminPageContainer maxWidth="xl">
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Welcome back, Alex</h2>
          <p className="mt-1 text-sm text-text-secondary">
            Here's what's happening with your portfolio.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <Clock className="h-3 w-3" />
          Last updated: Just now
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:border-accent-blue/20 hover:shadow-xl hover:shadow-accent-blue/5 cursor-default"
            >
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br opacity-10 blur-2xl transition-opacity group-hover:opacity-20"
                style={{ background: `linear-gradient(135deg, var(--color-accent-blue), var(--color-accent-purple))` }}
              />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-text-muted">{stat.label}</p>
                  <p className="mt-1 text-3xl font-bold text-text-primary">
                    <AnimatedCounter value={stat.value} delay={i * 100} />
                  </p>
                  <p className="mt-1 text-xs text-text-muted">{stat.change}</p>
                </div>
                <div className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br transition-transform duration-300 group-hover:scale-110",
                  stat.color
                )}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="glass rounded-2xl p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-text-primary">Website Analytics</h3>
            <span className="text-xs text-text-muted">Last 7 days</span>
          </div>
          <div className="flex items-end gap-2 h-40">
            {[35, 45, 30, 60, 50, 75, 65].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="w-full rounded-t-lg bg-gradient-to-t from-accent-blue to-accent-purple opacity-80 hover:opacity-100 transition-opacity"
                />
                <span className="text-[10px] text-text-muted">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-6">
            <div>
              <p className="text-xs text-text-muted">Visitors</p>
              <p className="text-lg font-bold text-text-primary">1,247</p>
            </div>
            <div>
              <p className="text-xs text-text-muted">Page Views</p>
              <p className="text-lg font-bold text-text-primary">3,891</p>
            </div>
            <div>
              <p className="text-xs text-text-muted">Bounce Rate</p>
              <p className="text-lg font-bold text-text-primary">32%</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-text-primary">Recent Activity</h3>
            <span className="text-xs text-accent-blue cursor-pointer hover:underline">View all</span>
          </div>
          <div className="space-y-4">
            {activityLog.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-elevated">
                  <item.icon className={cn("h-3 w-3", item.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-text-primary truncate">{item.action}</p>
                  <p className="text-[10px] text-text-muted">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-2xl p-6">
          <h3 className="mb-4 text-sm font-semibold text-text-primary">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                to={action.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl border border-border/50 bg-surface-elevated/30 p-4 transition-all duration-300 hover:border-accent-blue/30 hover:bg-surface-elevated"
                )}
              >
                <span className="text-lg font-bold gradient-text">{action.icon}</span>
                <span className="text-xs font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                  {action.label}
                </span>
                <ArrowUpRight className="ml-auto h-3 w-3 text-text-muted opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-text-primary">System Status</h3>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-success">All systems operational</span>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: "Portfolio Website", status: "Online", color: "bg-success" },
              { label: "Contact Form", status: "Active", color: "bg-success" },
              { label: "Image CDN", status: "Healthy", color: "bg-success" },
              { label: "Search Index", status: "Synced", color: "bg-success" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-xl bg-surface-elevated/30 px-4 py-2.5">
                <span className="text-xs text-text-secondary">{item.label}</span>
                <div className="flex items-center gap-1.5">
                  <span className={cn("h-1.5 w-1.5 rounded-full", item.color)} />
                  <span className="text-xs text-text-muted">{item.status}</span>
                </div>
              </div>
            ))}
           </div>
        </div>
      </div>
      </div>
    </AdminPageContainer>
  );
}
