import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { profileData } from '../data/profileData';
import { useLanguage } from '../context/LanguageContext';

const GROQ_ENDPOINT  = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL     = import.meta.env.VITE_GROQ_MODEL_NAME || 'openai/gpt-oss-20b';

const stripThink = (t) =>
  t.replace(/<think>[\s\S]*?<\/think>/gi, '').replace(/<think>[\s\S]*/gi, '').trim();

/*
 * Karena position:fixed rusak global di website ini (containing-block
 * bukan viewport), kita gunakan position:absolute + JS scroll listener
 * untuk memposisikan widget selalu di pojok kanan bawah LAYAR.
 */
function useViewportPosition(ref, isActive, widgetH = 52, offset = 24) {
  useEffect(() => {
    if (!isActive) return;
    const el = ref.current;
    if (!el) return;

    function reposition() {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const vh      = window.innerHeight;
      const vw      = window.innerWidth;
      el.style.top  = (scrollY + vh - widgetH - offset) + 'px';
      el.style.left = (vw - el.offsetWidth - offset) + 'px';
    }

    // Jalankan segera & di setiap scroll/resize
    reposition();
    window.addEventListener('scroll', reposition, { passive: true });
    window.addEventListener('resize', reposition, { passive: true });
    return () => {
      window.removeEventListener('scroll', reposition);
      window.removeEventListener('resize', reposition);
    };
  }, [isActive, ref, widgetH, offset]);
}

/*
 * Modal — sama: position:fixed juga rusak, jadi pakai
 * position:absolute + scroll listener agar muncul di atas LAYAR.
 */
function useModalPosition(ref, visible) {
  useEffect(() => {
    if (!visible) return;
    const el = ref.current;
    if (!el) return;

    function reposition() {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const vw      = window.innerWidth;
      el.style.top  = (scrollY + 24) + 'px';
      el.style.left = Math.max(16, (vw - el.offsetWidth) / 2) + 'px';
    }

    reposition();
    window.addEventListener('scroll', reposition, { passive: true });
    window.addEventListener('resize', reposition, { passive: true });
    return () => {
      window.removeEventListener('scroll', reposition);
      window.removeEventListener('resize', reposition);
    };
  }, [visible, ref]);
}

