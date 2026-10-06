import { createContext, useContext, useState, useEffect, useMemo } from "react";

const translations = {
  id: {
    nav: {
      beranda: "Beranda",
      tentang: "Tentang",
      skills: "Keahlian",
      proyek: "Proyek",
      agenda: "Agenda",
      kontak: "Kontak",
      downloadCv: "Unduh CV",
    },
    hero: {
      badge: "Lulusan Baru Rekayasa Perangkat Lunak",
      subheadline: "Pengembang Fullstack & Mobile",
      greeting: "Halo, Saya",
      tagline: "Software Engineer berfokus pada pengembangan solusi digital yang inovatif, efisien, dan terstruktur",
      bio: "Lulusan D4 Rekayasa Perangkat Lunak dari Politeknik Negeri Bengkalis. Berpengalaman merancang dan membangun aplikasi web serta mobile yang solutif dan berdampak nyata bagi masyarakat.",
      downloadCv: "Unduh CV",
      viewProjects: "Lihat Proyek",
      viewExperience: "Lihat Pengalaman",
      askAi: "Tanya AI Saya",
      stats: {
        projects: "Proyek Selesai",
        experience: "Tahun Pengalaman",
        certifications: "Sertifikasi",
        awards: "Penghargaan & Prestasi",
        mentored: "Siswa Dibimbing",
      },
    },
    about: {
      badge: "Tentang Saya",
      titleMain: "Pengembang Berdedikasi &",
      titleSub: "Pembelajar Sepanjang Hayat",
      yearsExp: "Tahun\nPengalaman",
      availability: "Siap Bekerja & Berkolaborasi",
      location: "Bengkalis, Riau, Indonesia",
      description:
        "Muhammad Sholihun adalah seorang lulusan D4 Rekayasa Perangkat Lunak dari Politeknik Negeri Bengkalis. Lahir dan tumbuh di Bengkalis dari keluarga sederhana, Sholihun adalah generasi pertama dalam keluarganya yang berhasil menempuh pendidikan tinggi (first-generation college graduate). Beliau berprinsip teguh bahwa keterbatasan ekonomi dan perangkat bukanlah penghalang untuk terus berkarya, berprestasi, dan memberikan dampak positif bagi kemajuan masyarakat.",
      stats: {
        projects: "Proyek Selesai",
        experience: "Tahun Pengalaman",
        certifications: "Sertifikasi",
        awards: "Penghargaan & Prestasi",
        mentored: "Siswa Dibimbing",
      },
    },
    skills: {
      badge: "Keahlian Teknis",
      title: "Alat & Teknologi",
      subtitle: "Teknologi, bahasa pemrograman, dan alat pengembangan yang biasa saya gunakan untuk membangun aplikasi Web maupun Mobile.",
    },
    projects: {
      badge: "Portofolio",
      title: "Proyek Pilihan",
      subtitle: "Berikut adalah beberapa proyek unggulan yang telah saya rancang dan kembangkan.",
      viewRepo: "Lihat Repository",
      prev: "Sebelumnya",
      next: "Berikutnya",
    },
    agenda: {
      badge: "Pencapaian & Agenda",
      titlePrefix: "Agenda & ",
      titleHighlight: "Pencapaian",
      subtitle: "Rekam jejak agenda perkuliahan, kompetisi teknologi, serta sertifikasi profesional yang telah diraih.",
    },
    contact: {
      badge: "Kontak",
      titlePrefix: "Mari ",
      titleHighlight: "Terhubung",
      subtitle: "Tertarik untuk berkolaborasi atau memiliki tawaran proyek? Saya siap menyambut dan merespons pesan Anda.",
      infoTitle: "Informasi Kontak",
      locationLabel: "Lokasi",
      availabilityLabel: "Ketersediaan",
      availabilityValue: "Siap Bekerja & Berkolaborasi",
      socialLabel: "Media Sosial",
      formTitle: "Kirim Pesan",
      nameLabel: "Nama Lengkap",
      namePlaceholder: "Masukkan nama lengkap Anda",
      emailLabel: "Alamat Email",
      emailPlaceholder: "Masukkan alamat email Anda",
      messageLabel: "Pesan",
      messagePlaceholder: "Tuliskan pesan atau tawaran kerjasama Anda di sini…",
      sendButton: "Kirim Pesan",
      sendingButton: "Mengirimkan Pesan...",
      successMessage: "Terima kasih! Pesan Anda telah berhasil dikirimkan.",
      errorMessage: "Maaf, terjadi kendala saat mengirim pesan. Silakan coba lagi atau hubungi via email langsung.",
    },
    aiChat: {
      badge: "Asisten AI",
      titlePrefix: "Tanya - ",
      titleHighlight: "AI Saya",
      greeting: "Halo! Saya Asisten AI pribadi Muhammad Sholihun. Silakan tanyakan apa saja seputar riwayat pendidikan, proyek, keahlian teknis, atau pengalaman kerjanya!",
      placeholder: "Tanyakan pengalaman, proyek, atau keahlian Sholihun...",
      sendBtn: "Kirim",
      sendingBtn: "Mengirim…",
      footerNote: "Percakapan tidak disimpan",
      hints: [
        "Apa proyek machine learning-nya?",
        "Bagaimana latar belakang Sholihun?",
        "Keahlian teknis apa yang dikuasai?",
        "Pengalaman magang di mana saja?",
      ],
    },
    voiceAssistant: {
      title: "Asisten Suara AI",
      prompt: "Ingin mengobrol langsung melalui suara dengan AI mengenai profil dan proyek saya?",
      decline: "Tolak",
      accept: "Mulai Mengobrol",
      welcomeSpeech: "Halo, selamat datang di portofolio saya! Ada yang ingin Anda tanyakan tentang pengalaman atau proyek saya?",
      listening: "Mendengarkan...",
      thinking: "Berpikir...",
      speaking: "AI Berbicara...",
      ready: "Siap sedia",
    },
    experience: {
      badge: "Rekam Jejak",
      title: "Pengalaman & Riwayat Karier",
      subtitle: "Dokumentasi riwayat pekerjaan, jenjang pendidikan, serta kepemimpinan organisasi.",
      all: "Semua",
      work: "Pekerjaan",
      education: "Pendidikan",
      organization: "Organisasi",
      workBadge: "Pekerjaan",
      educationBadge: "Pendidikan",
      organizationBadge: "Organisasi",
      empty: "Belum ada data pada kategori ini.",
      present: "Sekarang",
      recordsCount: "data pengalaman",
      close: "Tutup",
      ariaLabel: "Linimasa Pengalaman",
      closeAria: "Tutup panel",
    },
    footer: {
      tagline: "Lulusan D4 Rekayasa Perangkat Lunak yang berdedikasi tinggi dalam menciptakan produk digital solutif, efisien, dan berdampak nyata.",
      navTitle: "Navigasi",
      contactTitle: "Kontak",
      rights: "Hak Cipta Dilindungi.",
    },
  },
  en: {
    nav: {
      beranda: "Home",
      tentang: "About",
      skills: "Skills",
      proyek: "Projects",
      agenda: "Agenda",
      kontak: "Contact",
      downloadCv: "Download CV",
    },
    hero: {
      badge: "Software Engineering Graduate",
      subheadline: "Fullstack & Mobile Developer",
      greeting: "Hello, I'm",
      tagline: "Software Engineer focused on developing innovative, efficient, and structured digital solutions",
      bio: "Software Engineering Graduate from Bengkalis State Polytechnic. Experienced in designing and building impactful, production-ready web and mobile solutions.",
      downloadCv: "Download CV",
      viewProjects: "View Projects",
      viewExperience: "View Experience",
      askAi: "Ask My AI",
      stats: {
        projects: "Completed Projects",
        experience: "Years Experience",
        certifications: "Certifications",
        awards: "Awards & Honors",
        mentored: "Students Mentored",
      },
    },
    about: {
      badge: "About Me",
      titleMain: "Passionate Developer &",
      titleSub: "Lifelong Learner",
      yearsExp: "Years\nExperience",
      availability: "Open to Work & Collaboration",
      location: "Bengkalis, Riau, Indonesia",
      description:
        "Muhammad Sholihun is a Software Engineering graduate from Bengkalis State Polytechnic. Born and raised in Bengkalis from a humble family, Sholihun is the first generation in his family to pursue higher education (first-generation college graduate). He strongly upholds the principle that economic limitations and modest devices are never barriers to creating meaningful innovation, excelling, and serving society.",
      stats: {
        projects: "Completed Projects",
        experience: "Years Experience",
        certifications: "Certifications",
        awards: "Awards & Honors",
        mentored: "Students Mentored",
      },
    },
    skills: {
      badge: "Tech Stack",
      title: "Tools & Technologies",
      subtitle: "Technologies, programming languages, and development tools I frequently use to build modern Web and Mobile Applications.",
    },
    projects: {
      badge: "Portfolio",
      title: "Featured Projects",
      subtitle: "Here are several highlighted projects that I have designed and developed.",
      viewRepo: "View Repository",
      prev: "Previous",
      next: "Next",
    },
    agenda: {
      badge: "Achievements & Agenda",
      titlePrefix: "Agenda & ",
      titleHighlight: "Achievements",
      subtitle: "Notable academic milestones, tech competitions, and professional certifications earned during university studies.",
    },
    contact: {
      badge: "Contact",
      titlePrefix: "Let's ",
      titleHighlight: "Connect",
      subtitle: "Interested in collaborating or have a project inquiry? I am ready to respond to your message.",
      infoTitle: "Contact Information",
      locationLabel: "Location",
      availabilityLabel: "Availability",
      availabilityValue: "Open to Work & Collaboration",
      socialLabel: "Social Media",
      formTitle: "Send a Message",
      nameLabel: "Full Name",
      namePlaceholder: "Enter your full name",
      emailLabel: "Email Address",
      emailPlaceholder: "Enter your email address",
      messageLabel: "Message",
      messagePlaceholder: "Write your message or project collaboration proposal here…",
      sendButton: "Send Message",
      sendingButton: "Sending Message...",
      successMessage: "Thank you! Your message has been successfully sent.",
      errorMessage: "Sorry, an issue occurred while sending your message. Please try again or contact via email directly.",
    },
    aiChat: {
      badge: "AI Assistant",
      titlePrefix: "Ask - ",
      titleHighlight: "My AI",
      greeting: "Hello! I am Muhammad Sholihun's personal AI Assistant. Feel free to ask me anything about his education, projects, technical skills, or work experience!",
      placeholder: "Ask about Sholihun's experience, projects, or skills...",
      sendBtn: "Send",
      sendingBtn: "Sending…",
      footerNote: "Conversations are not stored",
      hints: [
        "What are his machine learning projects?",
        "What is Sholihun's background?",
        "What tech stack does he master?",
        "Where has he completed internships?",
      ],
    },
    voiceAssistant: {
      title: "AI Voice Assistant",
      prompt: "Would you like to speak directly with the AI about my background and projects?",
      decline: "Decline",
      accept: "Start Chatting",
      welcomeSpeech: "Hello, welcome to my portfolio! Is there anything you would like to ask about my experience or projects?",
      listening: "Listening...",
      thinking: "Thinking...",
      speaking: "AI Speaking...",
      ready: "Ready",
    },
    experience: {
      badge: "Career Path",
      title: "Experience & Education",
      subtitle: "Documented work history, academic milestones, and organizational leadership.",
      all: "All Experience",
      work: "Work",
      education: "Education",
      organization: "Organization",
      workBadge: "Work Experience",
      educationBadge: "Education",
      organizationBadge: "Organization",
      empty: "No experience data available.",
      present: "Present",
      recordsCount: "records listed",
      close: "Close",
      ariaLabel: "Experience Timeline",
      closeAria: "Close panel",
    },
    footer: {
      tagline: "Software Engineering graduate passionate about building impactful, efficient, and structured digital solutions.",
      navTitle: "Navigation",
      contactTitle: "Contact Me",
      rights: "All rights reserved.",
    },
  },
};

