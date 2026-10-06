import { Link } from "react-router-dom";

export default function Sidebar({ currentTab, setCurrentTab, unreadCount, isOpen, onClose }) {
  const navItems = [
    { id: "overview",   label: "Overview",       icon: "ri-dashboard-3-line" },
    { id: "hero",       label: "Hero Section",   icon: "ri-home-smile-line" },
    { id: "about",      label: "About Me",       icon: "ri-user-heart-line" },
    { id: "statistics", label: "Statistik",      icon: "ri-bar-chart-box-line" },
    { id: "skills",     label: "Skills & Tools", icon: "ri-tools-line" },
    { id: "projects",   label: "Projects",       icon: "ri-code-box-line" },
    { id: "experience", label: "Experience",     icon: "ri-briefcase-line" },
    { id: "agenda",     label: "Agenda & Awards",icon: "ri-award-line" },
    { id: "socials",    label: "Social Links",   icon: "ri-share-forward-line" },
    { id: "messages",   label: "Messages Inbox", icon: "ri-mail-line", badge: unreadCount },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="adm-modal-backdrop"
          style={{ zIndex: 35 }}
          onClick={onClose}
        />
      )}

      <aside className={`adm-sidebar ${isOpen ? "open" : ""}`}>
        {/* Brand */}
        <div className="adm-brand">
          <div className="adm-brand-icon">
            <i className="ri-shield-flash-line" />
          </div>
          <div>
            <span className="adm-brand-text">Portfolio CMS</span>
            <span style={{ display: "block", fontSize: "0.68rem", color: "#64748b" }}>
              Admin Control Panel
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="adm-nav">
          <div style={{ padding: "0 0.5rem 0.4rem", fontSize: "0.68rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Menu Utama
          </div>

          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`adm-nav-item ${isActive ? "active" : ""}`}
                onClick={() => {
                  setCurrentTab(item.id);
                  if (onClose) onClose();
                }}
              >
                <i className={item.icon} style={{ fontSize: "1.1rem" }} />
                <span>{item.label}</span>
                {item.badge > 0 && (
                  <span className="adm-nav-badge">{item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div style={{ padding: "1rem", borderTop: "1px solid var(--adm-border)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="adm-btn adm-btn-secondary"
            style={{ width: "100%", justifyContent: "flex-start", fontSize: "0.8rem" }}
          >
            <i className="ri-external-link-line" />
            <span>Lihat Website</span>
          </a>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 0.5rem", borderRadius: "8px", background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
            <span style={{ fontSize: "0.72rem", color: "#34d399", fontWeight: 600 }}>
              Database Terhubung
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
