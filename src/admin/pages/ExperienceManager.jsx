import { useState, useEffect } from "react";
import { apiRequest } from "../../config/api";
import { useToast } from "../components/Toast";
import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";

const initialExperiencesFallback = [
  {
    id: "exp-1",
    type: "work",
    title: "Fullstack Developer – Frontend Focused",
    company: "PT Citiasia Internasional",
    location: "Jakarta, Indonesia (Onsite / Magang Berdampak)",
    startDate: "Agu 2025",
    endDate: "Des 2025",
    isCurrent: false,
    description: `• Membangun antarmuka aplikasi lintas platform (Flutter) yang responsif, adaptif, dan user-friendly.
• Berkontribusi aktif menganalisis dan mengatasi 30% kendala integrasi API serta inkonsistensi relasi database backend.
• Berkolaborasi dalam tim agile multidisiplin untuk menyelesaikan sprint rilis tepat waktu.`,
    order: 1,
  },
  {
    id: "exp-2",
    type: "work",
    title: "Fullstack Developer",
    company: "PT Winnicode Garuda Teknologi",
    location: "Bandung, Indonesia (Remote)",
    startDate: "Feb 2025",
    endDate: "Mei 2025",
    isCurrent: false,
    description: `• Mengembangkan aplikasi Portal Berita interaktif menggunakan Laravel mulai dari perancangan database hingga integrasi CMS.
• Meningkatkan keamanan sistem backend dan memperbarui antarmuka pengguna menjadi 20% lebih cepat dan responsif.
• Melakukan optimasi query database untuk mengefisienkan waktu pemuatan konten artikel.`,
    order: 2,
  },
  {
    id: "exp-3",
    type: "work",
    title: "Programming Instructor (Pemateri UKK)",
    company: "SMK Negeri di Bengkalis",
    location: "Bengkalis, Indonesia",
    startDate: "Mar 2022",
    endDate: "Mar 2024",
    isCurrent: false,
    description: `• Menyampaikan kurikulum dasar hingga menengah pemrograman web dan mobile kepada para siswa.
• Membimbing 60+ siswa SMK hingga sukses meraih tingkat kelulusan 95% pada Uji Kompetensi Keahlian (UKK).
• Mengarahkan siswa menyelesaikan portofolio website fungsional berbasis studi kasus riil.`,
    order: 3,
  },
  {
    id: "exp-4",
    type: "education",
    title: "D4 Rekayasa Perangkat Lunak (IPK: 3.53)",
    company: "Politeknik Negeri Bengkalis",
    location: "Bengkalis, Riau",
    startDate: "Agu 2021",
    endDate: "Feb 2025",
    isCurrent: false,
    description: `• Lulusan Berprestasi dengan fokus riset Sistem Rekomendasi, Machine Learning, dan Computer Vision.
• Publikasi Jurnal Ilmiah Riset dan Inovasi Nasional mengenai Algoritma A* untuk pencarian rute terdekat.
• Juara 1 Catur PKM & Porseni serta Juara 2 Pemrograman Web Se-Kabupaten Bengkalis.`,
    order: 4,
  },
  {
    id: "exp-5",
    type: "education",
    title: "Pertukaran Mahasiswa Merdeka (PMM 3 - IPK: 3.82)",
    company: "Politeknik Negeri Pontianak",
    location: "Pontianak, Kalimantan Barat",
    startDate: "Sep 2023",
    endDate: "Jan 2024",
    isCurrent: false,
    description: `• Penerima beasiswa Kemendikbudristek untuk studi lintas pulau dan penguatan kompetensi rekayasa perangkat lunak.
• Meraih indeks prestasi semester 3.82 dengan fokus penguasaan arsitektur sistem terdistribusi.`,
    order: 5,
  },
  {
    id: "exp-6",
    type: "organization",
    title: "Ketua Divisi E-Sport",
    company: "UKM Olahraga Politeknik Negeri Bengkalis",
    location: "Bengkalis, Riau",
    startDate: "Okt 2022",
    endDate: "Okt 2023",
    isCurrent: false,
    description: `• Memimpin dan membina 15 atlet mahasiswa untuk kompetisi tingkat politeknik daerah dan nasional.
• Menjalin kemitraan dengan 5 komunitas E-sports serta mengamankan dukungan dari 3 pihak sponsor.`,
    order: 6,
  },
];