// Bidirectional dictionaries for Projects
const projectsData = {
  1: {
    id: {
      nama: "Aplikasi Hotel Bengkalis",
      desk: "Aplikasi yang berfungsi mencari Hotel dan Wisma terdekat dari posisi pengguna menggunakan algoritma A*.",
    },
    en: {
      nama: "Bengkalis Hotel Locator",
      desk: "Mobile application designed to locate the nearest hotels and guesthouses from user GPS coordinates using A* algorithm.",
    },
  },
  2: {
    id: {
      nama: "Judi Guard",
      desk: "Website cerdas untuk mendeteksi, menyaring, dan memberantas komentar judi online di platform YouTube.",
    },
    en: {
      nama: "Judi Guard",
      desk: "Intelligent web platform engineered to detect, filter, and eradicate online gambling spam comments across YouTube video discussions.",
    },
  },
  3: {
    id: {
      nama: "Portal Berita Modern",
      desk: "Website portal berita modern dan responsif yang menyajikan berita terbaru, aktual, dan relevan secara real-time.",
    },
    en: {
      nama: "Modern News Portal",
      desk: "Responsive modern news portal website delivering real-time, relevant, and curated latest news updates.",
    },
  },
  4: {
    id: {
      nama: "Agenda & Jadwal Kelas",
      desk: "Website berfungsi untuk memberikan informasi kegiatan, tugas harian, dan agenda perkuliahan selama semester.",
    },
    en: {
      nama: "Class Schedule & Agenda",
      desk: "Academic information web platform to manage lecture schedules, daily assignments, and class activities.",
    },
  },
  5: {
    id: {
      nama: "Private Chess AI",
      desk: "Platform latihan catur interaktif berbasis web dengan analisis taktis real-time 100% offline, mengintegrasikan mesin Stockfish 16 (WASM) untuk evaluasi langkah dan riwayat taktik mendalam.",
    },
    en: {
      nama: "Private Chess AI",
      desk: "Web-based interactive chess training platform with 100% offline real-time tactical analysis, integrating Stockfish 16 (WASM) engine for deep move evaluations.",
    },
  },
  6: {
    id: {
      nama: "Smart Village Ecosystem",
      desk: "Platform ekosistem desa cerdas untuk pengintegrasian laporan desa, lokapasar produk lokal, serta wadah interaksi komunitas desa.",
    },
    en: {
      nama: "Smart Village Ecosystem",
      desk: "Integrated smart village ecosystem platform engineered for village report management, local product marketplace, and community interaction.",
    },
  },
  7: {
    id: {
      nama: "Monitoring Kendaraan RORO Bengkalis",
      desk: "Sistem cerdas pemantauan kendaraan di pelabuhan penyeberangan RORO Bengkalis untuk transparansi data dan otomasi laporan.",
    },
    en: {
      nama: "Bengkalis RORO Vehicle Monitoring",
      desk: "Smart vehicle monitoring and tracking system at Bengkalis RORO ferry port, enhancing operational data transparency and automated report generation.",
    },
  },
};

