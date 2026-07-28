import { useState, useEffect, useRef } from "react";
import { listAgenda } from "../data";

// Komponen overlay mandiri - render ke luar semua container
function Overlay({ src, alt, onClose }) {
  const overlayRef = useRef(null);

  // Inject elemen langsung ke <html> agar bebas dari semua stacking context
  useEffect(() => {
    const el = document.createElement("div");
    el.id = "agenda-lightbox-root";
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
      gap: "0px",
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
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: "1000000",
    });
    btn.onclick = onClose;

    // Image
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    Object.assign(img.style, {
      maxWidth: "88vw",
      maxHeight: "82vh",
      borderRadius: "10px",
      boxShadow: "0 10px 60px rgba(0,0,0,0.8)",
      display: "block",
    });
    img.onclick = (e) => e.stopPropagation();

    el.appendChild(img);
    el.appendChild(btn);
    document.documentElement.appendChild(el);

    // Escape key
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);

    return () => {
      document.documentElement.removeChild(el);
      window.removeEventListener("keydown", onKey);
    };
  }, [src, alt, onClose]);

  return null;
}

export default function Agenda() {
  const [active, setActive] = useState(null);

  return (
    <>
      {active && (
        <Overlay
          src={active.src}
          alt={active.alt}
          onClose={() => setActive(null)}
        />
      )}

      <section className="section sec-b" id="agenda">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2.75rem" }}>
            <span className="section-badge">
              <i className="ri-trophy-line"></i> Pencapaian
            </span>
            <h2 className="heading-lg">
              Agenda &amp; <span className="text-blue">Pencapaian</span>
            </h2>
            <p className="text-body" style={{ maxWidth: 420, margin: "0.5rem auto 0" }}>
              Beberapa agenda dan pencapaian selama masa perkuliahan.{" "}
              <span style={{ color: "#276EF1", fontWeight: 600 }}>
                Klik gambar untuk memperbesar.
              </span>
            </p>
          </div>

          <div
            className="agenda-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1rem" }}
          >
            {listAgenda.map((a) => (
              <div
                key={a.id}
                className="card"
                style={{ overflow: "hidden", cursor: "pointer" }}
                onClick={() => setActive({ src: a.gambar, alt: a.nama })}
              >
                <img
                  src={a.gambar}
                  alt={a.nama}
                  loading="lazy"
                  style={{
                    display: "block",
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                  }}
                />
                <div style={{ padding: "0.7rem 0.85rem 0.85rem" }}>
                  <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#041E42", margin: "0 0 0.2rem" }}>
                    {a.nama}
                  </p>
                  <p style={{
                    fontSize: "0.67rem", color: "#64748b", lineHeight: 1.5, margin: 0,
                    overflow: "hidden", display: "-webkit-box",
                    WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                  }}>
                    {a.desk}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (min-width: 640px)  { .agenda-grid { grid-template-columns: repeat(3,1fr) !important; } }
          @media (min-width: 1024px) { .agenda-grid { grid-template-columns: repeat(4,1fr) !important; } }
        `}</style>
      </section>
    </>
  );
}
