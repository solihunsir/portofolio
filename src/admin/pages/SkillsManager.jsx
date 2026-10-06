import { useState, useEffect } from "react";
import { apiRequest, resolveAssetUrl } from "../../config/api";
import { useToast } from "../components/Toast";
import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";
import ImageUploader from "../components/ImageUploader";

export default function SkillsManager() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    logoUrl: "",
    category: "Frontend",
    proficiency: 85,
    description: "",
    animDelay: "200",
    order: 0,
    isActive: true,
  });
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const categories = ["Frontend", "Backend", "Database", "Tools", "Mobile"];

  const loadSkills = async () => {
    setLoading(true);
    try {
      const data = await apiRequest("/api/skills/all");
      setSkills(data || []);
    } catch (err) {
      showToast("Gagal memuat skills: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const filteredSkills = skills.filter((item) => {
    const matchCat = categoryFilter === "all" || item.category === categoryFilter;
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleOpenAdd = () => {
    setSelectedSkill(null);
    setFormData({
      name: "",
      logoUrl: "",
      category: categoryFilter !== "all" ? categoryFilter : "Frontend",
      proficiency: 85,
      description: "Framework",
      animDelay: "200",
      order: skills.length + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setSelectedSkill(item);
    setFormData({
      name: item.name,
      logoUrl: item.logoUrl || "",
      category: item.category || "Frontend",
      proficiency: item.proficiency ?? 85,
      description: item.description || "",
      animDelay: item.animDelay || "200",
      order: item.order ?? 0,
      isActive: item.isActive,
    });
    setIsModalOpen(true);
  };

  const handleOpenDelete = (item) => {
    setSelectedSkill(item);
    setIsDeleteOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (selectedSkill) {
        await apiRequest(`/api/skills/${selectedSkill.id}`, {
          method: "PUT",
          body: JSON.stringify(formData),
        });
        showToast("Skill berhasil diperbarui!", "success");
      } else {
        await apiRequest("/api/skills", {
          method: "POST",
          body: JSON.stringify(formData),
        });
        showToast("Skill baru berhasil ditambahkan!", "success");
      }
      setIsModalOpen(false);
      loadSkills();
    } catch (err) {
      showToast("Gagal menyimpan skill: " + err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedSkill) return;
    setSaving(true);
    try {
      await apiRequest(`/api/skills/${selectedSkill.id}`, {
        method: "DELETE",
      });
      showToast("Skill berhasil dihapus!", "success");
      setIsDeleteOpen(false);
      loadSkills();
    } catch (err) {
      showToast("Gagal menghapus: " + err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700, color: "#fff" }}>
            Kelola Skills & Tools ({skills.length})
          </h2>
          <p style={{ margin: "0.2rem 0 0", fontSize: "0.8rem", color: "#94a3b8" }}>
            Teknologi, bahasa pemrograman, framework, dan tools kerja.
          </p>
        </div>
        <button
          type="button"
          className="adm-btn adm-btn-primary"
          onClick={handleOpenAdd}
        >
          <i className="ri-add-line" />
          <span>Tambah Skill</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.25rem", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          <button
            type="button"
            className={`adm-btn ${categoryFilter === "all" ? "adm-btn-primary" : "adm-btn-secondary"}`}
            style={{ fontSize: "0.75rem", padding: "0.4rem 0.8rem" }}
            onClick={() => setCategoryFilter("all")}
          >
            Semua ({skills.length})
          </button>
          {categories.map((cat) => {
            const count = skills.filter((s) => s.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                className={`adm-btn ${categoryFilter === cat ? "adm-btn-primary" : "adm-btn-secondary"}`}
                style={{ fontSize: "0.75rem", padding: "0.4rem 0.8rem" }}
                onClick={() => setCategoryFilter(cat)}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        <div style={{ position: "relative", minWidth: 240 }}>
          <input
            type="text"
            className="adm-input"
            placeholder="Cari nama skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: "2.2rem" }}
          />
          <i
            className="ri-search-line"
            style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#64748b" }}
          />
        </div>
      </div>

      {/* Table Card */}
      <div className="adm-card">
        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
            <i className="ri-loader-4-line" style={{ animation: "spin 1s linear infinite", fontSize: "2rem" }} />
            <p style={{ marginTop: "0.5rem" }}>Memuat daftar skills...</p>
          </div>
        ) : filteredSkills.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
            <i className="ri-tools-line" style={{ fontSize: "2.5rem", display: "block", marginBottom: "0.5rem" }} />
            <span>Tidak ada skill yang cocok dengan filter</span>
          </div>
        ) : (
          <div className="adm-table-container">
            <table className="adm-table">
              <thead>
                <tr>
                  <th style={{ width: 60 }}>Logo</th>
                  <th>Nama Skill / Tool</th>
                  <th>Kategori</th>
                  <th>Keterangan</th>
                  <th style={{ width: 140 }}>Kemampuan</th>
                  <th style={{ width: 80 }}>Urutan</th>
                  <th style={{ width: 90 }}>Status</th>
                  <th style={{ width: 110, textAlign: "right" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredSkills.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: 8,
                          background: "rgba(255, 255, 255, 0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: 4,
                        }}
                      >
                        {item.logoUrl ? (
                          <img
                            src={resolveAssetUrl(item.logoUrl)}
                            alt={item.name}
                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        ) : (
                          <i className="ri-code-s-slash-line" style={{ color: "#38bdf8" }} />
                        )}
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: "#fff", fontSize: "0.9rem" }}>
                        {item.name}
                      </span>
                    </td>
                    <td>
                      <span className="adm-badge adm-badge-accent">
                        {item.category}
                      </span>
                    </td>
                    <td>
                      <span style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
                        {item.description || "-"}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div style={{ flex: 1, height: 6, borderRadius: 3, background: "rgba(255, 255, 255, 0.1)", overflow: "hidden" }}>
                          <div
                            style={{
                              width: `${item.proficiency}%`,
                              height: "100%",
                              background: "linear-gradient(90deg, #38bdf8, #2563eb)",
                            }}
                          />
                        </div>
                        <span style={{ fontSize: "0.75rem", color: "#38bdf8", fontWeight: 700 }}>
                          {item.proficiency}%
                        </span>
                      </div>
                    </td>
                    <td>
                      <span style={{ color: "#94a3b8" }}>#{item.order}</span>
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

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedSkill ? "Edit Skill" : "Tambah Skill Baru"}
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
                  <span>{selectedSkill ? "Simpan Perubahan" : "Tambahkan"}</span>
                </>
              )}
            </button>
          </>
        }
      >
        <form onSubmit={handleSave}>
          <div className="adm-form-group">
            <label className="adm-label">Nama Skill / Teknologi</label>
            <input
              type="text"
              className="adm-input"
              placeholder="Contoh: React JS, Flutter, Docker"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="adm-form-group">
              <label className="adm-label">Kategori</label>
              <select
                className="adm-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="adm-form-group">
              <label className="adm-label">Keterangan / Tipe</label>
              <input
                type="text"
                className="adm-input"
                placeholder="Framework, Language, Database, dll"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <ImageUploader
            label="Logo / Ikon Skill"
            value={formData.logoUrl}
            onChange={(url) => setFormData({ ...formData, logoUrl: url })}
            uploadEndpoint="/api/skills/upload-logo"
            fieldName="logo"
            helperText="Format PNG transparan atau SVG. Maks 1MB."
          />

          <div className="adm-form-group">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
              <label className="adm-label" style={{ marginBottom: 0 }}>Tingkat Kemampuan (Proficiency)</label>
              <span style={{ fontSize: "0.8rem", color: "#38bdf8", fontWeight: 700 }}>{formData.proficiency}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={formData.proficiency}
              onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) })}
              style={{ width: "100%", accentColor: "#38bdf8", cursor: "pointer" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="adm-form-group">
              <label className="adm-label">Nomor Urutan Tampil</label>
              <input
                type="number"
                className="adm-input"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="adm-form-group">
              <label className="adm-label">AOS Anim Delay (ms)</label>
              <input
                type="text"
                className="adm-input"
                placeholder="100, 200, 300"
                value={formData.animDelay}
                onChange={(e) => setFormData({ ...formData, animDelay: e.target.value })}
              />
            </div>
          </div>

          <div className="adm-form-group" style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.5rem" }}>
            <input
              type="checkbox"
              id="skill-isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              style={{ width: 18, height: 18, accentColor: "#38bdf8", cursor: "pointer" }}
            />
            <label htmlFor="skill-isActive" style={{ fontSize: "0.85rem", color: "#cbd5e1", cursor: "pointer" }}>
              Tampilkan di Halaman Utama (Aktif)
            </label>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Hapus Skill"
        message={`Apakah Anda yakin ingin menghapus skill "${selectedSkill?.name}"?`}
        loading={saving}
      />
    </div>
  );
}
