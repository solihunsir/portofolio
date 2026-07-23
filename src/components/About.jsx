import { DataImage } from "../data";

const About = () => {
  const stats = [
    { number: "15+", label: "Proyek Selesai",   icon: "ri-folder-line" },
    { number: "3+",  label: "Tahun Pengalaman", icon: "ri-time-line" },
    { number: "8+",  label: "Sertifikasi",      icon: "ri-award-line" },
    { number: "5+",  label: "Penghargaan",      icon: "ri-trophy-line" },
  ];

  return (
    <section className="section-padding bg-secondary" id="tentang">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image Column */}
          <div className="relative" data-aos="fade-right" data-aos-duration="800">
            <div className="relative inline-block w-full max-w-xs mx-auto md:mx-0">
              <div className="absolute -top-3 -left-3 w-full h-full bg-blue-100 rounded-2xl" />
              <img
                src={DataImage.HeroImage}
                alt="Profile"
                className="relative w-full rounded-2xl shadow-lg object-cover"
                loading="lazy"
              />
              {/* Experience badge */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg px-4 py-3 border border-slate-100">
                <p className="text-2xl font-bold text-accent leading-none">3+</p>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">Tahun<br />Pengalaman</p>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div data-aos="fade-left" data-aos-duration="800" data-aos-delay="150">
            <div className="section-label">
              <i className="ri-user-heart-line"></i>
              Tentang Saya
            </div>

            <h2 className="text-navy mb-3">
              Passionate Developer &amp;<br />
              <span className="text-accent">Lifelong Learner</span>
            </h2>

            <div className="divider" />

            <p className="text-slate-600 text-sm mb-3">
              Saya adalah Fresh Graduate Jurusan Teknik Informatika di Politeknik Negeri Bengkalis
              dengan minat besar dalam pengembangan aplikasi mobile dan web app.
            </p>
            <p className="text-slate-600 text-sm mb-7">
              Berpengalaman dalam organisasi, kepanitiaan, dan kompetisi di bidang teknologi dan
              olahraga. Tersertifikasi di bidang Front-End &amp; Back-End Developer serta Pemrograman
              dengan Kotlin dari Dicoding untuk memperkuat kompetensi dalam pengembangan aplikasi mobile.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="card p-4 flex items-center gap-3"
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className={`${stat.icon} text-accent`}></i>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-navy leading-none">{stat.number}</p>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
