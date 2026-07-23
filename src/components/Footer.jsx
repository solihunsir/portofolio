const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: "https://github.com/solihunsir", icon: "ri-github-fill", label: "GitHub" },
    { href: "https://www.instagram.com/solihunsir", icon: "ri-instagram-fill", label: "Instagram" },
    { href: "https://www.linkedin.com/in/m-sholihun", icon: "ri-linkedin-fill", label: "LinkedIn" },
    { href: "https://www.youtube.com/@solihunsir", icon: "ri-youtube-fill", label: "YouTube" },
  ];

  const footerLinks = [
    { href: "#beranda", label: "Beranda" },
    { href: "#tentang", label: "Tentang" },
    { href: "#proyek", label: "Proyek" },
    { href: "#agenda", label: "Agenda" },
    { href: "#kontak", label: "Kontak" },
  ];

  return (
    <footer className="footer-bg">
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <h2 className="text-xl font-bold text-white">
                Sholihun<span className="text-blue-400">.</span>
              </h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-xs">
              Fresh Graduate Teknik Informatika yang bersemangat membangun
              solusi digital yang berdampak.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-blue-600 text-slate-300 hover:text-white transition-all duration-200"
                  aria-label={social.label}
                >
                  <i className={`${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navigasi</h3>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <i className="ri-mail-line text-blue-400 flex-shrink-0"></i>
                solihun.bks2019@gmail.com
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <i className="ri-map-pin-line text-blue-400 flex-shrink-0"></i>
                Bengkalis, Riau, Indonesia
              </li>
              <li>
                <a
                  href="https://bit.ly/CVSholihun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  <i className="ri-download-line"></i>
                  Download CV
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} M. Sholihun. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">
            Made with <span className="text-red-400">❤</span> using React & Vite
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
