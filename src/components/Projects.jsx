import { useState, useEffect } from "react";
import { listProyek } from "../data";

function Overlay({ src, alt, link, onClose }) {
  useEffect(() => {
    const el = document.createElement("div");
    el.id = "proyek-lightbox-root";
    Object.assign(el.style, {
      position: "fixed",
      inset: "0",
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.88)",
      zIndex: "999999",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "12px",
    });
    el.onclick = (e) => { if (e.target === el) onClose(); };

    // Close button
    const btn = document.createElement("button");
    btn.textContent = "✕";
    Object.assign(btn.style, {
      position: "fixed",
      top: "16px",
      right: "16px",
      width: "42px",
      height: "42px",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.2)",
      border: "1.5px solid rgba(255,255,255,0.5)",
      color: "#fff",
      fontSize: "20px",
      cursor: "pointer",
      zIndex: "1000000",
    });
    btn.onclick = onClose;

    // Image
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    Object.assign(img.style, {
      maxWidth: "88vw",
      maxHeight: "74vh",
      borderRadius: "10px",
      boxShadow: "0 10px 60px rgba(0,0,0,0.8)",
      display: "block",
    });
    img.onclick = (e) => e.stopPropagation();

    // Caption
    const cap = document.createElement("p");
    cap.textContent = alt;
    Object.assign(cap.style, {
      color: "#fff",
      fontSize: "14px",
      fontWeight: "600",
      margin: "0",
      textAlign: "center",
    });
    cap.onclick = (e) => e.stopPropagation();

    // Link
    const a = document.createElement("a");
    a.href = link;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = "Lihat Repository";
    Object.assign(a.style, {
      background: "#276EF1",
      color: "#fff",
      padding: "8px 20px",
      borderRadius: "8px",
      fontSize: "13px",
      fontWeight: "700",
      textDecoration: "none",
      display: "inline-block",
    });
    a.onclick = (e) => e.stopPropagation();

    el.appendChild(img);
    el.appendChild(cap);
    el.appendChild(a);
    el.appendChild(btn);
    document.documentElement.appendChild(el);

    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);

    return () => {
      document.documentElement.removeChild(el);
      window.removeEventListener("keydown", onKey);
    };
  }, [src, alt, link, onClose]);

  return null;
}

export default function Projects() {
  const [active, setActive] = useState(null);

  return (
    <>
      {active && (
        <Overlay
          src={active.src}
          alt={active.alt}
          link={active.link}
          onClose={() => setActive(null)}
        />
      )}

      <section className="section sec-a" id="proyek">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2.75rem" }}>
            <span className="section-badge">
              <i className="ri-code-box-line"></i> Portfolio
            </span>
            <h2 className="heading-lg">
              Proyek <span className="text-blue">Saya</span>
            </h2>
            <p className="text-body" style={{ maxWidth: 380, margin: "0.5rem auto 0" }}>
              Berikut beberapa proyek yang telah saya kerjakan.{" "}
              <span style={{ color: "#276EF1", fontWeight: 600 }}>
                Klik gambar untuk memperbesar.
              </span>
            </p>
          </div>

          <div
            className="projects-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }}
          >
            {listProyek.map((p) => (
              <div key={p.id} className="card" style={{ overflow: "hidden", borderLeft: "3px solid #276EF1" }}>
                <div
                  onClick={() => setActive({ src: p.gambar, alt: p.nama, link: p.link })}
                  style={{ cursor: "zoom-in" }}
                >
                  <img
                    src={p.gambar}
                    alt={p.nama}
                    loading="lazy"
                    style={{
                      display: "block",
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div style={{ padding: "1.1rem 1.2rem 1.2rem" }}>
                  <h3 className="heading-sm" style={{ marginBottom: "0.35rem" }}>{p.nama}</h3>
                  <p style={{ fontSize: "0.8rem", color: "#64748b", lineHeight: 1.65, marginBottom: "0.85rem" }}>
                    {p.desk}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
                    {p.tools.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <a
                    href={p.link} target="_blank" rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{ width: "100%", justifyContent: "center", fontSize: "0.8rem" }}
                  >
                    <i className="ri-github-line"></i> Lihat Repository
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (min-width: 640px)  { .projects-grid { grid-template-columns: repeat(2,1fr) !important; } }
          @media (min-width: 1024px) { .projects-grid { grid-template-columns: repeat(3,1fr) !important; } }
        `}</style>
      </section>
    </>
  );
}
