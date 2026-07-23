import { useState, useEffect } from "react";
import { listAgenda } from "../data";

const Agenda = () => {
  const [lightbox, setLightbox] = useState(null); // { src, name }

  // Close on Escape key
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    // Prevent body scroll when modal open
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <>
      {/* ── Lightbox Modal ── */}
      {lightbox && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Gambar: ${lightbox.name}`}
        >
          {/* Close button */}
          <button
            className="lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label="Tutup"
          >
            <i className="ri-close-line"></i>
          </button>

          {/* Image */}
          <div onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.src}
              alt={lightbox.name}
              className="lightbox-img"
            />
            <p className="text-white text-center mt-3 text-sm font-medium opacity-80">
              {lightbox.name}
            </p>
          </div>
        </div>
      )}

      {/* ── Section ── */}
      <section className="section-padding bg-primary" id="agenda">
        <div className="container-custom">

          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="section-label justify-center">
              <i className="ri-trophy-line"></i>
              Pencapaian
            </div>
            <h2
              className="text-navy mb-3"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              Agenda &amp; <span className="text-accent">Pencapaian</span>
            </h2>
            <p
              className="text-slate-500 text-sm"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="100"
            >
              Berikut ini beberapa Agenda dan Pencapaian selama masa perkuliahan.
              Klik gambar untuk memperbesar.
            </p>
          </div>

          {/* Agenda Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {listAgenda.map((agenda, index) => (
              <div
                key={agenda.id}
                className="card overflow-hidden group cursor-zoom-in"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay={index * 70}
                onClick={() => setLightbox({ src: agenda.gambar, name: agenda.nama })}
                title="Klik untuk memperbesar"
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3] bg-slate-100">
                  <img
                    src={agenda.gambar}
                    alt={agenda.nama}
                    className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Blue top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent" />

                  {/* Hover overlay with zoom icon */}
                  <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 rounded-full w-10 h-10 flex items-center justify-center">
                      <i className="ri-zoom-in-line text-accent ri-lg"></i>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <h3 className="text-xs font-bold text-navy leading-snug group-hover:text-accent transition-colors mb-1">
                    {agenda.nama}
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                    {agenda.desk}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Agenda;
