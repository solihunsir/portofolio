import { useState, useEffect, useRef } from "react";
import { listAgenda } from "../data";

// Komponen overlay mandiri - render ke luar semua container
function Overlay({ src, alt, onClose }) {
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
  const [active,   setActive]   = useState(null);
  const [atStart,  setAtStart]  = useState(true);   // scroll posisi paling kiri
  const [atEnd,    setAtEnd]    = useState(false);   // scroll posisi paling kanan
  const [dotIndex, setDotIndex] = useState(0);       // kolom aktif untuk dot indicator

  const sectionRef = useRef(null);
  const trackRef   = useRef(null);
  const colWRef    = useRef(0);
  const autoRef    = useRef(null);
  const idleRef    = useRef(null);
  const hoveredRef = useRef(false);
  const inViewRef  = useRef(false);
  const dirRef     = useRef(1);

  /* ── Total kolom dengan layout 2 baris ── */
  const TOTAL_COLS = Math.ceil(listAgenda.length / 2);

  /* ── Hitung batas scroll & update state ── */
  const updateBounds = () => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const sl = track.scrollLeft;

    setAtStart(sl <= 4);
    setAtEnd(sl >= maxScroll - 4);

    // Dot indicator: kolom berapa yang sedang ditampilkan di tengah
    const cw = colWRef.current;
    if (cw > 0) {
      const col = Math.round(sl / cw);
      setDotIndex(Math.min(col, TOTAL_COLS - 1));
    }
  };

  /* ── Ukur lebar kolom ── */
  const measureCol = () => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".ac-card");
    if (!card) return;
    const gap = parseFloat(getComputedStyle(track).gap) || 16;
    colWRef.current = card.getBoundingClientRect().width + gap;
    updateBounds();
  };

  useEffect(() => {
    const tid = setTimeout(measureCol, 150);
    window.addEventListener("resize", measureCol);
    return () => { clearTimeout(tid); window.removeEventListener("resize", measureCol); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Auto-scroll helpers ── */
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
        if (maxScroll > 0) startAuto();
      }
    }, 0);
  };

  /* ── IntersectionObserver ── */
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

  /* ── Mouse / Touch handlers ── */
  const onEnter = () => {
    hoveredRef.current = true;
    stopAuto();
    clearTimeout(idleRef.current);
  };
  const onLeave = () => {
    hoveredRef.current = false;
    scheduleAuto();
  };

  /* ── Prev / Next navigation ── */
  const scrollStep = (dir) => {
    if (!trackRef.current || !colWRef.current) return;
    trackRef.current.scrollBy({
      left: dir * colWRef.current * 3,
      behavior: "smooth",
    });
    dirRef.current = dir;
    stopAuto();
    scheduleAuto();
  };

  return (
    <>
      {active && (
        <Overlay
          src={active.src}
          alt={active.alt}
          onClose={() => setActive(null)}
        />
      )}

      <section ref={sectionRef} className="section sec-b" id="agenda">
        <div className="container">

          {/* ── Section header ── */}
          <div style={{ textAlign: "center", marginBottom: "2.75rem" }}>
            <span className="section-badge">
              <i className="ri-trophy-line" /> Pencapaian
            </span>
            <h2 className="heading-lg">
              Agenda &amp; <span className="text-blue">Pencapaian</span>
            </h2>
            <p className="text-body" style={{ maxWidth: 420, margin: "0.5rem auto 0" }}>
              Beberapa agenda dan pencapaian selama masa perkuliahan.
            </p>
          </div>

          {/* ── Carousel shell ── */}
          <div className="ac-shell">

            {/* Tombol Prev — memudar & disabled di awal */}
            <button
              className={`ac-nav-btn ac-prev${atStart ? " ac-btn-hidden" : ""}`}
              onClick={() => scrollStep(-1)}
              disabled={atStart}
              aria-label="Sebelumnya"
            >
              <i className="ri-arrow-left-s-line" />
            </button>

            {/* Tombol Next — memudar & disabled di akhir */}
            <button
              className={`ac-nav-btn ac-next${atEnd ? " ac-btn-hidden" : ""}`}
              onClick={() => scrollStep(1)}
              disabled={atEnd}
              aria-label="Berikutnya"
            >
              <i className="ri-arrow-right-s-line" />
            </button>

            {/* Fade-edge overlay kiri (sembunyikan saat di awal) */}
            {!atStart && <div className="ac-fade ac-fade-l" aria-hidden="true" />}
            {/* Fade-edge overlay kanan (sembunyikan saat di akhir) */}
            {!atEnd   && <div className="ac-fade ac-fade-r" aria-hidden="true" />}

            {/* ── Scrollable dual-row track ── */}
            <div
              ref={trackRef}
              className="ac-track"
              onScroll={updateBounds}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              onTouchStart={onEnter}
              onTouchEnd={onLeave}
            >
              {listAgenda.map((a, idx) => (
                <div
                  key={a.id}
                  className="card ac-card"
                  onClick={() => setActive({ src: a.gambar, alt: a.nama })}
                  style={{ overflow: "hidden", cursor: "pointer" }}
                >
                  <img
                    src={a.gambar}
                    alt={a.nama}
                    loading="lazy"
                    draggable="false"
                    style={{
                      display: "block",
                      width: "100%",
                      height: "148px",
                      objectFit: "cover",
                      pointerEvents: "none",
                    }}
                  />
                  <div style={{ padding: "0.65rem 0.82rem 0.82rem" }}>
                    <p style={{
                      fontSize: "0.74rem", fontWeight: 700,
                      color: "#041E42", margin: "0 0 0.2rem",
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>
                      {a.nama}
                    </p>
                    <p style={{
                      fontSize: "0.64rem", color: "#64748b",
                      lineHeight: 1.55, margin: 0,
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

          {/* ── Dot indicators — aktif mengikuti posisi scroll ── */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.45rem", marginTop: "1.4rem" }}>
            {Array.from({ length: TOTAL_COLS }).map((_, i) => (
              <button
                key={i}
                className={`ac-dot${i === dotIndex ? " ac-dot-active" : ""}`}
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

        </div>

        {/* ── Component-scoped styles ── */}
        <style>{`
          .ac-shell {
            position: relative;
          }

          /* ── Scrollable dual-row grid track ── */
          .ac-track {
            display: grid;
            grid-template-rows: repeat(2, auto);
            grid-auto-flow: column;
            grid-auto-columns: calc(33.333% - 0.677rem);
            gap: 1rem;
            overflow-x: scroll;
            overflow-y: hidden;
            scrollbar-width: none;
            -ms-overflow-style: none;
            -webkit-overflow-scrolling: touch;
            cursor: grab;
            user-select: none;
            padding: 0.25rem 0.125rem 0.5rem;
          }
          .ac-track::-webkit-scrollbar { display: none; }
          .ac-track:active { cursor: grabbing; }

          /* ── Navigation buttons ── */
          .ac-nav-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 15;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            border: 1.5px solid rgba(39,110,241,0.22);
            background: rgba(255,255,255,0.88);
            backdrop-filter: blur(10px);
            color: #276EF1;
            font-size: 1.35rem;
            line-height: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background 0.2s, color 0.2s, transform 0.2s,
                        box-shadow 0.2s, opacity 0.3s;
            box-shadow: 0 2px 14px rgba(39,110,241,0.13);
          }
          .ac-nav-btn:hover:not(:disabled) {
            background: #276EF1;
            color: #fff;
            transform: translateY(-50%) scale(1.1);
            box-shadow: 0 4px 18px rgba(39,110,241,0.3);
          }
          /* Tombol memudar & tidak bisa diklik saat di batas */
          .ac-btn-hidden {
            opacity: 0;
            pointer-events: none;
          }
          .ac-prev { left: 6px; }
          .ac-next { right: 6px; }

          /* ── Fade-edge overlays ── */
          .ac-fade {
            position: absolute;
            top: 0; bottom: 0;
            width: 72px;
            pointer-events: none;
            z-index: 10;
          }
          .ac-fade-l {
            left: 0;
            background: linear-gradient(to right, rgba(220,232,252,0.85), transparent);
          }
          .ac-fade-r {
            right: 0;
            background: linear-gradient(to left, rgba(220,232,252,0.85), transparent);
          }

          /* ── Dot indicator ── */
          .ac-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            border: none;
            background: rgba(39,110,241,0.2);
            cursor: pointer;
            padding: 0;
            transition: background 0.3s, transform 0.25s, width 0.25s;
          }
          .ac-dot:hover { background: rgba(39,110,241,0.45); }
          .ac-dot-active {
            background: #276EF1;
            width: 20px;
            border-radius: 4px;
            transform: scaleY(1.1);
          }

          /* ── Responsive ── */
          @media (max-width: 767px) {
            .ac-track { grid-auto-columns: calc(50% - 0.5rem); }
            .ac-nav-btn { width: 32px; height: 32px; font-size: 1.1rem; }
          }
          @media (max-width: 479px) {
            .ac-track { grid-auto-columns: calc(78% - 0.4rem); gap: 0.75rem; }
            .ac-fade { width: 40px; }
          }
        `}</style>
      </section>
    </>
  );
}
