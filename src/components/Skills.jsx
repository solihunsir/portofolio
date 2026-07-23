import { listTools } from "../data";

const Skills = () => {
    return (
        <section className="section-padding bg-zinc-900">
            <div className="container-custom">
                {/* Section Header */}
                <div className="max-w-2xl mb-16">
                    <h2
                        className="text-4xl md:text-5xl font-bold mb-4"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                    >
                        Tools yang <span className="gradient-text">Dipakai</span>
                    </h2>
                    <p
                        className="text-base md:text-lg opacity-70 leading-relaxed"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="200"
                    >
                        Berikut ini beberapa Tools yang biasa saya gunakan untuk membuat
                        Website maupun Mobile
                    </p>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {listTools.map((tool) => (
                        <div
                            key={tool.id}
                            className="glass-dark p-5 rounded-2xl flex items-center gap-4 card-hover group cursor-pointer"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            data-aos-delay={tool.dad}
                        >
                            {/* Tool Icon */}
                            <div className="flex-shrink-0 bg-zinc-800 p-3 rounded-xl group-hover:bg-zinc-700 transition-colors">
                                <img
                                    src={tool.gambar}
                                    alt={tool.nama}
                                    className="w-12 h-12 object-contain"
                                    loading="lazy"
                                />
                            </div>

                            {/* Tool Info */}
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-base md:text-lg truncate">
                                    {tool.nama}
                                </h4>
                                <p className="text-sm opacity-60">{tool.ket}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
