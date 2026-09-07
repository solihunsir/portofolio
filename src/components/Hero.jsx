const CV = "https://bit.ly/4fsgT26";

export default function Hero() {
  return (
    <section className="hero-section" id="beranda" style={{ position: "relative", overflow: "hidden" }}>

      {/* ── Original cloud blobs ── */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      {/* ── Fluid Mesh Gradient Orbs ── */}
      <div className="hero-mesh-1" />
      <div className="hero-mesh-2" />
      <div className="hero-mesh-3" />
      <div className="hero-mesh-4" />

      <style>{`
        /* ── Fluid Mesh Gradient Orbs ── */
        .hero-mesh-1,.hero-mesh-2,.hero-mesh-3,.hero-mesh-4 {
          position:absolute; pointer-events:none; border-radius:50%;
          z-index:0; filter:blur(120px); opacity:0.42; will-change:transform,opacity;
        }
        .hero-mesh-1 {
          width:clamp(300px,50vw,680px); height:clamp(300px,50vw,680px);
          top:-15%; left:10%;
          background:radial-gradient(ellipse at center,rgba(96,165,250,.55) 0%,rgba(147,197,253,.35) 40%,transparent 70%);
          animation:mesh-drift-1 18s ease-in-out infinite;
        }
        .hero-mesh-2 {
          width:clamp(250px,42vw,580px); height:clamp(250px,42vw,580px);
          bottom:-10%; right:5%;
          background:radial-gradient(ellipse at center,rgba(99,102,241,.32) 0%,rgba(139,92,246,.18) 40%,transparent 70%);
          animation:mesh-drift-2 22s ease-in-out infinite;
        }
        .hero-mesh-3 {
          width:clamp(200px,35vw,460px); height:clamp(200px,35vw,460px);
          top:35%; right:20%;
          background:radial-gradient(ellipse at center,rgba(59,130,246,.38) 0%,rgba(37,99,235,.18) 45%,transparent 70%);
          animation:mesh-drift-3 26s ease-in-out infinite;
        }
        .hero-mesh-4 {
          width:clamp(180px,28vw,380px); height:clamp(180px,28vw,380px);
          top:55%; left:-5%;
          background:radial-gradient(ellipse at center,rgba(186,230,253,.48) 0%,rgba(125,211,252,.26) 45%,transparent 70%);
          animation:mesh-drift-4 20s ease-in-out infinite reverse;
        }
        @keyframes mesh-drift-1 {
          0%{transform:translate(0,0) scale(1);opacity:.40}
          25%{transform:translate(40px,30px) scale(1.08);opacity:.50}
          50%{transform:translate(-20px,50px) scale(.95);opacity:.36}
          75%{transform:translate(30px,-20px) scale(1.05);opacity:.48}
          100%{transform:translate(0,0) scale(1);opacity:.40}
        }
        @keyframes mesh-drift-2 {
          0%{transform:translate(0,0) scale(1);opacity:.36}
          30%{transform:translate(-35px,-25px) scale(1.1);opacity:.48}
          60%{transform:translate(25px,40px) scale(.92);opacity:.30}
          100%{transform:translate(0,0) scale(1);opacity:.36}
        }
        @keyframes mesh-drift-3 {
          0%{transform:translate(0,0) scale(1);opacity:.40}
          33%{transform:translate(30px,-40px) scale(1.06);opacity:.50}
          66%{transform:translate(-25px,25px) scale(.94);opacity:.33}
          100%{transform:translate(0,0) scale(1);opacity:.40}
        }
        @keyframes mesh-drift-4 {
          0%{transform:translate(0,0) scale(1);opacity:.33}
          40%{transform:translate(20px,-30px) scale(1.07);opacity:.45}
          80%{transform:translate(-30px,20px) scale(.93);opacity:.26}
          100%{transform:translate(0,0) scale(1);opacity:.33}
        }

        /* ── Hero layout terpusat ── */
        .hero-centered {
          display:flex; flex-direction:column; align-items:center;
          text-align:center; position:relative; z-index:1;
          padding:3rem 0 4rem; max-width:680px; margin:0 auto;
        }
        .hero-stats-row {
          display:flex; flex-wrap:wrap; justify-content:center;
          gap:2.5rem; padding-top:1.5rem;
          border-top:1px solid rgba(39,110,241,0.15); width:100%;
          margin-top:2rem;
        }
      `}</style>

      <div className="container">
        <div className="hero-centered">

          {/* Section badge */}
          <span className="section-badge" style={{ marginBottom: "1.25rem" }}>
            <i className="ri-user-3-line" /> Fresh Graduate
          </span>

          {/* Heading */}
          <h1 className="heading-xl" style={{ marginBottom: "0.75rem", textAlign: "center" }}>
            Halo, Saya<br />
            <span className="text-blue">M. Sholihun</span>
          </h1>

          {/* Tagline singkat */}
          <p className="text-body" style={{ maxWidth: 480, marginBottom: "2rem", textAlign: "center" }}>
            Software Engineer berfokus pada pengembangan solusi digital yang inovatif dan terstruktur
          </p>

          {/* Tombol aksi */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "0.5rem", justifyContent: "center" }}>
            <a href="https://bit.ly/45UU7eK" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <i className="ri-download-line" /> Download CV
            </a>
            <a href="#proyek" className="btn btn-outline">
              Lihat Proyek <i className="ri-arrow-right-line" />
            </a>
            <a href="#ai-assistant" className="btn btn-outline">
              <i className="" /> Ask My AI
            </a>
          </div>

          {/* Stats */}
          <div className="hero-stats-row">
            {[
              ["15", "Proyek Selesai"],
              ["3",  "Tahun Pengalaman"],
              ["8",  "Sertifikasi"],
              ["5",  "Penghargaan"],
            ].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <p style={{ fontSize: "1.65rem", fontWeight: 800, color: "#041E42", lineHeight: 1 }}>
                  {n}<span style={{ color: "#276EF1" }}>+</span>
                </p>
                <p style={{ fontSize: "0.7rem", color: "#94a3b8", marginTop: "0.22rem" }}>{l}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
