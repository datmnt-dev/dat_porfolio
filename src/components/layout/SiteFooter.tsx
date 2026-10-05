import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import user_info from "../../data/userdata";
import { useLenis } from "../../motion";

const SiteFooter = () => {
  const year = new Date().getFullYear();
  const { scrollTo } = useLenis();

  const navSections = [
    {
      title: "Index",
      links: [
        { to: "/projects", label: "Selected Work" },
        { to: "/about", label: "About" },
        { to: "/experience", label: "Experience" },
        { to: "/skills", label: "Technical Skills" },
      ],
    },
    {
      title: "Exploration",
      links: [
        { to: "/blog", label: "Engineering Notes" },
        { to: "/playground", label: "Interactive Lab" },
        { to: "/contact", label: "Direct Contact" },
      ],
    },
  ];

  const socialLinks = [
    { href: user_info.socials.github, Icon: FaGithub, label: "GitHub" },
    { href: user_info.socials.linkedin, Icon: FaLinkedin, label: "LinkedIn" },
    { href: `mailto:${user_info.main.email}`, Icon: MdEmail, label: "Email" },
  ];

  return (
    <footer
      className="mt-28 border-t relative"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-bg)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand info - 6 cols */}
          <div className="md:col-span-6 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <span className="font-display font-semibold text-lg tracking-tight">
                {user_info.main.name}
                <span className="text-[var(--color-accent)]">.</span>
              </span>
            </Link>

            <p className="text-sm text-[var(--color-subtext)] max-w-sm leading-relaxed">
              Software Engineer based in Da Nang, Vietnam. Focused on building reliable web products with React, TypeScript, and modern backend services.
            </p>

            <div className="pt-2 flex items-center gap-2.5">
              {socialLinks.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border flex items-center justify-center text-sm transition-colors"
                  style={{
                    borderColor: "var(--color-border)",
                    backgroundColor: "var(--color-card)",
                    color: "var(--color-subtext)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-text)";
                    e.currentTarget.style.borderColor = "var(--color-border-strong)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--color-subtext)";
                    e.currentTarget.style.borderColor = "var(--color-border)";
                  }}
                  aria-label={label}
                  title={label}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation links - 6 cols (3 + 3) */}
          <div className="md:col-span-6 grid grid-cols-2 gap-8">
            {navSections.map((section) => (
              <div key={section.title}>
                <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--color-subtext)] mb-4 font-semibold">
                  {section.title}
                </h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-sm text-[var(--color-subtext)] hover:text-[var(--color-text)] transition-colors inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[var(--color-subtext)]"
          style={{ borderColor: "var(--color-border)" }}
        >
          <p>
            © {year} {user_info.main.name}. Built with React 19 + TypeScript.
          </p>
          <button
            onClick={() => scrollTo(0)}
            className="inline-flex items-center gap-2 hover:text-[var(--color-text)] transition-colors cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <FaArrowUp className="text-[10px]" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
