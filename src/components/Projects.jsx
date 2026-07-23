import { listProyek } from "../data";

const Projects = () => {
  return (
    <section className="section-padding bg-secondary" id="proyek">
      <div className="container-custom">

        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="section-label justify-center">
            <i className="ri-code-box-line"></i>
            Portfolio
          </div>
          <h2
            className="text-navy mb-3"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            Proyek <span className="text-accent">Saya</span>
          </h2>
          <p
            className="text-slate-500 text-sm"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="100"
          >
            Berikut ini beberapa proyek yang telah saya kerjakan
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {listProyek.map((proyek) => (
            <div
              key={proyek.id}
              className="card overflow-hidden group"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={proyek.dad}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden aspect-video bg-slate-100">
                <img
                  src={proyek.gambar}
                  alt={proyek.nama}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-blue-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <a
                    href={proyek.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-accent font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors flex items-center gap-1.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <i className="ri-external-link-line"></i>
                    Lihat Proyek
                  </a>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-4">
                <h3 className="font-bold text-navy text-base mb-1.5 group-hover:text-accent transition-colors">
                  {proyek.nama}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">
                  {proyek.desk}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proyek.tools.map((tool, index) => (
                    <span key={index} className="badge">{tool}</span>
                  ))}
                </div>

                {/* View Button */}
                <a
                  href={proyek.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline w-full justify-center text-xs py-2"
                >
                  <i className="ri-github-line"></i>
                  Lihat Repository
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
