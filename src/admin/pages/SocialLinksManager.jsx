import { useState, useEffect } from "react";
import { apiRequest } from "../../config/api";
import { useToast } from "../components/Toast";
import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";

export default function SocialLinksManager() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);
  const [formData, setFormData] = useState({
    platform: "",
    url: "",
    icon: "ri-link",
    order: 0,
    isActive: true,
  });
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const commonPlatforms = [
    { platform: "GitHub",    icon: "ri-github-fill",    placeholder: "https://github.com/username" },
    { platform: "LinkedIn",  icon: "ri-linkedin-fill",  placeholder: "https://linkedin.com/in/username" },
    { platform: "Instagram", icon: "ri-instagram-fill", placeholder: "https://instagram.com/username" },
    { platform: "Email",     icon: "ri-mail-fill",      placeholder: "mailto:email@domain.com" },
    { platform: "YouTube",   icon: "ri-youtube-fill",   placeholder: "https://youtube.com/@channel" },
    { platform: "WhatsApp",  icon: "ri-whatsapp-fill",  placeholder: "https://wa.me/62812xxxx" },
  ];

  const loadLinks = async () => {
    setLoading(true);
    try {
      const data = await apiRequest("/api/social-links/all");
      setLinks(data || []);
    } catch (err) {
      showToast("Gagal memuat social links: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLinks();
  }, []);

  const handleOpenAdd = () => {
    setSelectedLink(null);
    setFormData({
      platform: "GitHub",
      url: "https://github.com/",
      icon: "ri-github-fill",
      order: links.length + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setSelectedLink(item);
    setFormData({
      platform: item.platform,
      url: item.url,
      icon: item.icon || "ri-link",
      order: item.order ?? 0,
      isActive: item.isActive,
    });
    setIsModalOpen(true);
  };

  const handleOpenDelete = (item) => {
    setSelectedLink(item);
    setIsDeleteOpen(true);
  };

  const handleSelectPreset = (preset) => {
    setFormData((prev) => ({
      ...prev,
      platform: preset.platform,
      icon: preset.icon,
      url: prev.url || preset.placeholder,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (selectedLink) {
        await apiRequest(`/api/social-links/${selectedLink.id}`, {
          method: "PUT",
          body: JSON.stringify(formData),
        });
        showToast("Social link berhasil diperbarui!", "success");
      } else {
        await apiRequest("/api/social-links", {
          method: "POST",
          body: JSON.stringify(formData),
        });
        showToast("Social link baru berhasil ditambahkan!", "success");
      }
      setIsModalOpen(false);
      loadLinks();
    } catch (err) {
      showToast("Gagal menyimpan: " + err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedLink) return;
    setSaving(true);
    try {
      await apiRequest(`/api/social-links/${selectedLink.id}`, {
        method: "DELETE",
      });
      showToast("Social link berhasil dihapus!", "success");
      setIsDeleteOpen(false);
      loadLinks();
    } catch (err) {
      showToast("Gagal menghapus: " + err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700, color: "#fff" }}>
            Kelola Social Links & Kontak ({links.length})
          </h2>
          <p style={{ margin: "0.2rem 0 0", fontSize: "0.8rem", color: "#94a3b8" }}>
            Tautan akun sosial media yang muncul di Footer dan Contact section.
          </p>
        </div>
        <button
          type="button"
          className="adm-btn adm-btn-primary"
          onClick={handleOpenAdd}
        >
          <i className="ri-add-line" />
          <span>Tambah Social Link</span>
        </button>
      </div>

      {/* Table Card */}
      <div className="adm-card">
        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
            <i className="ri-loader-4-line" style={{ animation: "spin 1s linear infinite", fontSize: "2rem" }} />
            <p style={{ marginTop: "0.5rem" }}>Memuat social links...</p>
          </div>
        ) : links.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
            <i className="ri-share-line" style={{ fontSize: "2.5rem", display: "block", marginBottom: "0.5rem" }} />
            <span>Belum ada tautan media sosial</span>
          </div>
        ) : (
          <div className="adm-table-container">
            <table className="adm-table">
              <thead>
                <tr>
                  <th style={{ width: 60 }}>Ikon</th>
                  <th>Platform</th>
                  <th>URL Tautan</th>
                  <th style={{ width: 80 }}>Urutan</th>
                  <th style={{ width: 90 }}>Status</th>
                  <th style={{ width: 110, textAlign: "right" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {links.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 8,
                          background: "rgba(56, 189, 248, 0.12)",
                          color: "#38bdf8",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.2rem",
                        }}
                      >
                        <i className={item.icon || "ri-link"} />
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: "#fff" }}>
                        {item.platform}
                      </span>
                    </td>
                    <td>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#38bdf8", textDecoration: "none", fontSize: "0.85rem" }}
                      >
                        {item.url} ↗
                      </a>
                    </td>
                    <td>
                      <span className="adm-badge adm-badge-accent">#{item.order}</span>
                    </td>
                    <td>
                      {item.isActive ? (
                        <span className="adm-badge adm-badge-success">Aktif</span>
                      ) : (
                        <span className="adm-badge adm-badge-warning">Nonaktif</span>
                      )}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.4rem" }}>
                        <button
                          type="button"
                          className="adm-btn adm-btn-secondary adm-btn-icon"
                          onClick={() => handleOpenEdit(item)}
                          title="Edit"
                        >
                          <i className="ri-edit-line" />
                        </button>
                        <button
                          type="button"
                          className="adm-btn adm-btn-danger adm-btn-icon"
                          onClick={() => handleOpenDelete(item)}
                          title="Hapus"
                        >
                          <i className="ri-delete-bin-line" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedLink ? "Edit Social Link" : "Tambah Social Link"}
        footer={
          <>
            <button
              type="button"
              className="adm-btn adm-btn-secondary"
              onClick={() => setIsModalOpen(false)}
              disabled={saving}
            >
              Batal
            </button>
            <button
              type="button"
              className="adm-btn adm-btn-primary"
              onClick={handleSave}
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
                  <span>{selectedLink ? "Simpan Perubahan" : "Tambahkan"}</span>
                </>
              )}
            </button>
          </>
        }
      >
        <form onSubmit={handleSave}>
          {/* Presets */}
          <div style={{ marginBottom: "1rem" }}>
            <label className="adm-label">Pilih Template Platform:</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
              {commonPlatforms.map((p) => (
                <button
                  key={p.platform}
                  type="button"
                  className="adm-badge adm-badge-accent"
                  style={{ cursor: "pointer", padding: "0.3rem 0.6rem" }}
                  onClick={() => handleSelectPreset(p)}
                >
                  <i className={p.icon} />
                  <span>{p.platform}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="adm-form-group">
            <label className="adm-label">Nama Platform</label>
            <input
              type="text"
              className="adm-input"
              placeholder="Contoh: GitHub, LinkedIn, Instagram"
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              required
            />
          </div>

          <div className="adm-form-group">
            <label className="adm-label">URL Profil / Akun</label>
            <input
              type="text"
              className="adm-input"
              placeholder="https://..."
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="adm-form-group">
              <label className="adm-label">Class Ikon Remixicon</label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 8,
                    background: "rgba(56, 189, 248, 0.15)",
                    color: "#38bdf8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    flexShrink: 0,
                  }}
                >
                  <i className={formData.icon || "ri-link"} />
                </div>
                <input
                  type="text"
                  className="adm-input"
                  placeholder="ri-github-fill"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                />
              </div>
            </div>

            <div className="adm-form-group">
              <label className="adm-label">Nomor Urutan</label>
              <input
                type="number"
                className="adm-input"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="adm-form-group" style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.5rem" }}>
            <input
              type="checkbox"
              id="social-isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              style={{ width: 18, height: 18, accentColor: "#38bdf8", cursor: "pointer" }}
            />
            <label htmlFor="social-isActive" style={{ fontSize: "0.85rem", color: "#cbd5e1", cursor: "pointer" }}>
              Tampilkan di Portfolio (Aktif)
            </label>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Hapus Social Link"
        message={`Apakah Anda yakin ingin menghapus tautan ${selectedLink?.platform}?`}
        loading={saving}
      />
    </div>
  );
}
