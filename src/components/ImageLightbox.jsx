import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function ImageLightbox({ src, alt, link, linkLabel = "Lihat Repository", onClose }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(4, 30, 66, 0.93)",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        padding: "60px 20px 20px",
        boxSizing: "border-box",
        cursor: "zoom-out",
      }}
    >
      {/* Tombol Tutup */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        style={{
          position: "fixed",
          top: "14px",
          right: "14px",
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.4)",
          backgroundColor: "rgba(255,255,255,0.2)",
          color: "#fff",
          fontSize: "20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100000,
          outline: "none",
          padding: 0,
          lineHeight: 1,
          fontFamily: "sans-serif",
        }}
      >
        ✕
      </button>

      {/* Gambar */}
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "block",
          maxWidth: "90vw",
          maxHeight: "75vh",
          width: "auto",
          height: "auto",
          objectFit: "contain",
          borderRadius: "12px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
          cursor: "default",
          flexShrink: 0,
        }}
      />

      {/* Keterangan */}
      <p
        onClick={(e) => e.stopPropagation()}
        style={{
          color: "rgba(255,255,255,0.9)",
          fontSize: "14px",
          fontWeight: 600,
          textAlign: "center",
          margin: 0,
          padding: "0 20px",
          cursor: "default",
          flexShrink: 0,
        }}
      >
        {alt}
      </p>

      {/* Tombol link (opsional) */}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "#276EF1",
            color: "#fff",
            padding: "8px 20px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 700,
            textDecoration: "none",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          {linkLabel}
        </a>
      )}
    </div>,
    document.body
  );
}