// Bidirectional dictionaries for Agenda & Achievements
const agendaData = {
  1: {
    id: {
      nama: "Juara 1 Catur PKM & Porseni",
      desk: "Pertandingan Catur yang diikuti oleh seluruh Mahasiswa aktif Politeknik Negeri Bengkalis.",
    },
    en: {
      nama: "1st Place Chess Champion PKM & Porseni",
      desk: "Campus chess championship contested by active university students of Bengkalis State Polytechnic.",
    },
  },
  2: {
    id: {
      nama: "Juara 2 Pemrograman Web",
      desk: "Pertandingan pemrograman web yang diikuti oleh seluruh Mahasiswa & Siswa Se-Kabupaten Bengkalis.",
    },
    en: {
      nama: "2nd Place Web Programming Competition",
      desk: "Web programming competition contested by college and high school students across Bengkalis Regency.",
    },
  },
  3: {
    id: {
      nama: "Juara 1 Desain Web",
      desk: "Pertandingan Desain Web dan UI/UX yang diikuti oleh Mahasiswa Aktif Jurusan Teknik Informatika.",
    },
    en: {
      nama: "1st Place Web Design Competition",
      desk: "Web design and UI/UX competition contested by active students of Informatics Engineering Department.",
    },
  },
  4: {
    id: {
      nama: "Juara Mahasiswa Terbaik Catur",
      desk: "Pertandingan Catur Umum yang diikuti oleh Mahasiswa Aktif Se-Kabupaten Bengkalis.",
    },
    en: {
      nama: "Best Student Chess Player Award",
      desk: "Open chess tournament competed by active university students across Bengkalis Regency.",
    },
  },
  5: {
    id: {
      nama: "Juara Video Editing",
      desk: "Pertandingan Video Editing sinematik yang diikuti oleh seluruh Mahasiswa Politeknik Negeri Bengkalis.",
    },
    en: {
      nama: "Video Editing Champion",
      desk: "Cinematography and video editing competition held for all students of Bengkalis State Polytechnic.",
    },
  },
  6: {
    id: {
      nama: "Sertifikat Front-End & Back-End Developer",
      desk: "Program Coding Camp intensif berstandar industri yang diselenggarakan oleh DBS Foundation.",
    },
    en: {
      nama: "Front-End & Back-End Developer Certificate",
      desk: "Comprehensive industry Coding Camp Program certification powered by DBS Foundation.",
    },
  },
  7: {
    id: {
      nama: "Sertifikat Pertukaran Mahasiswa Merdeka",
      desk: "Program Pertukaran Mahasiswa Merdeka Batch 3 di Politeknik Negeri Pontianak.",
    },
    en: {
      nama: "Independent Student Exchange Certificate",
      desk: "Batch 3 Independent Student Exchange Program (PMM) certification at Pontianak State Polytechnic.",
    },
  },
  8: {
    id: {
      nama: "Sertifikat Web Intermediate",
      desk: "Sertifikat kelulusan kompetensi yang didapatkan dari Dicoding dengan kurikulum Web Intermediate.",
    },
    en: {
      nama: "Intermediate Web Developer Certificate",
      desk: "Official credential awarded by Dicoding Academy for Intermediate Web Development.",
    },
  },
  9: {
    id: {
      nama: "Sertifikat Magang Berdampak",
      desk: "Sertifikat kelulusan Program Magang Berdampak industri di PT Citiasia Internasional.",
    },
    en: {
      nama: "Certified Impactful Internship",
      desk: "Certified Impactful Internship program completion at PT Citiasia Internasional.",
    },
  },
};

