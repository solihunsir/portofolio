import { useState, useEffect } from "react";
import { apiRequest, resolveAssetUrl } from "../../config/api";
import { useToast } from "../components/Toast";
import ImageUploader from "../components/ImageUploader";

export default function HeroManager() {
  const [formData, setFormData] = useState({
    headline: "",
    subheadline: "",
    bio: "",
    photoUrl: "",
    ctaLabel: "Download CV",
    ctaLink: "#",
    ctaSecLabel: "Lihat Proyek",
    ctaSecLink: "#proyek",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const loadHero = async () => {
    setLoading(true);
    try {
      const data = await apiRequest("/api/hero");
      if (data) {
        setFormData({
          headline: data.headline || "",
          subheadline: data.subheadline || "",
          bio: data.bio || "",
          photoUrl: data.photoUrl || "",
          ctaLabel: data.ctaLabel || "Download CV",
          ctaLink: data.ctaLink || "#",
          ctaSecLabel: data.ctaSecLabel || "Lihat Proyek",
          ctaSecLink: data.ctaSecLink || "#proyek",
        });
      }
    } catch (err) {
      showToast("Gagal memuat data Hero: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHero();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiRequest("/api/hero", {
        method: "PUT",
        body: JSON.stringify(formData),
      });
      showToast("Hero section berhasil diperbarui!", "success");
    } catch (err) {
      showToast("Gagal menyimpan: " + err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
        <i className="ri-loader-4-line" style={{ animation: "spin 1s linear infinite", fontSize: "2rem" }} />
        <p style={{ marginTop: "0.5rem" }}>Memuat pengaturan Hero...</p>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.75rem", alignItems: "flex-start" }}>
      {/* Left Form */}
      <form onSubmit={handleSave} className="adm-card">
        <h3 style={{ margin: "0 0 1.25rem", fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>
          <i className="ri-edit-line" style={{ marginRight: "0.5rem", color: "#38bdf8" }} />
          Edit Hero Section
        </h3>

        <div className="adm-form-group">
          <label className="adm-label">Headline (Nama / Sapaan)</label>
          <input
            type="text"
            name="headline"
            className="adm-input"
            value={formData.headline}
            onChange={handleChange}
            placeholder="Contoh: Muhammad Sholihun"
            required
          />
        </div>

        <div className="adm-form-group">
          <label className="adm-label">Subheadline (Peran / Profesi)</label>
          <input
            type="text"
            name="subheadline"
            className="adm-input"
            value={formData.subheadline}
            onChange={handleChange}
            placeholder="Contoh: Fullstack Developer & Mobile Developer"
            required
          />
        </div>

        <div className="adm-form-group">
          <label className="adm-label">Deskripsi Singkat / Bio</label>
          <textarea
            name="bio"
            rows={3}
            className="adm-textarea"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tuliskan ringkasan 1-2 kalimat tentang keahlian Anda..."
          />
        </div>

        <ImageUploader
          label="Foto Profil Hero"
          value={formData.photoUrl}
          onChange={(url) => setFormData((prev) => ({ ...prev, photoUrl: url }))}
          uploadEndpoint="/api/hero/upload-photo"
          fieldName="photo"
          helperText="Format PNG, JPG, WebP. Maks 2MB."
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div className="adm-form-group">
            <label className="adm-label">Label Tombol Utama</label>
            <input
              type="text"
              name="ctaLabel"
              className="adm-input"
              value={formData.ctaLabel}
              onChange={handleChange}
              placeholder="Download CV"
            />
          </div>
          <div className="adm-form-group">
            <label className="adm-label">Link Tombol Utama</label>
            <input
              type="text"
              name="ctaLink"
              className="adm-input"
              value={formData.ctaLink}
              onChange={handleChange}
              placeholder="https://... atau #kontak"
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div className="adm-form-group">
            <label className="adm-label">Label Tombol Sekunder</label>
            <input
              type="text"
              name="ctaSecLabel"
              className="adm-input"
              value={formData.ctaSecLabel}
              onChange={handleChange}
              placeholder="Lihat Proyek"
            />
          </div>
          <div className="adm-form-group">
            <label className="adm-label">Link Tombol Sekunder</label>
            <input
              type="text"
              name="ctaSecLink"
              className="adm-input"
              value={formData.ctaSecLink}
              onChange={handleChange}
              placeholder="#proyek"
            />
          </div>
        </div>

        <button
          type="submit"
          className="adm-btn adm-btn-primary"
          style={{ width: "100%", padding: "0.75rem", marginTop: "0.5rem" }}
          disabled={saving}
        >
          {saving ? (
            <>
              <i className="ri-loader-4-line" style={{ animation: "spin 1s linear infinite" }} />
              <span>Menyimpan Perubahan...</span>
            </>
          ) : (
            <>
              <i className="ri-save-line" />
              <span>Simpan Perubahan Hero</span>
            </>
          )}
        </button>
      </form>

      {/* Right Live Preview */}
      <div className="adm-card" style={{ background: "rgba(11, 17, 32, 0.9)" }}>
        <h3 style={{ margin: "0 0 1.25rem", fontSize: "1rem", fontWeight: 700, color: "#94a3b8" }}>
          <i className="ri-eye-line" style={{ marginRight: "0.5rem", color: "#38bdf8" }} />
          Live Preview (Tampilan Beranda)
        </h3>

        <div
          style={{
            border: "1px solid var(--adm-border)",
            borderRadius: "14px",
            padding: "2.5rem 1.5rem",
            background: "linear-gradient(180deg, rgba(37,99,235,0.06) 0%, rgba(15,23,42,0.6) 100%)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {formData.photoUrl && (
            <img
              src={resolveAssetUrl(formData.photoUrl)}
              alt="Preview"
              style={{
                width: 90,
                height: 90,
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #38bdf8",
                boxShadow: "0 0 20px rgba(56, 189, 248, 0.3)",
                marginBottom: "1.25rem",
              }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          )}

          <span
            style={{
              fontSize: "0.75rem",
              padding: "0.25rem 0.75rem",
              borderRadius: "9999px",
              background: "rgba(56, 189, 248, 0.15)",
              color: "#38bdf8",
              fontWeight: 600,
              marginBottom: "1rem",
            }}
          >
            👋 {formData.subheadline || "Peran Profesional"}
          </span>

          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#fff", margin: "0 0 0.5rem" }}>
            Halo, Saya <span style={{ color: "#38bdf8" }}>{formData.headline || "Nama Anda"}</span>
          </h2>

          <p style={{ fontSize: "0.85rem", color: "#94a3b8", maxWidth: 380, lineHeight: 1.6, margin: "0 0 1.5rem" }}>
            {formData.bio || "Deskripsi profil Anda akan muncul di sini..."}
          </p>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
            <span
              className="adm-btn adm-btn-primary"
              style={{ fontSize: "0.8rem", pointerEvents: "none" }}
            >
              <i className="ri-download-line" /> {formData.ctaLabel || "Tombol Utama"}
            </span>
            <span
              className="adm-btn adm-btn-secondary"
              style={{ fontSize: "0.8rem", pointerEvents: "none" }}
            >
              {formData.ctaSecLabel || "Tombol Sekunder"} <i className="ri-arrow-right-line" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
