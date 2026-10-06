import { useState, useEffect } from "react";
import { apiRequest } from "../../config/api";
import { useToast } from "../components/Toast";
import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";

export default function MessagesInbox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // "all" | "unread" | "read"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { showToast } = useToast();

  const loadMessages = async () => {
    setLoading(true);
    try {
      const data = await apiRequest("/api/messages");
      setMessages(data || []);
    } catch (err) {
      showToast("Gagal memuat pesan: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const filteredMessages = messages.filter((m) => {
    const matchFilter =
      filter === "all" ||
      (filter === "unread" && !m.isRead) ||
      (filter === "read" && m.isRead);
    const matchSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleOpenDetail = async (msg) => {
    setSelectedMessage(msg);
    setIsDetailOpen(true);

    // If message is unread, automatically mark as read on open
    if (!msg.isRead) {
      try {
        await apiRequest(`/api/messages/${msg.id}/read`, { method: "PUT" });
        setMessages((prev) =>
          prev.map((item) => (item.id === msg.id ? { ...item, isRead: true } : item))
        );
      } catch (err) {
        console.error("Failed to mark as read:", err);
      }
    }
  };

  const handleMarkAsRead = async (id, e) => {
    if (e) e.stopPropagation();
    try {
      await apiRequest(`/api/messages/${id}/read`, { method: "PUT" });
      setMessages((prev) =>
        prev.map((item) => (item.id === id ? { ...item, isRead: true } : item))
      );
      showToast("Pesan ditandai telah dibaca", "success");
    } catch (err) {
      showToast("Gagal mengubah status: " + err.message, "error");
    }
  };

  const handleDelete = async () => {
    if (!selectedMessage) return;
    setDeleting(true);
    try {
      await apiRequest(`/api/messages/${selectedMessage.id}`, { method: "DELETE" });
      showToast("Pesan berhasil dihapus!", "success");
      setIsDeleteOpen(false);
      setIsDetailOpen(false);
      loadMessages();
    } catch (err) {
      showToast("Gagal menghapus pesan: " + err.message, "error");
    } finally {
      setDeleting(false);
    }
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700, color: "#fff" }}>
            Inbox Pesan Masuk ({messages.length})
          </h2>
          <p style={{ margin: "0.2rem 0 0", fontSize: "0.8rem", color: "#94a3b8" }}>
            Pesan dan pertanyaan yang dikirimkan oleh pengunjung melalui formulir kontak.
          </p>
        </div>
        <button
          type="button"
          className="adm-btn adm-btn-secondary"
          onClick={loadMessages}
          title="Muat ulang pesan"
        >
          <i className="ri-refresh-line" />
          <span>Muat Ulang</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.25rem", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "0.4rem" }}>
          <button
            type="button"
            className={`adm-btn ${filter === "all" ? "adm-btn-primary" : "adm-btn-secondary"}`}
            style={{ fontSize: "0.75rem", padding: "0.4rem 0.8rem" }}
            onClick={() => setFilter("all")}
          >
            Semua ({messages.length})
          </button>
          <button
            type="button"
            className={`adm-btn ${filter === "unread" ? "adm-btn-primary" : "adm-btn-secondary"}`}
            style={{ fontSize: "0.75rem", padding: "0.4rem 0.8rem" }}
            onClick={() => setFilter("unread")}
          >
            Belum Dibaca ({unreadCount})
          </button>
          <button
            type="button"
            className={`adm-btn ${filter === "read" ? "adm-btn-primary" : "adm-btn-secondary"}`}
            style={{ fontSize: "0.75rem", padding: "0.4rem 0.8rem" }}
            onClick={() => setFilter("read")}
          >
            Sudah Dibaca ({messages.length - unreadCount})
          </button>
        </div>

        <div style={{ position: "relative", minWidth: 260 }}>
          <input
            type="text"
            className="adm-input"
            placeholder="Cari pengirim, email, atau isi pesan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: "2.2rem" }}
          />
          <i
            className="ri-search-line"
            style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#64748b" }}
          />
        </div>
      </div>

      {/* Messages List Card */}
      <div className="adm-card" style={{ padding: "0.5rem" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
            <i className="ri-loader-4-line" style={{ animation: "spin 1s linear infinite", fontSize: "2rem" }} />
            <p style={{ marginTop: "0.5rem" }}>Memuat pesan...</p>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
            <i className="ri-inbox-archive-line" style={{ fontSize: "2.5rem", display: "block", marginBottom: "0.5rem" }} />
            <span>Tidak ada pesan yang ditemukan</span>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => handleOpenDetail(msg)}
                style={{
                  padding: "1rem 1.25rem",
                  borderRadius: "10px",
                  background: msg.isRead ? "transparent" : "rgba(56, 189, 248, 0.08)",
                  border: `1px solid ${msg.isRead ? "rgba(148, 163, 184, 0.08)" : "rgba(56, 189, 248, 0.3)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = msg.isRead ? "transparent" : "rgba(56, 189, 248, 0.08)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: msg.isRead ? "rgba(255, 255, 255, 0.08)" : "linear-gradient(135deg, #38bdf8, #2563eb)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      flexShrink: 0,
                    }}
                  >
                    {msg.name.charAt(0).toUpperCase()}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
                      <span style={{ fontWeight: msg.isRead ? 600 : 700, color: "#fff", fontSize: "0.9rem" }}>
                        {msg.name}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                        &lt;{msg.email}&gt;
                      </span>
                      {!msg.isRead && (
                        <span className="adm-badge adm-badge-warning" style={{ fontSize: "0.65rem", padding: "0.1rem 0.4rem" }}>
                          Belum Dibaca
                        </span>
                      )}
                    </div>
                    <p style={{ margin: 0, fontSize: "0.82rem", color: "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {msg.message}
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", flexShrink: 0 }}>
                  <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                    {new Date(msg.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                  {!msg.isRead && (
                    <button
                      type="button"
                      className="adm-btn adm-btn-secondary adm-btn-icon"
                      style={{ width: 30, height: 30 }}
                      onClick={(e) => handleMarkAsRead(msg.id, e)}
                      title="Tandai Sudah Dibaca"
                    >
                      <i className="ri-check-line" />
                    </button>
                  )}

                  <button
                    type="button"
                    className="adm-btn adm-btn-danger adm-btn-icon"
                    style={{ width: 30, height: 30 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMessage(msg);
                      setIsDeleteOpen(true);
                    }}
                    title="Hapus Pesan"
                  >
                    <i className="ri-delete-bin-line" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <Modal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          title="Detail Pesan Pengunjung"
          maxWidth="560px"
          footer={
            <>
              <button
                type="button"
                className="adm-btn adm-btn-danger"
                onClick={() => setIsDeleteOpen(true)}
              >
                <i className="ri-delete-bin-line" />
                <span>Hapus Pesan</span>
              </button>
              <a
                href={`mailto:${selectedMessage.email}?subject=Tanggapan Portfolio M. Sholihun&body=Halo ${encodeURIComponent(selectedMessage.name)},%0D%0A%0D%0ATerima kasih telah menghubungi saya.`}
                className="adm-btn adm-btn-primary"
                style={{ textDecoration: "none" }}
              >
                <i className="ri-reply-line" />
                <span>Balas via Email</span>
              </a>
            </>
          }
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ padding: "1rem", borderRadius: "10px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid var(--adm-border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Nama Pengirim:</span>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>{selectedMessage.name}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Email:</span>
                <span style={{ fontSize: "0.85rem", color: "#38bdf8" }}>{selectedMessage.email}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Diterima Pada:</span>
                <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                  {new Date(selectedMessage.createdAt).toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <div>
              <label className="adm-label">Isi Pesan:</label>
              <div
                style={{
                  padding: "1rem",
                  borderRadius: "10px",
                  background: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid var(--adm-border)",
                  color: "#f1f5f9",
                  fontSize: "0.9rem",
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                }}
              >
                {selectedMessage.message}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Hapus Pesan"
        message={`Apakah Anda yakin ingin menghapus pesan dari "${selectedMessage?.name}"?`}
        loading={deleting}
      />
    </div>
  );
}