// Date / Month translations helper
const monthMap = {
  toEn: {
    jan: "Jan", januari: "January",
    feb: "Feb", februari: "February",
    mar: "Mar", maret: "March",
    apr: "Apr", april: "April",
    mei: "May",
    jun: "Jun", juni: "June",
    jul: "Jul", juli: "July",
    agu: "Aug", agt: "Aug", agustus: "August",
    sep: "Sep", september: "September",
    okt: "Oct", oktober: "October",
    nov: "Nov", november: "November",
    des: "Dec", desember: "December",
    sekarang: "Present",
  },
  toId: {
    jan: "Jan", january: "Januari",
    feb: "Feb", february: "Februari",
    mar: "Mar", march: "Maret",
    apr: "Apr", april: "April",
    may: "Mei",
    jun: "Jun", june: "Juni",
    jul: "Jul", july: "Juli",
    aug: "Agu", august: "Agustus",
    sep: "Sep", september: "September",
    oct: "Okt", october: "Oktober",
    nov: "Nov", november: "November",
    dec: "Des", december: "Desember",
    present: "Sekarang",
  },
};

export const translateDate = (str, targetLang) => {
  if (!str || typeof str !== "string") return str;
  const map = targetLang === "en" ? monthMap.toEn : monthMap.toId;
  let result = str;
  for (const [key, val] of Object.entries(map)) {
    const regex = new RegExp(`\\b${key}\\b`, "gi");
    result = result.replace(regex, val);
  }
  return result;
};

