import { listProyek } from "../data";

const Projects = () => {
    return (
        <section className="py-12 md:py-20 bg-zinc-950" id="proyek">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-10 md:mb-12">
                    <h2
                        className="text-3xl md:text-4xl font-bold mb-3 md:mb-4"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                    >
                        <span className="gradient-text">Proyek</span> Saya
                    </h2>
                    <p
                        className="text-sm md:text-base opacity-70 max-w-2xl mx-auto"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="200"
                    >
                        Berikut ini beberapa proyek yang telah saya buat
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {listProyek.map((proyek) => (
                        <div
                            key={proyek.id}
                            className="glass-dark rounded-xl md:rounded-2xl overflow-hidden card-hover group"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            data-aos-delay={proyek.dad}
                        >
                            {/* Project Image */}
                            <div className="relative overflow-hidden aspect-video">
                                <img
                                    src={proyek.gambar}
                                    alt={proyek.nama}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60"></div>
                            </div>

                            {/* Project Info */}
                            <div className="p-4 md:p-5">
                                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 group-hover:text-violet-400 transition-colors">
                                    {proyek.nama}
                                </h3>
                                <p className="text-xs md:text-sm opacity-70 leading-relaxed mb-3 md:mb-4">
                                    {proyek.desk}
                                </p>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-5">
                                    {proyek.tools.map((tool, index) => (
                                        <span
                                            key={index}
                                            className="px-2.5 py-1 text-xs bg-violet-600/20 border border-violet-500/30 rounded-lg font-medium text-violet-300"
                                        >
                                            {tool}
                                        </span>
                                    ))}
                                </div>

                                {/* View Button */}
                                <a
                                    href={proyek.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-violet-600 hover:bg-violet-700 text-center py-2.5 md:py-3 rounded-lg md:rounded-xl font-medium text-sm md:text-base transition-all glow-hover"
                                >
                                    Lihat Website
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
