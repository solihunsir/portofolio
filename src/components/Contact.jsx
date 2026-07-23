const Contact = () => {
    return (
        <section className="py-12 md:py-20 bg-zinc-950" id="kontak">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-8 md:mb-10">
                    <h2
                        className="text-3xl md:text-4xl font-bold mb-3 md:mb-4"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                    >
                        Mari <span className="gradient-text">Terhubung</span>
                    </h2>
                    <p
                        className="text-sm md:text-base opacity-70"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="200"
                    >
                        Mari terhubung dengan saya
                    </p>
                </div>

                {/* Contact Form */}
                <form
                    action="https://formsubmit.co/solihun.bks2019@gmail.com"
                    method="POST"
                    className="glass-dark p-6 md:p-8 rounded-2xl md:rounded-3xl max-w-2xl mx-auto"
                    autoComplete="off"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="400"
                >
                    <div className="space-y-5 md:space-y-6">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <label htmlFor="nama" className="font-semibold text-sm md:text-base block">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                id="nama"
                                name="nama"
                                placeholder="Masukan Nama"
                                className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-zinc-600 focus:border-violet-500 text-sm md:text-base"
                                required
                            />
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="font-semibold text-sm md:text-base block">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Masukan Email"
                                className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-zinc-600 focus:border-violet-500 text-sm md:text-base"
                                required
                            />
                        </div>

                        {/* Message Field */}
                        <div className="space-y-2">
                            <label htmlFor="pesan" className="font-semibold text-sm md:text-base block">
                                Pesan
                            </label>
                            <textarea
                                id="pesan"
                                name="pesan"
                                rows="5"
                                placeholder="Masukan Pesan"
                                className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-zinc-600 focus:border-violet-500 resize-none text-sm md:text-base"
                                required
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-violet-600 hover:bg-violet-700 py-3 md:py-3.5 rounded-xl font-semibold text-sm md:text-base transition-all glow-hover"
                        >
                            Kirim Pesan
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Contact;