// Bidirectional dictionaries for Work, Education, & Organization Experience
const experienceData = {
  "exp-1": {
    id: {
      title: "Fullstack Developer – Frontend Focused",
      company: "PT Citiasia Internasional",
      location: "Jakarta, Indonesia (Onsite / Magang Berdampak)",
      startDate: "Agu 2025",
      endDate: "Des 2025",
      description: `• Membangun antarmuka aplikasi lintas platform (Flutter) yang responsif, adaptif, dan user-friendly.
• Berkontribusi aktif menganalisis dan mengatasi 30% kendala integrasi API serta inkonsistensi relasi database backend.
• Berkolaborasi dalam tim agile multidisiplin untuk menyelesaikan sprint rilis tepat waktu.`,
    },
    en: {
      title: "Fullstack Developer – Frontend Focused",
      company: "PT Citiasia Internasional",
      location: "Jakarta, Indonesia (Onsite / Impactful Internship)",
      startDate: "Aug 2025",
      endDate: "Dec 2025",
      description: `• Engineered responsive, adaptive, and user-friendly cross-platform application interfaces using Flutter.
• Actively analyzed and resolved 30% of API integration bottlenecks and backend database relational inconsistencies.
• Collaborated in a multidisciplinary Agile team to deliver release sprints strictly on schedule.`,
    },
  },
  "exp-2": {
    id: {
      title: "Fullstack Developer",
      company: "PT Winnicode Garuda Teknologi",
      location: "Bandung, Indonesia (Remote)",
      startDate: "Feb 2025",
      endDate: "Mei 2025",
      description: `• Mengembangkan aplikasi Portal Berita interaktif menggunakan Laravel mulai dari perancangan database hingga integrasi CMS.
• Meningkatkan keamanan sistem backend dan memperbarui antarmuka pengguna menjadi 20% lebih cepat dan responsif.
• Melakukan optimasi query database untuk mengefisienkan waktu pemuatan konten artikel.`,
    },
    en: {
      title: "Fullstack Developer",
      company: "PT Winnicode Garuda Teknologi",
      location: "Bandung, Indonesia (Remote)",
      startDate: "Feb 2025",
      endDate: "May 2025",
      description: `• Developed an interactive News Portal web application using Laravel from database design through CMS integration.
• Enhanced backend system security and refactored the UI to be 20% faster and more responsive.
• Optimized database queries to significantly reduce article content loading latency.`,
    },
  },
  "exp-3": {
    id: {
      title: "Programming Instructor (Pemateri UKK)",
      company: "SMK Negeri di Bengkalis",
      location: "Bengkalis, Indonesia",
      startDate: "Mar 2022",
      endDate: "Mar 2024",
      description: `• Menyampaikan kurikulum dasar hingga menengah pemrograman web dan mobile kepada para siswa.
• Membimbing 60+ siswa SMK hingga sukses meraih tingkat kelulusan 95% pada Uji Kompetensi Keahlian (UKK).
• Mengarahkan siswa menyelesaikan portofolio website fungsional berbasis studi kasus riil.`,
    },
    en: {
      title: "Programming Instructor (Vocational Competency Assessor)",
      company: "State Vocational High School in Bengkalis",
      location: "Bengkalis, Indonesia",
      startDate: "Mar 2022",
      endDate: "Mar 2024",
      description: `• Delivered foundational to intermediate web and mobile programming curriculum to students.
• Mentored 60+ vocational high school students, achieving a 95% graduation pass rate on the Vocational Competency Exam (UKK).
• Guided students to complete functional website portfolios based on real-world industry case studies.`,
    },
  },
  "exp-4": {
    id: {
      title: "D4 Rekayasa Perangkat Lunak (IPK: 3.53)",
      company: "Politeknik Negeri Bengkalis",
      location: "Bengkalis, Riau",
      startDate: "Agu 2021",
      endDate: "Feb 2025",
      description: `• Lulusan Berprestasi dengan fokus riset Sistem Rekomendasi, Machine Learning, dan Computer Vision.
• Publikasi Jurnal Ilmiah Riset dan Inovasi Nasional mengenai Algoritma A* untuk pencarian rute terdekat.
• Juara 1 Catur PKM & Porseni serta Juara 2 Pemrograman Web Se-Kabupaten Bengkalis.`,
    },
    en: {
      title: "Applied Bachelor in Software Engineering (GPA: 3.53)",
      company: "Bengkalis State Polytechnic",
      location: "Bengkalis, Riau, Indonesia",
      startDate: "Aug 2021",
      endDate: "Feb 2025",
      description: `• High-achieving graduate specializing in Recommendation Systems, Machine Learning, and Computer Vision.
• Published a National Research & Innovation scientific paper on the A* algorithm for optimal nearest-route pathfinding.
• 1st Place Campus Chess Champion & 2nd Place Web Programming Competition across Bengkalis Regency.`,
    },
  },
  "exp-5": {
    id: {
      title: "Pertukaran Mahasiswa Merdeka (PMM 3 - IPK: 3.82)",
      company: "Politeknik Negeri Pontianak",
      location: "Pontianak, Kalimantan Barat",
      startDate: "Sep 2023",
      endDate: "Jan 2024",
      description: `• Penerima beasiswa Kemendikbudristek untuk studi lintas pulau dan penguatan kompetensi rekayasa perangkat lunak.
• Meraih indeks prestasi semester 3.82 dengan fokus penguasaan arsitektur sistem terdistribusi.`,
    },
    en: {
      title: "Independent Student Exchange (PMM Batch 3 - GPA: 3.82)",
      company: "Pontianak State Polytechnic",
      location: "Pontianak, West Kalimantan, Indonesia",
      startDate: "Sep 2023",
      endDate: "Jan 2024",
      description: `• Recipient of the Ministry of Education scholarship for inter-island academic mobility and advanced software engineering studies.
• Achieved a semester GPA of 3.82/4.00, mastering distributed systems architecture and enterprise engineering.`,
    },
  },
  "exp-6": {
    id: {
      title: "Ketua Divisi E-Sport",
      company: "UKM Olahraga Politeknik Negeri Bengkalis",
      location: "Bengkalis, Riau",
      startDate: "Okt 2022",
      endDate: "Okt 2023",
      description: `• Memimpin dan membina 15 atlet mahasiswa untuk kompetisi tingkat politeknik daerah dan nasional.
• Menjalin kemitraan dengan 5 komunitas E-sports serta mengamankan dukungan dari 3 pihak sponsor.`,
    },
    en: {
      title: "Head of E-Sports Division",
      company: "Sports Student Activity Unit (UKM), Bengkalis State Polytechnic",
      location: "Bengkalis, Riau, Indonesia",
      startDate: "Oct 2022",
      endDate: "Oct 2023",
      description: `• Led and coached 15 student athletes for regional and national polytechnic esports tournaments.
• Established partnerships with 5 esports communities and secured sponsorships from 3 corporate partners.`,
    },
  },
};

