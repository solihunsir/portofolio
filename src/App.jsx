import { useEffect } from "react";
import Navbar          from "./components/Navbar";
import Hero            from "./components/Hero";
import About           from "./components/About";
import Skills          from "./components/Skills";
import Projects        from "./components/Projects";
import Agenda          from "./components/Agenda";
import Contact         from "./components/Contact";
import AIChat          from "./components/AIChat";
import Footer          from "./components/Footer";
import ScrollToTop     from "./components/ScrollToTop";
import ToolsAnimation  from "./components/ToolsAnimation";
import VoiceAssistant  from "./components/VoiceAssistant";

function App() {
  /* Pastikan halaman selalu dimulai dari atas saat load/refresh */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* ── Animated tool icons – background layer (z-index:1) ── */}
      <ToolsAnimation />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Agenda />
      <Contact />
      <AIChat />
      <Footer />
      {/* Tombol scroll-to-top melayang */}
      <ScrollToTop />
      <VoiceAssistant />
    </>
  );
}

export default App;
