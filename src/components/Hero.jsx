import { useState, useEffect } from "react";
import { DataImage } from "../data";

const CV_LINK = "https://bit.ly/4fsgT26";

const Hero = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setHasScrolled(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="hero-bg min-h-screen flex items-center pt-20 pb-14" id="beranda">
      {/* ── Floating Orbs (Dicoding-style animated background) ── */}
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />
      <div className="orb orb-4" aria-hidden="true" />
      <div className="orb-ring"  aria-hidden="true" />

      <div className="container-custom w-full relative z-10">
        <div className="grid md:grid-cols-2 items-center gap-10 lg:gap-16">

          {/* ── Text Content ── */}
          <div data-aos="fade-right" data-aos-duration="800">
            {/* Badge */}
            <div className="section-label">
              <i className="ri-user-line text-xs"></i>
              Fresh Graduate
            </div>

            {/* Heading */}
            <h1 className="text-navy mb-3">
              Halo, Saya{" "}
              <span className="text-accent">M. Sholihun</span>
            </h1>

            {/* Role */}
            <p className="text-slate-500 font-semibold text-base mb-3">
              Mobile &amp; Web Developer
            </p>

            {/* Description */}
            <p className="text-slate-600 mb-7 max-w-md">
              Fresh Graduate Teknik Informatika di Politeknik Negeri Bengkalis.
              Berpengalaman dalam pengembangan aplikasi mobile &amp; web, aktif di
              organisasi, kompetisi, dan Coding Camp DBS Foundation 2025.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a href={CV_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Download CV <i className="ri-download-line"></i>
              </a>
              <a href="#proyek" className="btn-outline">
                Lihat Proyek <i className="ri-arrow-right-line"></i>
              </a>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-7 mt-9 pt-7 border-t border-slate-200">
              <div>
                <p className="text-2xl font-bold text-navy">15<span className="text-accent">+</span></p>
                <p className="text-xs text-slate-500 mt-0.5">Proyek Selesai</p>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div>
                <p className="text-2xl font-bold text-navy">3<span className="text-accent">+</span></p>
                <p className="text-xs text-slate-500 mt-0.5">Tahun Pengalaman</p>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div>
                <p className="text-2xl font-bold text-navy">8<span className="text-accent">+</span></p>
                <p className="text-xs text-slate-500 mt-0.5">Sertifikasi</p>
              </div>
            </div>
          </div>

          {/* ── Profile Image ── */}
          <div
            className="relative flex justify-center md:justify-end"
            data-aos="fade-left"
            data-aos-duration="800"
            data-aos-delay="150"
          >
            {/* circle bg */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 md:w-80 md:h-80 rounded-full bg-blue-100/70" />
            </div>

            <div className="relative z-10">
              <img
                src={DataImage.HeroImage}
                alt="M. Sholihun"
                className="w-64 md:w-72 rounded-2xl shadow-xl float-animation object-cover"
                loading="lazy"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-6 bg-white rounded-xl shadow-lg px-3 py-2.5 flex items-center gap-2.5 border border-slate-100">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <i className="ri-code-s-slash-line text-accent text-sm"></i>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 leading-none">Status</p>
                  <p className="text-xs font-bold text-navy leading-snug">Open to Work</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        {!hasScrolled && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block">
            <a href="#tentang" className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-accent transition-colors animate-bounce">
              <span className="text-xs font-medium">Scroll</span>
              <i className="ri-arrow-down-line"></i>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
