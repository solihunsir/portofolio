import { DataImage } from "../data";

const About = () => {
  const stats = [
    { number: "15+", label: "Proyek Selesai", icon: "ri-folder-line" },
    { number: "3+", label: "Tahun Pengalaman", icon: "ri-time-line" },
    { number: "8+", label: "Sertifikasi", icon: "ri-award-line" },
    { number: "5+", label: "Penghargaan", icon: "ri-trophy-line" },
  ];

  return (
    <section className="section-padding bg-secondary" id="tentang">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image Column */}
          <div
            className="relative"
            data-aos="fade-right"
            data-aos-duration="800"
          >
            <div className="relative inline-block w-full max-w-sm mx-auto md:mx-0">
              {/* Background block */}
              <div className="absolute -top-4 -left-4 w-full h-full bg-blue-100 rounded-3xl"></div>
              <img
                src={DataImage.HeroImage}
                alt="Profile"
                className="relative w-full rounded-3xl shadow-xl object-cover"
                loading="lazy"
              />
              {/* Experience badge */}
              <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-lg px-5 py-4 border border-slate-100">
                <p className="text-3xl font-bold text-accent">3+</p>
                <p className="text-xs text-slate-500 font-medium">Tahun<br />Pengalaman</p>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div
            data-aos="fade-left"
            data-aos-duration="800"
            data-aos-delay="150"
          >
            <div className="section-label">
              <i className="ri-user-heart-line"></i>
              Tentang Saya
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4 leading-tight">
              Passionate Developer &<br />
              <span className="text-accent">Lifelong Learner</span>
            </h2>

            <div className="divider"></div>

            <p className="text-slate-600 leading-relaxed mb-5">
              Saya adalah Fresh Graduate Jurusan Teknik Informatika di Politeknik Negeri Bengkalis
              dengan minat besar dalam pengembangan aplikasi mobile dan web app.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              Berpengalaman dalam organisasi, kepanitiaan, dan kompetisi di bidang teknologi dan
              olahraga. Tersertifikasi di bidang Front-End & Back-End Developer serta Pemrograman
              dengan Kotlin dari Dicoding untuk memperkuat kompetensi dalam pengembangan aplikasi mobile.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="card p-5 flex items-center gap-4"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className={`${stat.icon} text-accent ri-lg`}></i>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-navy">{stat.number}</p>
                    <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
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
