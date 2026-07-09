import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  Copy,
  LayoutDashboard,
  FolderOpen,
  Palette,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ADMIN_CREDENTIALS } from "@/constants";

const features = [
  { icon: LayoutDashboard, label: "Portfolio Management" },
  { icon: FolderOpen, label: "Project CMS" },
  { icon: Palette, label: "Theme Customization" },
];

export function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (
        email === ADMIN_CREDENTIALS.email &&
        password === ADMIN_CREDENTIALS.password
      ) {
        sessionStorage.setItem("admin_auth", "true");
        navigate("/admin/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
        setIsLoading(false);
      }
    }, 800);
  };

  const handleCopyCredentials = async () => {
    await navigator.clipboard.writeText(
      `Email: ${ADMIN_CREDENTIALS.email}\nPassword: ${ADMIN_CREDENTIALS.password}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="login-page relative flex min-h-screen overflow-hidden bg-background">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="login-blob login-blob-1 absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full bg-accent-blue/[0.07]" />
        <div className="login-blob login-blob-2 absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-accent-purple/[0.07]" />
        <div className="login-blob login-blob-3 absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-blue/[0.04]" />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ===== LEFT SIDE — Branding (40%) ===== */}
      <div className="login-left relative z-10 hidden w-[40%] flex-col items-center justify-center p-12 lg:flex xl:p-16">
        <div className="login-fade-in mx-auto max-w-md">
          {/* Logo */}
          <div className="login-slide-up mb-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple shadow-lg shadow-accent-purple/20">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary">Portfolio</h2>
              <p className="text-xs text-text-muted">AI Engineer</p>
            </div>
          </div>

          {/* Tagline */}
          <h1 className="login-slide-up mb-3 text-4xl font-bold leading-tight text-text-primary xl:text-5xl">
            AI Engineer{" "}
            <span className="gradient-text">Portfolio CMS</span>
          </h1>
          <p className="login-slide-up mb-12 text-lg leading-relaxed text-text-secondary">
            Manage your portfolio, projects, skills, certificates and website
            content from one dashboard.
          </p>

          {/* Feature cards */}
          <div className="space-y-4">
            {features.map((feature, i) => (
              <div
                key={feature.label}
                className="login-feature-card glass group flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:border-accent-blue/30 hover:bg-surface-elevated/50"
                style={{ animationDelay: `${0.4 + i * 0.1}s` }}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 transition-all duration-300 group-hover:from-accent-blue/30 group-hover:to-accent-purple/30 group-hover:shadow-lg group-hover:shadow-accent-blue/10">
                  <feature.icon className="h-5 w-5 text-accent-blue transition-colors group-hover:text-accent-blue-light" />
                </div>
                <span className="text-sm font-medium text-text-secondary transition-colors group-hover:text-text-primary">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== RIGHT SIDE — Login Card (60%) ===== */}
      <div className="login-right relative z-10 flex w-full items-center justify-center p-6 sm:p-8 lg:w-[60%]">
        <div className="login-fade-in w-full max-w-[440px]">
          {/* Mobile logo */}
          <div className="login-slide-up mb-8 flex items-center justify-center gap-3 lg:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple shadow-lg shadow-accent-purple/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-text-primary">Portfolio</span>
          </div>

          {/* Login card */}
          <div className="login-card glass-strong rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/20">
            {/* Header */}
            <div className="login-slide-up mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple shadow-lg shadow-accent-purple/25">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary">Welcome Back</h2>
              <p className="mt-1.5 text-sm text-text-secondary">
                Sign in to continue to your dashboard
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="login-slide-up group">
                <label
                  htmlFor="login-email"
                  className="mb-2 block text-sm font-medium text-text-secondary"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted transition-colors group-focus-within:text-accent-blue" />
                  <input
                    ref={emailRef}
                    id="login-email"
                    type="email"
                    placeholder="admin@portfolio.dev"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input h-12 w-full rounded-xl border border-border bg-surface-elevated !pl-11 !pr-4 text-sm text-text-primary placeholder:text-text-muted transition-all duration-300 focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20 hover:border-border/80"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="login-slide-up group">
                <label
                  htmlFor="login-password"
                  className="mb-2 block text-sm font-medium text-text-secondary"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted transition-colors group-focus-within:text-accent-blue" />
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input h-12 w-full rounded-xl border border-border bg-surface-elevated !pl-11 !pr-12 text-sm text-text-primary placeholder:text-text-muted transition-all duration-300 focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20 hover:border-border/80"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-text-muted transition-colors hover:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot */}
              <div className="login-slide-up flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2.5 select-none">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="h-4 w-4 rounded border border-border bg-surface-elevated transition-all duration-200 peer-checked:border-accent-blue peer-checked:bg-accent-blue peer-focus-visible:ring-2 peer-focus-visible:ring-accent-blue/20" />
                    <Check className="pointer-events-none absolute left-0 top-0 h-4 w-4 p-0.5 text-white opacity-0 transition-opacity duration-200 peer-checked:opacity-100" />
                  </div>
                  <span className="text-sm text-text-secondary">Remember me</span>
                </label>
                <button
                  type="button"
                  disabled
                  className="text-sm text-text-muted transition-colors hover:text-text-secondary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Forgot password?
                </button>
              </div>

              {/* Error */}
              {error && (
                <div className="login-shake rounded-xl border border-error/20 bg-error/10 px-4 py-3 text-sm text-error">
                  {error}
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                variant="gradient"
                className="login-button group relative h-12 w-full rounded-xl text-base font-semibold shadow-lg shadow-accent-purple/20 transition-all duration-300 hover:shadow-accent-purple/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </>
                )}
              </Button>
            </form>

            {/* Demo credentials */}
            <div className="login-slide-up mt-8">
              <div className="relative rounded-xl border border-border bg-surface/60 p-4">
                <div className="mb-2.5 flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
                    Demo Credentials
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCredentials}
                    className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-text-muted transition-all duration-200 hover:bg-surface-elevated hover:text-text-secondary"
                    aria-label="Copy demo credentials"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3 w-3 text-success" />
                        <span className="text-success">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="space-y-1.5 font-mono text-sm">
                  <div className="text-text-secondary">
                    <span className="text-text-muted">Email:</span>{" "}
                    {ADMIN_CREDENTIALS.email}
                  </div>
                  <div className="text-text-secondary">
                    <span className="text-text-muted">Password:</span>{" "}
                    {ADMIN_CREDENTIALS.password}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer text */}
          <p className="login-slide-up mt-6 text-center text-xs text-text-muted">
            Protected area. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </div>
  );
}
