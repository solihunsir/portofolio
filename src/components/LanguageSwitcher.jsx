import { useLanguage } from "../context/LanguageContext";

export default function LanguageSwitcher({ className = "", isMobile = false }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`lang-switcher ${className}`}
      role="group"
      aria-label="Language selector"
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "9999px",
        padding: "3px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
        position: "relative",
        userSelect: "none",
        gap: "2px",
        ...(isMobile ? { width: "100%", justifyContent: "center", margin: "0.5rem 0" } : {}),
      }}
    >
      {/* Subtle globe icon indicator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 0.35rem 0 0.45rem",
          color: "#2563eb",
          fontSize: "0.85rem",
        }}
      >
        <i className="ri-global-line" />
      </div>

      {/* ID Button */}
      <button
        type="button"
        onClick={() => setLang("id")}
        style={{
          border: "none",
          background: lang === "id" ? "#2563eb" : "transparent",
          color: lang === "id" ? "#ffffff" : "#64748b",
          fontWeight: lang === "id" ? 700 : 500,
          fontSize: "0.75rem",
          letterSpacing: "0.02em",
          padding: "0.3rem 0.65rem",
          borderRadius: "9999px",
          cursor: "pointer",
          transition: "all 0.15s ease",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.3rem",
        }}
        title="Bahasa Indonesia"
      >
        <span>ID</span>
      </button>

      {/* EN Button */}
      <button
        type="button"
        onClick={() => setLang("en")}
        style={{
          border: "none",
          background: lang === "en" ? "#2563eb" : "transparent",
          color: lang === "en" ? "#ffffff" : "#64748b",
          fontWeight: lang === "en" ? 700 : 500,
          fontSize: "0.75rem",
          letterSpacing: "0.02em",
          padding: "0.3rem 0.65rem",
          borderRadius: "9999px",
          cursor: "pointer",
          transition: "all 0.15s ease",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.3rem",
        }}
        title="English"
      >
        <span>EN</span>
      </button>
    </div>
  );
}
