import { useState, useEffect } from "react";
import { apiRequest, resolveAssetUrl } from "../../config/api";
import { useToast } from "../components/Toast";
import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";
import ImageUploader from "../components/ImageUploader";

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnailUrl: "",
    techStack: [],
    githubUrl: "",
    demoUrl: "",
    isFeatured: false,
    order: 0,
    animDelay: "200",
    isActive: true,
  });
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await apiRequest("/api/projects/all");
      setProjects(data || []);
    } catch (err) {
      showToast("Gagal memuat proyek: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setSelectedProject(null);
    setFormData({
      title: "",
      description: "",
      thumbnailUrl: "",
      techStack: ["React.js", "TailwindCSS"],
      githubUrl: "https://github.com/solihunsir/",
      demoUrl: "",
      isFeatured: false,
      order: projects.length + 1,
      animDelay: "200",
      isActive: true,
    });
    setTagInput("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setSelectedProject(item);
    setFormData({
      title: item.title,
      description: item.description || "",
      thumbnailUrl: item.thumbnailUrl || "",
      techStack: Array.isArray(item.techStack) ? item.techStack : [],
      githubUrl: item.githubUrl || "",
      demoUrl: item.demoUrl || "",
      isFeatured: item.isFeatured ?? false,
      order: item.order ?? 0,
      animDelay: item.animDelay || "200",
      isActive: item.isActive,
    });
    setTagInput("");
    setIsModalOpen(true);
  };

  const handleOpenDelete = (item) => {
    setSelectedProject(item);
    setIsDeleteOpen(true);
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = tagInput.trim().replace(/^,+|,+$/g, "");
      if (val && !formData.techStack.includes(val)) {
        setFormData({ ...formData, techStack: [...formData.techStack, val] });
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      techStack: formData.techStack.filter((t) => t !== tagToRemove),
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (selectedProject) {
        await apiRequest(`/api/projects/${selectedProject.id}`, {
          method: "PUT",
          body: JSON.stringify(formData),
        });
        showToast("Proyek berhasil diperbarui!", "success");
      } else {
        await apiRequest("/api/projects", {
          method: "POST",
          body: JSON.stringify(formData),
        });
        showToast("Proyek baru berhasil ditambahkan!", "success");
      }
      setIsModalOpen(false);
      loadProjects();
    } catch (err) {
      showToast("Gagal menyimpan: " + err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedProject) return;
    setSaving(true);
    try {
      await apiRequest(`/api/projects/${selectedProject.id}`, {
        method: "DELETE",
      });
      showToast("Proyek berhasil dihapus!", "success");
      setIsDeleteOpen(false);
      loadProjects();
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
            Kelola Portofolio Proyek ({projects.length})
          </h2>
          <p style={{ margin: "0.2rem 0 0", fontSize: "0.8rem", color: "#94a3b8" }}>
            Daftar karya aplikasi web, mobile, dan sistem cerdas yang ditampilkan di portfolio.
          </p>
        </div>
        <button
          type="button"
          className="adm-btn adm-btn-primary"
          onClick={handleOpenAdd}
        >
          <i className="ri-add-line" />
          <span>Tambah Proyek Baru</span>
        </button>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: "1.25rem", maxWidth: 360, position: "relative" }}>
        <input
          type="text"
          className="adm-input"
          placeholder="Cari judul proyek atau deskripsi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ paddingLeft: "2.2rem" }}
        />
        <i
          className="ri-search-line"
          style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#64748b" }}
        />
      </div>

      {/* Projects Grid Cards */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#64748b" }} className="adm-card">
          <i className="ri-loader-4-line" style={{ animation: "spin 1s linear infinite", fontSize: "2rem" }} />
          <p style={{ marginTop: "0.5rem" }}>Memuat daftar proyek...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#64748b" }} className="adm-card">
          <i className="ri-code-box-line" style={{ fontSize: "2.5rem", display: "block", marginBottom: "0.5rem" }} />
          <span>Tidak ada proyek yang cocok</span>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="adm-card"
              style={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                borderTop: p.isFeatured ? "3px solid #38bdf8" : "1px solid var(--adm-border)",
              }}
            >
              {/* Thumbnail */}
              <div style={{ position: "relative", height: 160, margin: "-1.5rem -1.5rem 1rem", background: "#020617" }}>
                {p.thumbnailUrl ? (
                  <img
                    src={resolveAssetUrl(p.thumbnailUrl)}
                    alt={p.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src = "https://placehold.co/600x400/0f172a/38bdf8?text=Project";
                    }}
                  />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}>
                    <i className="ri-image-line" style={{ fontSize: "2.5rem" }} />
                  </div>
                )}

                {/* Badges on thumbnail */}
                <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: "0.4rem" }}>
                  {p.isFeatured && (
                    <span className="adm-badge adm-badge-accent" style={{ background: "rgba(15, 23, 42, 0.85)", backdropFilter: "blur(4px)" }}>
                      ⭐ Unggulan
                    </span>
                  )}
                  {!p.isActive && (
                    <span className="adm-badge adm-badge-warning" style={{ background: "rgba(15, 23, 42, 0.85)", backdropFilter: "blur(4px)" }}>
                      Nonaktif
                    </span>
                  )}
                </div>

                <div style={{ position: "absolute", bottom: 10, right: 10 }}>
                  <span style={{ fontSize: "0.7rem", background: "rgba(0,0,0,0.75)", color: "#94a3b8", padding: "0.15rem 0.5rem", borderRadius: "4px" }}>
                    Urutan #{p.order}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ margin: "0 0 0.4rem", fontSize: "1.05rem", fontWeight: 700, color: "#fff" }}>
                  {p.title}
                </h3>
                <p style={{ margin: "0 0 1rem", fontSize: "0.8rem", color: "#94a3b8", lineHeight: 1.5, flex: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {p.description}
                </p>

                {/* Tech Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1.25rem" }}>
                  {(p.techStack || []).map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontSize: "0.68rem",
                        padding: "0.15rem 0.5rem",
                        borderRadius: "4px",
                        background: "rgba(255, 255, 255, 0.05)",
                        color: "#cbd5e1",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid var(--adm-border)" }}>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#94a3b8", fontSize: "1.1rem" }}
                        title="Lihat Repository GitHub"
                      >
                        <i className="ri-github-line" />
                      </a>
                    )}
                    {p.demoUrl && (
                      <a
                        href={p.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#38bdf8", fontSize: "1.1rem" }}
                        title="Lihat Live Demo"
                      >
                        <i className="ri-external-link-line" />
                      </a>
                    )}
                  </div>

                  <div style={{ display: "flex", gap: "0.4rem" }}>
                    <button
                      type="button"
                      className="adm-btn adm-btn-secondary adm-btn-icon"
                      onClick={() => handleOpenEdit(p)}
                      title="Edit Proyek"
                    >
                      <i className="ri-edit-line" />
                    </button>
                    <button
                      type="button"
                      className="adm-btn adm-btn-danger adm-btn-icon"
                      onClick={() => handleOpenDelete(p)}
                      title="Hapus Proyek"
                    >
                      <i className="ri-delete-bin-line" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedProject ? "Edit Proyek" : "Tambah Proyek Baru"}
        maxWidth="680px"
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
                  <span>{selectedProject ? "Simpan Perubahan" : "Publikasikan Proyek"}</span>
                </>
              )}
            </button>
          </>
        }
      >
        <form onSubmit={handleSave}>
          <div className="adm-form-group">
            <label className="adm-label">Judul Proyek</label>
            <input
              type="text"
              className="adm-input"
              placeholder="Contoh: Judi Guard atau Smart Village"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="adm-form-group">
            <label className="adm-label">Deskripsi Proyek</label>
            <textarea
              rows={3}
              className="adm-textarea"
              placeholder="Jelaskan fungsi, latar belakang masalah, dan fitur utama proyek..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <ImageUploader
            label="Foto Thumbnail Proyek"
            value={formData.thumbnailUrl}
            onChange={(url) => setFormData({ ...formData, thumbnailUrl: url })}
            uploadEndpoint="/api/projects/upload-thumbnail"
            fieldName="thumbnail"
            helperText="Format PNG, JPG, WebP. Rasio 16:9 direkomendasikan."
          />

          {/* Tech Stack Dynamic Tags */}
          <div className="adm-form-group">
            <label className="adm-label">
              Teknologi / Tech Stack (Ketik lalu tekan Enter atau koma)
            </label>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.4rem",
                padding: "0.5rem",
                background: "rgba(15, 23, 42, 0.9)",
                border: "1px solid var(--adm-border)",
                borderRadius: "8px",
                minHeight: 42,
              }}
            >
              {formData.techStack.map((tag) => (
                <span
                  key={tag}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    background: "rgba(56, 189, 248, 0.15)",
                    color: "#38bdf8",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    style={{ background: "none", border: "none", color: "#38bdf8", cursor: "pointer", padding: 0 }}
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder={formData.techStack.length === 0 ? "Ketik nama tools (misal: React.js, Express)..." : "Tambah tag..."}
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#fff",
                  fontSize: "0.8rem",
                  flex: 1,
                  minWidth: 120,
                }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="adm-form-group">
              <label className="adm-label">URL GitHub Repository</label>
              <input
                type="text"
                className="adm-input"
                placeholder="https://github.com/..."
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              />
            </div>
            <div className="adm-form-group">
              <label className="adm-label">URL Live Demo (Opsional)</label>
              <input
                type="text"
                className="adm-input"
                placeholder="https://..."
                value={formData.demoUrl}
                onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="adm-form-group">
              <label className="adm-label">Nomor Urutan</label>
              <input
                type="number"
                className="adm-input"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="adm-form-group">
              <label className="adm-label">AOS Delay</label>
              <input
                type="text"
                className="adm-input"
                value={formData.animDelay}
                onChange={(e) => setFormData({ ...formData, animDelay: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "2rem", marginTop: "0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <input
                type="checkbox"
                id="proj-featured"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                style={{ width: 18, height: 18, accentColor: "#38bdf8", cursor: "pointer" }}
              />
              <label htmlFor="proj-featured" style={{ fontSize: "0.85rem", color: "#cbd5e1", cursor: "pointer" }}>
                ⭐ Proyek Unggulan (Featured)
              </label>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <input
                type="checkbox"
                id="proj-active"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                style={{ width: 18, height: 18, accentColor: "#38bdf8", cursor: "pointer" }}
              />
              <label htmlFor="proj-active" style={{ fontSize: "0.85rem", color: "#cbd5e1", cursor: "pointer" }}>
                Tampilkan di Portfolio (Aktif)
              </label>
            </div>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Hapus Proyek"
        message={`Apakah Anda yakin ingin menghapus proyek "${selectedProject?.title}"? Data dan thumbnail akan dihapus dari server.`}
        loading={saving}
      />
    </div>
  );
}
