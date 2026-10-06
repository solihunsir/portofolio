import { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, children, footer, maxWidth = "620px" }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="adm-modal-backdrop" onClick={onClose}>
      <div
        className="adm-modal"
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="adm-modal-header">
          <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>
            {title}
          </h3>
          <button
            type="button"
            className="adm-btn adm-btn-secondary adm-btn-icon"
            onClick={onClose}
            aria-label="Tutup"
          >
            <i className="ri-close-line" style={{ fontSize: "1.2rem" }} />
          </button>
        </div>

        <div className="adm-modal-body">{children}</div>

        {footer && <div className="adm-modal-footer">{footer}</div>}
      </div>
    </div>
  );
}
