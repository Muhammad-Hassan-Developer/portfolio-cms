import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, ChevronDown, AlertCircle, RefreshCw } from "lucide-react";
import { heroService } from "@/services/heroService";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { HeroSkeleton } from "@/components/ui/Skeleton";
import type { HeroData } from "@/types";
import { aboutData } from "@/data/aboutData";

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export function HeroSection() {
  const [hero, setHero] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    heroService.get()
      .then((data) => setHero(data))
      .catch((err) => setError(err?.message || "Failed to load hero data"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <HeroSkeleton />;

  if (error) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center px-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
            <AlertCircle className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary">Failed to load hero section</h2>
          <p className="max-w-md text-sm text-text-secondary">{error}</p>
          <button
            onClick={() => {
              setLoading(true);
              setError(null);
              heroService.get()
                .then((data) => setHero(data))
                .catch((err) => setError(err?.message || "Failed to load hero data"))
                .finally(() => setLoading(false));
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-accent-blue/10 px-5 py-2.5 text-sm font-medium text-accent-blue transition-colors hover:bg-accent-blue/20"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!hero) return null;

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[10%] top-[20%] h-[300px] w-[300px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,1) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, -3, 3, 0],
            scale: [1, 1.03, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute left-[5%] bottom-[20%] h-[250px] w-[250px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,1) 0%, transparent 70%)" }}
        />
      </div>

      <SectionContainer className="pt-24 pb-32 lg:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent-blue/15 bg-accent-blue/5 px-4 py-1.5 text-xs font-medium text-accent-blue">
                <Sparkles className="h-3 w-3" />
                {hero.title}
              </span>
            </motion.div>

            <motion.p variants={fadeUp} className="mb-3 text-base text-text-muted">
              {hero.greeting}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mb-4 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              {hero.name.split(" ").map((word, i) => (
                <span key={i} className="inline-block">
                  {i === 1 ? (
                    <span className="gradient-text">{word}</span>
                  ) : (
                    <span>{word}</span>
                  )}
                  {i < hero.name.split(" ").length - 1 && "\u00A0"}
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mb-3 text-xl font-semibold text-text-primary sm:text-2xl"
            >
              {hero.subtitle}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mb-8 max-w-lg text-base leading-relaxed text-text-secondary"
            >
              {hero.description}
            </motion.p>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="relative mx-auto max-w-md lg:mx-0 lg:ml-auto"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 blur-2xl" />

              <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-surface-elevated/50 p-2">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <img
                    src={aboutData.image}
                    alt="Alex Chen"
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-4 left-4 glass rounded-2xl px-5 py-3 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-blue/10 text-accent-blue">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">AI Engineer</p>
                    <p className="text-xs text-text-muted">Building the future</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute -right-4 -top-4 glass rounded-2xl px-4 py-2 shadow-xl"
              >
                <span className="text-xs font-medium text-accent-purple">Open to Work</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-40 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:mt-50"
        >
          {hero.stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="glass card-hover group cursor-default rounded-2xl p-5 text-center"
            >
              <div className="text-2xl font-bold gradient-text transition-transform duration-300 group-hover:scale-110 sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-text-muted sm:text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="#about"
            className="group flex flex-col items-center gap-2 text-text-muted transition-colors hover:text-accent-blue"
          >
            <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
            <ChevronDown className="h-4 w-4 animate-scroll-indicator" />
          </a>
        </motion.div>
      </SectionContainer>
    </div>
  );
}
