/**
 * ToolsAnimation.jsx
 * -------------------
 * Komponen animasi ikon/tools menggunakan framer-motion.
 * Ikon mengalir secara diagonal dari atas-kiri dan atas-kanan
 * menuju bawah-tengah dalam infinite loop yang seamless.
 *
 * Layout: position:fixed, z-index:1  →  konten utama di z-index ≥ 10
 * Pointer events: none  →  tidak menghalangi interaksi user
 */

import { motion } from "framer-motion";

/* ── Daftar path ikon dari public/assets/tools/ ── */
const TOOL_ICONS = [
  "/assets/tools/reactjs.png",
  "/assets/tools/nextjs.png",
  "/assets/tools/nodejs.png",
  "/assets/tools/js.png",
  "/assets/tools/tailwind.png",
  "/assets/tools/bootstrap.png",
  "/assets/tools/flutter.png",
  "/assets/tools/android.png",
  "/assets/tools/mysql.png",
  "/assets/tools/git.png",
  "/assets/tools/github.png",
  "/assets/tools/vscode.png",
  "/assets/tools/figma.png",
  "/assets/tools/canva.png",
  "/assets/tools/ai.png",
];

/* ── Konfigurasi per-ikon ── */
const ICON_CONFIGS = TOOL_ICONS.map((src, i) => {
  const isLeft    = i % 2 === 0;              // jalur berselang: kiri / kanan
  const duration  = 10 + (i % 6) * 1.5;      // 10–17.5 detik per siklus
  const delay     = i * 1.05;                 // stagger 1.05 detik antar ikon
  const size      = 32 + (i % 4) * 5;        // 32 / 37 / 42 / 47 px
  const maxOpacity = 0.12 + (i % 4) * 0.05;  // 0.12 / 0.17 / 0.22 / 0.27 – sangat subtle

  /* Spread horizontal yang lebih merata agar tidak tumpuk di tengah */
  const spreadBase = 18 + (i % 5) * 7;       // 18–46 vw dari tengah
  const startX     = isLeft ? -spreadBase : spreadBase;
  const endX       = isLeft ? 3 : -3;         // konvergen ke tengah secara halus

  return { src, isLeft, duration, delay, size, maxOpacity, startX, endX };
});

/* ── Komponen utama ── */
export default function ToolsAnimation() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {ICON_CONFIGS.map(({ src, duration, delay, size, maxOpacity, startX, endX }, i) => (
        <motion.img
          key={`tool-${i}`}
          src={src}
          alt=""
          loading="lazy"
          initial={{
            x: `${startX}vw`,
            y: "-44vh",
            opacity: 0,
            scale: 0.65,
          }}
          animate={{
            x: [`${startX}vw`, `${startX * 0.45}vw`, `${endX}vw`],
            y: ["-44vh", "8vh", "50vh"],
            opacity: [0, maxOpacity, maxOpacity, 0],
            scale: [0.65, 1, 1, 0.8],
          }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration,
            delay,
            times: [0, 0.2, 0.78, 1],
          }}
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            translateX: "-50%",
            width: size,
            height: size,
            objectFit: "contain",
            mixBlendMode: "multiply",
            willChange: "transform, opacity",
            borderRadius: 8,
            background: "transparent",
          }}
        />
      ))}
    </div>
  );
}
