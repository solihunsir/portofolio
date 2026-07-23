const Contact = () => {
  return (
    <section className="section-padding bg-secondary" id="kontak">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">

          {/* Section Header */}
          <div className="text-center mb-10">
            <div className="section-label justify-center">
              <i className="ri-mail-line"></i>
              Kontak
            </div>
            <h2
              className="text-navy mb-3"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              Mari <span className="text-accent">Terhubung</span>
            </h2>
            <p
              className="text-slate-500 text-sm max-w-md mx-auto"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="100"
            >
              Tertarik untuk berkolaborasi? Silakan kirim pesan dan saya akan segera merespons.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6 items-start">

            {/* Contact Info */}
            <div
              className="md:col-span-2 space-y-3"
              data-aos="fade-right"
              data-aos-duration="800"
            >
              {[
                { icon: "ri-mail-line",      label: "Email",     value: "solihun.bks2019@gmail.com",       href: null },
                { icon: "ri-github-line",    label: "GitHub",    value: "github.com/solihunsir",           href: "https://github.com/solihunsir" },
                { icon: "ri-linkedin-line",  label: "LinkedIn",  value: "linkedin.com/in/m-sholihun",      href: "https://www.linkedin.com/in/m-sholihun" },
                { icon: "ri-instagram-line", label: "Instagram", value: "@solihunsir",                     href: "https://www.instagram.com/solihunsir" },
              ].map((item, i) => (
                <div key={i} className="card p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className={`${item.icon} text-accent`}></i>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-400 font-medium">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer"
                        className="text-xs font-semibold text-navy hover:text-accent transition-colors truncate block">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-xs font-semibold text-navy truncate">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <form
              action="https://formsubmit.co/solihun.bks2019@gmail.com"
              method="POST"
              className="md:col-span-3 card p-6"
              autoComplete="off"
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay="150"
            >
              <h3 className="font-bold text-navy mb-5">Kirim Pesan</h3>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="nama" className="text-xs font-semibold text-slate-600 block">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    placeholder="Masukan Nama"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-slate-600 block">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Masukan Email"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="pesan" className="text-xs font-semibold text-slate-600 block">
                    Pesan
                  </label>
                  <textarea
                    id="pesan"
                    name="pesan"
                    rows="5"
                    placeholder="Masukan Pesan"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full justify-center py-2.5"
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
