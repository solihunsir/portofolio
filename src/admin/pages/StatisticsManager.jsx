import { useState, useEffect } from "react";
import { apiRequest } from "../../config/api";
import { useToast } from "../components/Toast";
import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";

export default function StatisticsManager() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedStat, setSelectedStat] = useState(null);
  const [formData, setFormData] = useState({
    label: "",
    value: "",
    icon: "ri-bar-chart-line",
    order: 0,
    isActive: true,
  });
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const loadStats = async () => {
    setLoading(true);
    try {
      const data = await apiRequest("/api/statistics/all");
      setStats(data || []);
    } catch (err) {
      showToast("Gagal memuat data statistik: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleOpenAdd = () => {
    setSelectedStat(null);
    setFormData({
      label: "",
      value: "",
      icon: "ri-star-line",
      order: stats.length + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setSelectedStat(item);
    setFormData({
      label: item.label,
      value: item.value,
      icon: item.icon || "ri-star-line",
      order: item.order ?? 0,
      isActive: item.isActive,
    });
    setIsModalOpen(true);
  };

  const handleOpenDelete = (item) => {
    setSelectedStat(item);
    setIsDeleteOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (selectedStat) {
        await apiRequest(`/api/statistics/${selectedStat.id}`, {
          method: "PUT",
          body: JSON.stringify(formData),
        });
        showToast("Statistik berhasil diperbarui!", "success");
      } else {
        await apiRequest("/api/statistics", {
          method: "POST",
          body: JSON.stringify(formData),
        });
        showToast("Statistik baru berhasil ditambahkan!", "success");
      }
      setIsModalOpen(false);
      loadStats();
    } catch (err) {
      showToast("Gagal menyimpan statistik: " + err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedStat) return;
    setSaving(true);
    try {
      await apiRequest(`/api/statistics/${selectedStat.id}`, {
        method: "DELETE",
      });
      showToast("Statistik berhasil dihapus!", "success");
      setIsDeleteOpen(false);
      loadStats();
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
            Kelola Statistik Highlight
          </h2>
          <p style={{ margin: "0.2rem 0 0", fontSize: "0.8rem", color: "#94a3b8" }}>
            Metrik pencapaian yang ditampilkan pada Hero dan About section.
          </p>
        </div>
        <button
          type="button"
          className="adm-btn adm-btn-primary"
          onClick={handleOpenAdd}
        >
          <i className="ri-add-line" />
          <span>Tambah Statistik</span>
        </button>
      </div>

      {/* Table Card */}
      <div className="adm-card">
        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
            <i className="ri-loader-4-line" style={{ animation: "spin 1s linear infinite", fontSize: "2rem" }} />
            <p style={{ marginTop: "0.5rem" }}>Memuat statistik...</p>
          </div>
        ) : stats.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
            <i className="ri-bar-chart-line" style={{ fontSize: "2.5rem", display: "block", marginBottom: "0.5rem" }} />
            <span>Belum ada data statistik</span>
          </div>
        ) : (
          <div className="adm-table-container">
            <table className="adm-table">
              <thead>
                <tr>
                  <th style={{ width: 60 }}>Ikon</th>
                  <th>Nilai (Value)</th>
                  <th>Label Deskriptif</th>
                  <th style={{ width: 90 }}>Urutan</th>
                  <th style={{ width: 100 }}>Status</th>
                  <th style={{ width: 120, textAlign: "right" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((item) => (
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
                          fontSize: "1.1rem",
                        }}
                      >
                        <i className={item.icon || "ri-star-line"} />
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff" }}>
                        {item.value}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, color: "#cbd5e1" }}>
                        {item.label}
                      </span>
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
        title={selectedStat ? "Edit Statistik" : "Tambah Statistik Baru"}
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
                  <span>{selectedStat ? "Simpan Perubahan" : "Tambahkan"}</span>
                </>
              )}
            </button>
          </>
        }
      >
        <form onSubmit={handleSave}>
          <div className="adm-form-group">
            <label className="adm-label">Nilai / Angka Metrik</label>
            <input
              type="text"
              className="adm-input"
              placeholder="Contoh: 15+ atau 3+ atau 100%"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              required
            />
          </div>

          <div className="adm-form-group">
            <label className="adm-label">Label Deskriptif</label>
            <input
              type="text"
              className="adm-input"
              placeholder="Contoh: Proyek Selesai atau Tahun Pengalaman"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="adm-form-group">
              <label className="adm-label">Class Ikon Remixicon</label>
              <input
                type="text"
                className="adm-input"
                placeholder="ri-folder-line"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              />
            </div>
            <div className="adm-form-group">
              <label className="adm-label">Nomor Urutan Tampil</label>
              <input
                type="number"
                className="adm-input"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="adm-form-group" style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "1rem" }}>
            <input
              type="checkbox"
              id="stat-isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              style={{ width: 18, height: 18, accentColor: "#38bdf8", cursor: "pointer" }}
            />
            <label htmlFor="stat-isActive" style={{ fontSize: "0.85rem", color: "#cbd5e1", cursor: "pointer" }}>
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
        title="Hapus Statistik"
        message={`Apakah Anda yakin ingin menghapus statistik "${selectedStat?.label}" (${selectedStat?.value})?`}
        loading={saving}
      />
    </div>
  );
}
