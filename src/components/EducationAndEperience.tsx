import React from "react";
import { FaLandmark, FaGraduationCap } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { PiCertificateFill } from "react-icons/pi";
import user_info from "../data/userdata";

// Định nghĩa interface cho dữ liệu education
interface EducationData {
  school: string;
  degree: string;
  duration: string;
  image: string;
}

// Định nghĩa interface cho dữ liệu certificate
interface CertificateData {
  title: string;
  description: string;
  link: string;
  icon: "google" | "github" | "hackerrank";
}

// Định nghĩa interface cho dữ liệu experience
interface ExperienceData {
  position: string;
  company: string;
  duration: string;
  image: string;
  descriptions: string[];
}

// Định nghĩa interface cho user_info
interface UserInfo {
  main: {
    name: string;
    description: string;
    role: string;
    photo: string;
    email: string;
  };
  socials: {
    twitter: string;
    github: string;
    linkedin: string;
    instagram: string;
    facebook: string;
  };
  projects: {
    title: string;
    description: string;
    technologies: string;
    github: string;
    link: string;
  }[];
  education: EducationData[];
  experience: ExperienceData[];
  certificates: CertificateData[];
  contact: {
    title: string;
    description: string;
  };
  footer: string;
}

const EducationAndExperience = () => {
  // Sử dụng user_info làm info
  const info = user_info as UserInfo;

  return (
    <section
      id="education-and-experience"
      className="py-16 px-4 lg:px-20 text-[var(--color-text)] transition-all duration-[var(--transition-speed)]"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent)] bg-opacity-10 text-[var(--color-accent)] text-sm font-medium mb-4">
          <FaGraduationCap />
          Background
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)]">
          Education & <span className="text-[var(--color-accent)]">Experience</span>
        </h2>
        <p className="mt-4 text-[var(--color-subtext)] max-w-2xl mx-auto">
          Quá trình học tập và kinh nghiệm làm việc của tôi
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        {/* =========== EDUCATION =========== */}
        <div className="w-full md:w-[50%]">
          {/* =========== EDUCATION TITLE =========== */}
          <h4
            className="
              text-xl font-bold flex gap-2 items-center mb-6
              text-[var(--color-text)]
            "
          >
            <FaLandmark className="text-xl text-[var(--color-accent)]" />
            Education
          </h4>

          {/* =========== EDUCATION LIST =========== */}
          {info.education.map((edu, index) => (
            <div key={index}>
              {/* =========== DURATION =========== */}
              <div className="ps-2 my-2 first:mt-0 !mt-2">
                <h3
                  className="
                  text-xs font-medium uppercase 
                  text-[var(--color-subtext)]
                "
                >
                  {edu.duration}
                </h3>
              </div>

              <div className="flex gap-x-3 relative group rounded-lg">
                <div
                  className="
                  relative last:after:hidden after:absolute after:top-0 after:bottom-0 
                  after:start-3.5 after:w-px after:-translate-x-[0.5px] 
                  after:bg-[var(--color-border)] 
                  group-hover:after:bg-[var(--color-accent)]
                "
                >
                  <div className="relative z-10 size-7 flex justify-center items-center">
                    <div
                      className="
                      size-2 rounded-full 
                      bg-[var(--color-bg)] 
                      border-2 border-[var(--color-border)] 
                      group-hover:border-[var(--color-accent)] 
                      transition-colors duration-[var(--transition-speed)]
                    "
                    ></div>
                  </div>
                </div>

                <div className="grow p-2 pb-8">
                  {/* =========== IMAGE AND SCHOOL NAME =========== */}
                  <h3
                    className="
                    flex items-center gap-x-2 font-semibold 
                    text-[var(--color-text)]
                  "
                  >
                    <img
                      className="w-9 h-9 rounded-full"
                      src={edu.image}
                      alt={`${edu.school} Logo`}
                    />
                    <div className="leading-5">
                      {edu.school}
                      {/* =========== DEGREE =========== */}
                      <p
                        className="
                        font-normal text-xs 
                        text-[var(--color-subtext)]
                      "
                      >
                        {edu.degree}
                      </p>
                    </div>
                  </h3>

                  {/* =========== EDUCATION DESCRIPTIONS =========== */}
                  {edu.descriptions && edu.descriptions.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {edu.descriptions.map((desc: string, i: number) => (
                        <li className="flex space-x-3" key={i}>
                          <svg
                            className="flex-shrink-0 size-4 mt-0.5 text-[var(--color-accent)]"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-sm text-[var(--color-subtext)]">
                            {desc}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* =========== CERTIFICATES TITLE =========== */}
          <h4
            className="
            text-xl mt-6 font-bold flex gap-2 items-center
            text-[var(--color-text)]
          "
          >
            <PiCertificateFill className="text-2xl text-[var(--color-accent)]" />
            Certificates
          </h4>

          {/* =========== CERTIFICATES LIST =========== */}
          <div className="mt-4 space-y-3">
            {info.certificates.map((cert, index) => (
              <a
                key={index}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                flex items-center gap-4 p-3 rounded-lg
                border border-[var(--color-border)]
                bg-[var(--color-card)]
                hover:border-[var(--color-accent)]
                hover:shadow-md
                transition-all duration-300
                group
              "
              >
                {/* Certificate Icon */}
                <div className="
                w-10 h-10 rounded-full flex items-center justify-center
                bg-[var(--color-bg-component)] 
                group-hover:bg-[var(--color-accent)] 
                transition-colors duration-300
              ">
                  {cert.icon === "google" && (
                    <svg className="w-5 h-5 text-[var(--color-accent)] group-hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  )}
                  {cert.icon === "github" && (
                    <svg className="w-5 h-5 text-[var(--color-accent)] group-hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  )}
                  {cert.icon === "hackerrank" && (
                    <svg className="w-5 h-5 text-[var(--color-accent)] group-hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c1.285 0 9.75 4.886 10.392 6 .645 1.115.645 10.885 0 12S13.287 24 12 24s-9.75-4.885-10.395-6c-.641-1.115-.641-10.885 0-12C2.25 4.886 10.715 0 12 0zm2.295 6.799c-.141 0-.258.115-.258.258v3.875H9.963V6.908h.701c.141 0 .257-.115.257-.258 0-.094-.049-.176-.123-.221L9.223 4.896c-.072-.044-.164-.044-.236 0L7.41 6.429c-.073.044-.122.127-.122.221 0 .143.116.258.257.258h.702v10.083c0 .143.116.258.257.258h2.327c.141 0 .257-.115.257-.258v-3.875h4.074v3.875h-.701c-.141 0-.257.115-.257.258 0 .094.049.176.122.221l1.577 1.533c.072.044.164.044.236 0l1.577-1.533c.073-.044.122-.127.122-.221 0-.143-.116-.258-.257-.258h-.701V6.908c0-.143-.116-.258-.257-.258h-2.327z" />
                    </svg>
                  )}
                </div>

                {/* Certificate Info */}
                <div className="flex-1">
                  <h5 className="font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                    {cert.title}
                  </h5>
                  <p className="text-xs text-[var(--color-subtext)]">
                    {cert.description}
                  </p>
                </div>

                {/* Arrow Icon */}
                <svg
                  className="w-5 h-5 text-[var(--color-subtext)] group-hover:text-[var(--color-accent)] transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* =========== EXPERIENCE =========== */}
        <div className="w-full md:w-[50%]">
          {/* =========== EXPERIENCE TITLE =========== */}
          <h4
            className="
            text-xl mb-6 font-bold flex gap-2 items-center
            text-[var(--color-text)]
          "
          >
            <FaBuildingUser className="text-2xl text-[var(--color-accent)]" />
            Experience
          </h4>

          <div className="md:max-h-[600px] md:overflow-y-auto scroll-smooth space-y-4 pr-2 custom-scrollbar">
            {/* =========== EXPERIENCE LIST =========== */}
            {info.experience.map((exp, index) => (
              <div key={index}>
                <div className="ps-2 my-2 first:mt-0 !mt-2">
                  <h3
                    className="
                    text-xs font-medium uppercase 
                    text-[var(--color-subtext)]
                  "
                  >
                    {exp.duration}
                  </h3>
                </div>

                <div className="flex gap-x-3 relative group rounded-lg">
                  <div
                    className="
                    relative last:after:hidden after:absolute after:top-0 after:bottom-0 
                    after:start-3.5 after:w-px after:-translate-x-[0.5px] 
                    after:bg-[var(--color-border)] 
                    group-hover:after:bg-[var(--color-accent)]
                  "
                  >
                    <div className="relative z-10 size-7 flex justify-center items-center">
                      <div
                        className="
                        size-2 rounded-full 
                        bg-[var(--color-bg)] 
                        border-2 border-[var(--color-border)] 
                        group-hover:border-[var(--color-accent)] 
                        transition-colors duration-[var(--transition-speed)]
                      "
                      ></div>
                    </div>
                  </div>

                  <div className="grow p-2 pb-8">
                    {/* =========== COMPANY NAME =========== */}
                    <h3
                      className="
                      flex items-center gap-x-2 font-semibold 
                      text-[var(--color-text)]
                    "
                    >
                      <img
                        className="w-9 h-9 rounded-full"
                        src={exp.image}
                        alt={`${exp.company} Logo`}
                      />
                      <div className="leading-5">
                        {exp.company}
                        {/* =========== POSITION =========== */}
                        <p
                          className="
                          font-normal text-xs 
                          text-[var(--color-subtext)]
                        "
                        >
                          {exp.position}
                        </p>
                      </div>
                    </h3>

                    <ul className="list-disc list-inside text-[var(--color-text)] mt-2">
                      {/* =========== DESCRIPTION LIST =========== */}
                      {exp.descriptions.map((desc, i) => (
                        <li className="flex space-x-3" key={i}>
                          <svg
                            className="
                            flex-shrink-0 size-4 mt-0.5 
                            text-[var(--color-accent)]
                          "
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-sm text-[var(--color-subtext)] mt-1">
                            {desc}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationAndExperience;
