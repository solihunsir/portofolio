import { useApi } from "../hooks/useApi";
import { resolveAssetUrl } from "../config/api";
import { listTools as fallbackTools } from "../data";
import { useLanguage } from "../context/LanguageContext";

export default function Skills() {
  const { t, translateSkill } = useLanguage();
  const { data: skillsData } = useApi("/api/skills", fallbackTools);

  const rawTools = (skillsData && skillsData.length > 0) ? skillsData : fallbackTools;
  const tools = rawTools.map((tool) => translateSkill(tool));

  return (
    <section className="section sec-b" id="tools">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.75rem" }}>
          <span className="section-badge">
            <i className="ri-tools-line" /> {t("skills.badge", "Keahlian Teknis")}
          </span>
          <h2 className="heading-lg">{t("skills.title", "Alat & Teknologi")}</h2>
          <p className="text-body" style={{ maxWidth: 420, margin: "0.5rem auto 0" }}>
            {t("skills.subtitle", "Teknologi dan tools yang biasa saya gunakan untuk membangun Website maupun Mobile App.")}
          </p>
        </div>

        {/* Grid: 2 → 3 → 4 → 6 cols */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0.875rem",
          }}
          className="skills-grid"
        >
          {tools.map((tool) => {
            const logo = resolveAssetUrl(tool.logoUrl || tool.gambar);
            const name = tool.name || tool.nama;
            const ket = tool.description || tool.ket || tool.category;

            return (
              <div
                key={tool.id || name}
                className="card"
                style={{
                  padding: "1rem 0.75rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.65rem",
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    background: "rgba(255,255,255,0.8)",
                    borderRadius: 12,
                    padding: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={logo}
                    alt={name}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#041E42", lineHeight: 1.3 }}>
                    {name}
                  </p>
                  <p style={{ fontSize: "0.63rem", color: "#94a3b8", marginTop: 2 }}>
                    {ket}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (min-width: 480px)  { .skills-grid { grid-template-columns: repeat(4,1fr) !important; } }
        @media (min-width: 768px)  { .skills-grid { grid-template-columns: repeat(6,1fr) !important; } }
      `}</style>
    </section>
  );
}
