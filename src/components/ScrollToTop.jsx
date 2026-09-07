import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/*
 * ScrollToTop — selalu mengambang di kanan bawah LAYAR.
 *
 * Karena position:fixed rusak secara global di website ini
 * (ada sesuatu yang membuat containing-block bukan viewport),
 * kita bypass sepenuhnya dengan position:absolute + JS scroll listener.
 * Posisi dihitung manual: top = scrollY + innerHeight - offset
 */
export default function ScrollToTop() {
  const btnRef = useRef(null);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;

    const SIZE   = 46;   // lebar/tinggi tombol px
    const OFFSET = 24;   // jarak dari tepi layar px

    function reposition() {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const vh      = window.innerHeight;
      const vw      = window.innerWidth;

      // Hitung posisi agar tombol selalu di pojok kanan bawah LAYAR
      const top  = scrollY + vh - SIZE - OFFSET - 58; // 58 = jarak atas widget voice
      const left = vw - SIZE - OFFSET;

      el.style.top  = top  + "px";
      el.style.left = left + "px";
    }

    // Jalankan segera + setiap kali scroll/resize
    reposition();
    window.addEventListener("scroll", reposition, { passive: true });
    window.addEventListener("resize", reposition, { passive: true });

    return () => {
      window.removeEventListener("scroll", reposition);
      window.removeEventListener("resize", reposition);
    };
  }, []);

  return createPortal(
    <>
      <style>{`
        @keyframes stt-pop { from{opacity:0;transform:scale(.8)} to{opacity:1;transform:scale(1)} }
        #scroll-to-top-btn { animation: stt-pop .3s cubic-bezier(.34,1.56,.64,1) both; }
      `}</style>
      <button
        id="scroll-to-top-btn"
        ref={btnRef}
        onClick={scrollUp}
        aria-label="Scroll ke atas"
        title="Kembali ke atas"
        style={{
          position: "absolute",   /* absolute — posisi dikontrol JS bukan CSS fixed */
          zIndex: 2147483647,
          width: 46,
          height: 46,
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2563eb", /* Solid blue */
          color: "#fff",
          fontSize: "1.15rem",
          boxShadow: "0 4px 20px rgba(14,165,233,.55)",
          transition: "transform .2s, box-shadow .2s",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "translateY(-3px) scale(1.1)";
          e.currentTarget.style.boxShadow = "0 8px 28px rgba(14,165,233,.7)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(14,165,233,.55)";
        }}
      >
        <i className="ri-arrow-up-line" />
      </button>
    </>,
    document.body
  );
}
