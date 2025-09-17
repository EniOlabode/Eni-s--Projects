import { Navbar } from "../components/Navbar";
import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "@/components/StarBackground";
import { HeroSection } from "../components/About";
import { Dashboard } from "../components/Dashboard";
import { MayorChat } from "../components/Eva";
import { EducationHub } from "../components/EducationHub";
import { Pricing } from "../components/Pricing";
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
        <MayorChat />
        <EducationHub />
        <Dashboard />
        <Pricing />
        <Login/>
      
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
