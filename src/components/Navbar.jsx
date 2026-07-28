import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "#beranda", label: "Beranda"  },
  { href: "#tentang", label: "Tentang"  },
  { href: "#tools",   label: "Skills"   },
  { href: "#proyek",  label: "Proyek"   },
  { href: "#agenda",  label: "Agenda"   },
  { href: "#kontak",  label: "Kontak"   },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="container">
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>

          {/* Logo */}
          <a href="#beranda" style={{ display:"flex", alignItems:"center", gap:"0.5rem", textDecoration:"none" }}>
            {/* <span style={{
              width:30, height:30, background:"#276EF1", borderRadius:8,
              display:"flex", alignItems:"center", justifyContent:"center",
              color:"#fff", fontWeight:800, fontSize:"0.8rem", flexShrink:0,
            }}>S</span> */}
            <span style={{ fontWeight:800, fontSize:"1rem", color:"#041E42", letterSpacing:"-0.01em" }}>
              Sholihun<span style={{ color:"#276EF1" }}>.</span>
            </span>
          </a>

          {/* Desktop links */}
          <div style={{ display:"flex", alignItems:"center", gap:"0.25rem" }} className="nav-desktop">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} style={{
                padding:"0.45rem 0.85rem", borderRadius:8, fontSize:"0.85rem",
                fontWeight:500, color:"#334155", textDecoration:"none",
                transition:"all 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.color="#276EF1"; e.currentTarget.style.background="rgba(255,255,255,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.color="#334155"; e.currentTarget.style.background="transparent"; }}
              >
                {l.label}
              </a>
            ))}
            {/* <a href="https://bit.ly/4fsgT26" target="_blank" rel="noopener noreferrer"
              className="btn btn-primary" style={{ marginLeft:"0.5rem", padding:"0.45rem 1.1rem", fontSize:"0.82rem" }}>
              Download CV
            </a> */}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(!open)} className="nav-hamburger" style={{
            display:"none", border:"none", background:"transparent",
            cursor:"pointer", padding:"0.4rem", borderRadius:8,
            color:"#334155", fontSize:"1.3rem",
          }}
            aria-label="Menu"
          >
            <i className={open ? "ri-close-line" : "ri-menu-line"}></i>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div style={{
            marginTop:"0.75rem", background:"rgba(255,255,255,0.95)", backdropFilter:"blur(12px)",
            border:"1px solid rgba(255,255,255,0.85)", borderRadius:14,
            boxShadow:"0 8px 32px rgba(4,30,66,0.1)", padding:"0.75rem",
          }}>
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
                display:"block", padding:"0.65rem 1rem", borderRadius:9,
                fontSize:"0.875rem", fontWeight:500, color:"#334155", textDecoration:"none",
                transition:"all 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background="#EEF3FE"; e.currentTarget.style.color="#276EF1"; }}
                onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#334155"; }}
              >
                {l.label}
              </a>
            ))}
            <div style={{ padding:"0.5rem 0.25rem 0.25rem" }}>
              <a href="https://bit.ly/4fsgT26" target="_blank" rel="noopener noreferrer"
                className="btn btn-primary" style={{ width:"100%", justifyContent:"center" }}>
                Download CV
              </a>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .nav-desktop  { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
