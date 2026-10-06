import { useState, useEffect } from "react";
import { API_BASE_URL, apiRequest } from "../../config/api";
import { useToast } from "./Toast";

export default function TopBar({ currentTab, onToggleSidebar, onRefresh }) {
  const [apiOnline, setApiOnline] = useState(true);
  const [latency, setLatency] = useState(null);
  const { showToast } = useToast();

  const titleMap = {
    overview: "Overview & Analytics",
    hero: "Hero Section Editor",
    about: "About Me & CV",
    statistics: "Statistik Highlight",
    skills: "Skills & Tech Stack",
    projects: "Manajemen Proyek",
    agenda: "Agenda, Prestasi & Sertifikasi",
    socials: "Social Links",
    messages: "Pesan Masuk (Inbox)",
  };

  const checkHealth = async () => {
    const start = performance.now();
    try {
      await apiRequest("/api/health");
      const elapsed = Math.round(performance.now() - start);
      setLatency(elapsed);
      setApiOnline(true);
    } catch {
      setApiOnline(false);
      setLatency(null);
    }
  };

  useEffect(() => {
    checkHealth();
    const timer = setInterval(checkHealth, 30000);
    return () => clearInterval(timer);
  }, []);

  const copySecretUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast("URL rahasia admin berhasil disalin ke clipboard!", "success");
  };

  return (
    <header className="adm-topbar">
      <div className="adm-topbar-left">
        <button
          type="button"
          className="adm-btn adm-btn-secondary adm-btn-icon"
          style={{ display: "none" }}
          onClick={onToggleSidebar}
          aria-label="Toggle Menu"
          id="adm-menu-toggle"
        >
          <i className="ri-menu-2-line" style={{ fontSize: "1.2rem" }} />
        </button>

        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Admin</span>
            <span style={{ fontSize: "0.75rem", color: "#475569" }}>/</span>
            <span style={{ fontSize: "0.75rem", color: "#38bdf8", fontWeight: 600 }}>
              {titleMap[currentTab] || currentTab}
            </span>
          </div>
          <h1 className="adm-page-title" style={{ margin: "0.1rem 0 0" }}>
            {titleMap[currentTab] || "Dashboard"}
          </h1>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {/* Server status pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.45rem",
            padding: "0.35rem 0.75rem",
            borderRadius: "9999px",
            background: apiOnline ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
            border: `1px solid ${apiOnline ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
          }}
          title={apiOnline ? `Backend API Aktif (${latency}ms)` : "Backend API Terputus"}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: apiOnline ? "#10b981" : "#ef4444",
              boxShadow: `0 0 8px ${apiOnline ? "#10b981" : "#ef4444"}`,
            }}
          />
          <span style={{ fontSize: "0.72rem", fontWeight: 600, color: apiOnline ? "#34d399" : "#f87171" }}>
            {apiOnline ? `API ${latency ? `${latency}ms` : "Online"}` : "API Offline"}
          </span>
        </div>

        {/* Copy Secret URL */}
        <button
          type="button"
          className="adm-btn adm-btn-secondary"
          onClick={copySecretUrl}
          title="Salin tautan rahasia admin"
          style={{ fontSize: "0.78rem", padding: "0.45rem 0.85rem" }}
        >
          <i className="ri-link" />
          <span>Salin Link Rahasia</span>
        </button>

        {/* Refresh button */}
        {onRefresh && (
          <button
            type="button"
            className="adm-btn adm-btn-secondary adm-btn-icon"
            onClick={onRefresh}
            title="Muat ulang data"
          >
            <i className="ri-refresh-line" />
          </button>
        )}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #adm-menu-toggle { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
