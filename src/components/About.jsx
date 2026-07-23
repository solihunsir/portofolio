import { DataImage } from "../data";

const About = () => {
    const stats = [
        { number: "15+", label: "Proyek Selesai" },
        { number: "3+", label: "Tahun Pengalaman" },
    ];

    return (
        <section className="section-padding bg-zinc-900" id="tentang">
            <div className="container-custom">
                {/* Stats Card */}
                <div
                    className="glass-dark p-8 md:p-10 rounded-3xl max-w-4xl mx-auto"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                >
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                        {/* Profile Image */}
                        <div className="flex-shrink-0">
                            <img
                                src={DataImage.HeroImage}
                                alt="Profile"
                                className="w-16 h-16 rounded-xl object-cover glow"
                                loading="lazy"
                            />
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center sm:justify-end gap-8 md:gap-12">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="text-center"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                >
                                    <h2 className="text-4xl md:text-5xl font-bold mb-2">
                                        {stat.number.split("+")[0]}
                                        <span className="gradient-text">+</span>
                                    </h2>
                                    <p className="text-sm md:text-base opacity-70">{stat.label}</p>
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
