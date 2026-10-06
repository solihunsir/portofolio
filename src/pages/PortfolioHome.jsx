import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Agenda from "../components/Agenda";
import Contact from "../components/Contact";
import AIChat from "../components/AIChat";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import ToolsAnimation from "../components/ToolsAnimation";
import VoiceAssistant from "../components/VoiceAssistant";
import ExperienceDrawer from "../components/ExperienceDrawer";

export default function PortfolioHome() {
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Animated tool icons background */}
      <ToolsAnimation />
      <Navbar />
      <Hero onOpenExperience={() => setIsExperienceOpen(true)} />
      <About />
      <Skills />
      <Projects />
      <Agenda />
      <Contact />
      <AIChat />
      <Footer />
      <ScrollToTop />
      <VoiceAssistant />

      {/* Slide-over Experience Drawer */}
      <ExperienceDrawer
        isOpen={isExperienceOpen}
        onClose={() => setIsExperienceOpen(false)}
      />
    </>
  );
}
