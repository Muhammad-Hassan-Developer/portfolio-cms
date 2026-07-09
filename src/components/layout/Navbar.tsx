import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { cn } from "@/utils/cn";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { PORTFOLIO_NAV } from "@/constants";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="sticky top-0 z-50 w-full glass-strong border-b border-border/30 shadow-lg shadow-black/10"
      >
        <SectionContainer>
          <nav className="flex h-16 items-center justify-between lg:h-20">
            <Link to="/" className="group flex items-center gap-2.5">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple transition-transform duration-300 group-hover:scale-110">
                <Sparkles className="h-4 w-4 text-white" />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-50" />
              </div>
              <span className="text-base font-bold tracking-tight text-text-primary">
                HAZA Tech
              </span>
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              {PORTFOLIO_NAV.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      "group relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-300",
                      isActive
                        ? "text-text-primary"
                        : "text-text-muted hover:text-text-primary"
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute bottom-0.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-accent-blue transition-all duration-300",
                        isActive ? "w-4 opacity-100" : "w-0 opacity-0 group-hover:w-3 group-hover:opacity-60"
                      )}
                    />
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:block">
              <Link
                to="/contact"
                className="group inline-flex h-9 items-center gap-1.5 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple px-4 text-sm font-medium text-white shadow-lg shadow-accent-purple/20 transition-all duration-300 hover:shadow-accent-purple/40 hover:scale-[1.02]"
              >
                Get in Touch
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <button
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-text-secondary transition-colors hover:bg-surface-elevated hover:text-text-primary md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="block h-0.5 w-5 rounded-full bg-current"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  className="block h-0.5 w-5 rounded-full bg-current"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="block h-0.5 w-5 rounded-full bg-current"
                />
              </div>
            </button>
          </nav>
        </SectionContainer>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 right-0 top-0 z-50 w-[300px] border-l border-border/30 bg-surface/95 backdrop-blur-xl md:hidden"
            >
              <div className="flex h-16 items-center justify-between px-6">
                <span className="text-sm font-semibold text-text-primary">Navigation</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-elevated"
                  aria-label="Close menu"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <nav className="px-4">
                {PORTFOLIO_NAV.map((link, i) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <Link
                        to={link.href}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300",
                          isActive
                            ? "bg-accent-blue/10 text-accent-blue"
                            : "text-text-secondary hover:bg-surface-elevated hover:text-text-primary"
                        )}
                      >
                        {link.label}
                        <ArrowUpRight
                          className={cn(
                            "h-3.5 w-3.5 transition-all duration-300",
                            isActive ? "opacity-100 text-accent-blue" : "opacity-0 group-hover:opacity-60"
                          )}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="absolute bottom-8 left-4 right-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    to="/contact"
                    className="flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-sm font-medium text-white shadow-lg shadow-accent-purple/20"
                  >
                    Get in Touch
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
