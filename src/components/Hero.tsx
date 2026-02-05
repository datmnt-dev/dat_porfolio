import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import user_info from "../data/userdata";

// Định nghĩa interface cho dữ liệu user_info
interface UserInfo {
  main: {
    name: string;
    role: string;
    description: string;
    photo: string;
  };
  socials: {
    github: string;
    linkedin: string;
    facebook: string;
  };
}

const Hero = () => {
  const info = user_info as UserInfo;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Typing effect for role
  const roles = ["Front-End Developer", "React Developer", "Web Developer"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedRole.length < currentRole.length) {
          setDisplayedRole(currentRole.slice(0, displayedRole.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedRole.length > 0) {
          setDisplayedRole(currentRole.slice(0, displayedRole.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayedRole, isDeleting, currentRoleIndex]);

  return (
    <section
      id="hero"
      className="relative pb-20 pt-28 sm:pt-32 md:pt-40 flex px-6 lg:px-24 bg-[var(--color-bg)] overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-[var(--color-accent)] opacity-5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[var(--color-accent)] opacity-5 rounded-full blur-3xl" />

      <div
        className={`self-center w-full relative z-10 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        style={{
          backgroundColor: "transparent",
          color: "var(--color-text)",
        }}
      >
        {/* Mobile Photo */}
        <div className="lg:hidden mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[var(--color-accent)] shadow-lg">
              <img
                src={info.main.photo}
                className="w-full h-full object-cover"
                alt={info.main.name}
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[var(--color-accent)] text-white px-3 py-1 rounded-full text-xs font-medium">
              👋 Hello!
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-8 items-center flex-wrap md:flex-nowrap">
          <div className="lg:w-[65%] self-center">
            {/* Role with typing effect */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-12 h-[2px] bg-[var(--color-accent)]" />
              <h2 className="text-lg font-medium text-[var(--color-accent)]">
                {displayedRole}
                <span className="animate-pulse">|</span>
              </h2>
            </div>

            {/* Name */}
            <h1 className="font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--color-text)] leading-tight">
              Hi, I'm{" "}
              <span className="text-[var(--color-accent)] relative inline-block">
                {info.main.name.split(" ").slice(-2).join(" ")}
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0 7 Q 100 0, 200 7" fill="none" stroke="var(--color-accent)" strokeWidth="2" opacity="0.3" />
                </svg>
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-[var(--color-subtext)] text-base lg:text-lg font-light lg:w-[90%] leading-8">
              {info.main.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#projects"
                className="group px-8 py-3 bg-[var(--color-accent)] text-white font-medium rounded-lg hover:bg-[var(--color-accent-hover)] transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                View Projects
                <IoIosArrowForward className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="px-8 py-3 border-2 border-[var(--color-border)] text-[var(--color-text)] font-medium rounded-lg hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300"
              >
                Contact Me
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-8">
              <span className="text-sm text-[var(--color-subtext)]">Follow me:</span>
              <div className="flex gap-3">
                <a
                  href={info.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] transition-all duration-300"
                >
                  <FaGithub />
                </a>
                <a
                  href={info.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] transition-all duration-300"
                >
                  <FaLinkedin />
                </a>
                <a
                  href={info.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] transition-all duration-300"
                >
                  <FaFacebook />
                </a>
              </div>
            </div>
          </div>

          {/* Desktop Photo */}
          <div className="hidden lg:block w-[35%] self-center">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[var(--color-accent)] rounded-2xl opacity-20" />
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-[var(--color-accent)] rounded-2xl opacity-10" />

              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-[var(--color-border)] shadow-2xl">
                <img
                  className="w-full h-auto object-cover"
                  src={info.main.photo}
                  alt={info.main.name}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl px-4 py-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-[var(--color-text)]">Available for hire</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden md:flex justify-center mt-16">
          <a href="#projects" className="flex flex-col items-center gap-2 text-[var(--color-subtext)] hover:text-[var(--color-accent)] transition-colors">
            <span className="text-sm">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center pt-2">
              <div className="w-1 h-3 bg-current rounded-full animate-bounce" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;