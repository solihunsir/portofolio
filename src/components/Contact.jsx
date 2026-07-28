export default function Contact() {
  const socials = [
    { icon:"ri-mail-line",      label:"Email",     val:"solihun.bks2019@gmail.com",      href:null },
    { icon:"ri-github-line",    label:"GitHub",    val:"github.com/solihunsir",           href:"https://github.com/solihunsir" },
    { icon:"ri-linkedin-line",  label:"LinkedIn",  val:"linkedin.com/in/m-sholihun",      href:"https://www.linkedin.com/in/m-sholihun" },
    { icon:"ri-instagram-line", label:"Instagram", val:"@sholihunnn",                     href:"https://www.instagram.com/sholihunnn" },
  ];

  return (
    <section className="section sec-a" id="kontak">
      <div className="container">
        <div style={{ maxWidth:860, margin:"0 auto" }}>

          {/* Header */}
          <div style={{ textAlign:"center", marginBottom:"2.75rem" }}>
            <span className="section-badge">
              <i className="ri-mail-line"></i> Kontak
            </span>
            <h2 className="heading-lg">
              Mari <span className="text-blue">Terhubung</span>
            </h2>
            <p className="text-body" style={{ maxWidth:360, margin:"0.5rem auto 0" }}>
              Tertarik untuk berkolaborasi? Saya siap merespons pesan Anda.
            </p>
          </div>

          {/* Grid */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:"1.25rem" }} className="contact-grid">

            {/* Left – contact info */}
            <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
              {socials.map(s => (
                <div key={s.label} className="card" style={{
                  padding:"0.85rem 1rem", display:"flex", alignItems:"center", gap:"0.85rem",
                  borderLeft: "3px solid rgba(39,110,241,0.5)",
                  boxShadow: "0 2px 8px rgba(39,110,241,0.06)",
                  transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderLeftColor="#276EF1"; e.currentTarget.style.boxShadow="0 4px 18px rgba(39,110,241,0.15)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderLeftColor="rgba(39,110,241,0.5)"; e.currentTarget.style.boxShadow="0 2px 8px rgba(39,110,241,0.06)"; }}
                >
                  <div style={{
                    width:38, height:38, background:"rgba(39,110,241,0.1)",
                    borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
                  }}>
                    <i className={s.icon} style={{ color:"#276EF1", fontSize:"1rem" }}></i>
                  </div>
                  <div style={{ minWidth:0 }}>
                    <p style={{ fontSize:"0.63rem", fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.06em" }}>
                      {s.label}
                    </p>
                    {s.href ? (
                      <a href={s.href} target="_blank" rel="noopener noreferrer" style={{
                        fontSize:"0.82rem", fontWeight:600, color:"#041E42",
                        textDecoration:"none", overflow:"hidden", textOverflow:"ellipsis",
                        whiteSpace:"nowrap", display:"block",
                        transition:"color 0.15s",
                      }}
                        onMouseEnter={e => e.currentTarget.style.color="#276EF1"}
                        onMouseLeave={e => e.currentTarget.style.color="#041E42"}
                      >
                        {s.val}
                      </a>
                    ) : (
                      <p style={{ fontSize:"0.82rem", fontWeight:600, color:"#041E42", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                        {s.val}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right – form */}
            <form
              action="https://formsubmit.co/solihun.bks2019@gmail.com"
              method="POST"
              autoComplete="off"
              style={{
                background:"rgba(255,255,255,0.97)",
                border:"1.5px solid rgba(39,110,241,0.2)",
                borderTop: "3px solid #276EF1",
                borderRadius:16,
                padding:"1.75rem",
                boxShadow:"0 6px 32px rgba(39,110,241,0.1)",
              }}
            >
              <h3 className="heading-sm" style={{ marginBottom:"1.25rem" }}>Kirim Pesan</h3>

              <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
                {[
                  { id:"nama",  type:"text",  label:"Nama Lengkap", placeholder:"Masukkan nama Anda" },
                  { id:"email", type:"email", label:"Email",        placeholder:"Masukkan email Anda" },
                ].map(f => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="input-label">{f.label}</label>
                    <input type={f.type} id={f.id} name={f.id} placeholder={f.placeholder} required className="input-field" />
                  </div>
                ))}
                <div>
                  <label htmlFor="pesan" className="input-label">Pesan</label>
                  <textarea id="pesan" name="pesan" rows={4} placeholder="Tuliskan pesan Anda di sini…" required className="input-field" style={{ resize:"none" }} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width:"100%", justifyContent:"center", padding:"0.7rem 1rem" }}>
                  <i className="ri-send-plane-line"></i> Kirim Pesan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .contact-grid { grid-template-columns: 2fr 3fr !important; }
        }
      `}</style>
    </section>
  );
}
