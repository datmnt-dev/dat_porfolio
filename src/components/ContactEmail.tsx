import React, { FormEvent, useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import type { AppContextType } from "../types/AppContext";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { sendEmail } from "../services/emailService";
import user_info from "../data/userdata";

const ContactEmail = () => {
  const { theme } = useContext<AppContextType>(AppContext);

  // Sử dụng ảnh khác nhau cho light và dark theme
  const backgroundImage = theme === "dark" ? "/earth-dark.png" : "/earth.png";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    setIsLoading(true);

    const result = await sendEmail(formData);

    if (result.success) {
      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      setStatus("❌ Failed to send message. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <section
      id="contact-email"
      className="relative pt-16 pb-8 lg:px-24 transition-colors duration-500 overflow-hidden"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
          opacity: theme === "dark" ? 0.3 : 0.15,
        }}
      />

      {/* Gradient Overlay for better readability */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: theme === "dark"
            ? "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 100%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Form */}
          <div
            className="rounded-2xl shadow-xl p-8 border backdrop-blur-sm"
            style={{
              backgroundColor: theme === "dark" ? "rgba(24, 24, 27, 0.95)" : "rgba(255, 255, 255, 0.98)",
              borderColor: "var(--color-border)",
            }}
          >
            <h3 className="text-2xl font-bold mb-6 text-[var(--color-text)]">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full p-3 rounded-lg border bg-[var(--color-input-bg)] text-[var(--color-text)] placeholder:text-[var(--color-subtext)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all duration-300"
                  style={{ borderColor: "var(--color-border)" }}
                />
              </div>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full p-3 rounded-lg border bg-[var(--color-input-bg)] text-[var(--color-text)] placeholder:text-[var(--color-subtext)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all duration-300"
                  style={{ borderColor: "var(--color-border)" }}
                />
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full p-3 rounded-lg border bg-[var(--color-input-bg)] text-[var(--color-text)] placeholder:text-[var(--color-subtext)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all duration-300"
                  style={{ borderColor: "var(--color-border)" }}
                />
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Write your message..."
                  required
                  className="w-full p-3 rounded-lg border bg-[var(--color-input-bg)] text-[var(--color-text)] placeholder:text-[var(--color-subtext)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all duration-300 resize-none"
                  style={{ borderColor: "var(--color-border)" }}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 mt-4 rounded-lg bg-[var(--color-accent)] text-white font-medium hover:bg-[var(--color-accent-hover)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>

            {status && (
              <p className={`mt-4 text-center text-sm font-medium ${status.includes("✅") ? "text-green-600 dark:text-green-400" :
                  status.includes("❌") ? "text-red-600 dark:text-red-400" :
                    "text-[var(--color-subtext)]"
                }`}>
                {status}
              </p>
            )}
          </div>

          {/* Contact Information */}
          <div
            className="self-center p-6 rounded-2xl"
            style={{
              backgroundColor: theme === "dark" ? "rgba(24, 24, 27, 0.6)" : "rgba(255, 255, 255, 0.8)",
            }}
          >
            <h3 className="text-2xl font-bold mb-6 text-[var(--color-text)]">
              Get in Touch
            </h3>
            <p className="text-[var(--color-text-secondary)] leading-7 mb-6">
              Whether you want to get in touch, discuss a collaboration, or just say hi — I'd love to hear from you!
              <br /> Fill out the form, and I'll get back to you soon.
            </p>

            {/* Contact Details */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] bg-opacity-10 flex items-center justify-center">
                  <MdEmail className="text-[var(--color-accent)] text-xl" />
                </div>
                <div>
                  <p className="text-xs text-[var(--color-subtext)] uppercase tracking-wide">Email</p>
                  <a href={`mailto:${user_info.main.email}`} className="text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">
                    {user_info.main.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] bg-opacity-10 flex items-center justify-center">
                  <MdLocationOn className="text-[var(--color-accent)] text-xl" />
                </div>
                <div>
                  <p className="text-xs text-[var(--color-subtext)] uppercase tracking-wide">Location</p>
                  <p className="text-[var(--color-text)]">{user_info.main.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] bg-opacity-10 flex items-center justify-center">
                  <MdPhone className="text-[var(--color-accent)] text-xl" />
                </div>
                <div>
                  <p className="text-xs text-[var(--color-subtext)] uppercase tracking-wide">Phone</p>
                  <a href={`tel:${user_info.main.phone}`} className="text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">
                    {user_info.main.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href={user_info.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] transition-all duration-300"
              >
                <FaGithub size={22} />
              </a>
              <a
                href={user_info.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] transition-all duration-300"
              >
                <FaLinkedin size={22} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactEmail;
