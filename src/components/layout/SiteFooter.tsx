import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaArrowUp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import user_info from "../../data/userdata";

const SiteFooter = () => {
  const year = 2025;
  const sections = [
    {
      title: "Khám phá",
      links: [
        { to: "/about", label: "About" },
        { to: "/projects", label: "Projects" },
        { to: "/experience", label: "Experience" },
        { to: "/skills", label: "Skills" },
      ],
    },
    {
      title: "Đọc & thử",
      links: [
        { to: "/blog", label: "Blog" },
        { to: "/playground", label: "Playground" },
        { to: "/contact", label: "Contact" },
      ],
    },
  ];

  return (
    <footer
      className="mt-24 border-t relative"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-bg-component)",
      }}
    >
      <div className="absolute inset-x-0 -top-px h-px" style={{ background: "var(--gradient-accent)", opacity: 0.4 }} />
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-[var(--color-accent)]">
                <img src={user_info.main.photo} alt="" className="w-full h-full object-cover" />
              </div>
              <span className="font-display font-bold text-lg">
                {user_info.main.name}
                <span className="text-[var(--color-accent)]">.</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-[var(--color-subtext)] max-w-md leading-relaxed">
              {user_info.main.shortBio}
            </p>

            <div className="mt-5 flex items-center gap-2">
              {[
                { href: user_info.socials.github, Icon: FaGithub, label: "GitHub" },
                { href: user_info.socials.linkedin, Icon: FaLinkedin, label: "LinkedIn" },
                { href: user_info.socials.facebook, Icon: FaFacebook, label: "Facebook" },
                { href: user_info.socials.instagram, Icon: FaInstagram, label: "Instagram" },
                { href: `mailto:${user_info.main.email}`, Icon: MdEmail, label: "Email" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 grid place-items-center rounded-xl border border-[var(--color-border)] text-[var(--color-text)] hover:text-white hover:border-[var(--color-accent)] transition"
                  style={{
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gradient-accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  aria-label={label}
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {sections.map((s) => (
            <div key={s.title}>
              <h4 className="font-display font-semibold text-sm mb-4">{s.title}</h4>
              <ul className="space-y-2">
                {s.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-[var(--color-subtext)] hover:text-[var(--color-accent)] transition"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--color-subtext)]">
            © {year} {user_info.main.name}. Crafted with React, Vite & a lot of ☕.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 text-xs text-[var(--color-subtext)] hover:text-[var(--color-accent)] transition"
          >
            <FaArrowUp />
            <span>Back to top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
