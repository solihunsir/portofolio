import { listTools } from "../data";

export default function Skills() {
  return (
    <section className="section sec-b" id="tools">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:"2.75rem" }}>
          <span className="section-badge">
            <i className="ri-tools-line"></i> Tech Stack
          </span>
          <h2 className="heading-lg">
            Tools yang <span className="text-blue">Saya Pakai</span>
          </h2>
          <p className="text-body" style={{ maxWidth:420, margin:"0.5rem auto 0" }}>
            Teknologi dan tools yang biasa saya gunakan untuk membangun Website maupun Mobile App.
          </p>
        </div>

        {/* Grid: 2 → 3 → 4 → 6 cols */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(3, 1fr)",
          gap:"0.875rem",
        }} className="skills-grid">
          {listTools.map(tool => (
            <div key={tool.id} className="card" style={{ padding:"1rem 0.75rem", display:"flex", flexDirection:"column", alignItems:"center", gap:"0.65rem" }}>
              <div style={{
                width:46, height:46,
                background:"rgba(255,255,255,0.8)",
                borderRadius:12, padding:8,
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>
                <img src={tool.gambar} alt={tool.nama} style={{ width:"100%", height:"100%", objectFit:"contain" }} loading="lazy" />
              </div>
              <div style={{ textAlign:"center" }}>
                <p style={{ fontSize:"0.72rem", fontWeight:700, color:"#041E42", lineHeight:1.3 }}>{tool.nama}</p>
                <p style={{ fontSize:"0.63rem", color:"#94a3b8", marginTop:2 }}>{tool.ket}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 480px)  { .skills-grid { grid-template-columns: repeat(4,1fr) !important; } }
        @media (min-width: 768px)  { .skills-grid { grid-template-columns: repeat(6,1fr) !important; } }
      `}</style>
    </section>
  );
}
