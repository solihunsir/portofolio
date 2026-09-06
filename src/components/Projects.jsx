import { useState, useEffect, useRef } from "react";
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
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
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
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [dotIndex, setDotIndex] = useState(0);

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const colWRef = useRef(0);
  const autoRef = useRef(null);
  const idleRef = useRef(null);
  const hoveredRef = useRef(false);
  const inViewRef = useRef(false);
  const dirRef = useRef(1);

  // Total kolom disesuaikan dengan jumlah proyek
  const TOTAL_COLS = listProyek.length;

  const updateBounds = () => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const sl = track.scrollLeft;

    setAtStart(sl <= 4);
    setAtEnd(sl >= maxScroll - 4);

    const cw = colWRef.current;
    if (cw > 0) {
      const col = Math.round(sl / cw);
      setDotIndex(Math.min(col, TOTAL_COLS - 1));
    }
  };

  const measureCol = () => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".prj-card");
    if (!card) return;
    const gap = parseFloat(getComputedStyle(track).gap) || 20;
    colWRef.current = card.getBoundingClientRect().width + gap;
    updateBounds();
  };

  useEffect(() => {
    const tid = setTimeout(measureCol, 150);
    window.addEventListener("resize", measureCol);
    return () => { clearTimeout(tid); window.removeEventListener("resize", measureCol); };
  }, []);

  const stopAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = null;
  };

  const startAuto = () => {
    if (autoRef.current) return;
    autoRef.current = setInterval(() => {
      const track = trackRef.current;
      if (!track || hoveredRef.current) return;

      const maxScroll = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= maxScroll - 2) {
        dirRef.current = -1;
      } else if (track.scrollLeft <= 2) {
        dirRef.current = 1;
      }
      track.scrollLeft += dirRef.current;
    }, 25);
  };

  const scheduleAuto = () => {
    clearTimeout(idleRef.current);
    idleRef.current = setTimeout(() => {
      if (inViewRef.current && !hoveredRef.current) {
        const track = trackRef.current;
        if (!track) return;
        const maxScroll = track.scrollWidth - track.clientWidth;
        // Hanya jalan jika data lebih dari 3 (track bisa di-scroll)
        if (maxScroll > 0 && listProyek.length > 3) startAuto();
      }
    }, 0);
  };

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting;
      if (entry.isIntersecting) {
        scheduleAuto();
      } else {
        stopAuto();
        clearTimeout(idleRef.current);
      }
    }, { threshold: 0.25 });

    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => {
      obs.disconnect();
      stopAuto();
      clearTimeout(idleRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEnter = () => {
    hoveredRef.current = true;
    stopAuto();
    clearTimeout(idleRef.current);
  };
  const onLeave = () => {
    hoveredRef.current = false;
    scheduleAuto();
  };

  const scrollStep = (dir) => {
    if (!trackRef.current || !colWRef.current) return;
    trackRef.current.scrollBy({
      left: dir * colWRef.current,
      behavior: "smooth",
    });
    dirRef.current = dir;
    stopAuto();
    scheduleAuto();
  };

  const isCarousel = listProyek.length > 3;

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

      <section ref={sectionRef} className="section sec-a" id="proyek">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2.75rem" }}>
            <span className="section-badge">
              <i className="ri-code-box-line"></i> Portfolio
            </span>
            <h2 className="heading-lg">
              Proyek 
            </h2>
            <p className="text-body" style={{ maxWidth: 380, margin: "0.5rem auto 0" }}>
              Berikut beberapa proyek yang telah saya kerjakan.{" "}
            </p>
          </div>

          <div className="prj-shell">
            {isCarousel && (
              <>
                <button
                  className={`prj-nav-btn prj-prev${atStart ? " prj-btn-hidden" : ""}`}
                  onClick={() => scrollStep(-1)}
                  disabled={atStart}
                  aria-label="Sebelumnya"
                >
                  <i className="ri-arrow-left-s-line" />
                </button>

                <button
                  className={`prj-nav-btn prj-next${atEnd ? " prj-btn-hidden" : ""}`}
                  onClick={() => scrollStep(1)}
                  disabled={atEnd}
                  aria-label="Berikutnya"
                >
                  <i className="ri-arrow-right-s-line" />
                </button>
                
                {!atStart && <div className="prj-fade prj-fade-l" aria-hidden="true" />}
                {!atEnd   && <div className="prj-fade prj-fade-r" aria-hidden="true" />}
              </>
            )}

            <div
              ref={trackRef}
              className={`prj-track ${!isCarousel ? "prj-track-center" : ""}`}
              onScroll={updateBounds}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              onTouchStart={onEnter}
              onTouchEnd={onLeave}
            >
              {listProyek.map((p) => (
                <div key={p.id} className="card prj-card" style={{ overflow: "hidden", borderLeft: "3px solid #276EF1", display: "flex", flexDirection: "column" }}>
                  <div
                    onClick={() => setActive({ src: p.gambar, alt: p.nama, link: p.link })}
                    style={{ cursor: "zoom-in" }}
                  >
                    <img
                      src={p.gambar}
                      alt={p.nama}
                      loading="lazy"
                      draggable="false"
                      style={{
                        display: "block",
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                  <div style={{ padding: "1.1rem 1.2rem 1.2rem", flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3 className="heading-sm" style={{ marginBottom: "0.35rem" }}>{p.nama}</h3>
                    <p style={{ fontSize: "0.8rem", color: "#64748b", lineHeight: 1.65, marginBottom: "0.85rem", flex: 1 }}>
                      {p.desk}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
                      {p.tools.map((t) => <span key={t} className="tag">{t}</span>)}
                    </div>
                    <a
                      href={p.link} target="_blank" rel="noopener noreferrer"
                      className="btn btn-outline"
                      style={{ width: "100%", justifyContent: "center", fontSize: "0.8rem", marginTop: "auto" }}
                    >
                      <i className="ri-github-line"></i> Lihat Repository
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isCarousel && (
            <div style={{ display: "flex", justifyContent: "center", gap: "0.45rem", marginTop: "1.4rem" }}>
              {Array.from({ length: TOTAL_COLS }).map((_, i) => (
                <button
                  key={i}
                  className={`prj-dot${i === dotIndex ? " prj-dot-active" : ""}`}
                  aria-label={`Pergi ke kolom ${i + 1}`}
                  onClick={() => {
                    if (!trackRef.current || !colWRef.current) return;
                    trackRef.current.scrollTo({
                      left: i * colWRef.current,
                      behavior: "smooth",
                    });
                    stopAuto();
                    scheduleAuto();
                  }}
                />
              ))}
            </div>
          )}

        </div>

        <style>{`
          .prj-shell {
            position: relative;
          }

          .prj-track {
            display: grid;
            grid-auto-flow: column;
            grid-auto-columns: calc(33.333% - 0.834rem);
            gap: 1.25rem;
            overflow-x: scroll;
            overflow-y: hidden;
            scrollbar-width: none;
            -ms-overflow-style: none;
            -webkit-overflow-scrolling: touch;
            cursor: grab;
            user-select: none;
            padding: 0.25rem 0.125rem 0.5rem;
          }
          .prj-track-center {
            justify-content: center;
          }
          .prj-track::-webkit-scrollbar { display: none; }
          .prj-track:active { cursor: grabbing; }

          .prj-nav-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 15;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            border: 1.5px solid rgba(39,110,241,0.22);
            background: rgba(255,255,255,0.88);
            backdrop-filter: blur(10px);
            color: #276EF1;
            font-size: 1.5rem;
            line-height: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background 0.2s, color 0.2s, transform 0.2s,
                        box-shadow 0.2s, opacity 0.3s;
            box-shadow: 0 2px 14px rgba(39,110,241,0.13);
          }
          .prj-nav-btn:hover:not(:disabled) {
            background: #276EF1;
            color: #fff;
            transform: translateY(-50%) scale(1.1);
            box-shadow: 0 4px 18px rgba(39,110,241,0.3);
          }
          .prj-btn-hidden {
            opacity: 0;
            pointer-events: none;
          }
          .prj-prev { left: -14px; }
          .prj-next { right: -14px; }

          .prj-fade {
            position: absolute;
            top: 0; bottom: 0;
            width: 40px;
            pointer-events: none;
            z-index: 10;
          }
          .prj-fade-l {
            left: 0;
            background: linear-gradient(to right, rgba(255,255,255,1), transparent);
          }
          .prj-fade-r {
            right: 0;
            background: linear-gradient(to left, rgba(255,255,255,1), transparent);
          }

          .prj-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            border: none;
            background: rgba(39,110,241,0.2);
            cursor: pointer;
            padding: 0;
            transition: background 0.3s, transform 0.25s, width 0.25s;
          }
          .prj-dot:hover { background: rgba(39,110,241,0.45); }
          .prj-dot-active {
            background: #276EF1;
            width: 20px;
            border-radius: 4px;
            transform: scaleY(1.1);
          }

          @media (max-width: 1024px) {
            .prj-track { grid-auto-columns: calc(50% - 0.625rem); }
          }
          @media (max-width: 640px) {
            .prj-track { grid-auto-columns: 85%; }
            .prj-prev { left: 4px; }
            .prj-next { right: 4px; }
          }
        `}</style>
      </section>
    </>
  );
}
