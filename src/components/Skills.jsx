import { listTools } from "../data";

const Skills = () => {
  return (
    <section className="section-padding bg-primary" id="tools">
      <div className="container-custom">

        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="section-label justify-center">
            <i className="ri-tools-line"></i>
            Tech Stack
          </div>
          <h2
            className="text-navy mb-3"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            Tools yang <span className="text-accent">Saya Pakai</span>
          </h2>
          <p
            className="text-slate-500 text-sm"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="100"
          >
            Teknologi dan tools yang biasa saya gunakan untuk membuat Website
            maupun Mobile App
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
          {listTools.map((tool) => (
            <div
              key={tool.id}
              className="card p-4 flex flex-col items-center gap-2.5 cursor-pointer group"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay={tool.dad}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors p-1.5">
                <img
                  src={tool.gambar}
                  alt={tool.nama}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-xs text-navy leading-tight">{tool.nama}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">{tool.ket}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
