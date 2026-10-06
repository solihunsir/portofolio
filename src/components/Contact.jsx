import { useState } from "react";
import { useApi } from "../hooks/useApi";
import { apiRequest } from "../config/api";
import { useLanguage } from "../context/LanguageContext";

const defaultSocials = [
  { icon: "ri-mail-line",      platform: "Email",     url: "mailto:solihun.bks2019@gmail.com", display: "solihun.bks2019@gmail.com" },
  { icon: "ri-github-line",    platform: "GitHub",    url: "https://github.com/solihunsir",    display: "github.com/solihunsir" },
  { icon: "ri-linkedin-line",  platform: "LinkedIn",  url: "https://www.linkedin.com/in/m-sholihun", display: "linkedin.com/in/m-sholihun" },
  { icon: "ri-instagram-line", platform: "Instagram", url: "https://www.instagram.com/sholihunnn", display: "@sholihunnn" },
];

export default function Contact() {
  const { t } = useLanguage();
  const { data: socialLinks } = useApi("/api/social-links", defaultSocials);
  const { data: aboutData } = useApi("/api/about");

  const [formState, setFormState] = useState({
    nama: "",
    email: "",
    pesan: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const rawSocials = (socialLinks && socialLinks.length > 0) ? socialLinks : defaultSocials;
  const socials = rawSocials.map((s) => {
    let cleanUrl = s.url || "";
    let displayVal = cleanUrl.replace(/^https?:\/\//, "").replace(/^mailto:/, "");
    return {
      icon: s.icon || "ri-link",
      label: s.platform || s.label,
      val: s.display || displayVal,
      href: cleanUrl.startsWith("http") || cleanUrl.startsWith("mailto") ? cleanUrl : `https://${cleanUrl}`,
    };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      await apiRequest("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: formState.nama,
          email: formState.email,
          message: formState.pesan,
        }),
      });
      setSubmitted(true);
      setFormState({ nama: "", email: "", pesan: "" });
    } catch (err) {
      console.warn("API contact error, trying fallback formsubmit:", err);
      // Fallback submit using FormSubmit endpoint
      try {
        const fallbackRes = await fetch("https://formsubmit.co/ajax/solihun.bks2019@gmail.com", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: formState.nama,
            email: formState.email,
            message: formState.pesan,
          }),
        });
        if (fallbackRes.ok) {
          setSubmitted(true);
          setFormState({ nama: "", email: "", pesan: "" });
        } else {
          throw new Error("Gagal mengirimkan pesan.");
        }
      } catch {
        setErrorMsg("Maaf, terjadi kendala saat mengirim pesan. Silakan coba lagi atau hubungi via email langsung.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section sec-a" id="kontak">
      <div className="container">
        <div style={{ maxWidth: 860, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "2.75rem" }}>
            <span className="section-badge">
              <i className="ri-mail-line" /> {t("contact.badge", "Kontak")}
            </span>
            <h2 className="heading-lg">
              {t("contact.titlePrefix", "Mari ")}<span className="text-blue">{t("contact.titleHighlight", "Terhubung")}</span>
            </h2>
            <p className="text-body" style={{ maxWidth: 360, margin: "0.5rem auto 0" }}>
              {t("contact.subtitle", "Tertarik untuk berkolaborasi? Saya siap merespons pesan Anda.")}
            </p>
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }} className="contact-grid">

            {/* Left – contact info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {socials.map((s) => (
                <div
                  key={s.label}
                  className="card"
                  style={{
                    padding: "0.85rem 1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.85rem",
                    borderLeft: "3px solid rgba(39,110,241,0.5)",
                    boxShadow: "0 2px 8px rgba(39,110,241,0.06)",
                    transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderLeftColor = "#276EF1";
                    e.currentTarget.style.boxShadow = "0 4px 18px rgba(39,110,241,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderLeftColor = "rgba(39,110,241,0.5)";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(39,110,241,0.06)";
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      background: "rgba(39,110,241,0.1)",
                      borderRadius: 9,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <i className={s.icon} style={{ color: "#276EF1", fontSize: "1rem" }} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: "0.63rem",
                        fontWeight: 700,
                        color: "#94a3b8",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {s.label}
                    </p>
                    {s.href ? (
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "#041E42",
                          textDecoration: "none",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          display: "block",
                          transition: "color 0.15s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#276EF1")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#041E42")}
                      >
                        {s.val}
                      </a>
                    ) : (
                      <p
                        style={{
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "#041E42",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {s.val}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right – form */}
            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              style={{
                background: "rgba(255,255,255,0.97)",
                border: "1.5px solid rgba(39,110,241,0.2)",
                borderTop: "3px solid #276EF1",
                borderRadius: 16,
                padding: "1.75rem",
                boxShadow: "0 6px 32px rgba(39,110,241,0.1)",
              }}
            >
              <h3 className="heading-sm" style={{ marginBottom: "1.25rem" }}>{t("contact.formTitle", "Kirim Pesan")}</h3>

              {submitted && (
                <div
                  style={{
                    padding: "0.85rem 1rem",
                    borderRadius: 10,
                    background: "rgba(16, 185, 129, 0.12)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    color: "#065f46",
                    fontSize: "0.85rem",
                    marginBottom: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <i className="ri-checkbox-circle-fill" style={{ color: "#10b981", fontSize: "1.2rem" }} />
                  <span>{t("contact.successMessage", "Terima kasih! Pesan Anda telah berhasil dikirimkan.")}</span>
                </div>
              )}

              {errorMsg && (
                <div
                  style={{
                    padding: "0.85rem 1rem",
                    borderRadius: 10,
                    background: "rgba(239, 68, 68, 0.12)",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    color: "#991b1b",
                    fontSize: "0.85rem",
                    marginBottom: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <i className="ri-error-warning-fill" style={{ color: "#ef4444", fontSize: "1.2rem" }} />
                  <span>{errorMsg || t("contact.errorMessage", "Maaf, terjadi kendala saat mengirim pesan.")}</span>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label htmlFor="nama" className="input-label">{t("contact.nameLabel", "Nama Lengkap")}</label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    placeholder={t("contact.namePlaceholder", "Masukkan nama Anda")}
                    value={formState.nama}
                    onChange={(e) => setFormState({ ...formState, nama: e.target.value })}
                    required
                    className="input-field"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="input-label">{t("contact.emailLabel", "Email")}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={t("contact.emailPlaceholder", "Masukkan email Anda")}
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                    className="input-field"
                  />
                </div>

                <div>
                  <label htmlFor="pesan" className="input-label">{t("contact.messageLabel", "Pesan")}</label>
                  <textarea
                    id="pesan"
                    name="pesan"
                    rows={4}
                    placeholder={t("contact.messagePlaceholder", "Tuliskan pesan Anda di sini…")}
                    value={formState.pesan}
                    onChange={(e) => setFormState({ ...formState, pesan: e.target.value })}
                    required
                    className="input-field"
                    style={{ resize: "none" }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%", justifyContent: "center", padding: "0.7rem 1rem" }}
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <i className="ri-loader-4-line" style={{ animation: "spin 1s linear infinite" }} />
                      <span>{t("contact.sendingButton", "Mengirimkan Pesan...")}</span>
                    </>
                  ) : (
                    <>
                      <i className="ri-send-plane-line" />
                      <span>{t("contact.sendButton", "Kirim Pesan")}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .contact-grid { grid-template-columns: 2fr 3fr !important; }
        }
      `}</style>
    </section>
  );
}
