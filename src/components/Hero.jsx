import { useState, useEffect } from "react";
import { DataImage } from "../data";

const Hero = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="min-h-screen flex items-center pt-24 pb-16 bg-primary" id="beranda">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blue-50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="container-custom w-full relative">
        <div className="grid md:grid-cols-2 items-center gap-12 lg:gap-16">

          {/* Text Content */}
          <div
            data-aos="fade-right"
            data-aos-duration="800"
          >
            {/* Label badge */}
            <div className="section-label mb-4">
              <i className="ri-user-line"></i>
              Fresh Graduate
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight text-navy">
              Halo, Saya{" "}
              <span className="text-accent">M. Sholihun</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg font-medium text-slate-500 mb-4">
              Mobile & Web Developer
            </p>

            {/* Description */}
            <p className="text-base leading-relaxed mb-8 text-slate-600 max-w-lg">
              Fresh Graduate Teknik Informatika di Politeknik Negeri Bengkalis.
              Berpengalaman dalam pengembangan aplikasi mobile & web, serta aktif di
              organisasi, kompetisi, dan program Coding Camp DBS Foundation 2025.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://bit.ly/CVSholihun"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Download CV <i className="ri-download-line"></i>
              </a>
              <a
                href="#proyek"
                className="btn-outline"
              >
                Lihat Proyek <i className="ri-arrow-down-line"></i>
              </a>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-8 mt-10 pt-8 border-t border-slate-200">
              <div>
                <p className="text-3xl font-bold text-navy">15<span className="text-accent">+</span></p>
                <p className="text-sm text-slate-500 mt-0.5">Proyek Selesai</p>
              </div>
              <div className="w-px h-10 bg-slate-200"></div>
              <div>
                <p className="text-3xl font-bold text-navy">3<span className="text-accent">+</span></p>
                <p className="text-sm text-slate-500 mt-0.5">Tahun Pengalaman</p>
              </div>
              <div className="w-px h-10 bg-slate-200"></div>
              <div>
                <p className="text-3xl font-bold text-navy">8<span className="text-accent">+</span></p>
                <p className="text-sm text-slate-500 mt-0.5">Sertifikasi</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div
            className="relative flex justify-center md:justify-end"
            data-aos="fade-left"
            data-aos-duration="800"
            data-aos-delay="150"
          >
            {/* Background shape */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 md:w-96 md:h-96 bg-blue-100 rounded-full"></div>
            </div>

            {/* Profile Image */}
            <div className="relative z-10">
              <img
                src={DataImage.HeroImage}
                alt="M. Sholihun"
                className="relative w-72 md:w-80 rounded-3xl shadow-2xl float-animation object-cover"
                loading="lazy"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 border border-slate-100">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <i className="ri-code-s-slash-line text-accent ri-lg"></i>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Status</p>
                  <p className="text-sm font-bold text-navy">Open to Work</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        {!hasScrolled && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
            <a href="#tentang" className="flex flex-col items-center gap-2 text-slate-400 hover:text-accent transition-colors animate-bounce">
              <span className="text-xs font-medium">Scroll Down</span>
              <i className="ri-arrow-down-line ri-xl"></i>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
