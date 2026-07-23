import { listAgenda } from "../data";

const Agenda = () => {
  return (
    <section className="section-padding bg-primary" id="agenda">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="section-label justify-center">
            <i className="ri-trophy-line"></i>
            Pencapaian
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-navy mb-4"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            Agenda & <span className="text-accent">Pencapaian</span>
          </h2>
          <p
            className="text-slate-600 leading-relaxed"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="100"
          >
            Berikut ini beberapa Agenda dan Pencapaian selama masa perkuliahan
          </p>
        </div>

        {/* Agenda Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {listAgenda.map((agenda, index) => (
            <div
              key={agenda.id}
              className="card overflow-hidden group"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay={index * 80}
            >
              {/* Agenda Image */}
              <div className="relative overflow-hidden aspect-[4/3] bg-slate-100">
                <img
                  src={agenda.gambar}
                  alt={agenda.nama}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Blue top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-accent"></div>
              </div>

              {/* Agenda Info */}
              <div className="p-4">
                <h3 className="text-sm font-bold text-navy mb-1.5 leading-snug group-hover:text-accent transition-colors">
                  {agenda.nama}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {agenda.desk}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Agenda;
