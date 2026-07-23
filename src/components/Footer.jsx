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
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">
              <span className="gradient-text">Porto</span>folio
            </h2>
            <p className="text-sm opacity-60">
              © {currentYear} M. Sholihun. All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm hover:text-violet-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg glass hover:glass-dark hover:text-violet-400 transition-all"
                aria-label={social.label}
              >
                <i className={`${social.icon} ri-xl`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

