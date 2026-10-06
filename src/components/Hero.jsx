import { useApi } from "../hooks/useApi";
import { resolveAssetUrl } from "../config/api";
import { useLanguage } from "../context/LanguageContext";

const defaultHero = {
  headline: "M. Sholihun",
  subheadline: "Fresh Graduate",
  bio: "Software Engineer berfokus pada pengembangan solusi digital yang inovatif dan terstruktur",
  ctaLabel: "Download CV",
  ctaLink: "https://bit.ly/45UU7eK",
  ctaSecLabel: "Lihat Proyek",
  ctaSecLink: "#proyek",
};

const defaultStats = [
  { value: "15+", label: "Proyek Selesai" },
  { value: "3+",  label: "Tahun Pengalaman" },
  { value: "8+",  label: "Sertifikasi" },
  { value: "5+",  label: "Penghargaan" },
];

export default function Hero({ onOpenExperience }) {
  const { t, lang, translateHero, translateStatLabel } = useLanguage();
  const { data: heroData } = useApi("/api/hero", defaultHero);
  const { data: statsData } = useApi("/api/statistics", defaultStats);

  const rawHero = heroData || defaultHero;
  const hero = translateHero(rawHero);
  const stats = (statsData && statsData.length > 0) ? statsData : defaultStats;

  return (
    <section className="hero-section" id="beranda" style={{ position: "relative", overflow: "hidden" }}>

      <style>{`
        /* ── Hero layout solid & clean ── */
        .hero-centered {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          z-index: 1;
          padding: 2.5rem 0 3.5rem;
          max-width: 720px;
          margin: 0 auto;
        }
        .hero-stats-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2.5rem;
          padding-top: 2rem;
          border-top: 1px solid #e2e8f0;
          width: 100%;
          margin-top: 2.5rem;
        }
      `}</style>

      <div className="container">
        <div className="hero-centered">

          {/* Section badge */}
          <span className="section-badge" style={{ marginBottom: "1.25rem" }}>
            <i className="ri-user-3-line" /> {hero.subheadline || t("hero.badge", "Lulusan Baru Rekayasa Perangkat Lunak")}
          </span>

          {/* Heading */}
          <h1 className="heading-xl" style={{ marginBottom: "0.75rem", textAlign: "center" }}>
            {t("hero.greeting", "Halo, Saya")}<br />
            <span className="text-blue">{hero.headline || "Muhammad Sholihun"}</span>
          </h1>

          {/* Tagline singkat */}
          <p className="text-body" style={{ maxWidth: 480, marginBottom: "2rem", textAlign: "center" }}>
            {hero.bio}
          </p>

          {/* Tombol aksi */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "0.5rem", justifyContent: "center" }}>
            <a
              href={resolveAssetUrl(hero.ctaLink) || "https://bit.ly/45UU7eK"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <i className="ri-download-line" /> {hero.ctaLabel || t("hero.downloadCv", "Unduh CV")}
            </a>
            <button
              type="button"
              onClick={onOpenExperience}
              className="btn btn-outline"
              style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.45rem" }}
              aria-label={lang === "en" ? "View Work & Education Experience" : "Buka Panel Pengalaman"}
            >
              <i className="ri-briefcase-line text-blue-500" />
              {hero.ctaSecLabel && hero.ctaSecLabel !== "Lihat Proyek" && hero.ctaSecLabel !== "View Projects"
                ? hero.ctaSecLabel
                : t("hero.viewExperience", lang === "en" ? "View Experience" : "Lihat Pengalaman")}
            </button>
            <a href="#ai-assistant" className="btn btn-outline">
              {t("hero.askAi", "Tanya AI Saya")}
            </a>
          </div>

          {/* Stats */}
          <div className="hero-stats-row">
            {stats.slice(0, 4).map((s) => {
              const cleanVal = (s.value || "").replace(/\+$/, "");
              const originalLabel = s.label || s.l;
              return (
                <div key={originalLabel} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "1.65rem", fontWeight: 800, color: "#041E42", lineHeight: 1 }}>
                    {cleanVal}<span style={{ color: "#276EF1" }}>+</span>
                  </p>
                  <p style={{ fontSize: "0.7rem", color: "#94a3b8", marginTop: "0.22rem" }}>
                    {translateStatLabel(originalLabel)}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
