import { useState, useRef } from "react";
import { API_BASE_URL, resolveAssetUrl } from "../../config/api";
import { useToast } from "./Toast";

export default function ImageUploader({
  value,
  onChange,
  uploadEndpoint,
  fieldName = "thumbnail",
  label = "Upload Gambar",
  accept = "image/*",
  helperText = "Format: PNG, JPG, WebP. Maks 5MB.",
  isDoc = false,
}) {
  const [uploading, setUploading] = useState(false);
  const [inputMode, setInputMode] = useState("file"); // "file" | "url"
  const fileInputRef = useRef(null);
  const { showToast } = useToast();

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append(fieldName, file);

    try {
      const url = `${API_BASE_URL}${uploadEndpoint}`;
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengupload file");

      // Extract result url from whatever key the backend returned
      const uploadedUrl =
        data.thumbnailUrl ||
        data.imageUrl ||
        data.logoUrl ||
        data.photoUrl ||
        data.cvFileUrl ||
        (data.hero && data.hero.photoUrl) ||
        (data.about && data.about.cvFileUrl);

      if (uploadedUrl) {
        onChange(uploadedUrl);
        showToast("File berhasil diunggah!", "success");
      } else {
        throw new Error("Respons upload tidak mengandung URL file");
      }
    } catch (err) {
      console.error("Upload error:", err);
      showToast(err.message || "Gagal mengunggah file", "error");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="adm-form-group">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
        <label className="adm-label" style={{ marginBottom: 0 }}>{label}</label>
        <div style={{ display: "flex", gap: "0.4rem" }}>
          <button
            type="button"
            className={`adm-badge ${inputMode === "file" ? "adm-badge-accent" : "adm-badge-warning"}`}
            style={{ cursor: "pointer", border: "none" }}
            onClick={() => setInputMode(inputMode === "file" ? "url" : "file")}
          >
            {inputMode === "file" ? "Ganti ke Input URL" : "Ganti ke Upload File"}
          </button>
        </div>
      </div>

      {inputMode === "url" ? (
        <div>
          <input
            type="text"
            className="adm-input"
            placeholder="Masukkan URL file (misal: /assets/proyek/proyek1.png atau https://...)"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      ) : (
        <div
          style={{
            border: "1.5px dashed var(--adm-border-active)",
            borderRadius: "10px",
            padding: "1rem",
            textAlign: "center",
            background: "rgba(15, 23, 42, 0.4)",
            cursor: "pointer",
            position: "relative",
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            style={{ display: "none" }}
            onChange={handleFileChange}
            disabled={uploading}
          />

          {uploading ? (
            <div style={{ padding: "0.75rem", color: "#38bdf8", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
              <i className="ri-loader-4-line" style={{ animation: "spin 1s linear infinite", fontSize: "1.25rem" }} />
              <span style={{ fontSize: "0.85rem" }}>Mengunggah ke server...</span>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem" }}>
              <i className={isDoc ? "ri-file-pdf-2-line" : "ri-upload-cloud-2-line"} style={{ fontSize: "1.75rem", color: "#38bdf8" }} />
              <p style={{ margin: 0, fontSize: "0.82rem", color: "#e2e8f0" }}>
                Klik untuk memilih file baru
              </p>
              <span style={{ fontSize: "0.72rem", color: "#64748b" }}>{helperText}</span>
            </div>
          )}
        </div>
      )}

      {/* Preview Section */}
      {value && (
        <div
          style={{
            marginTop: "0.75rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.5rem 0.75rem",
            borderRadius: "8px",
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid var(--adm-border)",
          }}
        >
          {!isDoc ? (
            <img
              src={resolveAssetUrl(value)}
              alt="Preview"
              style={{
                width: 44,
                height: 44,
                borderRadius: "6px",
                objectFit: "cover",
                background: "#020617",
              }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "6px",
                background: "rgba(239, 68, 68, 0.15)",
                color: "#ef4444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.4rem",
              }}
            >
              <i className="ri-file-pdf-line" />
            </div>
          )}

          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                margin: 0,
                fontSize: "0.78rem",
                color: "#94a3b8",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {value}
            </p>
            <a
              href={resolveAssetUrl(value)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "0.72rem", color: "#38bdf8", textDecoration: "none" }}
            >
              Lihat File ↗
            </a>
          </div>

          <button
            type="button"
            className="adm-btn adm-btn-secondary adm-btn-icon"
            style={{ width: 28, height: 28 }}
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
            }}
            title="Hapus file"
          >
            <i className="ri-close-line" style={{ fontSize: "1rem" }} />
          </button>
        </div>
      )}
    </div>
  );
}
