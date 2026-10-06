import { useState, useEffect } from "react";
import { apiRequest, resolveAssetUrl } from "../../config/api";
import { useToast } from "../components/Toast";
import ImageUploader from "../components/ImageUploader";

export default function AboutManager() {
  const [formData, setFormData] = useState({
    fullName: "",
    description: "",
    location: "Bengkalis, Riau, Indonesia",
    availability: "Open to Work",
    email: "solihun.bks2019@gmail.com",
    phone: "",
    cvFileUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const loadAbout = async () => {
    setLoading(true);
    try {
      const data = await apiRequest("/api/about");
      if (data) {
        setFormData({
          fullName: data.fullName || "",
          description: data.description || "",
          location: data.location || "Bengkalis, Riau, Indonesia",
          availability: data.availability || "Open to Work",
          email: data.email || "",
          phone: data.phone || "",
          cvFileUrl: data.cvFileUrl || "",
        });
      }
    } catch (err) {
      showToast("Gagal memuat data About: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAbout();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiRequest("/api/about", {
        method: "PUT",
        body: JSON.stringify(formData),
      });
      showToast("Data About Me & CV berhasil diperbarui!", "success");
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
        <p style={{ marginTop: "0.5rem" }}>Memuat profil About Me...</p>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.75rem", alignItems: "flex-start" }}>
      {/* Left Form */}
      <form onSubmit={handleSave} className="adm-card">
        <h3 style={{ margin: "0 0 1.25rem", fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>
          <i className="ri-user-settings-line" style={{ marginRight: "0.5rem", color: "#38bdf8" }} />
          Edit Profil & Informasi Kontak
        </h3>

        <div className="adm-form-group">
          <label className="adm-label">Nama Lengkap</label>
          <input
            type="text"
            name="fullName"
            className="adm-input"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Muhammad Sholihun"
            required
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div className="adm-form-group">
            <label className="adm-label">Lokasi Domisili</label>
            <input
              type="text"
              name="location"
              className="adm-input"
              value={formData.location}
              onChange={handleChange}
              placeholder="Bengkalis, Riau"
            />
          </div>
          <div className="adm-form-group">
            <label className="adm-label">Status Ketersediaan</label>
            <select
              name="availability"
              className="adm-select"
              value={formData.availability}
              onChange={handleChange}
            >
              <option value="Open to Work">🟢 Open to Work</option>
              <option value="Freelance Available">⚡ Freelance Available</option>
              <option value="Full-time Employed">💼 Full-time Employed</option>
              <option value="Not Available">🔴 Not Available</option>
            </select>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div className="adm-form-group">
            <label className="adm-label">Email Utama</label>
            <input
              type="email"
              name="email"
              className="adm-input"
              value={formData.email}
              onChange={handleChange}
              placeholder="solihun.bks2019@gmail.com"
              required
            />
          </div>
          <div className="adm-form-group">
            <label className="adm-label">Nomor WhatsApp / Telp</label>
            <input
              type="text"
              name="phone"
              className="adm-input"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+62 812-xxxx-xxxx"
            />
          </div>
        </div>

        <div className="adm-form-group">
          <label className="adm-label">Narasi Tentang Saya (Deskripsi Detail)</label>
          <textarea
            name="description"
            rows={5}
            className="adm-textarea"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tuliskan pengalaman, dedikasi, serta keahlian utama Anda..."
            required
          />
        </div>

        <ImageUploader
          label="File Curriculum Vitae (PDF)"
          value={formData.cvFileUrl}
          onChange={(url) => setFormData((prev) => ({ ...prev, cvFileUrl: url }))}
          uploadEndpoint="/api/about/upload-cv"
          fieldName="cv"
          accept=".pdf,.doc,.docx"
          isDoc={true}
          helperText="Format PDF atau Word. Maks 10MB."
        />

        <button
          type="submit"
          className="adm-btn adm-btn-primary"
          style={{ width: "100%", padding: "0.75rem", marginTop: "0.5rem" }}
          disabled={saving}
        >
          {saving ? (
            <>
              <i className="ri-loader-4-line" style={{ animation: "spin 1s linear infinite" }} />
              <span>Menyimpan...</span>
            </>
          ) : (
            <>
              <i className="ri-save-line" />
              <span>Simpan Perubahan About</span>
            </>
          )}
        </button>
      </form>

      {/* Right Preview Card */}
      <div className="adm-card" style={{ background: "rgba(11, 17, 32, 0.9)" }}>
        <h3 style={{ margin: "0 0 1.25rem", fontSize: "1rem", fontWeight: 700, color: "#94a3b8" }}>
          <i className="ri-profile-line" style={{ marginRight: "0.5rem", color: "#38bdf8" }} />
          Ringkasan Profil Pengembang
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ padding: "1.25rem", borderRadius: "12px", background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--adm-border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <h4 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700, color: "#fff" }}>
                {formData.fullName || "Nama Pengembang"}
              </h4>
              <span className="adm-badge adm-badge-success">
                {formData.availability}
              </span>
            </div>

            <p style={{ margin: "0 0 0.85rem", fontSize: "0.82rem", color: "#94a3b8" }}>
              <i className="ri-map-pin-line" style={{ color: "#38bdf8", marginRight: "0.35rem" }} />
              {formData.location}
            </p>

            <p style={{ margin: 0, fontSize: "0.85rem", color: "#cbd5e1", lineHeight: 1.65 }}>
              {formData.description || "Deskripsi profil belum diisi."}
            </p>
          </div>

          <div style={{ padding: "1rem 1.25rem", borderRadius: "12px", background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--adm-border)" }}>
            <h5 style={{ margin: "0 0 0.6rem", fontSize: "0.85rem", color: "#94a3b8" }}>Kontak Aktif:</h5>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.82rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#e2e8f0" }}>
                <i className="ri-mail-line" style={{ color: "#38bdf8" }} />
                <span>{formData.email}</span>
              </div>
              {formData.phone && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#e2e8f0" }}>
                  <i className="ri-phone-line" style={{ color: "#34d399" }} />
                  <span>{formData.phone}</span>
                </div>
              )}
            </div>
          </div>

          {formData.cvFileUrl && (
            <div style={{ padding: "1rem 1.25rem", borderRadius: "12px", background: "rgba(56, 189, 248, 0.08)", border: "1px solid rgba(56, 189, 248, 0.25)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <i className="ri-file-pdf-2-line" style={{ fontSize: "1.75rem", color: "#ef4444" }} />
                <div>
                  <p style={{ margin: 0, fontSize: "0.85rem", fontWeight: 600, color: "#fff" }}>Curriculum Vitae Aktif</p>
                  <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>Siap diunduh pengunjung</span>
                </div>
              </div>
              <a
                href={resolveAssetUrl(formData.cvFileUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="adm-btn adm-btn-secondary"
                style={{ fontSize: "0.75rem" }}
              >
                Unduh CV ↗
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