export default function ExperienceManager() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedExp, setSelectedExp] = useState(null);

  const [formData, setFormData] = useState({
    type: "work",
    title: "",
    titleEn: "",
    company: "",
    companyEn: "",
    location: "",
    locationEn: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
    descriptionEn: "",
    order: 1,
  });

  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const loadExperiences = async () => {
    setLoading(true);
    try {
      const data = await apiRequest("/api/experience");
      if (Array.isArray(data) && data.length > 0) {
        setExperiences(data);
      } else {
        setExperiences(initialExperiencesFallback);
      }
    } catch {
      // Backend offline, fallback ke data lokal
      setExperiences(initialExperiencesFallback);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const filtered = experiences.filter((item) => {
    const matchType = typeFilter === "all" || item.type === typeFilter;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      (item.title || "").toLowerCase().includes(q) ||
      (item.company || "").toLowerCase().includes(q) ||
      (item.location || "").toLowerCase().includes(q);
    return matchType && matchSearch;
  });

  const handleOpenAdd = () => {
    setSelectedExp(null);
    setFormData({
      type: typeFilter !== "all" ? typeFilter : "work",
      title: "",
      titleEn: "",
      company: "",
      companyEn: "",
      location: "",
      locationEn: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
      descriptionEn: "",
      order: experiences.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setSelectedExp(item);
    setFormData({
      type: item.type || "work",
      title: item.title || "",
      titleEn: item.titleEn || "",
      company: item.company || "",
      companyEn: item.companyEn || "",
      location: item.location || "",
      locationEn: item.locationEn || "",
      startDate: item.startDate || "",
      endDate: item.endDate || "",
      isCurrent: Boolean(item.isCurrent),
      description: item.description || "",
      descriptionEn: item.descriptionEn || "",
      order: item.order ?? 1,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.company.trim() || !formData.startDate.trim()) {
      showToast("Judul Posisi, Perusahaan/Institusi, dan Tanggal Mulai wajib diisi!", "error");
      return;
    }

    setSaving(true);
    try {
      if (selectedExp) {
        // Edit Mode
        try {
          await apiRequest(`/api/experience/${selectedExp.id}`, {
            method: "PUT",
            body: JSON.stringify(formData),
          });
        } catch {
          // Fallback state update jika backend offline
        }
        setExperiences((prev) =>
          prev.map((it) => (it.id === selectedExp.id ? { ...it, ...formData } : it))
        );
        showToast("Pengalaman berhasil diperbarui", "success");
      } else {
        // Add Mode
        const newId = `exp-${Date.now()}`;
        const newObj = { ...formData, id: newId };
        try {
          const res = await apiRequest("/api/experience", {
            method: "POST",
            body: JSON.stringify(formData),
          });
          if (res && res.id) newObj.id = res.id;
        } catch {
          // Fallback state update jika backend offline
        }
        setExperiences((prev) => [newObj, ...prev]);
        showToast("Pengalaman baru berhasil ditambahkan", "success");
      }
      setIsModalOpen(false);
    } catch (err) {
      showToast("Gagal menyimpan data: " + err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedExp) return;
    try {
      try {
        await apiRequest(`/api/experience/${selectedExp.id}`, {
          method: "DELETE",
        });
      } catch {
        // Fallback state update jika backend offline
      }
      setExperiences((prev) => prev.filter((it) => it.id !== selectedExp.id));
      showToast("Pengalaman berhasil dihapus", "success");
      setIsDeleteOpen(false);
      setSelectedExp(null);
    } catch (err) {
      showToast("Gagal menghapus data: " + err.message, "error");
    }
  };

  const getTypeStyle = (type) => {
    switch (type) {
      case "work":
        return { label: "Pekerjaan", color: "#38bdf8", bg: "rgba(56, 189, 248, 0.15)" };
      case "education":
        return { label: "Pendidikan", color: "#34d399", bg: "rgba(52, 211, 153, 0.15)" };
      case "organization":
        return { label: "Organisasi", color: "#c084fc", bg: "rgba(192, 132, 252, 0.15)" };
      default:
        return { label: type, color: "#94a3b8", bg: "rgba(148, 163, 184, 0.15)" };
    }
  };

  return (
    <div className="adm-page">
      {/* ── Page Header ── */}
      <div className="adm-page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <i className="ri-briefcase-line" style={{ color: "#38bdf8" }} />
            Manajemen Pengalaman (Experience)
          </h1>
          <p style={{ color: "var(--adm-muted)", fontSize: "0.85rem", marginTop: "0.25rem" }}>
            Kelola riwayat pekerjaan, magang, pendidikan, dan peran organisasi yang tampil pada Experience Drawer publik.
          </p>
        </div>

        <button
          type="button"
          className="adm-btn adm-btn-primary"
          onClick={handleOpenAdd}
        >
          <i className="ri-add-line" />
          <span>Tambah Pengalaman</span>
        </button>
      </div>

      {/* ── Filter & Search Bar ── */}
      <div className="adm-card" style={{ marginBottom: "1.5rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", padding: "1rem 1.25rem" }}>
        {/* Type Filter Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {[
            { id: "all", label: "Semua" },
            { id: "work", label: "Pekerjaan" },
            { id: "education", label: "Pendidikan" },
            { id: "organization", label: "Organisasi" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setTypeFilter(tab.id)}
              className={`adm-btn ${typeFilter === tab.id ? "adm-btn-primary" : "adm-btn-secondary"}`}
              style={{ padding: "0.35rem 0.85rem", fontSize: "0.8rem", borderRadius: "9999px" }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div style={{ position: "relative", minWidth: 260 }}>
          <i className="ri-search-line" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--adm-muted)" }} />
          <input
            type="text"
            className="adm-input"
            placeholder="Cari posisi atau institusi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: "2.2rem", width: "100%" }}
          />
        </div>
      </div>

      {/* ── Table List ── */}
      <div className="adm-card" style={{ padding: 0, overflow: "hidden" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "var(--adm-muted)" }}>
            <i className="ri-loader-4-line" style={{ fontSize: "2rem", display: "inline-block", animation: "spin 1s linear infinite" }} />
            <p style={{ marginTop: "0.5rem" }}>Memuat data pengalaman...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "var(--adm-muted)" }}>
            <i className="ri-inbox-line" style={{ fontSize: "2.5rem" }} />
            <p style={{ marginTop: "0.5rem" }}>Tidak ada data pengalaman ditemukan.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="adm-table" style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--adm-border)", background: "rgba(255, 255, 255, 0.02)" }}>
                  <th style={{ padding: "1rem" }}>Tipe</th>
                  <th style={{ padding: "1rem" }}>Posisi / Gelar</th>
                  <th style={{ padding: "1rem" }}>Perusahaan / Institusi</th>
                  <th style={{ padding: "1rem" }}>Periode</th>
                  <th style={{ padding: "1rem" }}>Lokasi</th>
                  <th style={{ padding: "1rem", textAlign: "right" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => {
                  const typeStyle = getTypeStyle(item.type);
                  return (
                    <tr
                      key={item.id}
                      style={{ borderBottom: "1px solid var(--adm-border)", transition: "background 0.2s" }}
                    >
                      <td style={{ padding: "1rem" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "0.2rem 0.6rem",
                            borderRadius: "6px",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            background: typeStyle.bg,
                            color: typeStyle.color,
                          }}
                        >
                          {typeStyle.label}
                        </span>
                      </td>
                      <td style={{ padding: "1rem", fontWeight: 600, color: "#fff" }}>
                        {item.title}
                      </td>
                      <td style={{ padding: "1rem", color: "#93c5fd" }}>
                        {item.company}
                      </td>
                      <td style={{ padding: "1rem", color: "var(--adm-muted)", fontSize: "0.85rem" }}>
                        {item.startDate} – {item.isCurrent ? "Sekarang" : item.endDate}
                      </td>
                      <td style={{ padding: "1rem", color: "var(--adm-muted)", fontSize: "0.85rem" }}>
                        {item.location || "-"}
                      </td>
                      <td style={{ padding: "1rem", textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                          <button
                            type="button"
                            className="adm-btn adm-btn-secondary"
                            onClick={() => handleOpenEdit(item)}
                            title="Edit"
                            style={{ padding: "0.35rem 0.6rem" }}
                          >
                            <i className="ri-edit-line" />
                          </button>
                          <button
                            type="button"
                            className="adm-btn adm-btn-danger"
                            onClick={() => {
                              setSelectedExp(item);
                              setIsDeleteOpen(true);
                            }}
                            title="Hapus"
                            style={{ padding: "0.35rem 0.6rem" }}
                          >
                            <i className="ri-delete-bin-line" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Modal Tambah / Edit Pengalaman ── */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedExp ? "Edit Pengalaman" : "Tambah Pengalaman Baru"}
      >
        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {/* Tipe */}
            <div className="adm-form-group">
              <label style={{ display: "block", fontSize: "0.8rem", color: "var(--adm-muted)", marginBottom: "0.35rem" }}>
                Tipe Pengalaman <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <select
                className="adm-input"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
              >
                <option value="work">Pekerjaan / Magang (Work)</option>
                <option value="education">Pendidikan (Education)</option>
                <option value="organization">Organisasi (Organization)</option>
              </select>
            </div>

            {/* Urutan */}
            <div className="adm-form-group">
              <label style={{ display: "block", fontSize: "0.8rem", color: "var(--adm-muted)", marginBottom: "0.35rem" }}>
                Urutan Tampil (Order)
              </label>
              <input
                type="number"
                className="adm-input"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
              />
            </div>
          </div>

          {/* Posisi / Jabatan */}
          <div className="adm-form-group">
            <label style={{ display: "block", fontSize: "0.8rem", color: "var(--adm-muted)", marginBottom: "0.35rem" }}>
              Posisi / Jabatan / Gelar <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              type="text"
              className="adm-input"
              placeholder="Contoh: Frontend Developer / D4 Rekayasa Perangkat Lunak"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          {/* Nama Perusahaan / Institusi */}
          <div className="adm-form-group">
            <label style={{ display: "block", fontSize: "0.8rem", color: "var(--adm-muted)", marginBottom: "0.35rem" }}>
              Nama Perusahaan / Institusi <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              type="text"
              className="adm-input"
              placeholder="Contoh: PT Citiasia Internasional / Politeknik Negeri Bengkalis"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
            />
          </div>

          {/* Lokasi */}
          <div className="adm-form-group">
            <label style={{ display: "block", fontSize: "0.8rem", color: "var(--adm-muted)", marginBottom: "0.35rem" }}>
              Lokasi
            </label>
            <input
              type="text"
              className="adm-input"
              placeholder="Contoh: Jakarta, Indonesia (Onsite) / Bengkalis, Riau"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          {/* Tanggal Mulai & Selesai */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="adm-form-group">
              <label style={{ display: "block", fontSize: "0.8rem", color: "var(--adm-muted)", marginBottom: "0.35rem" }}>
                Tanggal Mulai <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="text"
                className="adm-input"
                placeholder="Contoh: Agu 2025"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>

            <div className="adm-form-group">
              <label style={{ display: "block", fontSize: "0.8rem", color: "var(--adm-muted)", marginBottom: "0.35rem" }}>
                Tanggal Selesai
              </label>
              <input
                type="text"
                className="adm-input"
                placeholder="Contoh: Des 2025"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                disabled={formData.isCurrent}
              />
            </div>
          </div>

          {/* Checkbox Present */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              type="checkbox"
              id="isCurrentExp"
              checked={formData.isCurrent}
              onChange={(e) => setFormData({ ...formData, isCurrent: e.target.checked })}
              style={{ cursor: "pointer", width: 16, height: 16 }}
            />
            <label htmlFor="isCurrentExp" style={{ fontSize: "0.85rem", color: "#f8fafc", cursor: "pointer" }}>
              Masih berjalan hingga saat ini (Present / Sekarang)
            </label>
          </div>

          {/* Deskripsi & Task */}
          <div className="adm-form-group">
            <label style={{ display: "block", fontSize: "0.8rem", color: "var(--adm-muted)", marginBottom: "0.35rem" }}>
              Penjelasan Jobdesk & Task / Capaian (Bahasa Indonesia)
            </label>
            <textarea
              className="adm-input"
              rows={4}
              placeholder="Tuliskan tugas, tanggung jawab, dan hasil kerja (gunakan tanda • atau bullet points)..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* ── Bagian Terjemahan Bahasa Inggris (Opsional) ── */}
          <div style={{ marginTop: "0.5rem", padding: "1rem", borderRadius: "8px", border: "1px solid rgba(56, 189, 248, 0.25)", background: "rgba(56, 189, 248, 0.04)" }}>
            <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#38bdf8", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <i className="ri-global-line" />
              Terjemahan Bahasa Inggris (English Translation - Opsional)
            </h4>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <div className="adm-form-group">
                <label style={{ display: "block", fontSize: "0.75rem", color: "var(--adm-muted)", marginBottom: "0.25rem" }}>
                  Position / Title (EN)
                </label>
                <input
                  type="text"
                  className="adm-input"
                  placeholder="e.g. Fullstack Developer – Frontend Focused"
                  value={formData.titleEn || ""}
                  onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                />
              </div>

              <div className="adm-form-group">
                <label style={{ display: "block", fontSize: "0.75rem", color: "var(--adm-muted)", marginBottom: "0.25rem" }}>
                  Company / Institution (EN)
                </label>
                <input
                  type="text"
                  className="adm-input"
                  placeholder="e.g. Bengkalis State Polytechnic"
                  value={formData.companyEn || ""}
                  onChange={(e) => setFormData({ ...formData, companyEn: e.target.value })}
                />
              </div>
            </div>

            <div className="adm-form-group" style={{ marginBottom: "0.75rem" }}>
              <label style={{ display: "block", fontSize: "0.75rem", color: "var(--adm-muted)", marginBottom: "0.25rem" }}>
                Location (EN)
              </label>
              <input
                type="text"
                className="adm-input"
                placeholder="e.g. Jakarta, Indonesia (Onsite / Impactful Internship)"
                value={formData.locationEn || ""}
                onChange={(e) => setFormData({ ...formData, locationEn: e.target.value })}
              />
            </div>

            <div className="adm-form-group">
              <label style={{ display: "block", fontSize: "0.75rem", color: "var(--adm-muted)", marginBottom: "0.25rem" }}>
                Jobdesk / Accomplishments Description (EN)
              </label>
              <textarea
                className="adm-input"
                rows={3}
                placeholder="Write bullet points or tasks in English..."
                value={formData.descriptionEn || ""}
                onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
              />
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
            <button
              type="button"
              className="adm-btn adm-btn-secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Batal
            </button>
            <button
              type="submit"
              className="adm-btn adm-btn-primary"
              disabled={saving}
            >
              {saving ? "Menyimpan..." : "Simpan Data"}
            </button>
          </div>
        </form>
      </Modal>

      {/* ── Modal Konfirmasi Hapus ── */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Hapus Pengalaman"
        message={`Apakah Anda yakin ingin menghapus "${selectedExp?.title} - ${selectedExp?.company}"? Tindakan ini tidak dapat dibatalkan.`}
      />
    </div>
  );
}
