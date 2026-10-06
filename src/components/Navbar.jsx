import { useState, useEffect } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../context/LanguageContext";

const NAV_LINKS = [
  { href: "#beranda", key: "beranda", fallback: "Beranda" },
  { href: "#tentang", key: "tentang", fallback: "Tentang" },
  { href: "#tools",   key: "skills",  fallback: "Keahlian" },
  { href: "#proyek",  key: "proyek",  fallback: "Proyek" },
  { href: "#agenda",  key: "agenda",  fallback: "Agenda" },
  { href: "#kontak",  key: "kontak",  fallback: "Kontak" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <a href="#beranda" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <span style={{ fontWeight: 800, fontSize: "1rem", color: "#041E42", letterSpacing: "-0.01em" }}>
              Sholihun<span style={{ color: "#276EF1" }}>.</span>
            </span>
          </a>

          {/* Desktop links + Language Switcher right next to Kontak */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }} className="nav-desktop">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  padding: "0.45rem 0.85rem",
                  borderRadius: 8,
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color: "#334155",
                  textDecoration: "none",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#276EF1";
                  e.currentTarget.style.background = "rgba(255,255,255,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#334155";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {t(`nav.${l.key}`, l.fallback)}
              </a>
            ))}

            {/* Language Switcher placed immediately next to Kontak */}
            <div style={{ marginLeft: "0.5rem", display: "flex", alignItems: "center" }}>
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile right items (Language Switcher + hamburger) */}
          <div style={{ display: "none", alignItems: "center", gap: "0.5rem" }} className="nav-mobile-bar">
            <LanguageSwitcher />
            <button
              onClick={() => setOpen(!open)}
              className="nav-hamburger"
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                padding: "0.4rem",
                borderRadius: 8,
                color: "#334155",
                fontSize: "1.3rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Menu"
            >
              <i className={open ? "ri-close-line" : "ri-menu-line"} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div
            style={{
              marginTop: "0.75rem",
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.85)",
              borderRadius: 14,
              boxShadow: "0 8px 32px rgba(4,30,66,0.1)",
              padding: "0.75rem",
            }}
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  padding: "0.65rem 1rem",
                  borderRadius: 9,
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#334155",
                  textDecoration: "none",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#EEF3FE";
                  e.currentTarget.style.color = "#276EF1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#334155";
                }}
              >
                {t(`nav.${l.key}`, l.fallback)}
              </a>
            ))}

            <div style={{ padding: "0.75rem 0.25rem 0.25rem", borderTop: "1px solid rgba(0,0,0,0.06)", marginTop: "0.5rem" }}>
              <div style={{ marginBottom: "0.6rem" }}>
                <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600, display: "block", marginBottom: "0.35rem" }}>
                  Pilihan Bahasa / Language:
                </span>
                <LanguageSwitcher isMobile={true} />
              </div>
              <a
                href="https://bit.ly/45UU7eK"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                {t("nav.downloadCv", "Unduh CV")}
              </a>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .nav-desktop    { display: none !important; }
          .nav-mobile-bar { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
