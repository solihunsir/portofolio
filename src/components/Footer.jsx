import { useApi } from "../hooks/useApi";
import { useLanguage } from "../context/LanguageContext";

const defaultSocials = [
  { url: "https://github.com/solihunsir",          icon: "ri-github-fill",    platform: "GitHub" },
  { url: "https://www.instagram.com/solihunsir",   icon: "ri-instagram-fill", platform: "Instagram" },
  { url: "https://www.linkedin.com/in/m-sholihun", icon: "ri-linkedin-fill",  platform: "LinkedIn" },
  { url: "https://www.youtube.com/@solihunsir",    icon: "ri-youtube-fill",   platform: "YouTube" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLanguage();
  const { data: socialLinks } = useApi("/api/social-links", defaultSocials);
  const { data: aboutData } = useApi("/api/about");

  const links = [
    { href: "#beranda", l: t("nav.beranda", "Beranda") },
    { href: "#tentang", l: t("nav.tentang", "Tentang") },
    { href: "#proyek",  l: t("nav.proyek",  "Proyek")  },
    { href: "#agenda",  l: t("nav.agenda",  "Agenda")  },
    { href: "#kontak",  l: t("nav.kontak",  "Kontak")  },
  ];

  const rawSocials = (socialLinks && socialLinks.length > 0) ? socialLinks : defaultSocials;
  const socials = rawSocials.map((s) => ({
    href: s.url || "#",
    icon: s.icon || "ri-link",
    label: s.platform || s.label || "Social",
  }));

  const email = aboutData?.email || "solihun.bks2019@gmail.com";
  const location = aboutData?.location || "Bengkalis, Riau, Indonesia";

  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }} className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <span style={{ fontWeight: 800, fontSize: "1rem", color: "#fff" }}>
                Sholihun<span style={{ color: "#60a5fa" }}>.</span>
              </span>
            </div>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8", lineHeight: 1.65, maxWidth: 240, marginBottom: "1rem" }}>
              {t("footer.tagline", "Fresh Graduate Teknik Informatika yang bersemangat membangun solusi digital berdampak.")}
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {socials.map((s) => (
                <a
                  key={s.href + s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#94a3b8",
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#276EF1";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "#94a3b8";
                  }}
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
              {t("footer.navTitle", "Navigasi")}
            </p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    style={{
                      fontSize: "0.82rem",
                      color: "#94a3b8",
                      textDecoration: "none",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#60a5fa")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                  >
                    {l.l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
              {t("footer.contactTitle", "Kontak")}
            </p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "#94a3b8" }}>
                <i className="ri-mail-line" style={{ color: "#60a5fa", flexShrink: 0 }} />
                <span>{email}</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "#94a3b8" }}>
                <i className="ri-map-pin-line" style={{ color: "#60a5fa", flexShrink: 0 }} />
                <span>{location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            marginTop: "2.5rem",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "0.5rem",
          }}
        >
          <p style={{ fontSize: "0.75rem", color: "#475569" }}>
            © {year} {aboutData?.fullName || "M. Sholihun"}. {t("footer.rights", "All rights reserved.")}
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) { .footer-grid { grid-template-columns: 2fr 1fr 1fr !important; } }
      `}</style>
    </footer>
  );
}
