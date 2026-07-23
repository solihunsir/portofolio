import { listAgenda } from "../data";

const Agenda = () => {
    return (
        <section className="py-12 md:py-20 bg-zinc-900" id="agenda">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-10 md:mb-12">
                    <h2
                        className="text-3xl md:text-4xl font-bold mb-3 md:mb-4"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                    >
                        <span className="gradient-text">Agenda</span> & Pencapaian
                    </h2>
                    <p
                        className="text-sm md:text-base opacity-70 max-w-2xl mx-auto"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="200"
                    >
                        Berikut ini beberapa Agenda dan Pencapaian selama masa perkuliahan
                    </p>
                </div>

                {/* Agenda Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                    {listAgenda.map((agenda) => (
                        <div
                            key={agenda.id}
                            className="glass-dark rounded-xl md:rounded-2xl overflow-hidden card-hover group"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            data-aos-delay={agenda.dad}
                        >
                            {/* Agenda Image */}
                            <div className="relative overflow-hidden aspect-[4/3]">
                                <img
                                    src={agenda.gambar}
                                    alt={agenda.nama}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60"></div>
                            </div>

                            {/* Agenda Info */}
                            <div className="p-4">
                                <h3 className="text-base md:text-lg font-bold mb-2 leading-tight group-hover:text-violet-400 transition-colors">
                                    {agenda.nama}
                                </h3>
                                <p className="text-xs md:text-sm opacity-70 leading-relaxed">
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
