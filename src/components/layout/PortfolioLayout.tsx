import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { CommandPalette } from "@/components/ui/CommandPalette";

export function PortfolioLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <AnimatedBackground />
      <CommandPalette />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
