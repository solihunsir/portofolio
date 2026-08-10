import { useState, useRef, useEffect } from 'react';
import { profileData } from '../data/profileData';

/* ─────────────────────────────────────────────────────────────
   Groq API — llama-3.3-70b-versatile
   · TPM lebih besar dari llama-3.1-8b-instant
   · max_tokens: 300 — jawaban ringkas, hemat kuota
   · Hanya kirim 1 pesan user (tanpa history) — cegah overflow
   · API HANYA dipanggil saat tombol "Kirim" diklik
───────────────────────────────────────────────────────────── */

const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL    = 'llama-3.3-70b-versatile';

const SYSTEM_CONTENT = `Kamu adalah Asisten AI pribadi portofolio Muhammad Sholihun. Jawab pertanyaan pengunjung secara ramah, profesional, jujur, padat, dan ringkas (maksimal 2-3 kalimat pendek) berdasarkan data berikut:\n\n${profileData}`;

const HINTS = [
  'Apa proyek machine learning-nya?',
  'Bagaimana latar belakang Sholihun?',
  'Keahlian teknis apa yang dikuasai?',
  'Pengalaman kerja di mana saja?',
];

export default function AIChat() {
  const [query, setQuery]       = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Halo! Saya Asisten AI Muhammad Sholihun. Silakan tanyakan apa saja seputar riwayat pendidikan, proyek, keahlian, atau pengalaman kerjanya!',
    },
  ]);
  const [loading, setLoading]   = useState(false);
  const messagesEndRef          = useRef(null);

  /* Auto-scroll ke pesan terbaru */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  /* ── Handler utama — satu pertanyaan = satu request bersih ── */
  const handleAskAI = async (e, hintText) => {
    if (e) e.preventDefault();
    const userText = (hintText ?? query).trim();
    if (!userText || loading) return;

    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) {
      setMessages(prev => [...prev, {
        sender: 'ai',
        text: '⚠️ VITE_GROQ_API_KEY belum terpasang di file .env. Restart dev server setelah menambahkannya.',
      }]);
      return;
    }

    setQuery('');
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    try {
      const response = await fetch(GROQ_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            /* System prompt selalu di posisi pertama */
            { role: 'system', content: SYSTEM_CONTENT },
            /* Hanya kirim pertanyaan terbaru — cegah token overflow */
            { role: 'user', content: userText },
          ],
          temperature: 0.5,
          max_tokens: 300,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error?.message || `HTTP ${response.status}`);
      }

      const replyText =
        data?.choices?.[0]?.message?.content ||
        'Maaf, tidak ada jawaban dari AI.';

      setMessages(prev => [...prev, { sender: 'ai', text: replyText }]);

    } catch (error) {
      console.error('Groq API Error:', error);
      /* Pesan ramah — tidak tampilkan error teknis ke pengunjung */
      setMessages(prev => [...prev, {
        sender: 'ai',
        text: 'Sistem sedang menerima lalu lintas pertanyaan yang tinggi. Silakan tunggu sekitar 5 detik lalu coba kirimkan pertanyaan Anda kembali. 🙏',
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="ai-assistant"
      style={{
        padding: '5rem 0',
        background: 'rgba(4,30,66,0.97)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Fluid Mesh Gradient Background ── */}
      <div style={{
        position: 'absolute', top: '10%', left: '25%',
        width: 384, height: 384,
        background: 'rgba(37,99,235,0.28)',
        borderRadius: '50%', filter: 'blur(130px)',
        pointerEvents: 'none', zIndex: 0,
        animation: 'fluid-blob 14s infinite ease-in-out',
      }} />
      <div style={{
        position: 'absolute', top: '33%', right: '25%',
        width: 450, height: 450,
        background: 'rgba(6,182,212,0.18)',
        borderRadius: '50%', filter: 'blur(150px)',
        pointerEvents: 'none', zIndex: 0,
        animation: 'fluid-blob 18s infinite ease-in-out reverse',
      }} />

      <style>{`
        @keyframes aichat-spin { to { transform: rotate(360deg); } }
        @keyframes aichat-dot {
          0%,80%,100% { opacity: 0.4; transform: scale(1); }
          40% { opacity: 1; transform: scale(1.25); }
        }
        @keyframes aichat-fadein {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .aichat-input:focus {
          outline: none;
          border-color: #38bdf8 !important;
          box-shadow: 0 0 0 3px rgba(56,189,248,0.15);
        }
        .aichat-input::placeholder { color: rgba(148,163,184,0.6); }
        .aichat-send:hover:not(:disabled) {
          background: #0284c7 !important;
          box-shadow: 0 6px 20px rgba(56,189,248,0.38) !important;
          transform: translateY(-1px);
        }
        .aichat-send:disabled { opacity: 0.5; cursor: not-allowed; }
        .aichat-hint:hover {
          background: rgba(56,189,248,0.15) !important;
          border-color: rgba(56,189,248,0.5) !important;
          color: #38bdf8 !important;
        }
        .aichat-scroll::-webkit-scrollbar { width: 4px; }
        .aichat-scroll::-webkit-scrollbar-track { background: transparent; }
        .aichat-scroll::-webkit-scrollbar-thumb { background: rgba(56,189,248,0.3); border-radius: 99px; }
        .aichat-bubble { animation: aichat-fadein 0.25s ease; }
      `}</style>

      <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 1.25rem', position: 'relative', zIndex: 1 }}>

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: '#38bdf8',
            background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.25)',
            padding: '0.3rem 0.85rem', borderRadius: 99, marginBottom: '0.85rem',
            fontFamily: "'Roboto Flex', sans-serif",
          }}>
            <i className="" /> AI Assistant
          </span>
          <h2 style={{
            fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 800, color: '#fff',
            lineHeight: 1.2, marginBottom: '0.5rem', fontFamily: "'Manrope', sans-serif",
          }}>
            Ask -{' '}
            <span style={{ color: '#38bdf8' }}>My AI</span>
          </h2>
          
        </div>

        {/* ── Chat Card ── */}
        <div style={{
          background: 'rgba(15,23,42,0.88)',
          backdropFilter: 'blur(16px)',
          borderRadius: 20,
          border: '1px solid rgba(51,65,85,0.8)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
          overflow: 'hidden',
        }}>

          {/* Messages */}
          <div className="aichat-scroll" style={{
            height: 320, overflowY: 'auto',
            padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem',
          }}>
            {messages.map((msg, idx) => (
              <div key={idx} className="aichat-bubble"
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-start',
                }}
              >
                {/* AI Avatar */}
                {msg.sender === 'ai' && (
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'linear-gradient(135deg,#0ea5e9,#38bdf8)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginRight: '0.6rem', marginTop: 2,
                    boxShadow: '0 2px 8px rgba(56,189,248,0.4)',
                  }}>
                    <i className="ri-sparkling-2-fill" style={{ color: '#fff', fontSize: '0.68rem' }} />
                  </div>
                )}

                {/* Bubble */}
                <div style={{
                  maxWidth: '82%', padding: '0.75rem 1rem',
                  borderRadius: msg.sender === 'user' ? '14px 3px 14px 14px' : '3px 14px 14px 14px',
                  background: msg.sender === 'user'
                    ? 'linear-gradient(135deg,#0284c7,#0369a1)'
                    : 'rgba(30,41,59,0.9)',
                  color: msg.sender === 'user' ? '#fff' : 'rgba(226,232,240,0.95)',
                  fontSize: '0.855rem', lineHeight: 1.72,
                  fontFamily: "'Quicksand', sans-serif", fontWeight: 500,
                  whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                  border: msg.sender === 'ai' ? '1px solid rgba(51,65,85,0.7)' : 'none',
                  boxShadow: msg.sender === 'user' ? '0 4px 14px rgba(2,132,199,0.32)' : 'none',
                }}>
                  {msg.text}
                </div>

                {/* User Avatar */}
                {msg.sender === 'user' && (
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'rgba(56,189,248,0.12)',
                    border: '1.5px solid rgba(56,189,248,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginLeft: '0.6rem', marginTop: 2,
                  }}>
                    <i className="ri-user-3-fill" style={{ color: '#38bdf8', fontSize: '0.68rem' }} />
                  </div>
                )}
              </div>
            ))}

            {/* Typing dots */}
            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'linear-gradient(135deg,#0ea5e9,#38bdf8)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, boxShadow: '0 2px 8px rgba(56,189,248,0.4)',
                }}>
                  <i className="ri-sparkling-2-fill" style={{ color: '#fff', fontSize: '0.68rem' }} />
                </div>
                <div style={{
                  padding: '0.65rem 1rem', borderRadius: '3px 14px 14px 14px',
                  background: 'rgba(30,41,59,0.9)', border: '1px solid rgba(51,65,85,0.7)',
                  display: 'flex', alignItems: 'center', gap: 5,
                }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{
                      width: 6, height: 6, borderRadius: '50%', background: '#38bdf8',
                      display: 'inline-block',
                      animation: `aichat-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }} />
                  ))}
                </div>
                <span style={{ fontSize: '0.7rem', color: 'rgba(56,189,248,0.7)', fontFamily: "'Quicksand',sans-serif" }}>
                  AI sedang berpikir…
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Hint chips */}
          {messages.length <= 1 && !loading && (
            <div style={{ padding: '0 1.25rem 0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {HINTS.map(h => (
                <button key={h} className="aichat-hint" onClick={() => handleAskAI(null, h)} style={{
                  fontSize: '0.67rem', fontWeight: 600, fontFamily: "'Quicksand',sans-serif",
                  color: 'rgba(148,163,184,0.85)', background: 'rgba(30,41,59,0.8)',
                  border: '1px solid rgba(51,65,85,0.7)', borderRadius: 99,
                  padding: '0.28rem 0.7rem', cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
                }}>
                  {h}
                </button>
              ))}
            </div>
          )}

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(51,65,85,0.6)', margin: '0 1.25rem' }} />

          {/* Input form */}
          <form onSubmit={handleAskAI} style={{ padding: '1rem 1.25rem', display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            <input
              type="text"
              className="aichat-input"
              placeholder="Tanyakan pengalaman, proyek, atau keahlian Sholihun..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              disabled={loading}
              style={{
                flex: 1, padding: '0.75rem 1rem',
                background: 'rgba(30,41,59,0.9)', color: '#e2e8f0',
                border: '1.5px solid rgba(51,65,85,0.8)', borderRadius: 12,
                fontSize: '0.855rem', fontFamily: "'Quicksand',sans-serif", fontWeight: 500,
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
            />
            <button
              type="submit"
              className="aichat-send"
              disabled={loading || !query.trim()}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg,#0ea5e9,#0284c7)', color: '#fff',
                border: 'none', borderRadius: 12,
                fontSize: '0.855rem', fontWeight: 700, fontFamily: "'Manrope',sans-serif",
                cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap',
                boxShadow: '0 4px 14px rgba(56,189,248,0.3)',
              }}
            >
              {loading
                ? <><i className="ri-loader-4-line" style={{ display: 'inline-block', animation: 'aichat-spin 1s linear infinite' }} /> Mengirim…</>
                : <><i className="ri-send-plane-fill" /> Kirim</>
              }
            </button>
          </form>
        </div>

        {/* Footer note */}
        <p style={{ textAlign: 'center', marginTop: '0.85rem', fontSize: '0.62rem', color: 'rgba(100,116,139,0.7)', fontFamily: "'Quicksand',sans-serif" }}>
          <i className="ri-lock-line" style={{ marginRight: 3 }} />
          Percakapan tidak disimpan
        </p>
      </div>
    </section>
  );
}
