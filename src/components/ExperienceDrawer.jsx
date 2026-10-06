import { useState, useEffect } from "react";
import { useApi } from "../hooks/useApi";
import { useLanguage } from "../context/LanguageContext";

// Data fallback riwayat asli jika server backend offline
const fallbackExperiences = [
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

export default function ExperienceDrawer({ isOpen, onClose }) {
  const { lang, t, translateExperience } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");
  const { data: apiExperiences } = useApi("/api/experience", fallbackExperiences, isOpen);

  const rawExperiences = (apiExperiences && apiExperiences.length > 0)
    ? apiExperiences
    : fallbackExperiences;

  const experiences = rawExperiences.map((exp) => translateExperience(exp));

  // ── SKRIP BODY SCROLL LOCK BERSIH & PRESISI ──
  // Mencegah layout shift (halaman meloncat) saat scrollbar disembunyikan
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Tangani penutupan via tombol Escape
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const filtered = experiences.filter((exp) => {
    if (activeTab === "all") return true;
    return exp.type === activeTab;
  });

  // Badge tema solid & profesional
  const getTypeBadge = (type) => {
    switch (type) {
      case "work":
        return {
          label: t("experience.workBadge", lang === "en" ? "Work Experience" : "Pekerjaan"),
          bg: "#f1f5f9",
          color: "#0f172a",
          border: "#cbd5e1",
          icon: "ri-briefcase-line",
        };
      case "education":
        return {
          label: t("experience.educationBadge", lang === "en" ? "Education" : "Pendidikan"),
          bg: "#ecfdf5",
          color: "#065f46",
          border: "#a7f3d0",
          icon: "ri-graduation-cap-line",
        };
      case "organization":
        return {
          label: t("experience.organizationBadge", lang === "en" ? "Organization" : "Organisasi"),
          bg: "#faf5ff",
          color: "#6b21a8",
          border: "#e9d5ff",
          icon: "ri-team-line",
        };
      default:
        return {
          label: type,
          bg: "#f8fafc",
          color: "#334155",
          border: "#e2e8f0",
          icon: "ri-bookmark-line",
        };
    }
  };

  return (
    <>
      {/* ── 1. Backdrop Gelap & Non-scrollable (Klik di luar untuk menutup) ── */}
      <div
        className={`fixed inset-0 z-[99998] transition-opacity duration-200 ease-out touch-none ${
          isOpen
            ? "opacity-100 pointer-events-auto bg-slate-900/50 backdrop-blur-xs"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        onTouchMove={(e) => e.preventDefault()}
        aria-hidden="true"
      />

      {/* ── 2. Sliding Drawer Panel (Minimalis & Solid White) ── */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t("experience.ariaLabel", lang === "en" ? "Experience Timeline" : "Linimasa Pengalaman")}
        className={`fixed inset-y-0 left-0 z-[99999] h-full max-h-screen w-full sm:w-[85vw] md:w-[75vw] lg:w-[65vw] max-w-4xl bg-white border-r border-slate-200 shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          boxShadow: isOpen ? "0 20px 40px rgba(15, 23, 42, 0.18)" : "none",
        }}
      >
        {/* ── Header Drawer (Fixed / Non-scrollable) ── */}
        <div className="shrink-0 px-6 py-5 border-b border-slate-200 bg-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                <i className="ri-history-line" /> {t("experience.badge", lang === "en" ? "Career Path" : "Rekam Jejak")}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <i className="ri-briefcase-4-line text-blue-600" />
              {t("experience.title", lang === "en" ? "Experience & Education" : "Pengalaman & Riwayat Karier")}
            </h2>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              {t("experience.subtitle", lang === "en"
                ? "Documented work history, academic milestones, and organizational leadership."
                : "Dokumentasi riwayat pekerjaan, jenjang pendidikan, serta kepemimpinan organisasi.")}
            </p>
          </div>

          {/* Tombol Tutup Minimalis */}
          <button
            type="button"
            onClick={onClose}
            aria-label={t("experience.closeAria", lang === "en" ? "Close panel" : "Tutup panel")}
            className="w-9 h-9 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <i className="ri-close-line text-xl" />
          </button>
        </div>

        {/* ── Filter Tabs Bar (Fixed / Non-scrollable) ── */}
        <div className="shrink-0 px-6 py-3 border-b border-slate-100 bg-slate-50/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { key: "all", label: t("experience.all", lang === "en" ? "All Experience" : "Semua") },
            { key: "work", label: t("experience.work", lang === "en" ? "Work" : "Pekerjaan"), icon: "ri-briefcase-line" },
            { key: "education", label: t("experience.education", lang === "en" ? "Education" : "Pendidikan"), icon: "ri-graduation-cap-line" },
            { key: "organization", label: t("experience.organization", lang === "en" ? "Organization" : "Organisasi"), icon: "ri-team-line" },
          ].map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? "bg-slate-900 text-white border border-slate-900 shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {tab.icon && <i className={tab.icon} />}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ── Area Konten Timeline (KHUSUS AREA INI YANG DI-SCROLL) ── */}
        <div
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 py-6 space-y-6"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <i className="ri-inbox-line text-4xl mb-2 block text-slate-300" />
              <p className="text-sm font-medium">
                {t("experience.empty", lang === "en" ? "No experience data available." : "Belum ada data pada kategori ini.")}
              </p>
            </div>
          ) : (
            <div className="relative border-l border-slate-200 ml-2 md:ml-3 pl-6 md:pl-7 space-y-8">
              {filtered.map((item, index) => {
                const badge = getTypeBadge(item.type);
                return (
                  <div key={item.id || index} className="relative">
                    {/* Minimalist Solid Node Dot */}
                    <div
                      className="absolute -left-[31px] md:-left-[35px] top-4 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-white border border-blue-700 shadow-xs"
                      aria-hidden="true"
                    />

                    {/* Timeline Item Card (Solid & Clean) */}
                    <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs hover:border-slate-300 transition-colors">
                      {/* Top Bar: Badge + Period */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                        <span
                          className="px-2.5 py-0.5 rounded text-xs font-semibold border flex items-center gap-1.5"
                          style={{
                            background: badge.bg,
                            color: badge.color,
                            borderColor: badge.border,
                          }}
                        >
                          <i className={badge.icon} />
                          {badge.label}
                        </span>

                        <div className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-50 px-2.5 py-0.5 rounded border border-slate-200">
                          <i className="ri-calendar-line text-slate-400" />
                          <span>
                            {item.startDate} – {item.isCurrent ? t("experience.present", lang === "en" ? "Present" : "Sekarang") : item.endDate}
                          </span>
                        </div>
                      </div>

                      {/* Position / Title */}
                      <h3 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">
                        {item.title}
                      </h3>

                      {/* Company & Location */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs md:text-sm text-slate-600 mt-1 mb-3">
                        <span className="font-semibold text-slate-800 flex items-center gap-1">
                          <i className="ri-building-line text-slate-400" />
                          {item.company}
                        </span>
                        {item.location && (
                          <span className="text-slate-500 flex items-center gap-1">
                            <i className="ri-map-pin-line text-slate-400" />
                            {item.location}
                          </span>
                        )}
                      </div>

                      {/* Jobdesk & Tasks Description */}
                      <div className="text-xs md:text-sm text-slate-600 leading-relaxed pt-3 border-t border-slate-100 whitespace-pre-line">
                        {item.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Footer Drawer (Fixed / Non-scrollable) ── */}
        <div className="shrink-0 px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>
            {filtered.length} {t("experience.recordsCount", lang === "en" ? "records listed" : "data pengalaman")}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-md border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-semibold transition-colors"
          >
            {t("experience.close", lang === "en" ? "Close" : "Tutup")}
          </button>
        </div>
      </aside>
    </>
  );
}