// Aliases for numeric IDs
experienceData[1] = experienceData["exp-1"];
experienceData[2] = experienceData["exp-2"];
experienceData[3] = experienceData["exp-3"];
experienceData[4] = experienceData["exp-4"];
experienceData[5] = experienceData["exp-5"];
experienceData[6] = experienceData["exp-6"];

// Bidirectional Skill/Tool category translation dictionary
const skillMap = {
  // Indonesian targets
  toId: {
    "Code Editor": "Editor Kode",
    "Editor Kode": "Editor Kode",
    "Framework": "Kerangka Kerja",
    "Kerangka Kerja": "Kerangka Kerja",
    "Language": "Bahasa Pemrograman",
    "Programming Language": "Bahasa Pemrograman",
    "Bahasa Pemrograman": "Bahasa Pemrograman",
    "Javascript Runtime": "Runtime JavaScript",
    "JavaScript Runtime": "Runtime JavaScript",
    "Runtime JavaScript": "Runtime JavaScript",
    "Repository": "Repositori Kode",
    "Version Control": "Repositori Kode",
    "Repositori Kode": "Repositori Kode",
    "Emulator": "Emulator Seluler",
    "Mobile Emulator": "Emulator Seluler",
    "Emulator Seluler": "Emulator Seluler",
    "Design App": "Aplikasi Desain",
    "UI/UX Design App": "Aplikasi Desain",
    "Aplikasi Desain": "Aplikasi Desain",
    "Database": "Basis Data",
    "Relational Database": "Basis Data",
    "Basis Data": "Basis Data",
    "Frontend": "Frontend",
    "Frontend Development": "Frontend",
    "Backend": "Backend",
    "Backend Development": "Backend",
    "Mobile": "Aplikasi Mobile",
    "Mobile Development": "Aplikasi Mobile",
    "Tools": "Alat & Utilitas",
    "Tools & Utilities": "Alat & Utilitas",
    "Design": "Desain UI/UX",
  },
  // English targets
  toEn: {
    "Code Editor": "Code Editor",
    "Editor Kode": "Code Editor",
    "Framework": "Framework",
    "Kerangka Kerja": "Framework",
    "Language": "Programming Language",
    "Programming Language": "Programming Language",
    "Bahasa Pemrograman": "Programming Language",
    "Javascript Runtime": "JavaScript Runtime",
    "JavaScript Runtime": "JavaScript Runtime",
    "Runtime JavaScript": "JavaScript Runtime",
    "Repository": "Version Control",
    "Version Control": "Version Control",
    "Repositori Kode": "Version Control",
    "Emulator": "Mobile Emulator",
    "Mobile Emulator": "Mobile Emulator",
    "Emulator Seluler": "Mobile Emulator",
    "Design App": "UI/UX Design App",
    "UI/UX Design App": "UI/UX Design App",
    "Aplikasi Desain": "UI/UX Design App",
    "Database": "Relational Database",
    "Relational Database": "Relational Database",
    "Basis Data": "Relational Database",
    "Frontend": "Frontend Development",
    "Frontend Development": "Frontend Development",
    "Backend": "Backend Development",
    "Backend Development": "Backend Development",
    "Mobile": "Mobile Development",
    "Mobile Development": "Mobile Development",
    "Tools": "Tools & Utilities",
    "Tools & Utilities": "Tools & Utilities",
    "Design": "UI/UX Design",
    "Desain UI/UX": "UI/UX Design",
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem("portfolio_lang") || "id";
  });

  const setLang = (newLang) => {
    const valid = newLang === "en" ? "en" : "id";
    setLangState(valid);
    localStorage.setItem("portfolio_lang", valid);
    document.documentElement.lang = valid;
  };

  const toggleLang = () => {
    setLang(lang === "id" ? "en" : "id");
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (path, fallback = "") => {
    const keys = path.split(".");
    let current = translations[lang] || translations.id;
    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        return fallback || path;
      }
    }
    return current ?? fallback ?? path;
  };

  /**
   * Translates a project item's title and description bidirectionally
   */
  const translateProject = (project) => {
    if (!project) return project;

    // Determine entry by ID or title pattern
    let entry = projectsData[project.id];
    if (!entry) {
      const pName = (project.nama || project.title || "").toLowerCase();
      if (pName.includes("hotel")) entry = projectsData[1];
      else if (pName.includes("judi") || pName.includes("guard")) entry = projectsData[2];
      else if (pName.includes("berita") || pName.includes("news")) entry = projectsData[3];
      else if (pName.includes("agenda") || pName.includes("kelas") || pName.includes("schedule")) entry = projectsData[4];
      else if (pName.includes("chess") || pName.includes("catur")) entry = projectsData[5];
      else if (pName.includes("village") || pName.includes("desa")) entry = projectsData[6];
      else if (pName.includes("roro") || pName.includes("kendaraan") || pName.includes("vehicle")) entry = projectsData[7];
    }

    if (entry) {
      const data = lang === "en" ? entry.en : entry.id;
      return {
        ...project,
        nama: data.nama || project.nama,
        title: data.nama || project.title,
        desk: data.desk || project.desk,
        description: data.desk || project.description,
      };
    }

    return project;
  };

  /**
   * Translates an agenda item's title and description bidirectionally
   */
  const translateAgenda = (item) => {
    if (!item) return item;

    let entry = agendaData[item.id];
    if (!entry) {
      const aName = (item.nama || item.title || "").toLowerCase();
      if (aName.includes("catur pkm") || aName.includes("chess champion")) entry = agendaData[1];
      else if (aName.includes("pemrograman web") || aName.includes("web programming")) entry = agendaData[2];
      else if (aName.includes("desain web") || aName.includes("web design")) entry = agendaData[3];
      else if (aName.includes("terbaik catur") || aName.includes("chess player")) entry = agendaData[4];
      else if (aName.includes("video editing")) entry = agendaData[5];
      else if (aName.includes("front-end") || aName.includes("dbs foundation")) entry = agendaData[6];
      else if (aName.includes("pertukaran mahasiswa") || aName.includes("student exchange") || aName.includes("pmm")) entry = agendaData[7];
      else if (aName.includes("intermediate") || aName.includes("dicoding")) entry = agendaData[8];
      else if (aName.includes("magang") || aName.includes("citiasia") || aName.includes("internship")) entry = agendaData[9];
    }

    if (entry) {
      const data = lang === "en" ? entry.en : entry.id;
      return {
        ...item,
        nama: data.nama || item.nama,
        title: data.nama || item.title,
        desk: data.desk || item.desk,
        description: data.desk || item.description,
      };
    }

    return item;
  };

  /**
   * Translates a skill's description or category bidirectionally
   */
  const translateSkill = (tool) => {
    if (!tool) return tool;
    const ket = tool.ket || tool.description || tool.category || "";
    const map = lang === "en" ? skillMap.toEn : skillMap.toId;
    const translatedKet = map[ket] || ket;
    return {
      ...tool,
      ket: translatedKet,
      description: translatedKet,
      category: translatedKet,
    };
  };

  /**
   * Translates Hero section dynamically
   */
  const translateHero = (hero) => {
    if (!hero) return hero;
    if (lang === "en") {
      return {
        ...hero,
        subheadline: "Software Engineering Graduate",
        bio: "Software Engineering Graduate from Bengkalis State Polytechnic. Experienced in building impactful, production-ready web & mobile solutions.",
        ctaLabel: "Download CV",
        ctaSecLabel: "View Projects",
      };
    }
    return {
      ...hero,
      subheadline: "Lulusan Baru Rekayasa Perangkat Lunak",
      bio: "Lulusan D4 Rekayasa Perangkat Lunak dari Politeknik Negeri Bengkalis. Berpengalaman merancang dan membangun aplikasi web serta mobile yang solutif dan berdampak nyata bagi masyarakat.",
      ctaLabel: "Unduh CV",
      ctaSecLabel: "Lihat Proyek",
    };
  };

  /**
   * Translates About section dynamically
   */
  const translateAbout = (about) => {
    if (!about) return about;
    if (lang === "en") {
      return {
        ...about,
        fullName: about.fullName || "Muhammad Sholihun",
        availability: "Open to Work & Collaboration",
        location: "Bengkalis, Riau, Indonesia",
        description:
          "Muhammad Sholihun is a Software Engineering graduate from Bengkalis State Polytechnic. Born and raised in Bengkalis from a humble family, Sholihun is the first generation in his family to pursue higher education (first-generation college graduate). He strongly upholds the principle that economic limitations and modest devices are never barriers to creating meaningful innovation, excelling, and serving society.",
      };
    }
    return {
      ...about,
      fullName: about.fullName || "Muhammad Sholihun",
      availability: "Siap Bekerja & Berkolaborasi",
      location: "Bengkalis, Riau, Indonesia",
      description:
        "Muhammad Sholihun adalah seorang lulusan D4 Rekayasa Perangkat Lunak dari Politeknik Negeri Bengkalis. Lahir dan tumbuh di Bengkalis dari keluarga sederhana, Sholihun adalah generasi pertama dalam keluarganya yang berhasil menempuh pendidikan tinggi (first-generation college graduate). Beliau berprinsip teguh bahwa keterbatasan ekonomi dan perangkat bukanlah penghalang untuk terus berkarya, berprestasi, dan memberikan dampak positif bagi kemajuan masyarakat.",
    };
  };

  /**
   * Translates statistic labels bidirectionally
   */
  const translateStatLabel = (label) => {
    if (!label) return "";
    const lower = label.toLowerCase();
    if (lang === "en") {
      if (lower.includes("proyek") || lower.includes("project")) return t("hero.stats.projects", "Completed Projects");
      if (lower.includes("pengalaman") || lower.includes("tahun") || lower.includes("experience")) return t("hero.stats.experience", "Years Experience");
      if (lower.includes("sertifikasi") || lower.includes("sertifikat") || lower.includes("certificat")) return t("hero.stats.certifications", "Certifications");
      if (lower.includes("prestasi") || lower.includes("penghargaan") || lower.includes("award")) return t("hero.stats.awards", "Awards & Honors");
      if (lower.includes("siswa") || lower.includes("student") || lower.includes("bimbing")) return t("hero.stats.mentored", "Students Mentored");
      return label;
    } else {
      if (lower.includes("project") || lower.includes("proyek")) return t("hero.stats.projects", "Proyek Selesai");
      if (lower.includes("experience") || lower.includes("pengalaman") || lower.includes("tahun")) return t("hero.stats.experience", "Tahun Pengalaman");
      if (lower.includes("certificat") || lower.includes("sertifikasi") || lower.includes("sertifikat")) return t("hero.stats.certifications", "Sertifikasi");
      if (lower.includes("award") || lower.includes("prestasi") || lower.includes("penghargaan")) return t("hero.stats.awards", "Penghargaan & Prestasi");
      if (lower.includes("student") || lower.includes("siswa") || lower.includes("bimbing")) return t("hero.stats.mentored", "Siswa Dibimbing");
      return label;
    }
  };

  /**
   * Translates an experience item's title, company, location, dates, and description bidirectionally
   */
  const translateExperience = (exp) => {
    if (!exp) return exp;

    // Check if item has explicit multi-language fields
    if (lang === "en") {
      if (exp.titleEn || exp.title_en || exp.descriptionEn || exp.description_en) {
        return {
          ...exp,
          title: exp.titleEn || exp.title_en || exp.title,
          company: exp.companyEn || exp.company_en || exp.company,
          location: exp.locationEn || exp.location_en || exp.location,
          startDate: translateDate(exp.startDateEn || exp.startDate_en || exp.startDate, "en"),
          endDate: translateDate(exp.endDateEn || exp.endDate_en || exp.endDate, "en"),
          description: exp.descriptionEn || exp.description_en || exp.description,
        };
      }
    } else {
      if (exp.titleId || exp.title_id || exp.descriptionId || exp.description_id) {
        return {
          ...exp,
          title: exp.titleId || exp.title_id || exp.title,
          company: exp.companyId || exp.company_id || exp.company,
          location: exp.locationId || exp.location_id || exp.location,
          startDate: translateDate(exp.startDateId || exp.startDate_id || exp.startDate, "id"),
          endDate: translateDate(exp.endDateId || exp.endDate_id || exp.endDate, "id"),
          description: exp.descriptionId || exp.description_id || exp.description,
        };
      }
    }

    // Determine dictionary entry by ID
    let entry = experienceData[exp.id] || experienceData[String(exp.id)];

    // Fuzzy matching if not found by exact ID
    if (!entry) {
      const eTitle = (exp.title || "").toLowerCase();
      const eComp = (exp.company || "").toLowerCase();
      const combined = `${eTitle} ${eComp}`;

      if (combined.includes("citiasia") || (combined.includes("fullstack") && combined.includes("frontend"))) {
        entry = experienceData["exp-1"];
      } else if (combined.includes("winnicode") || combined.includes("garuda")) {
        entry = experienceData["exp-2"];
      } else if (combined.includes("ukk") || combined.includes("smk") || combined.includes("instructor") || combined.includes("pemateri")) {
        entry = experienceData["exp-3"];
      } else if (combined.includes("d4") || combined.includes("bachelor") || (combined.includes("politeknik") && combined.includes("bengkalis") && !combined.includes("olahraga") && !combined.includes("sport"))) {
        entry = experienceData["exp-4"];
      } else if (combined.includes("pontianak") || combined.includes("pmm") || combined.includes("pertukaran") || combined.includes("exchange")) {
        entry = experienceData["exp-5"];
      } else if (combined.includes("sport") || combined.includes("olahraga") || combined.includes("divisi")) {
        entry = experienceData["exp-6"];
      }
    }

    if (entry) {
      const data = lang === "en" ? entry.en : entry.id;
      return {
        ...exp,
        title: data.title || exp.title,
        company: data.company || exp.company,
        location: data.location || exp.location,
        startDate: data.startDate || translateDate(exp.startDate, lang),
        endDate: data.endDate || translateDate(exp.endDate, lang),
        description: data.description || exp.description,
      };
    }

    // Default fallback: translate dates and common location patterns if entry not in dictionary
    return {
      ...exp,
      startDate: translateDate(exp.startDate, lang),
      endDate: translateDate(exp.endDate, lang),
      location: lang === "en"
        ? (exp.location || "").replace(/magang berdampak/gi, "Impactful Internship")
        : (exp.location || "").replace(/impactful internship/gi, "Magang Berdampak"),
    };
  };

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang,
      t,
      translateProject,
      translateAgenda,
      translateSkill,
      translateHero,
      translateAbout,
      translateStatLabel,
      translateExperience,
    }),
    [lang]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      lang: "id",
      setLang: () => {},
      toggleLang: () => {},
      t: (path, fallback = "") => fallback || path,
      translateProject: (p) => p,
      translateAgenda: (a) => a,
      translateSkill: (s) => s,
      translateHero: (h) => h,
      translateAbout: (a) => a,
      translateStatLabel: (l) => l,
      translateExperience: (e) => e,
    };
  }
  return context;
}

