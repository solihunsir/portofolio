export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { href:"#beranda", l:"Beranda" }, { href:"#tentang", l:"Tentang" },
    { href:"#proyek",  l:"Proyek"  }, { href:"#agenda",  l:"Agenda"  },
    { href:"#kontak",  l:"Kontak"  },
  ];
  const socials = [
    { href:"https://github.com/solihunsir",          icon:"ri-github-fill",    label:"GitHub" },
    { href:"https://www.instagram.com/solihunsir",   icon:"ri-instagram-fill", label:"Instagram" },
    { href:"https://www.linkedin.com/in/m-sholihun", icon:"ri-linkedin-fill",  label:"LinkedIn" },
    { href:"https://www.youtube.com/@solihunsir",    icon:"ri-youtube-fill",   label:"YouTube" },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:"2rem" }} className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginBottom:"0.75rem" }}>
              <span style={{
                width:30, height:30, background:"#276EF1",
                borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center",
                color:"#fff", fontWeight:800, fontSize:"0.8rem", flexShrink:0,
              }}>S</span>
              <span style={{ fontWeight:800, fontSize:"1rem", color:"#fff" }}>
                Sholihun<span style={{ color:"#60a5fa" }}>.</span>
              </span>
            </div>
            <p style={{ fontSize:"0.8rem", color:"#94a3b8", lineHeight:1.65, maxWidth:240, marginBottom:"1rem" }}>
              Fresh Graduate Teknik Informatika yang bersemangat membangun solusi digital berdampak.
            </p>
            <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap" }}>
              {socials.map(s => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  style={{
                    width:32, height:32, borderRadius:8,
                    background:"rgba(255,255,255,0.08)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    color:"#94a3b8", fontSize:"0.95rem", textDecoration:"none",
                    transition:"all 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background="#276EF1"; e.currentTarget.style.color="#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.08)"; e.currentTarget.style.color="#94a3b8"; }}
                >
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p style={{ fontSize:"0.65rem", fontWeight:700, color:"#fff", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"0.75rem" }}>
              Navigasi
            </p>
            <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:"0.5rem" }}>
              {links.map(l => (
                <li key={l.href}>
                  <a href={l.href} style={{
                    fontSize:"0.82rem", color:"#94a3b8", textDecoration:"none", transition:"color 0.15s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.color="#60a5fa"}
                    onMouseLeave={e => e.currentTarget.style.color="#94a3b8"}
                  >
                    {l.l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize:"0.65rem", fontWeight:700, color:"#fff", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"0.75rem" }}>
              Kontak
            </p>
            <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:"0.6rem" }}>
              <li style={{ display:"flex", alignItems:"center", gap:"0.5rem", fontSize:"0.8rem", color:"#94a3b8" }}>
                <i className="ri-mail-line" style={{ color:"#60a5fa", flexShrink:0 }}></i>
                solihun.bks2019@gmail.com
              </li>
              <li style={{ display:"flex", alignItems:"center", gap:"0.5rem", fontSize:"0.8rem", color:"#94a3b8" }}>
                <i className="ri-map-pin-line" style={{ color:"#60a5fa", flexShrink:0 }}></i>
                Bengkalis, Riau, Indonesia
              </li>
              <li style={{ marginTop:"0.5rem" }}>
                <a href="https://bit.ly/4fsgT26" target="_blank" rel="noopener noreferrer"
                  className="btn btn-primary" style={{ fontSize:"0.78rem", padding:"0.45rem 1rem" }}>
                  <i className="ri-download-line"></i> Download CV
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop:"1px solid rgba(255,255,255,0.08)",
          marginTop:"2.5rem", paddingTop:"1.5rem",
          display:"flex", flexWrap:"wrap", justifyContent:"space-between", gap:"0.5rem",
        }}>
          <p style={{ fontSize:"0.75rem", color:"#475569" }}>© {year} M. Sholihun. All rights reserved.</p>
          <p style={{ fontSize:"0.75rem", color:"#475569" }}>Made with <span style={{ color:"#f87171" }}>❤</span> using React &amp; Vite</p>
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) { .footer-grid { grid-template-columns: 2fr 1fr 1fr !important; } }
      `}</style>
    </footer>
  );
}
