import {
  BiLogoTypescript,
} from "react-icons/bi";

import { DiGithubAlt, DiMongodb } from "react-icons/di";
import {
  FaCss3Alt,
  FaGitAlt,
  FaGitlab,
  FaHtml5,
  FaNodeJs,
  FaReact,
  FaJava,
  FaDatabase,
  FaFigma,
  FaUsers,
  FaLightbulb,
  FaComments,
} from "react-icons/fa6";
import { IoLogoJavascript } from "react-icons/io5";
import {
  SiExpress,
  SiPostman,
  SiTailwindcss,
  SiVite,
} from "react-icons/si";
import { VscSymbolMethod } from "react-icons/vsc";
import { MdArchitecture, MdApi, MdCode } from "react-icons/md";
import styles from '../styles/Skills.module.css';
import user_info from "../data/userdata";

function Skills() {
  const skillItemClass =
    "inline-flex items-center justify-between gap-x-2 py-4 px-3 hover:-translate-y-1.5 transition-transform duration-700 rounded-xl font-medium border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text)] hover:bg-[var(--card-hover)]";

  const sectionTitleClass = "text-xl font-bold mb-4 flex items-center gap-2 text-[var(--color-text)]";

  return (
    <section
      id="skills"
      className="mx-4 lg:mx-20 pt-16 transition-colors duration-500"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      <h4 className={`text-4xl font-bold text-center text-[var(--color-text)] ${styles.titleAnimate}`}>
        Skills & <span className="text-[var(--color-accent)]">Technologies</span>
      </h4>
      <p className="text-center text-[var(--color-subtext)] mt-4 max-w-2xl mx-auto">
        Các công nghệ và kỹ năng tôi đã học và sử dụng trong các dự án thực tế
      </p>

      {/* Technical Skills with Progress Bars */}
      <div className="mt-12">
        <h5 className={sectionTitleClass}>
          <MdCode className="text-[var(--color-accent)]" />
          Technical Skills
        </h5>
        <div className="grid md:grid-cols-2 gap-4">
          {user_info.skills.technical.map((skill, index) => (
            <div key={index} className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)]">
              <div className="flex justify-between mb-2">
                <span className="font-medium text-[var(--color-text)]">{skill.name}</span>
                <span className="text-sm text-[var(--color-subtext)]">{skill.level}%</span>
              </div>
              <div className="w-full bg-[var(--color-bg-component)] rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full bg-[var(--color-accent)] transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technologies I Use */}
      <div className="mt-12">
        <h5 className={sectionTitleClass}>
          <FaReact className="text-[var(--color-accent)]" />
          Technologies I Use
        </h5>
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 ${styles.skillsGrid}`}>
          <span className={`${skillItemClass} ${styles.skillItem}`} style={{ animationDelay: '0.1s' }}>
            <FaHtml5 className="text-2xl text-orange-500" /> HTML5
          </span>
          <span className={`${skillItemClass} ${styles.skillItem}`} style={{ animationDelay: '0.2s' }}>
            <FaCss3Alt className="text-2xl text-blue-500" /> CSS3
          </span>
          <span className={`${skillItemClass} ${styles.skillItem}`} style={{ animationDelay: '0.3s' }}>
            <IoLogoJavascript className="text-2xl text-yellow-400" /> JavaScript
          </span>
          <span className={`${skillItemClass} ${styles.skillItem}`} style={{ animationDelay: '0.4s' }}>
            <BiLogoTypescript className="text-2xl text-blue-600" /> TypeScript
          </span>
          <span className={`${skillItemClass} ${styles.skillItem}`} style={{ animationDelay: '0.5s' }}>
            <FaReact className="text-2xl text-cyan-400" /> ReactJS
          </span>
          <span className={`${skillItemClass} ${styles.skillItem}`} style={{ animationDelay: '0.6s' }}>
            <FaNodeJs className="text-2xl text-green-600" /> NodeJS
          </span>
          <span className={`${skillItemClass} ${styles.skillItem}`} style={{ animationDelay: '0.7s' }}>
            <SiExpress className="text-2xl" /> Express
          </span>
          <span className={`${skillItemClass} ${styles.skillItem}`} style={{ animationDelay: '0.8s' }}>
            <SiTailwindcss className="text-2xl text-cyan-500" /> Tailwind
          </span>
          <span className={`${skillItemClass} ${styles.skillItem}`} style={{ animationDelay: '0.9s' }}>
            <FaJava className="text-2xl text-red-500" /> Java
          </span>
          <span className={`${skillItemClass} ${styles.skillItem}`} style={{ animationDelay: '1s' }}>
            <DiMongodb className="text-2xl text-green-500" /> MongoDB
          </span>
          <span className={`${skillItemClass} ${styles.skillItem}`} style={{ animationDelay: '1.1s' }}>
            <FaDatabase className="text-2xl text-red-600" /> SQL Server
          </span>
        </div>
      </div>

      {/* Tools & Methodologies */}
      <div className="grid md:grid-cols-2 gap-8 mt-12">
        {/* Tools */}
        <div>
          <h5 className={sectionTitleClass}>
            <FaGitAlt className="text-[var(--color-accent)]" />
            Tools
          </h5>
          <div className="flex flex-wrap gap-3">
            <span className={`${skillItemClass} ${styles.skillItem}`}>
              <FaGitAlt className="text-xl text-orange-600" /> Git
            </span>
            <span className={`${skillItemClass} ${styles.skillItem}`}>
              <DiGithubAlt className="text-xl" /> GitHub
            </span>
            <span className={`${skillItemClass} ${styles.skillItem}`}>
              <FaGitlab className="text-xl text-orange-500" /> GitLab
            </span>
            <span className={`${skillItemClass} ${styles.skillItem}`}>
              <SiPostman className="text-xl text-orange-500" /> Postman
            </span>
            <span className={`${skillItemClass} ${styles.skillItem}`}>
              <FaFigma className="text-xl text-purple-500" /> Figma
            </span>
            <span className={`${skillItemClass} ${styles.skillItem}`}>
              <SiVite className="text-xl text-purple-400" /> Vite
            </span>
          </div>
        </div>

        {/* Methodologies */}
        <div>
          <h5 className={sectionTitleClass}>
            <MdArchitecture className="text-[var(--color-accent)]" />
            Methodologies
          </h5>
          <div className="flex flex-wrap gap-3">
            {user_info.skills.methodologies.map((method, index) => (
              <span key={index} className={`${skillItemClass} ${styles.skillItem}`}>
                {method.includes("Agile") && <VscSymbolMethod className="text-lg" />}
                {method.includes("MVC") && <MdArchitecture className="text-lg" />}
                {method.includes("RESTful") && <MdApi className="text-lg" />}
                {method.includes("TDD") && <MdCode className="text-lg" />}
                {method.includes("OOP") && <FaDatabase className="text-lg" />}
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Soft Skills */}
      <div className="mt-12">
        <h5 className={sectionTitleClass}>
          <FaUsers className="text-[var(--color-accent)]" />
          Soft Skills
        </h5>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {user_info.skills.soft.map((skill, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-accent)] transition-all duration-300 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[var(--color-accent)] bg-opacity-10 flex items-center justify-center">
                {index === 0 && <FaLightbulb className="text-xl text-[var(--color-accent)]" />}
                {index === 1 && <FaUsers className="text-xl text-[var(--color-accent)]" />}
                {index === 2 && <MdCode className="text-xl text-[var(--color-accent)]" />}
                {index === 3 && <FaComments className="text-xl text-[var(--color-accent)]" />}
              </div>
              <p className="text-sm font-medium text-[var(--color-text)]">{skill}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;