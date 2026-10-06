import { useApi } from "../hooks/useApi";
import { resolveAssetUrl } from "../config/api";
import { useLanguage } from "../context/LanguageContext";

const defaultAbout = {
  fullName: "Muhammad Sholihun",
  description:
    "Saya merupakan pengembang perangkat lunak yang berdedikasi tinggi dengan rekam jejak dalam merancang aplikasi berbasis web dan mobile yang tangguh. Melalui pengalaman kepemimpinan, kompetisi teknologi, dan sertifikasi lengkap di bidang Front-End & Back-End Development, saya berfokus menciptakan solusi perangkat lunak yang terintegrasi, efisien, dan siap pakai untuk industri maupun sektor publik.",
  location: "Bengkalis, Riau",
  availability: "Open to Work",
};

const defaultStats = [
  { value: "15+", label: "Proyek Selesai",   icon: "ri-folder-line" },
  { value: "3+",  label: "Tahun Pengalaman", icon: "ri-time-line" },
  { value: "8+",  label: "Sertifikasi",      icon: "ri-award-line" },
  { value: "5+",  label: "Penghargaan",      icon: "ri-trophy-line" },
];

export default function About() {
  const { t, lang, translateAbout, translateStatLabel } = useLanguage();
  const { data: aboutData } = useApi("/api/about", defaultAbout);
  const { data: heroData } = useApi("/api/hero");
  const { data: statsData } = useApi("/api/statistics", defaultStats);

  const rawAbout = aboutData || defaultAbout;
  const about = translateAbout(rawAbout);
  const photo = heroData?.photoUrl ? resolveAssetUrl(heroData.photoUrl) : "/assets/conixx.jpg";
  const stats = (statsData && statsData.length > 0) ? statsData : defaultStats;

  // Find experience stat for the photo badge
  const expStat = stats.find(
    (s) => (s.label || "").toLowerCase().includes("pengalaman") || (s.l || "").toLowerCase().includes("pengalaman")
  ) || { value: "3+" };

  return (
    <section className="section sec-a" id="tentang">
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2.5rem",
            alignItems: "center",
          }}
          className="about-grid"
        >
          {/* Photo */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", maxWidth: 320, width: "100%" }}>
              <div
                style={{
                  position: "absolute",
                  top: -10,
                  left: -10,
                  width: "100%",
                  height: "100%",
                  background: "rgba(39,110,241,0.12)",
                  borderRadius: 18,
                  zIndex: 0,
                }}
              />
              <img
                src={photo}
                alt={about.fullName || "M. Sholihun"}
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                  borderRadius: 16,
                  boxShadow: "0 12px 40px rgba(39,110,241,0.15)",
                  border: "3px solid rgba(255,255,255,0.85)",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  e.target.src = "/assets/conixx.jpg";
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: -14,
                  right: -14,
                  zIndex: 2,
                  background: "rgba(255,255,255,0.97)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(39,110,241,0.12)",
                  borderRadius: 12,
                  padding: "0.6rem 0.9rem",
                  boxShadow: "0 4px 20px rgba(39,110,241,0.12)",
                }}
              >
                <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#276EF1", lineHeight: 1 }}>
                  {expStat.value}
                </p>
                <p style={{ fontSize: "0.68rem", color: "#64748b", marginTop: 2, whiteSpace: "pre-line" }}>
                  {t("about.yearsExp", lang === "en" ? "Years\nExperience" : "Tahun\nPengalaman")}
                </p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="section-badge">
              <i className="ri-user-heart-line" /> {t("about.badge", "Tentang Saya")}
            </span>
            <h2 className="heading-lg" style={{ marginBottom: "0.5rem" }}>
              {t("about.titleMain", "Pengembang Berdedikasi &")}<br />
              <span className="text-blue">{t("about.titleSub", "Pembelajar Sepanjang Hayat")}</span>
            </h2>
            <div className="accent-line" />
            <p className="text-body" style={{ marginBottom: "1.5rem" }}>
              {about.description}
            </p>

            {/* Stats grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              {stats.slice(0, 4).map((s) => {
                const originalLabel = s.label || s.l;
                const value = s.value || s.n;
                const icon = s.icon || "ri-star-line";

                return (
                  <div
                    key={originalLabel}
                    className="card"
                    style={{ padding: "0.9rem 1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        background: "rgba(39,110,241,0.1)",
                        borderRadius: 9,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <i className={icon} style={{ color: "#276EF1", fontSize: "1rem" }} />
                    </div>
                    <div>
                      <p style={{ fontSize: "1.15rem", fontWeight: 800, color: "#041E42", lineHeight: 1 }}>
                        {value}
                      </p>
                      <p style={{ fontSize: "0.68rem", color: "#64748b", marginTop: 2 }}>
                        {translateStatLabel(originalLabel)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .about-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
