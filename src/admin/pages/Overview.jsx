import { useState, useEffect } from "react";
import { apiRequest } from "../../config/api";
import { useToast } from "../components/Toast";

export default function Overview({ onNavigate }) {
  const [stats, setStats] = useState({
    projects: 0,
    featuredProjects: 0,
    skills: 0,
    agenda: 0,
    unreadMessages: 0,
    totalMessages: 0,
  });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const loadMetrics = async () => {
    setLoading(true);
    try {
      const [projects, skills, agenda, messages] = await Promise.all([
        apiRequest("/api/projects/all").catch(() => []),
        apiRequest("/api/skills/all").catch(() => []),
        apiRequest("/api/agenda/all").catch(() => []),
        apiRequest("/api/messages").catch(() => []),
      ]);

      const unreadCount = messages.filter((m) => !m.isRead).length;
      const featuredCount = projects.filter((p) => p.isFeatured).length;

      setStats({
        projects: projects.length,
        featuredProjects: featuredCount,
        skills: skills.length,
        agenda: agenda.length,
        unreadMessages: unreadCount,
        totalMessages: messages.length,
      });

      setRecentMessages(messages.slice(0, 5));
    } catch (err) {
      console.error("Failed to load overview data:", err);
      showToast("Gagal memuat beberapa metrik", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMetrics();
  }, []);

  const markAsRead = async (id) => {
    try {
      await apiRequest(`/api/messages/${id}/read`, { method: "PUT" });
      showToast("Pesan ditandai telah dibaca", "success");
      loadMetrics();
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const metricCards = [
    {
      title: "Total Proyek",
      value: stats.projects,
      sub: `${stats.featuredProjects} Proyek Unggulan`,
      icon: "ri-code-box-line",
      color: "#38bdf8",
      bg: "rgba(56, 189, 248, 0.12)",
      tab: "projects",
    },
    {
      title: "Tech Skills",
      value: stats.skills,
      sub: "Bahasa, framework & tools",
      icon: "ri-tools-line",
      color: "#818cf8",
      bg: "rgba(129, 140, 248, 0.12)",
      tab: "skills",
    },
    {
      title: "Agenda & Prestasi",
      value: stats.agenda,
      sub: "Sertifikat & kompetisi",
      icon: "ri-award-line",
      color: "#34d399",
      bg: "rgba(52, 211, 153, 0.12)",
      tab: "agenda",
    },
    {
      title: "Pesan Masuk",
      value: stats.unreadMessages,
      sub: `${stats.totalMessages} total pesan diterima`,
      icon: "ri-mail-line",
      color: stats.unreadMessages > 0 ? "#ef4444" : "#94a3b8",
      bg: stats.unreadMessages > 0 ? "rgba(239, 68, 68, 0.15)" : "rgba(148, 163, 184, 0.1)",
      tab: "messages",
      pulse: stats.unreadMessages > 0,
    },
  ];

  return (
    <div>
      {/* Metrics Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.25rem",
          marginBottom: "1.75rem",
        }}
      >
        {metricCards.map((card) => (
          <div
            key={card.title}
            className="adm-card"
            style={{
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
            }}
            onClick={() => onNavigate(card.tab)}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <span style={{ fontSize: "0.8rem", color: "#94a3b8", fontWeight: 500 }}>
                  {card.title}
                </span>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", margin: "0.3rem 0 0.1rem" }}>
                  {loading ? "..." : card.value}
                </div>
                <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                  {card.sub}
                </span>
              </div>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: "12px",
                  background: card.bg,
                  color: card.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4rem",
                  boxShadow: card.pulse ? `0 0 15px ${card.color}` : "none",
                }}
              >
                <i className={card.icon} />
              </div>
            </div>

            <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.75rem", color: card.color }}>
              <span>Kelola modul</span>
              <i className="ri-arrow-right-line" />
            </div>
          </div>
        ))}
      </div>

      {/* Main 2-column Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {/* Left Column: Recent Messages */}
        <div className="adm-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "#fff" }}>
              <i className="ri-mail-unread-line" style={{ marginRight: "0.5rem", color: "#38bdf8" }} />
              Pesan Masuk Terbaru
            </h3>
            <button
              type="button"
              className="adm-btn adm-btn-secondary"
              style={{ fontSize: "0.75rem", padding: "0.3rem 0.75rem" }}
              onClick={() => onNavigate("messages")}
            >
              Lihat Semua
            </button>
          </div>

          {loading ? (
            <p style={{ color: "#64748b", fontSize: "0.85rem" }}>Memuat pesan...</p>
          ) : recentMessages.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem 1rem", color: "#64748b" }}>
              <i className="ri-inbox-line" style={{ fontSize: "2.5rem", display: "block", marginBottom: "0.5rem" }} />
              <span>Belum ada pesan masuk</span>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    padding: "0.85rem",
                    borderRadius: "10px",
                    background: msg.isRead ? "rgba(255, 255, 255, 0.02)" : "rgba(56, 189, 248, 0.07)",
                    border: `1px solid ${msg.isRead ? "var(--adm-border)" : "rgba(56, 189, 248, 0.3)"}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                  }}
                >
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
                      <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>
                        {msg.name}
                      </span>
                      {!msg.isRead && (
                        <span className="adm-badge adm-badge-warning" style={{ fontSize: "0.65rem", padding: "0.1rem 0.4rem" }}>
                          Baru
                        </span>
                      )}
                    </div>
                    <p style={{ margin: "0 0 0.35rem", fontSize: "0.75rem", color: "#94a3b8" }}>
                      {msg.email}
                    </p>
                    <p style={{ margin: 0, fontSize: "0.8rem", color: "#cbd5e1", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {msg.message}
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", alignItems: "flex-end" }}>
                    <span style={{ fontSize: "0.68rem", color: "#64748b" }}>
                      {new Date(msg.createdAt).toLocaleDateString("id-ID")}
                    </span>
                    {!msg.isRead && (
                      <button
                        type="button"
                        className="adm-btn adm-btn-secondary"
                        style={{ fontSize: "0.7rem", padding: "0.2rem 0.5rem" }}
                        onClick={() => markAsRead(msg.id)}
                        title="Tandai telah dibaca"
                      >
                        <i className="ri-check-line" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Quick Management & System Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Quick Shortcuts */}
          <div className="adm-card">
            <h3 style={{ margin: "0 0 1rem", fontSize: "1.05rem", fontWeight: 700, color: "#fff" }}>
              <i className="ri-flashlight-line" style={{ marginRight: "0.5rem", color: "#f59e0b" }} />
              Aksi Cepat
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              {[
                { label: "Edit Hero", icon: "ri-home-smile-line", tab: "hero" },
                { label: "Update CV", icon: "ri-file-user-line", tab: "about" },
                { label: "Tambah Proyek", icon: "ri-add-circle-line", tab: "projects" },
                { label: "Tambah Skill", icon: "ri-tools-line", tab: "skills" },
                { label: "Tambah Prestasi", icon: "ri-award-line", tab: "agenda" },
                { label: "Social Media", icon: "ri-share-line", tab: "socials" },
              ].map((btn) => (
                <button
                  key={btn.label}
                  type="button"
                  className="adm-btn adm-btn-secondary"
                  style={{ justifyContent: "flex-start", padding: "0.75rem 0.85rem", fontSize: "0.82rem" }}
                  onClick={() => onNavigate(btn.tab)}
                >
                  <i className={btn.icon} style={{ color: "#38bdf8", fontSize: "1rem" }} />
                  <span>{btn.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* System Info */}
          <div className="adm-card" style={{ background: "rgba(11, 17, 32, 0.95)" }}>
            <h3 style={{ margin: "0 0 1rem", fontSize: "0.95rem", fontWeight: 700, color: "#fff" }}>
              <i className="ri-server-line" style={{ marginRight: "0.5rem", color: "#10b981" }} />
              Status Sistem & Database
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.8rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8" }}>
                <span>Database:</span>
                <span style={{ color: "#fff", fontWeight: 600 }}>SQLite (Prisma ORM v5)</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8" }}>
                <span>Backend Port:</span>
                <span style={{ color: "#38bdf8", fontWeight: 600 }}>http://localhost:3001</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8" }}>
                <span>File Storage:</span>
                <span style={{ color: "#fff", fontWeight: 600 }}>Local Multer (/uploads)</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8" }}>
                <span>Keamanan Akses:</span>
                <span style={{ color: "#fbbf24", fontWeight: 600 }}>Manual Hidden Secret URL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
