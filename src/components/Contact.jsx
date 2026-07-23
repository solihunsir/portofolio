const Contact = () => {
  return (
    <section className="section-padding bg-secondary" id="kontak">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">

          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="section-label justify-center">
              <i className="ri-mail-line"></i>
              Kontak
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-navy mb-4"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              Mari <span className="text-accent">Terhubung</span>
            </h2>
            <p
              className="text-slate-600 max-w-lg mx-auto"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="100"
            >
              Tertarik untuk berkolaborasi? Silakan kirim pesan dan saya akan segera merespons.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8 items-start">
            {/* Contact Info */}
            <div
              className="md:col-span-2 space-y-5"
              data-aos="fade-right"
              data-aos-duration="800"
            >
              <div className="card p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-mail-line text-accent ri-lg"></i>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Email</p>
                  <p className="text-sm font-semibold text-navy">solihun.bks2019@gmail.com</p>
                </div>
              </div>

              <div className="card p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-github-line text-accent ri-lg"></i>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">GitHub</p>
                  <a
                    href="https://github.com/solihunsir"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-navy hover:text-accent transition-colors"
                  >
                    github.com/solihunsir
                  </a>
                </div>
              </div>

              <div className="card p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-linkedin-line text-accent ri-lg"></i>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">LinkedIn</p>
                  <a
                    href="https://www.linkedin.com/in/m-sholihun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-navy hover:text-accent transition-colors"
                  >
                    linkedin.com/in/m-sholihun
                  </a>
                </div>
              </div>

              <div className="card p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-instagram-line text-accent ri-lg"></i>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Instagram</p>
                  <a
                    href="https://www.instagram.com/solihunsir"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-navy hover:text-accent transition-colors"
                  >
                    @solihunsir
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form
              action="https://formsubmit.co/solihun.bks2019@gmail.com"
              method="POST"
              className="md:col-span-3 card p-6 md:p-8"
              autoComplete="off"
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay="150"
            >
              <h3 className="text-lg font-bold text-navy mb-6">Kirim Pesan</h3>

              <div className="space-y-5">
                {/* Name Field */}
                <div className="space-y-1.5">
                  <label htmlFor="nama" className="text-sm font-semibold text-slate-700 block">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    placeholder="Masukan Nama"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-sm font-semibold text-slate-700 block">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Masukan Email"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    required
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <label htmlFor="pesan" className="text-sm font-semibold text-slate-700 block">
                    Pesan
                  </label>
                  <textarea
                    id="pesan"
                    name="pesan"
                    rows="5"
                    placeholder="Masukan Pesan"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn-primary w-full justify-center py-3"
                >
                  <i className="ri-send-plane-line"></i>
                  Kirim Pesan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
