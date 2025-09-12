import { Navbar } from "../components/Navbar";
import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "@/components/StarBackground";
import { HeroSection } from "../components/About";
import { Dashboard } from "../components/Dashboard";
import { MayorChat } from "../components/MayorChat";
import { ProjectsSection } from "../components/ProjectsSection";
import { Login } from "../components/Login";
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Theme Toggle */}
      <ThemeToggle />
      {/* Background Effects */}
      <StarBackground />

      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <main>
        <HeroSection />
        <Dashboard />
        <MayorChat />
        <ProjectsSection />
        <Login/>
      
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
