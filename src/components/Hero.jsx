import { useState, useEffect } from "react";
import { DataImage } from "../data";

const CV = "https://bit.ly/4fsgT26";

export default function Hero() {
  const [showOTW, setShowOTW] = useState(false);

  return (
    <section className="hero-section" id="beranda">
      {/* Cloud blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="container">
        <div className="hero-grid">

          {/* ── LEFT: Text ── */}
          <div>
            <span className="section-badge">
              <i className="ri-user-3-line"></i> Fresh Graduate
            </span>

            <h1 className="heading-xl" style={{ marginBottom:"0.5rem" }}>
              Halo, Saya<br />
              <span className="text-blue">M. Sholihun</span>
            </h1>

            <p style={{ fontWeight:600, fontSize:"0.95rem", color:"#475569", marginBottom:"0.9rem" }}>
              Mobile &amp; Web Developer
            </p>

            <p className="text-body" style={{ maxWidth:440, marginBottom:"1.75rem" }}>
              Fresh Graduate Teknik Informatika di Politeknik Negeri Bengkalis.
              Berpengalaman dalam pengembangan aplikasi mobile &amp; web, serta aktif di
              organisasi, kompetisi, dan Coding Camp DBS Foundation 2025.
            </p>

            {/* Buttons */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:"0.75rem", marginBottom:"2.25rem" }}>
              <a href={CV} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <i className="ri-download-line"></i> Download CV
              </a>
              <a href="#proyek" className="btn btn-outline">
                Lihat Proyek <i className="ri-arrow-right-line"></i>
              </a>
            </div>

            {/* Stats */}
            <div style={{
              display:"flex", flexWrap:"wrap", gap:"2rem",
              paddingTop:"1.5rem",
              borderTop:"1px solid rgba(39,110,241,0.15)",
            }}>
              {[["15","Proyek Selesai"],["3","Tahun Pengalaman"],["8","Sertifikasi"]].map(([n,l]) => (
                <div key={l}>
                  <p style={{ fontSize:"1.7rem", fontWeight:800, color:"#041E42", lineHeight:1 }}>
                    {n}<span style={{ color:"#276EF1" }}>+</span>
                  </p>
                  <p style={{ fontSize:"0.72rem", color:"#94a3b8", marginTop:"0.2rem" }}>{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Photo – top-right, floating ── */}
          <div style={{
            display:"flex",
            justifyContent:"flex-end",
            alignItems:"flex-start",
            paddingTop:"0.5rem",
          }}>
            <div style={{ position:"relative", animation:"float-up 5s ease-in-out infinite" }}>

              {/* Photo */}
              <div
                onClick={() => setShowOTW(v => !v)}
                title="Klik untuk melihat status"
                style={{
                  position:"relative",
                  width: "clamp(220px, 22vw, 300px)",
                  aspectRatio:"3/4",
                  borderRadius:20,
                  overflow:"hidden",
                  cursor:"pointer",
                  boxShadow:"0 20px 60px rgba(39,110,241,0.18), 0 4px 16px rgba(0,0,0,0.07)",
                  border:"3px solid rgba(255,255,255,0.88)",
                  flexShrink:0,
                }}
              >
                <img
                  src={DataImage.HeroImage}
                  alt="M. Sholihun"
                  style={{
                    width:"100%", height:"100%",
                    objectFit:"cover", objectPosition:"center top",
                    transition:"transform 0.4s ease",
                    transform: showOTW ? "scale(1.06)" : "scale(1)",
                  }}
                />

                {/* Open To Work overlay */}
                {showOTW && (
                  <div
                    onClick={e => { e.stopPropagation(); setShowOTW(false); }}
                    style={{
                      position:"absolute", inset:0,
                      background:"linear-gradient(145deg,rgba(4,30,66,0.9),rgba(39,110,241,0.88))",
                      display:"flex", flexDirection:"column", alignItems:"center",
                      justifyContent:"center", gap:"0.6rem",
                      animation:"otw-in 0.25s ease",
                      cursor:"pointer",
                    }}
                  >
                    <span style={{
                      width:12, height:12, borderRadius:"50%",
                      background:"#22c55e", display:"block",
                      animation:"otw-pulse 2s ease-in-out infinite",
                    }} />
                    <p style={{
                      color:"#fff", fontWeight:800, textAlign:"center",
                      fontSize:"clamp(1rem,3vw,1.4rem)", lineHeight:1.2,
                      animation:"otw-swing 2s ease-in-out infinite",
                      display:"inline-block",
                    }}>
                      Open To Work
                    </p>
                    <p style={{ color:"rgba(255,255,255,0.5)", fontSize:"0.68rem" }}>
                      Klik untuk menutup
                    </p>
                  </div>
                )}
              </div>

              {/* Status badge – bottom-left of photo */}
              {!showOTW && (
                <div style={{
                  position:"absolute", bottom:"-1rem", left:"-1.25rem",
                  background:"rgba(255,255,255,0.97)", backdropFilter:"blur(10px)",
                  border:"1px solid rgba(39,110,241,0.12)",
                  borderRadius:12, padding:"0.55rem 0.85rem",
                  display:"flex", alignItems:"center", gap:"0.55rem",
                  boxShadow:"0 4px 20px rgba(39,110,241,0.12)",
                  zIndex:5,
                }}>
                  <div style={{
                    width:30, height:30, background:"#EEF3FE",
                    borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center",
                  }}>
                    <i className="ri-briefcase-4-line" style={{ color:"#276EF1", fontSize:"0.85rem" }}></i>
                  </div>
                  <div>
                    <p style={{ fontSize:"0.58rem", color:"#94a3b8", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em" }}>Status</p>
                    <p style={{ fontSize:"0.72rem", fontWeight:700, color:"#041E42" }}>Open to Work</p>
                  </div>
                </div>
              )}

              {/* Year badge – top-right of photo */}
              <div style={{
                position:"absolute", top:"-0.7rem", right:"-0.7rem",
                background:"#276EF1", color:"#fff",
                borderRadius:9, padding:"0.3rem 0.65rem",
                fontSize:"0.67rem", fontWeight:700,
                boxShadow:"0 3px 10px rgba(39,110,241,0.35)",
                zIndex:5,
              }}>
                2025 🎓
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
