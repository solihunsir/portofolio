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
    <section className="min-h-screen flex items-center pt-28 pb-12" id="beranda">
      <div className="container-custom w-full">
        <div className="grid md:grid-cols-2 items-center gap-8 lg:gap-12">
          {/* Text Content */}
          <div
            className="animate__animated animate__fadeInUp animate__delay-3s"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            {/* Quote Badge */}
            <div className="flex items-center gap-3 mb-6 glass p-3 md:p-4 rounded-xl md:rounded-2xl w-fit">
              <img
                src={DataImage.HeroImage}
                alt="Hero Image"
                className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-cover flex-shrink-0"
                loading="lazy"
              />
              <q className="text-xs md:text-sm italic opacity-90 leading-relaxed">
                Keberhasilan diraih oleh mereka yang tetap bertahan dan tidak
                mudah menyerah😁
              </q>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              Hi, Saya{" "}
              <span className="gradient-text">M. Sholihun</span>
            </h1>

            {/* Description */}
            <p className="text-sm md:text-base lg:text-lg leading-relaxed mb-6 md:mb-8 opacity-80">
              Saya adalah mahasiswa semester 8 Program Studi D4 Rekayasa Perangkat
              Lunak di Politeknik Negeri Bengkalis, dengan minat pada pengembangan
              aplikasi mobile dan website. Melalui pengalaman organisasi,
              kompetisi, pelatihan, dan Coding Camp X DBS Foundation 2025, saya
              telah mengasah keterampilan teknis dan soft skill. Saya termotivasi
              untuk mengikuti Program Magang Berdampak sebagai langkah memperluas
              wawasan dan memahami dunia kerja industri teknologi secara langsung.
              Dengan semangat dan dedikasi, saya siap memberikan kontribusi nyata
              di bidang pengembangan perangkat lunak.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <a
                href="https://bit.ly/CVSholihun"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-violet-600 hover:bg-violet-700 px-5 py-3 md:px-6 md:py-3.5 rounded-xl font-medium flex items-center gap-2 glow-hover text-sm md:text-base"
              >
                Download CV <i className="ri-download-line md:ri-lg"></i>
              </a>
              <a
                href="#proyek"
                className="glass hover:glass-dark px-5 py-3 md:px-6 md:py-3.5 rounded-xl font-medium flex items-center gap-2 text-sm md:text-base"
              >
                Lihat Proyek <i className="ri-arrow-down-line md:ri-lg"></i>
              </a>
            </div>
          </div>

          {/* Image */}
          <div
            className="relative mt-8 md:mt-0"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            <div className="relative mx-auto md:ml-auto w-full max-w-sm md:max-w-md">
              {/* Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl blur-3xl opacity-20"></div>

              {/* Image */}
              <img
                src={DataImage.HeroImage}
                alt="M. Sholihun"
                className="relative w-full rounded-3xl shadow-2xl float-animation"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Shows only once, hides permanently after first scroll */}
        {!hasScrolled && (
          <div
            className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 hidden md:block transition-opacity duration-500"
          >
            <a href="#tentang" className="flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity animate-bounce">
              <span className="text-xs md:text-sm">Scroll Down</span>
              <i className="ri-arrow-down-line ri-xl md:ri-2x"></i>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
