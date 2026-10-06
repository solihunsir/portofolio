import { useState, useEffect } from "react";
import "./admin.css";
import { ToastProvider } from "./components/Toast";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Overview from "./pages/Overview";
import HeroManager from "./pages/HeroManager";
import AboutManager from "./pages/AboutManager";
import StatisticsManager from "./pages/StatisticsManager";
import SkillsManager from "./pages/SkillsManager";
import ProjectsManager from "./pages/ProjectsManager";
import ExperienceManager from "./pages/ExperienceManager";
import AgendaManager from "./pages/AgendaManager";
import SocialLinksManager from "./pages/SocialLinksManager";
import MessagesInbox from "./pages/MessagesInbox";
import { apiRequest } from "../config/api";

function AdminLayout() {
  const [currentTab, setCurrentTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchUnreadCount = async () => {
    try {
      const res = await apiRequest("/api/messages/count");
      if (res && typeof res.unread === "number") {
        setUnreadCount(res.unread);
      }
    } catch {
      // Backend might be offline, ignore
    }
  };

  useEffect(() => {
    fetchUnreadCount();
    const timer = setInterval(fetchUnreadCount, 20000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    fetchUnreadCount();
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="adm-root">
      {/* Background ambient glows */}
      <div className="adm-glow-1" />
      <div className="adm-glow-2" />

      {/* Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        unreadCount={unreadCount}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="adm-main">
        <TopBar
          currentTab={currentTab}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onRefresh={handleRefresh}
        />

        <main className="adm-content" key={refreshTrigger}>
          {currentTab === "overview" && (
            <Overview onNavigate={(tab) => setCurrentTab(tab)} />
          )}
          {currentTab === "hero" && <HeroManager />}
          {currentTab === "about" && <AboutManager />}
          {currentTab === "statistics" && <StatisticsManager />}
          {currentTab === "skills" && <SkillsManager />}
          {currentTab === "projects" && <ProjectsManager />}
          {currentTab === "experience" && <ExperienceManager />}
          {currentTab === "agenda" && <AgendaManager />}
          {currentTab === "socials" && <SocialLinksManager />}
          {currentTab === "messages" && <MessagesInbox />}
        </main>
      </div>
    </div>
  );
}

export default function AdminApp() {
  return (
    <ToastProvider>
      <AdminLayout />
    </ToastProvider>
  );
}
