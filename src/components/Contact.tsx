import user_info from "../data/userdata";

import { FaSquareXTwitter, FaLinkedin } from "react-icons/fa6";
import { FaFacebook, FaInstagram, FaPhone } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";

function Contact() {
  const contactLinkClass =
    "flex gap-4 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300";

  return (
    <section
      id="contact"
      className="mt-20 pt-12 px-6 lg:px-24 transition-colors duration-500"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      {/* =========== TITLE =========== */}
      <h4 className="text-4xl sm:text-5xl font-bold text-[var(--color-text)]">
        Let&apos;s Get in Touch:{" "}
        <span className="text-[var(--color-accent)]">
          Ways to Connect with Me
        </span>
      </h4>

      {/* =========== DESCRIPTION =========== */}
      <p className="mt-8 leading-7 text-base text-[var(--color-subtext)] font-light max-w-3xl">
        {user_info.contact.description}
      </p>

      {/* =========== INFO CARDS =========== */}
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Email Card */}
        <a
          href={`mailto:${user_info.main.email}`}
          className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] hover:bg-[var(--card-hover)] transition-all duration-300 group"
        >
          <MdEmail className="text-3xl text-[var(--color-accent)] mb-3 group-hover:scale-110 transition-transform" />
          <h5 className="font-semibold text-[var(--color-text)] mb-1">Email</h5>
          <p className="text-sm text-[var(--color-subtext)]">{user_info.main.email}</p>
        </a>

        {/* Phone Card */}
        {user_info.main.phone && (
          <a
            href={`tel:${user_info.main.phone}`}
            className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] hover:bg-[var(--card-hover)] transition-all duration-300 group"
          >
            <FaPhone className="text-3xl text-[var(--color-accent)] mb-3 group-hover:scale-110 transition-transform" />
            <h5 className="font-semibold text-[var(--color-text)] mb-1">Phone</h5>
            <p className="text-sm text-[var(--color-subtext)]">{user_info.main.phone}</p>
          </a>
        )}

        {/* Location Card */}
        {user_info.main.address && (
          <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] group">
            <MdLocationOn className="text-3xl text-[var(--color-accent)] mb-3" />
            <h5 className="font-semibold text-[var(--color-text)] mb-1">Location</h5>
            <p className="text-sm text-[var(--color-subtext)]">{user_info.main.address}</p>
          </div>
        )}
      </div>

      {/* =========== SOCIAL LINKS =========== */}
      <div className="mt-12">
        <h5 className="text-lg font-semibold text-[var(--color-text)] mb-6">Follow Me</h5>
        <div className="flex flex-wrap gap-4">
          {/* Facebook */}
          <a
            href={user_info.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] text-[var(--color-text)] hover:text-white transition-all duration-300"
            title="Facebook"
          >
            <FaFacebook className="text-xl" />
          </a>

          {/* X / Twitter */}
          <a
            href={user_info.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] text-[var(--color-text)] hover:text-white transition-all duration-300"
            title="X / Twitter"
          >
            <FaSquareXTwitter className="text-xl" />
          </a>

          {/* Instagram */}
          <a
            href={user_info.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] text-[var(--color-text)] hover:text-white transition-all duration-300"
            title="Instagram"
          >
            <FaInstagram className="text-xl" />
          </a>

          {/* LinkedIn */}
          <a
            href={user_info.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] text-[var(--color-text)] hover:text-white transition-all duration-300"
            title="LinkedIn"
          >
            <FaLinkedin className="text-xl" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
