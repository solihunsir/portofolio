import { useState, useEffect } from "react";
import { apiRequest, resolveAssetUrl } from "../../config/api";
import { useToast } from "../components/Toast";
import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";
import ImageUploader from "../components/ImageUploader";

export default function AgendaManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCat, setFilterCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    category: "achievement",
    institution: "",
    startDate: "",
    endDate: "",
    order: 0,
    animDelay: "200",
    isActive: true,
  });
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const categoryOptions = [
    { id: "achievement",   label: "Prestasi & Lomba", icon: "ri-trophy-line" },
    { id: "certification", label: "Sertifikasi",      icon: "ri-file-shield-line" },
    { id: "work",          label: "Pengalaman Kerja", icon: "ri-briefcase-line" },
    { id: "education",     label: "Pendidikan",       icon: "ri-graduation-cap-line" },
  ];

  const loadAgenda = async () => {
    setLoading(true);
    try {
      const data = await apiRequest("/api/agenda/all");
      setItems(data || []);
    } catch (err) {
      showToast("Gagal memuat agenda: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAgenda();
  }, []);

  const filteredItems = items.filter((item) => {
    const matchCat = filterCat === "all" || item.category === filterCat;
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.institution?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleOpenAdd = () => {
    setSelectedItem(null);
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      category: filterCat !== "all" ? filterCat : "achievement",
      institution: "Politeknik Negeri Bengkalis",
      startDate: "",
      endDate: "",
      order: items.length + 1,
      animDelay: "200",
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setSelectedItem(item);
    setFormData({
      title: item.title,
      description: item.description || "",
      imageUrl: item.imageUrl || "",
      category: item.category || "achievement",
      institution: item.institution || "",
      startDate: item.startDate || "",
      endDate: item.endDate || "",
      order: item.order ?? 0,
      animDelay: item.animDelay || "200",
      isActive: item.isActive,
    });
    setIsModalOpen(true);
  };

  const handleOpenDelete = (item) => {
    setSelectedItem(item);
    setIsDeleteOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (selectedItem) {
        await apiRequest(`/api/agenda/${selectedItem.id}`, {
          method: "PUT",
          body: JSON.stringify(formData),
        });
        showToast("Agenda / Prestasi berhasil diperbarui!", "success");
      } else {
        await apiRequest("/api/agenda", {
          method: "POST",
          body: JSON.stringify(formData),
        });
        showToast("Agenda / Prestasi berhasil ditambahkan!", "success");
      }
      setIsModalOpen(false);
      loadAgenda();
    } catch (err) {
      showToast("Gagal menyimpan: " + err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    setSaving(true);
    try {
      await apiRequest(`/api/agenda/${selectedItem.id}`, {
        method: "DELETE",
      });
      showToast("Agenda berhasil dihapus!", "success");
      setIsDeleteOpen(false);
      loadAgenda();
    } catch (err) {
      showToast("Gagal menghapus: " + err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const getCategoryLabel = (cat) => {
    const found = categoryOptions.find((c) => c.id === cat);
    return found ? found.label : cat;
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700, color: "#fff" }}>
            Kelola Agenda, Prestasi & Sertifikasi ({items.length})
          </h2>
          <p style={{ margin: "0.2rem 0 0", fontSize: "0.8rem", color: "#94a3b8" }}>
            Rekam jejak penghargaan, sertifikat kompetensi, dan kegiatan penting.
          </p>
        </div>
        <button
          type="button"
          className="adm-btn adm-btn-primary"
          onClick={handleOpenAdd}
        >
          <i className="ri-add-line" />
          <span>Tambah Agenda Baru</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.25rem", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          <button
            type="button"
            className={`adm-btn ${filterCat === "all" ? "adm-btn-primary" : "adm-btn-secondary"}`}
            style={{ fontSize: "0.75rem", padding: "0.4rem 0.8rem" }}
            onClick={() => setFilterCat("all")}
          >
            Semua ({items.length})
          </button>
          {categoryOptions.map((cat) => {
            const count = items.filter((i) => i.category === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                className={`adm-btn ${filterCat === cat.id ? "adm-btn-primary" : "adm-btn-secondary"}`}
                style={{ fontSize: "0.75rem", padding: "0.4rem 0.8rem" }}
                onClick={() => setFilterCat(cat.id)}
              >
                <i className={cat.icon} />
                <span>{cat.label} ({count})</span>
              </button>
            );
          })}
        </div>

        <div style={{ position: "relative", minWidth: 240 }}>
          <input
            type="text"
            className="adm-input"
            placeholder="Cari judul atau institusi..."
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

      {/* Cards Grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#64748b" }} className="adm-card">
          <i className="ri-loader-4-line" style={{ animation: "spin 1s linear infinite", fontSize: "2rem" }} />
          <p style={{ marginTop: "0.5rem" }}>Memuat daftar agenda...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#64748b" }} className="adm-card">
          <i className="ri-award-line" style={{ fontSize: "2.5rem", display: "block", marginBottom: "0.5rem" }} />
          <span>Tidak ada agenda yang cocok dengan pencarian</span>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="adm-card"
              style={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* Image Preview */}
              <div style={{ position: "relative", height: 160, margin: "-1.5rem -1.5rem 1rem", background: "#020617" }}>
                {item.imageUrl ? (
                  <img
                    src={resolveAssetUrl(item.imageUrl)}
                    alt={item.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src = "https://placehold.co/600x400/0f172a/38bdf8?text=Agenda";
                    }}
                  />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}>
                    <i className="ri-image-line" style={{ fontSize: "2.5rem" }} />
                  </div>
                )}

                <div style={{ position: "absolute", top: 10, left: 10 }}>
                  <span className="adm-badge adm-badge-accent" style={{ background: "rgba(15, 23, 42, 0.85)", backdropFilter: "blur(4px)" }}>
                    {getCategoryLabel(item.category)}
                  </span>
                </div>

                <div style={{ position: "absolute", bottom: 10, right: 10 }}>
                  <span style={{ fontSize: "0.7rem", background: "rgba(0,0,0,0.75)", color: "#94a3b8", padding: "0.15rem 0.5rem", borderRadius: "4px" }}>
                    Urutan #{item.order}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ margin: "0 0 0.4rem", fontSize: "1.05rem", fontWeight: 700, color: "#fff" }}>
                  {item.title}
                </h3>
                {item.institution && (
                  <p style={{ margin: "0 0 0.5rem", fontSize: "0.78rem", color: "#38bdf8" }}>
                    <i className="ri-building-line" style={{ marginRight: "0.3rem" }} />
                    {item.institution}
                  </p>
                )}
                <p style={{ margin: "0 0 1rem", fontSize: "0.8rem", color: "#94a3b8", lineHeight: 1.5, flex: 1 }}>
                  {item.description}
                </p>

                {/* Footer actions */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid var(--adm-border)" }}>
                  <div>
                    {item.isActive ? (
                      <span className="adm-badge adm-badge-success" style={{ fontSize: "0.68rem" }}>Aktif</span>
                    ) : (
                      <span className="adm-badge adm-badge-warning" style={{ fontSize: "0.68rem" }}>Nonaktif</span>
                    )}
                  </div>

                  <div style={{ display: "flex", gap: "0.4rem" }}>
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
        title={selectedItem ? "Edit Agenda" : "Tambah Agenda Baru"}
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
                  <span>{selectedItem ? "Simpan Perubahan" : "Tambahkan"}</span>
                </>
              )}
            </button>
          </>
        }
      >
        <form onSubmit={handleSave}>
          <div className="adm-form-group">
            <label className="adm-label">Judul Prestasi / Kegiatan / Sertifikat</label>
            <input
              type="text"
              className="adm-input"
              placeholder="Contoh: Juara 1 Catur PKM & Porseni"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                {categoryOptions.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
            <div className="adm-form-group">
              <label className="adm-label">Institusi / Penyelenggara</label>
              <input
                type="text"
                className="adm-input"
                placeholder="Politeknik Negeri Bengkalis / Dicoding"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              />
            </div>
          </div>

          <div className="adm-form-group">
            <label className="adm-label">Deskripsi Rinci</label>
            <textarea
              rows={3}
              className="adm-textarea"
              placeholder="Jelaskan mengenai pencapaian atau kegiatan ini..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <ImageUploader
            label="Foto Dokumentasi / Sertifikat"
            value={formData.imageUrl}
            onChange={(url) => setFormData({ ...formData, imageUrl: url })}
            uploadEndpoint="/api/agenda/upload-image"
            fieldName="image"
            helperText="Format PNG, JPG, WebP. Maks 5MB."
          />

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
              <label className="adm-label">AOS Delay</label>
              <input
                type="text"
                className="adm-input"
                value={formData.animDelay}
                onChange={(e) => setFormData({ ...formData, animDelay: e.target.value })}
              />
            </div>
          </div>

          <div className="adm-form-group" style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.5rem" }}>
            <input
              type="checkbox"
              id="agenda-isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              style={{ width: 18, height: 18, accentColor: "#38bdf8", cursor: "pointer" }}
            />
            <label htmlFor="agenda-isActive" style={{ fontSize: "0.85rem", color: "#cbd5e1", cursor: "pointer" }}>
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
        title="Hapus Agenda"
        message={`Apakah Anda yakin ingin menghapus "${selectedItem?.title}"?`}
        loading={saving}
      />
    </div>
  );
}
