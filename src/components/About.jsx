import { DataImage } from "../data";

export default function About() {
  const stats = [
    { n:"15+", l:"Proyek Selesai",   icon:"ri-folder-line" },
    { n:"3+",  l:"Tahun Pengalaman", icon:"ri-time-line" },
    { n:"8+",  l:"Sertifikasi",      icon:"ri-award-line" },
    { n:"5+",  l:"Penghargaan",      icon:"ri-trophy-line" },
  ];

  return (
    <section className="section sec-a" id="tentang">
      <div className="container">
        <div style={{
          display:"grid",
          gridTemplateColumns:"1fr",
          gap:"2.5rem",
          alignItems:"center",
        }} className="about-grid">

          {/* Photo */}
          <div style={{ display:"flex", justifyContent:"center" }}>
            <div style={{ position:"relative", maxWidth:320, width:"100%" }}>
              <div style={{
                position:"absolute", top:-10, left:-10,
                width:"100%", height:"100%",
                background:"rgba(39,110,241,0.12)",
                borderRadius:18, zIndex:0,
              }} />
              <img
                src={DataImage.HeroImage}
                alt="M. Sholihun"
                style={{
                  position:"relative", zIndex:1,
                  width:"100%", borderRadius:16,
                  boxShadow:"0 12px 40px rgba(39,110,241,0.15)",
                  border:"3px solid rgba(255,255,255,0.85)",
                  objectFit:"cover",
                }}
              />
              <div style={{
                position:"absolute", bottom:-14, right:-14, zIndex:2,
                background:"rgba(255,255,255,0.97)", backdropFilter:"blur(10px)",
                border:"1px solid rgba(39,110,241,0.12)",
                borderRadius:12, padding:"0.6rem 0.9rem",
                boxShadow:"0 4px 20px rgba(39,110,241,0.12)",
              }}>
                <p style={{ fontSize:"1.5rem", fontWeight:800, color:"#276EF1", lineHeight:1 }}>3+</p>
                <p style={{ fontSize:"0.68rem", color:"#64748b", marginTop:2 }}>Tahun<br/>Pengalaman</p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="section-badge">
              <i className="ri-user-heart-line"></i> Tentang Saya
            </span>
            <h2 className="heading-lg" style={{ marginBottom:"0.5rem" }}>
              Passionate Developer &amp;<br/>
              <span className="text-blue">Lifelong Learner</span>
            </h2>
            <div className="accent-line" />
            <p className="text-body" style={{ marginBottom:"0.85rem" }}>
              Saya merupakan pengembang perangkat lunak yang berdedikasi tinggi dengan rekam jejak dalam merancang 
              aplikasi berbasis web dan mobile yang tangguh. Melalui pengalaman kepemimpinan, kompetisi teknologi, dan sertifikasi lengkap di bidang Front-End & Back-End Development, saya berfokus menciptakan solusi perangkat lunak yang terintegrasi, efisien, dan siap pakai untuk industri maupun sektor publik.
            </p>
            {/* <p className="text-body" style={{ marginBottom:"1.75rem" }}>
              Berpengalaman dalam organisasi, kepanitiaan, dan kompetisi teknologi. Tersertifikasi
              Front-End &amp; Back-End Developer serta Pemrograman Kotlin dari Dicoding.
            </p> */}

            {/* Stats grid */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.75rem" }}>
              {stats.map(s => (
                <div key={s.l} className="card" style={{ padding:"0.9rem 1rem", display:"flex", alignItems:"center", gap:"0.75rem" }}>
                  <div style={{
                    width:36, height:36, background:"rgba(39,110,241,0.1)",
                    borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
                  }}>
                    <i className={`${s.icon}`} style={{ color:"#276EF1", fontSize:"1rem" }}></i>
                  </div>
                  <div>
                    <p style={{ fontSize:"1.15rem", fontWeight:800, color:"#041E42", lineHeight:1 }}>{s.n}</p>
                    <p style={{ fontSize:"0.68rem", color:"#64748b", marginTop:2 }}>{s.l}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .about-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
