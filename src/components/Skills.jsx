import { listTools } from "../data";

const Skills = () => {
  return (
    <section className="section-padding bg-primary" id="tools">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="section-label justify-center">
            <i className="ri-tools-line"></i>
            Tech Stack
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-navy mb-4"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            Tools yang <span className="text-accent">Saya Pakai</span>
          </h2>
          <p
            className="text-slate-600 leading-relaxed"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="100"
          >
            Berikut ini beberapa teknologi dan tools yang biasa saya gunakan
            untuk membuat Website maupun Mobile App
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {listTools.map((tool) => (
            <div
              key={tool.id}
              className="card p-5 flex flex-col items-center gap-3 cursor-pointer group"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay={tool.dad}
            >
              {/* Tool Icon */}
              <div className="w-14 h-14 flex items-center justify-center bg-slate-50 rounded-2xl group-hover:bg-blue-50 transition-colors p-2">
                <img
                  src={tool.gambar}
                  alt={tool.nama}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>

              {/* Tool Info */}
              <div className="text-center">
                <h4 className="font-semibold text-sm text-navy leading-tight">{tool.nama}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{tool.ket}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
