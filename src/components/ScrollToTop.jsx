import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      /* Cek semua properti scroll yang mungkin aktif di browser */
      const scrolled =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      setVisible(scrolled > 50);
    };

    /* Pasang listener di window DAN document — cover semua kasus */
    window.addEventListener("scroll", checkScroll, { passive: true });
    document.addEventListener("scroll", checkScroll, { passive: true });

    /* Cek kondisi awal */
    checkScroll();

    return () => {
      window.removeEventListener("scroll", checkScroll);
      document.removeEventListener("scroll", checkScroll);
    };
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  /* Render sebagai portal di body agar terbebas dari semua parent */
  return visible ? (
    <button
      id="scroll-to-top-btn"
      onClick={scrollUp}
      aria-label="Scroll ke atas"
      title="Kembali ke atas"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 2147483647,          /* z-index maksimum browser */
        width: 46,
        height: 46,
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
        color: "#fff",
        fontSize: "1.15rem",
        boxShadow: "0 4px 20px rgba(14,165,233,0.55)",
        animation: "stt-pop-in 0.25s cubic-bezier(0.34,1.56,0.64,1) both",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-3px) scale(1.1)";
        e.currentTarget.style.boxShadow = "0 8px 28px rgba(14,165,233,0.7)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(14,165,233,0.55)";
      }}
    >
      <style>{`
        @keyframes stt-pop-in {
          from { opacity: 0; transform: translateY(12px) scale(0.8); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      <i className="ri-arrow-up-line" />
    </button>
  ) : null;
}