export default function VoiceAssistant() {
  const { t, lang } = useLanguage();
  const [modalVisible, setModalVisible] = useState(true);
  const [isActive, setIsActive]         = useState(false);
  const [isListening, setIsListening]   = useState(false);
  const [isSpeaking, setIsSpeaking]     = useState(false);
  const [statusText, setStatusText]     = useState(lang === 'en' ? 'Ready' : 'Siap sedia');

  const recognitionRef = useRef(null);
  const widgetRef      = useRef(null);
  const modalRef       = useRef(null);
  const synth          = window.speechSynthesis;

  /* Posisi widget & modal via JS (bypass position:fixed rusak) */
  useViewportPosition(widgetRef, isActive);
  useModalPosition(modalRef, modalVisible);

  useEffect(() => {
    setStatusText(lang === 'en' ? 'Ready' : 'Siap sedia');
  }, [lang]);

  /* Setup SpeechRecognition */
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const rec           = new SR();
    rec.lang            = lang === 'en' ? 'en-US' : 'id-ID';
    rec.continuous      = false;
    rec.interimResults  = false;
    rec.maxAlternatives = 1;
    rec.onstart  = () => { setIsListening(true);  setStatusText(lang === 'en' ? 'Listening...' : 'Mendengarkan...'); };
    rec.onresult = async (e) => {
      const tVal = e.results[0][0].transcript;
      if (tVal.trim()) { setStatusText(lang === 'en' ? 'Thinking...' : 'Berpikir...'); await sendToGroq(tVal); }
    };
    rec.onerror = (e) => {
      setIsListening(false);
      if (e.error === 'no-speech') {
        setStatusText(lang === 'en' ? 'No speech detected.' : 'Tidak ada suara.');
        setTimeout(() => setStatusText(p => (p.includes('suara') || p.includes('speech')) ? (lang === 'en' ? 'Ready' : 'Siap sedia') : p), 3000);
      } else setStatusText('Error: ' + e.error);
    };
    rec.onend = () => {
      setIsListening(false);
      setStatusText(p => (p.includes('Mendengarkan') || p.includes('Listening')) ? (lang === 'en' ? 'Ready' : 'Siap sedia') : p);
    };
    recognitionRef.current = rec;
    return () => { synth?.cancel(); rec.abort(); };
  }, [lang]);

  /* Groq API */
  const sendToGroq = async (text) => {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) {
      speak(lang === 'en' ? 'Sorry, API Key was not found.' : 'Maaf, API Key tidak ditemukan.');
      setStatusText(lang === 'en' ? 'API Key missing' : 'API Key hilang');
      return;
    }

    const systemPrompt = lang === 'en'
      ? `You are the personal AI Assistant for Muhammad Sholihun's portfolio. Answer visitor questions politely, professionally, honestly, and concisely in English (maximum 2-3 short sentences) based on the following portfolio data:\n\n${profileData}`
      : `Kamu adalah Asisten AI pribadi portofolio Muhammad Sholihun. Jawab pertanyaan pengunjung secara ramah, profesional, jujur, padat, dan ringkas dalam Bahasa Indonesia (maksimal 2-3 kalimat pendek) berdasarkan data berikut:\n\n${profileData}`;

    try {
      const res  = await fetch(GROQ_ENDPOINT, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user',   content: text },
          ],
          temperature: 0.5, max_tokens: 300,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error?.message || 'API Error');
      const reply = stripThink(data?.choices?.[0]?.message?.content || '') || (lang === 'en' ? "Sorry, I couldn't understand that." : 'Maaf, tidak mengerti.');
      setStatusText(lang === 'en' ? 'AI Speaking...' : 'AI Berbicara...');
      speak(reply);
    } catch (err) {
      console.error(err);
      speak(lang === 'en' ? 'Sorry, an error occurred.' : 'Maaf, terjadi kesalahan.');
      setStatusText(lang === 'en' ? 'Server error' : 'Error server');
    }
  };

  /* TTS */
  const speak = (text) => {
    if (!synth) return;
    synth.cancel();
    const u     = new SpeechSynthesisUtterance(text);
    u.lang      = lang === 'en' ? 'en-US' : 'id-ID';
    u.onend     = () => { setIsSpeaking(false); setStatusText(lang === 'en' ? 'Ready' : 'Siap sedia'); };
    u.onerror   = () => { setIsSpeaking(false); setStatusText(lang === 'en' ? 'Audio error' : 'Error audio'); };
    setIsSpeaking(true);
    synth.speak(u);
  };

  const toggleListening = () => {
    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
      setStatusText(lang === 'en' ? 'Ready' : 'Siap sedia');
    } else if (isListening) {
      recognitionRef.current?.stop();
    } else if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const handleAccept = () => {
    setModalVisible(false);
    setIsActive(true);
    setStatusText(lang === 'en' ? 'AI Speaking...' : 'AI Berbicara...');
    speak(t('voiceAssistant.welcomeSpeech', 'Halo, selamat datang di portofolio saya! Ada yang ingin Anda tanyakan tentang pengalaman atau project saya?'));
  };
  const handleDecline = () => setModalVisible(false);

  const micBg = isListening
    ? '#dc2626' /* Solid red */
    : isSpeaking
      ? '#d97706' /* Solid amber */
      : '#2563eb'; /* Solid blue */

  return createPortal(
    <>
      <style>{`
        @keyframes va-pulse {
          0%,100%{box-shadow:0 0 0 0 rgba(56,189,248,.55);}
          50%    {box-shadow:0 0 0 10px rgba(56,189,248,0);}
        }
        .va-listening { animation: va-pulse 1.4s ease-in-out infinite; }
      `}</style>

      {/* ── Modal kartu kecil — posisi dikontrol JS ── */}
      {modalVisible && (
        <div
          ref={modalRef}
          style={{
            position: 'absolute',        /* absolute dikontrol JS scroll listener */
            zIndex: 2147483647,
            width: '90%',
            maxWidth: 400,
            top: 24,                     /* akan di-update oleh useModalPosition */
            left: '50%',
          }}
        >
          <div style={{
            background: 'rgba(10,18,35,.97)', borderRadius: 16, padding: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,.65)',
            border: '1px solid rgba(56,189,248,.35)',
            backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
          }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '.4rem' }}>🤖</div>
            <h3 style={{ color:'#fff', margin:'0 0 .4rem', fontFamily:"'Manrope',sans-serif", fontSize:'1.1rem', fontWeight:700 }}>
              {t('voiceAssistant.title', 'Asisten Suara AI')}
            </h3>
            <p style={{ color:'#94a3b8', margin:'0 0 1.3rem', fontFamily:"'Quicksand',sans-serif", lineHeight:1.55, fontSize:'.88rem' }}>
              {t('voiceAssistant.prompt', 'Ingin mengobrol langsung dengan AI mengenai profil dan project saya?')}
            </p>
            <div style={{ display:'flex', gap:'.75rem', justifyContent:'center' }}>
              <button onClick={handleDecline} style={{
                padding:'.5rem 1.1rem', borderRadius:9, border:'1px solid rgba(71,85,105,.7)',
                background:'transparent', color:'#94a3b8', cursor:'pointer',
                fontFamily:"'Quicksand',sans-serif", fontWeight:600, fontSize:'.85rem', transition:'all .2s',
              }}
                onMouseOver={e=>{e.currentTarget.style.background='rgba(71,85,105,.3)';e.currentTarget.style.color='#e2e8f0';}}
                onMouseOut={e =>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='#94a3b8';}}>
                {t('voiceAssistant.decline', 'Tolak')}
              </button>
              <button onClick={handleAccept} style={{
                padding:'.5rem 1.1rem', borderRadius:9, border:'none',
                background:'#2563eb', color:'#fff', cursor:'pointer',
                fontFamily:"'Quicksand',sans-serif", fontWeight:700, fontSize:'.85rem',
                boxShadow:'0 4px 14px rgba(56,189,248,.4)', transition:'all .2s',
              }}
                onMouseOver={e=>{e.currentTarget.style.filter='brightness(1.15)';}}
                onMouseOut={e =>{e.currentTarget.style.filter='none';}}>
                {t('voiceAssistant.accept', 'Mulai Mengobrol')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Floating widget — posisi dikontrol JS ── */}
      {isActive && (
        <div
          id="va-floating-widget"
          ref={widgetRef}
          style={{
            position: 'absolute',        /* absolute dikontrol JS scroll listener */
            zIndex: 2147483647,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'rgba(10,18,35,.95)',
            padding: '8px 8px 8px 16px',
            borderRadius: 50,
            border: '1px solid rgba(56,189,248,.3)',
            boxShadow: '0 8px 32px rgba(0,0,0,.5)',
            backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          <span style={{
            fontFamily:"'Quicksand',sans-serif", fontSize:'.8rem', fontWeight:600,
            whiteSpace:'nowrap', userSelect:'none', transition:'color .25s',
            color: isListening ? '#f87171' : isSpeaking ? '#fbbf24' : '#64748b',
          }}>
            {statusText}
          </span>

          <button
            onClick={toggleListening}
            className={isListening ? 'va-listening' : ''}
            title={isListening ? 'Hentikan rekaman' : isSpeaking ? 'Hentikan AI' : 'Mulai berbicara'}
            style={{
              width:44, height:44, borderRadius:'50%', border:'none', cursor:'pointer',
              flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'1.2rem', color:'#fff', background: micBg,
              transform: isListening ? 'scale(1.08)' : 'scale(1)',
              transition: 'background .25s, transform .2s',
              boxShadow: (isListening||isSpeaking) ? 'none' : '0 4px 14px rgba(56,189,248,.4)',
            }}
            onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.1)'; }}
            onMouseOut={e  => { e.currentTarget.style.transform = isListening ? 'scale(1.08)' : 'scale(1)'; }}
          >
            {isSpeaking
              ? <i className="ri-stop-circle-line" style={{ fontSize:'1.35rem' }} />
              : <i className={`ri-mic-${isListening ? 'fill' : 'line'}`} />}
          </button>
        </div>
      )}
    </>,
    document.body
  );
}
