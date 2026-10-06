import Modal from "./Modal";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Konfirmasi Hapus",
  message = "Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.",
  confirmLabel = "Ya, Hapus",
  loading = false,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="460px"
      footer={
        <>
          <button
            type="button"
            className="adm-btn adm-btn-secondary"
            onClick={onClose}
            disabled={loading}
          >
            Batal
          </button>
          <button
            type="button"
            className="adm-btn adm-btn-danger"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="ri-loader-4-line" style={{ animation: "spin 1s linear infinite" }} />
                <span>Menghapus...</span>
              </>
            ) : (
              <>
                <i className="ri-delete-bin-line" />
                <span>{confirmLabel}</span>
              </>
            )}
          </button>
        </>
      }
    >
      <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "rgba(239, 68, 68, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: "#ef4444",
            fontSize: "1.4rem",
          }}
        >
          <i className="ri-error-warning-line" />
        </div>
        <p style={{ margin: 0, color: "#cbd5e1", fontSize: "0.9rem", lineHeight: 1.6 }}>
          {message}
        </p>
      </div>
    </Modal>
  );
}
