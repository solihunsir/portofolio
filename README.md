# 🌟 Portofolio & CMS M. Sholihun

Selamat datang di repositori proyek **Portofolio & Content Management System (CMS)** pribadi **Muhammad Sholihun** (Software Engineer & Fullstack Developer).

Website ini dibangun menggunakan arsitektur modern berbasis **React 19**, **Vite**, dan **Tailwind CSS v4**. Selain menyajikan tampilan portofolio publik yang interaktif dengan animasi mutakhir dan asisten AI, proyek ini juga dilengkapi dengan **Secret Admin Dashboard** untuk mengelola seluruh konten secara dinamis melalui REST API (dengan fallback otomatis ke data lokal jika server backend tidak aktif).

---

## 📌 Daftar Isi
1. [URL & Akses Cepat](#-url--akses-cepat)
2. [Fitur Utama](#-fitur-utama)
3. [Arsitektur & Alur Data](#-arsitektur--alur-data)
4. [Pohon Direktori Proyek](#-pohon-direktori-proyek)
5. [Pengenalan Lengkap Setiap File & Fungsinya](#-pengenalan-lengkap-setiap-file--fungsinya)
   - [File Konfigurasi Root](#1-file-konfigurasi-root)
   - [Aset Publik (`public/`)](#2-aset-publik-public)
   - [File Inti Aplikasi (`src/`)](#3-file-inti-aplikasi-src)
   - [Manajemen Bahasa & State (`src/context/`)](#4-manajemen-bahasa--state-srccontext)
   - [Koneksi API & Hook (`src/config/` & `src/hooks/`)](#5-koneksi-api--hook-srcconfig--srchooks)
   - [Knowledge Base & Data Fallback (`src/data/` & `src/data.js`)](#6-knowledge-base--data-fallback-srcdata--srcdatajs)
   - [Halaman Publik (`src/pages/`)](#7-halaman-publik-srcpages)
   - [Komponen Antarmuka Publik (`src/components/`)](#8-komponen-antarmuka-publik-srccomponents)
   - [Dashboard Admin CMS (`src/admin/`)](#9-dashboard-admin-cms-srcadmin)
6. [Variabel Lingkungan (`.env`)](#-variabel-lingkungan-env)
7. [Panduan Instalasi & Menjalankan Proyek](#-panduan-instalasi--menjalankan-proyek)

---

## 🔗 URL & Akses Cepat

| Halaman / Layanan | URL Lokal Default | Keterangan |
| :--- | :--- | :--- |
| **Portofolio Publik** | `http://localhost:5173/` | Tampilan utama pengunjung web portofolio |
| **Admin Dashboard** | `http://localhost:5173/x-admin-7f3a9b` | Panel kontrol rahasia (tanpa login form terpisah) |
| **Backend API (Opsional)** | `http://localhost:3001/api` | Server REST API untuk menyimpan data dinamis |

---

## ✨ Fitur Utama

- 🌐 **Dukungan Multi-Bahasa (i18n)**: Beralih instan antara **Bahasa Indonesia (ID)** dan **Bahasa Inggris (EN)** di seluruh section halaman.
- 🤖 **Interactive AI Assistant (AIChat)**: Chatbot interaktif bertenaga Groq AI yang memahami seluruh riwayat biodata, keahlian, dan prestasi pemilik portofolio.
- 🎙️ **Voice Assistant Interaktif**: Asisten suara berbasis Web Speech API (Speech Recognition + Speech Synthesis) yang terintegrasi dengan kecerdasan AI.
- 🎨 **Visual & Animasi Mutakhir**:
  - *Tools Floating Animation*: Ikon tools/teknologi melayang dinamis dengan `framer-motion`.
  - *Fluid Mesh Gradient Orbs*: Efek blur gradien modern pada section Hero.
  - *AOS & Animate.css*: Efek scroll reveal halus pada setiap elemen card dan teks.
- 🖼️ **Image Lightbox Modal**: Pratinjau gambar proyek dan sertifikat penghargaan dalam resolusi tinggi dan fullscreen.
- 🔒 **Secret Admin CMS Dashboard**:
  - Tinjauan metrik statistik (proyek, keahlian, sertifikasi, pesan masuk).
  - Manajemen Hero, Profil Tentang Saya, dan Counter Statistik.
  - CRUD (Create, Read, Update, Delete) Data Proyek & Agenda/Sertifikat.
  - CRUD Daftar Keahlian (Skills) & Tautan Sosial Media.
  - Kotak Masuk Pesan (Inbox) dari pengunjung dengan opsi tandai baca, balas via email, atau hapus.
- 🛡️ **Zero-Crash Resilient Architecture (Auto-Fallback)**: Jika backend API tidak aktif, aplikasi otomatis beralih ke data lokal bawaan (`data.js` & FormSubmit) tanpa membuat website blank atau error.

---

## 🏗️ Arsitektur & Alur Data

```
+-------------------------------------------------------------------------+
|                              USER BROWSER                               |
+--------------------+----------------------------------------------------+
                     |
         +-----------v-----------+
         |  src/App.jsx (Router) |
         +-----+-----------+-----+
               |           |
     Path: "/" |           | Path: "/x-admin-7f3a9b/*"
               |           |
+--------------v-------+   +-----------------v---------------+
|   PortfolioHome      |   |            AdminApp             |
| (Halaman Publik Web) |   |    (Panel Kontrol Admin CMS)    |
+--------------+-------+   +-----------------+---------------+
               |                             |
               +--------------+--------------+
                              |
               +--------------v--------------+
               |  useApi Hook / apiRequest   |
               +--------------+--------------+
                              |
              +---------------+---------------+
              |                               |
    [ Backend API Online ]         [ Backend Offline ]
              |                               |
              v                               v
       Database Server               Static Fallback Data
     (http://localhost:3001)        (src/data.js & profileData.js)
```

---

## 📂 Pohon Direktori Proyek

```
portofolio/
├── .env                         # Konfigurasi API keys & URL backend
├── .gitignore                   # File & folder yang diabaikan git
├── eslint.config.js             # Aturan linter ESLint
├── index.html                   # File HTML utama (entry point browser)
├── package.json                 # Manifest dependensi & scripts NPM
├── package-lock.json            # Lockfile dependensi
├── vite.config.js               # Konfigurasi Vite & Tailwind CSS
├── README.md                    # Dokumentasi lengkap proyek
├── public/                      # Aset statis yang dapat diakses langsung
│   ├── vite.svg
│   └── assets/
│       ├── conixx.jpg           # Foto profil utama
│       ├── hero-img.webp        # Foto profil alternatif
│       ├── favicon.ico          # Ikon tab browser
│       ├── agenda/              # Gambar sertifikat & dokumentasi prestasi
│       ├── proyek/              # Screenshot tangkapan layar proyek
│       └── tools/               # Logo ikon teknologi & tools
└── src/                         # Seluruh kode sumber aplikasi React
    ├── main.jsx                 # Bootstrapper React & inisialisasi library
    ├── App.jsx                  # Routing utama (Publik & Admin)
    ├── index.css                # Styling global, font, utility & mesh animations
    ├── data.js                  # Data cadangan (fallback) proyek, agenda, tools
    ├── config/
    │   └── api.js               # Konfigurasi base URL, helper fetch, & URL asset resolver
    ├── context/
    │   └── LanguageContext.jsx  # State bahasa global (ID/EN) & kamus terjemahan
    ├── data/
    │   └── profileData.js       # Knowledge base lengkap profil Sholihun untuk AI
    ├── hooks/
    │   └── useApi.js            # Custom hook fetch data API dengan auto-fallback
    ├── pages/
    │   └── PortfolioHome.jsx    # Halaman utama portofolio publik
    ├── components/              # Komponen antarmuka portofolio publik
    │   ├── Navbar.jsx           # Navigasi atas + menu mobile + switch bahasa
    │   ├── Hero.jsx             # Banner perkenalan, CTA CV, & statistik singkat
    │   ├── About.jsx            # Narasi biografi diri & kartu ketersediaan kerja
    │   ├── Skills.jsx           # Grid kartu keahlian & teknologi
    │   ├── Projects.jsx         # Galeri proyek dengan tag tools & link demo/repo
    │   ├── Agenda.jsx           # Kartu sertifikasi, kejuaraan, & riwayat kegiatan
    │   ├── Contact.jsx          # Formulir pesan kontak & link akun media sosial
    │   ├── AIChat.jsx           # Floating chatbot AI berbasis Groq API
    │   ├── VoiceAssistant.jsx   # Asisten suara dua arah (STT & TTS) + Groq AI
    │   ├── ToolsAnimation.jsx   # Animasi ikon tools melayang (Framer Motion)
    │   ├── LanguageSwitcher.jsx # Tombol pill toggle bahasa ID / EN
    │   ├── ImageLightbox.jsx    # Modal popup pratinjau gambar resolusi penuh
    │   ├── PreLoader.jsx        # Layar loading spinner saat web pertama dimuat
    │   ├── ScrollToTop.jsx      # Tombol melayang untuk kembali ke atas halaman
    │   └── Footer.jsx           # Bagian kaki halaman web & copyright
    └── admin/                   # Modul Secret Admin Dashboard
        ├── AdminApp.jsx         # Router & kerangka layout utama admin
        ├── admin.css            # Styling khusus panel admin (dark/glassmorphism)
        ├── components/          # Komponen pendukung antarmuka admin
        │   ├── Sidebar.jsx      # Menu navigasi samping modul admin
        │   ├── TopBar.jsx       # Bar atas judul tab & tombol refresh
        │   ├── Modal.jsx        # Dialog popup generik form CRUD
        │   ├── ConfirmModal.jsx # Dialog konfirmasi aksi hapus
        │   ├── ImageUploader.jsx# Komponen unggah file gambar ke server
        │   └── Toast.jsx        # Sistem notifikasi alert melayang (success/error)
        └── pages/               # Halaman modul manajemen konten admin
            ├── Overview.jsx     # Dashboard statistik ringkasan & pesan terbaru
            ├── HeroManager.jsx  # Kelola teks hero banner & foto profil
            ├── AboutManager.jsx # Kelola teks tentang saya & ketersediaan kerja
            ├── StatisticsManager.jsx # Kelola counter angka statistik
            ├── SkillsManager.jsx     # CRUD data keahlian & tools
            ├── ProjectsManager.jsx   # CRUD data portofolio proyek
            ├── AgendaManager.jsx     # CRUD sertifikasi & agenda prestasi
            ├── SocialLinksManager.jsx# Kelola tautan media sosial
            └── MessagesInbox.jsx     # Kotak masuk pesan & pengelolaan kontak
```

---

## 📖 Pengenalan Lengkap Setiap File & Fungsinya

Berikut rincian mendalam mengenai fungsi, letak, dan fitur yang ditangani oleh setiap file di dalam proyek:

### 1. File Konfigurasi Root

| File | Letak | Fungsi & Fitur yang Ditangani |
| :--- | :--- | :--- |
| `index.html` | `/index.html` | Titik masuk utama HTML yang dimuat oleh browser. Berisi meta tag SEO, judul website (*Sholihun*), favicon, tautan font Google Fonts (*Nunito, Manrope, Quicksand, Roboto Flex*), serta tag container `<div id="root"></div>`. |
| `package.json` | `/package.json` | Konfigurasi proyek Node.js. Mendefinisikan metadata, script eksekusi (`dev`, `build`, `lint`, `preview`), serta daftar library eksternal (React 19, Tailwind CSS v4, Framer Motion, Remix Icon, AOS, Groq AI, dll). |
| `vite.config.js` | `/vite.config.js` | Berkas konfigurasi bundler Vite. Memasang plugin `@vitejs/plugin-react` untuk kompilasi JSX cepat (Fast Refresh) dan `@tailwindcss/vite` untuk engine Tailwind CSS versi 4. |
| `eslint.config.js` | `/eslint.config.js` | Konfigurasi linter kode JavaScript/React untuk menjaga standar penulisan kode, kerapian sintaks, serta deteksi aturan React Hooks. |
| `.env` | `/.env` | Berkas penyimpan variabel rahasia environment, meliputi API Key Groq AI (`VITE_GROQ_API_KEY`), nama model AI (`VITE_GROQ_MODEL_NAME`), Gemini key, dan URL backend server. |
| `.gitignore` | `/.gitignore` | Mencegah file cache, environment, build output (`dist/`), dan folder library (`node_modules/`) terunggah ke repositori Git. |

---

### 2. Aset Publik (`public/`)

File dalam direktori ini dilayani secara statis dan dapat diakses langsung oleh browser via path `/assets/...`.

| File / Folder | Letak | Fungsi & Fitur yang Ditangani |
| :--- | :--- | :--- |
| `public/assets/conixx.jpg` | `/public/assets/` | Foto profil personal Muhammad Sholihun yang digunakan pada Hero banner dan section Tentang Saya. |
| `public/assets/hero-img.webp` | `/public/assets/` | Foto profil alternatif berformat WebP dengan kompresi optimal. |
| `public/assets/favicon.ico` | `/public/assets/` | Ikon favicon yang tampil di tab browser. |
| `public/assets/proyek/` | `/public/assets/proyek/` | Folder kumpulan gambar screenshot dari proyek-proyek yang dipajang di portofolio (`proyek1.png` s.d. `proyek7.png`). |
| `public/assets/agenda/` | `/public/assets/agenda/` | Folder gambar piagam, sertifikat kompetisi, dan foto dokumentasi kegiatan/prestasi (`agenda1.png` s.d. `agenda9.png`). |
| `public/assets/tools/` | `/public/assets/tools/` | Kumpulan logo teknologi PNG transparan (VS Code, React, Flutter, Tailwind, Node.js, Python, MySQL, Git, Figma, dll) untuk kartu keahlian dan animasi melayang. |

---

### 3. File Inti Aplikasi (`src/`)

| File | Letak | Fungsi & Fitur yang Ditangani |
| :--- | :--- | :--- |
| `main.jsx` | `/src/main.jsx` | **Entry Point React**. Menginisialisasi rendering React DOM ke elemen `#root`. Di sini juga dilakukan import file CSS global (`index.css`), icon font (`remixicon.css`), animasi CSS (`animate.css`), inisialisasi AOS (*Animate On Scroll*), dan menampilkan komponen `PreLoader`. |
| `App.jsx` | `/src/App.jsx` | **Manajer Routing Aplikasi**. Menggunakan `react-router-dom` untuk menentukan halaman berdasarkan URL: rute `/` menampilkan `PortfolioHome`, rute `/x-admin-7f3a9b/*` membuka dashboard `AdminApp`, serta mengarahkan rute tak dikenal kembali ke home (`Navigate to="/"`). Seluruh aplikasi dibungkus oleh `LanguageProvider`. |
| `index.css` | `/src/index.css` | **Pusat Gaya & Desain**. Berisi konfigurasi Tailwind v4, variabel warna tema (Navy Blue, Royal Blue, Slate, dll), efek glassmorphism, fluid mesh gradient orbs, animasi pulse/float, serta styling kartu portofolio. |
| `data.js` | `/src/data.js` | **Data Cadangan Statis (Static Fallback)**. Berisi daftar bawaan `listTools`, `listProyek`, dan `listAgenda`. Data ini otomatis digunakan oleh website publik apabila server backend sedang tidak aktif/belum dinyalakan, memastikan website selalu tampil prima. |

---

### 4. Manajemen Bahasa & State (`src/context/`)

| File | Letak | Fungsi & Fitur yang Ditangani |
| :--- | :--- | :--- |
| `LanguageContext.jsx` | `/src/context/` | **Sistem Dwibahasa Global (i18n)**. Mengelola state bahasa aktif (`'id'` untuk Indonesia, `'en'` untuk Inggris). Menyimpan kamus kosakata terjemahan lengkap untuk seluruh bagian website (Nav, Hero, About, Skills, Projects, Agenda, Contact, AI Chat). Menyediakan custom hook `useLanguage()` serta fungsi helper seperti `t()`, `translateHero()`, `translateProject()`, dan `translateAgenda()`. |

---

### 5. Koneksi API & Hook (`src/config/` & `src/hooks/`)

| File | Letak | Fungsi & Fitur yang Ditangani |
| :--- | :--- | :--- |
| `api.js` | `/src/config/api.js` | **Konfigurasi HTTP Client**. Menyediakan variabel `API_BASE_URL` (default `http://localhost:3001`), fungsi `apiRequest(endpoint, options)` untuk request HTTP otomatis dengan penanganan JSON/FormData & pesan error, serta fungsi `resolveAssetUrl(path)` yang mengubah path gambar lokal maupun remote backend menjadi URL yang valid. |
| `useApi.js` | `/src/hooks/useApi.js` | **Custom React Hook Fetcher**. Mempermudah pengambilan data dari REST API backend. Hook ini memiliki fitur cerdas: menerima `fallbackData`. Apabila backend mati atau request gagal, hook tidak membuat aplikasi error, melainkan mengembalikan data fallback bawaan secara transparan. |

---

### 6. Knowledge Base & Data Fallback (`src/data/` & `src/data.js`)

| File | Letak | Fungsi & Fitur yang Ditangani |
| :--- | :--- | :--- |
| `profileData.js` | `/src/data/profileData.js` | **Basis Pengetahuan AI (AI Knowledge Base)**. Berisi data naratif komprehensif tentang Muhammad Sholihun: biodata, daerah asal Bengkalis, latar belakang keluarga, pendidikan di Polbeng, kelebihan & kelemahan, daftar proyek mendalam, sertifikasi, serta rencana studi beasiswa LPDP. Teks ini disuntikkan ke dalam *system prompt* Chatbot AI dan Voice Assistant agar AI dapat menjawab pertanyaan pengunjung secara akurat dan personal. |

---

### 7. Halaman Publik (`src/pages/`)

| File | Letak | Fungsi & Fitur yang Ditangani |
| :--- | :--- | :--- |
| `PortfolioHome.jsx` | `/src/pages/PortfolioHome.jsx` | **Komposisi Halaman Utama Portofolio**. Menyusun seluruh section publik secara terstruktur: `ToolsAnimation` (latar animasi), `Navbar`, `Hero`, `About`, `Skills`, `Projects`, `Agenda`, `Contact`, `AIChat`, `Footer`, `ScrollToTop`, dan `VoiceAssistant`. Juga memastikan halaman selalu di-scroll ke posisi teratas saat pertama kali dibuka. |

---

### 8. Komponen Antarmuka Publik (`src/components/`)

Komponen-komponen berikut adalah blok pembangun visual pada halaman portofolio publik:

| File | Letak | Fungsi & Fitur yang Ditangani |
| :--- | :--- | :--- |
| `Navbar.jsx` | `/src/components/` | Bilah navigasi atas (sticky header). Berisi logo brand dengan tautan beranda, menu navigasi anchor link (`#tentang`, `#tools`, `#proyek`, `#agenda`, `#kontak`), tombol pengalih bahasa (`LanguageSwitcher`), tombol aksi Download CV, dan menu hamburger untuk tampilan mobile/smartphone. |
| `Hero.jsx` | `/src/components/` | Bagian pembuka paling atas (Hero section). Menampilkan greeting, headline nama, subheadline peran pekerjaan, deskripsi singkat, tombol CTA (*Download CV* & *Lihat Proyek*), kartu statistik pencapaian mengambang (*15+ Proyek, 3+ Tahun Pengalaman, dll*), foto profil berbingkai gradien, serta latar belakang fluid mesh gradient yang dinamis. |
| `About.jsx` | `/src/components/` | Bagian "Tentang Saya". Menampilkan biografi lengkap tentang perjalanan hidup dan dedikasi Sholihun, badge status kesiapan kerja (*Open to Work*), lokasi domisili Bengkalis, serta ringkasan kartu metrik pengalaman. |
| `Skills.jsx` | `/src/components/` | Bagian keahlian teknis. Menampilkan grid kartu berisi logo teknologi, nama alat (React, Flutter, Tailwind, Node.js, Python, dll), dan kategori perannya (Framework, Language, Database, Emulator). |
| `Projects.jsx` | `/src/components/` | Bagian showcase portofolio proyek. Menampilkan kartu-kartu proyek lengkap dengan thumbnail gambar, judul, deskripsi fitur, badge label teknologi yang digunakan, tombol link repository GitHub, tombol navigasi paginasi, serta integrasi klik gambar untuk membuka `ImageLightbox`. |
| `Agenda.jsx` | `/src/components/` | Bagian rekam jejak prestasi, kejuaraan, sertifikasi (Dicoding, DBS Foundation, Kampus Merdeka), dan agenda penting. Dilengkapi kartu visual yang jika diklik akan memperbesar foto sertifikat melalui modal lightbox. |
| `Contact.jsx` | `/src/components/` | Bagian hubungi saya. Menyediakan formulir pesan interaktif (Nama, Email, Pesan) dengan validasi dan status pengiriman. Pesan dikirim ke backend API; jika backend offline, otomatis menggunakan endpoint cadangan *FormSubmit.co*. Di sisi kiri terdapat daftar tautan akun media sosial (Email, GitHub, LinkedIn, Instagram). |
| `AIChat.jsx` | `/src/components/` | Widget obrolan AI melayang di pojok kanan bawah. Memanfaatkan Groq API dengan model cerdas yang responsif. Menggunakan konteks dari `profileData.js` sehingga pengunjung dapat berinteraksi dan bertanya apa saja mengenai profil, keahlian, dan ketersediaan kerja Sholihun. |
| `VoiceAssistant.jsx` | `/src/components/` | Asisten suara canggih. Menggunakan Web Speech API browser untuk mendengarkan suara pengguna melalui mikrofon (*Speech-to-Text*), mengirimkannya ke Groq AI, dan membacakan jawabannya kembali secara lisan (*Text-to-Speech*), lengkap dengan animasi visualizer gelombang suara. |
| `ToolsAnimation.jsx` | `/src/components/` | Komponen dekoratif latar belakang. Menggunakan `framer-motion` untuk menerbangkan ikon-ikon tools secara lembut dan diagonal dari atas ke bawah layar tanpa mengganggu interaksi mouse/klik pengunjung (`pointer-events: none`). |
| `LanguageSwitcher.jsx` | `/src/components/` | Komponen tombol toggle dwibahasa (ID / EN) berbentuk pill dengan efek kaca (glassmorphism) yang terhubung ke `LanguageContext`. |
| `ExperienceDrawer.jsx` | `/src/components/` | Panel geser (sliding drawer) elegan dari sisi kiri layar (80%-90% desktop, full mobile) menampilkan linimasa riwayat pengalaman kerja, magang, pendidikan, dan organisasi secara terstruktur. |
| `ImageLightbox.jsx` | `/src/components/` | Komponen modal popup gambar fullscreen menggunakan React Portal. Muncul ketika thumbnail proyek atau sertifikat agenda diklik, memungkinkan pengunjung melihat gambar dalam ukuran detail, lengkap dengan tombol tutup (Escape key / klik luar) dan tombol link menuju repository. |
| `PreLoader.jsx` | `/src/components/` | Animasi layar pemuatan awal (*loading screen*) dengan spinner melingkar dan logo portofolio yang muncul sesaat ketika halaman web dibuka pertama kali. |
| `ScrollToTop.jsx` | `/src/components/` | Tombol lingkaran biru melayang di kanan bawah layar yang muncul saat halaman digulir ke bawah, memudahkan pengunjung melompat kembali ke bagian teratas halaman dengan animasi halus. |
| `Footer.jsx` | `/src/components/` | Bagian kaki website paling bawah. Memuat teks hak cipta (*Copyright*), tautan cepat navigasi section, status ketersediaan kerja, dan quote penutup. |

---

### 9. Dashboard Admin CMS (`src/admin/`)

Dashboard admin dirancang khusus untuk pemilik website agar dapat memperbarui konten portofolio secara real-time tanpa perlu mengubah kode manual setiap kali ada data baru.

#### A. Komponen Pendukung Admin (`src/admin/components/`)
| File | Letak | Fungsi & Fitur yang Ditangani |
| :--- | :--- | :--- |
| `Sidebar.jsx` | `/src/admin/components/` | Bilah navigasi vertikal di sisi kiri admin. Memuat tautan ke semua modul (Overview, Hero, About, Statistik, Skills, Projects, Agenda, Media Sosial, Inbox Pesan), indikator badge merah pesan baru belum dibaca, dan tombol keluar/kembali ke portofolio publik. |
| `TopBar.jsx` | `/src/admin/components/` | Header atas dashboard admin. Menampilkan judul halaman modul yang sedang aktif, tombol toggle sidebar untuk mobile, status koneksi, serta tombol refresh data instan. |
| `Modal.jsx` | `/src/admin/components/` | Komponen pop-up serbaguna yang digunakan sebagai form modal saat menambah atau mengedit data proyek, skill, dan sertifikat agenda. |
| `ConfirmModal.jsx` | `/src/admin/components/` | Modal pop-up dialog konfirmasi keamanan sebelum melakukan penghapusan data penting (mencegah data terhapus tanpa sengaja). |
| `ImageUploader.jsx` | `/src/admin/components/` | Komponen drag-and-drop atau pilih berkas untuk mengunggah gambar baru langsung ke server backend `/api/upload`, lengkap dengan pratinjau thumbnail gambar. |
| `Toast.jsx` | `/src/admin/components/` | Konteks notifikasi pesan melayang (*toast notification*) untuk menampilkan pemberitahuan berhasil (*success*), gagal (*error*), atau peringatan saat admin melakukan operasi simpan/ubah/hapus data. |

#### B. Halaman Modul Admin (`src/admin/pages/`)
| File | Letak | Fungsi & Fitur yang Ditangani |
| :--- | :--- | :--- |
| `Overview.jsx` | `/src/admin/pages/` | **Halaman Beranda Admin**. Menampilkan ringkasan metrik analitik: total proyek, proyek unggulan (*featured*), jumlah keahlian terdaftar, total sertifikat/agenda, dan jumlah pesan masuk yang belum dibaca. Juga memuat pintasan cepat dan daftar 5 pesan kontak terbaru. |
| `HeroManager.jsx` | `/src/admin/pages/` | **Pengelola Bagian Hero**. Formulir untuk memperbarui nama, headline, subheadline peran, teks biografi pembuka, tautan unduh CV, dan tautan tombol aksi proyek. |
| `AboutManager.jsx` | `/src/admin/pages/` | **Pengelola Bagian Tentang Saya**. Formulir untuk mengedit narasi profil lengkap, lokasi domisili, dan status ketersediaan kerja (*Open to Work*). |
| `StatisticsManager.jsx` | `/src/admin/pages/` | **Pengelola Angka Statistik**. Formulir dinamis untuk menambah, mengubah, atau menghapus counter statistik yang tampil di bawah hero dan about (contoh: "15+ Proyek Selesai", "3+ Tahun Pengalaman"). |
| `SkillsManager.jsx` | `/src/admin/pages/` | **Pengelola Keahlian (Skills)**. Modul CRUD untuk menambah teknologi baru, memilih kategori (*Language, Framework, Database, dll*), mengunggah logo alat, dan mengubah deskripsi. |
| `ProjectsManager.jsx` | `/src/admin/pages/` | **Pengelola Proyek Portofolio**. Modul CRUD lengkap: menambah proyek baru, mengunggah screenshot, mengatur tag tools yang dipakai (React, Laravel, Flutter, dll), menuliskan ringkasan deskripsi, memasukkan link GitHub/website demo, serta toggle status *Featured*. |
| `ExperienceManager.jsx` | `/src/admin/pages/` | **Pengelola Pengalaman (Experience)**. Modul CRUD riwayat pengalaman: input Tipe (Pekerjaan/Pendidikan/Organisasi), Posisi/Gelar, Nama Perusahaan/Institusi, Lokasi, Tanggal Mulai & Selesai, status Present, dan deskripsi tugas/pencapaian. |
| `AgendaManager.jsx` | `/src/admin/pages/` | **Pengelola Agenda & Sertifikasi**. Modul CRUD untuk mendokumentasikan kejuaraan lomba, sertifikat pelatihan, dan kegiatan akademik beserta foto piagamnya. |
| `SocialLinksManager.jsx` | `/src/admin/pages/` | **Pengelola Tautan Sosial Media**. Mengatur link profil GitHub, LinkedIn, Instagram, alamat email, serta ikon yang sesuai untuk ditampilkan di bagian kontak dan footer. |
| `MessagesInbox.jsx` | `/src/admin/pages/` | **Kotak Masuk Pesan Pengunjung**. Membaca seluruh pesan yang dikirim pengunjung melalui formulir kontak web publik. Admin dapat melihat detail pengirim, waktu kirim, menandai pesan sudah/belum dibaca, membalas langsung melalui aplikasi email (*mailto:*), dan menghapus pesan. |

#### C. Styling & Core Admin
| File | Letak | Fungsi & Fitur yang Ditangani |
| :--- | :--- | :--- |
| `AdminApp.jsx` | `/src/admin/AdminApp.jsx` | Komponen utama dashboard admin yang membungkus seluruh modul dengan `ToastProvider`, mengelola state navigasi tab aktif, dan memantau jumlah pesan belum dibaca secara berkala. |
| `admin.css` | `/src/admin/admin.css` | Berkas styling khusus dashboard admin dengan estetika modern bergaya dark theme, kartu frosted glass, efek glow ambient, dan tabel responsif. |

---

## ⚙️ Variabel Lingkungan (`.env`)

Aplikasi menggunakan berkas `.env` pada direktori root untuk konfigurasi kunci API dan endpoint:

```env
# Kunci API untuk Google Gemini (opsional / integrasi lanjutan)
VITE_GEMINI_API_KEY=your_gemini_api_key

# Kunci API Groq untuk layanan AI Chat & Voice Assistant
VITE_GROQ_API_KEY=gsk_your_groq_api_key

# Model AI Groq yang aktif (default: openai/gpt-oss-20b untuk kecepatan tinggi)
VITE_GROQ_MODEL_NAME=openai/gpt-oss-20b

# URL Backend Server (Opsional, jika server backend terpisah dijalankan)
VITE_API_URL=http://localhost:3001
```

> **Catatan Keamanan**: Jangan pernah mempublikasikan file `.env` asli yang berisi API key sensitif ke repositori publik. Selalu sertakan `.env` di dalam `.gitignore`.

---

## 🚀 Panduan Instalasi & Menjalankan Proyek

### 1. Prasyarat Sistem
- **Node.js**: Versi 18.0.0 atau lebih tinggi
- **NPM**: Versi 9.0.0 atau lebih tinggi

### 2. Langkah Instalasi

1. **Clone repositori atau buka folder proyek:**
   ```bash
   cd c:/Project/portofolio
   ```

2. **Pasang seluruh dependensi:**
   ```bash
   npm install
   ```

3. **Pastikan file `.env` sudah terisi dengan API Key yang valid.**

4. **Jalankan server pengembangan (Development Server):**
   ```bash
   npm run dev
   ```
   Aplikasi akan aktif secara lokal di: `http://localhost:5173/`

5. **Membuka Halaman Admin CMS:**
   Kunjungi URL rahasia berikut di browser:
   `http://localhost:5173/x-admin-7f3a9b`

6. **Membangun Bundle Produksi (Production Build):**
   ```bash
   npm run build
   ```
   Hasil kompilasi siap rilis akan disimpan pada folder `dist/`.

---

## 👨‍💻 Pengembang

- **Nama**: Muhammad Sholihun
- **Pendidikan**: D4 Rekayasa Perangkat Lunak - Politeknik Negeri Bengkalis
- **LinkedIn**: [linkedin.com/in/m-sholihun](https://www.linkedin.com/in/m-sholihun)
- **GitHub**: [github.com/solihunsir](https://github.com/solihunsir)
- **Email**: [solihun.bks2019@gmail.com](mailto:solihun.bks2019@gmail.com)
