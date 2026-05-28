import React, { useState } from "react";
import { BiLogoTypescript } from "react-icons/bi";
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
  FaTerminal,
  FaCode
} from "react-icons/fa6";
import { IoLogoJavascript } from "react-icons/io5";
import { SiExpress, SiPostman, SiTailwindcss, SiVite } from "react-icons/si";
import { VscSymbolMethod } from "react-icons/vsc";
import { MdArchitecture, MdApi, MdCode } from "react-icons/md";
import user_info from "../data/userdata";

const Skills: React.FC = () => {
  // Sandbox Terminal State
  const [cliInput, setCliInput] = useState("");
  const [cliLogs, setCliLogs] = useState<string[]>([
    "Skills Sandbox Terminal v1.0",
    "Type 'help' to see list of executable commands.",
    "tiendat@portfolio:~$ "
  ]);

  const skillItemClass =
    "inline-flex items-center justify-between gap-x-2 py-3.5 px-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:bg-zinc-100/20 dark:hover:bg-zinc-900/30 transition-all font-mono text-[11px] select-none";

  const sectionTitleClass = "text-sm font-mono font-bold mb-4 flex items-center gap-2 text-[var(--color-text)] select-none uppercase tracking-wider";

  // Progress Bar CLI style generator
  const getCliProgress = (percent: number) => {
    const totalBlocks = 10;
    const filledBlocks = Math.round((percent / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    return `[${"█".repeat(filledBlocks)}${"░".repeat(emptyBlocks)}] ${percent}%`;
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response: string[] = [];

    if (trimmed === "help") {
      response = [
        "Available commands:",
        "  help             Display this help guide",
        "  skills           List developer stack in JSON format",
        "  neofetch         System and builder stats",
        "  clear            Clear terminal screen"
      ];
    } else if (trimmed === "skills") {
      response = [
        "JSON.stringify(skills):",
        `  {`,
        `    "frontend": ["ReactJS", "TypeScript", "TailwindCSS"],`,
        `    "backend": ["NodeJS", "ExpressJS", "Java Web"],`,
        `    "databases": ["MongoDB", "SQL Server", "MySQL"]`,
        `  }`
      ];
    } else if (trimmed === "neofetch") {
      response = [
        "tiendat@portfolio",
        "-----------------",
        "OS: React Router v7 / Vite App",
        "Host: FPT University Student Page",
        "Kernel: TypeScript 5.x Engine",
        "Shell: Tailwind CSS v4.0",
        "Target Role: Front-End / Web Developer",
        "Uptime: 2 years since code debut"
      ];
    } else if (trimmed === "clear") {
      setCliLogs(["tiendat@portfolio:~$ "]);
      setCliInput("");
      return;
    } else if (trimmed === "") {
      response = [];
    } else {
      response = [`bash: command not found: ${cmd}`];
    }

    setCliLogs((prev) => [
      ...prev.slice(0, -1), // remove input prompt line
      `tiendat@portfolio:~$ ${cmd}`,
      ...response,
      "tiendat@portfolio:~$ "
    ]);
    setCliInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(cliInput);
  };

  return (
    <section
      id="skills"
      className="py-16 px-4 md:px-8 lg:px-16 bg-[var(--color-bg)] transition-colors duration-500 border-b border-[var(--color-border)]"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-component)] font-mono text-[10px] text-[var(--color-accent)] mb-4 select-none shadow-sm">
            <FaTerminal className="text-xs" />
            <span>tiendat@portfolio:~$ cat skills.json</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-code font-bold text-[var(--color-text)]">
            Skills & <span className="text-[var(--color-accent)]">Technologies</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[var(--color-subtext)] max-w-2xl mx-auto font-sans font-light">
            Hệ thống kỹ năng và công cụ lập trình tôi đã làm chủ và áp dụng trong đồ án, thực tập OJT.
          </p>
        </div>

        {/* Skills layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Column: Tech bars and grid */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Technical Skills progress bars */}
            <div>
              <h5 className={sectionTitleClass}>
                <MdCode className="text-[var(--color-accent)]" />
                Technical Skills (CLI LOADER STYLE)
              </h5>
              <div className="grid md:grid-cols-2 gap-4">
                {user_info.skills.technical.map((skill, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-component)] font-mono"
                  >
                    <div className="flex justify-between mb-1.5 text-xs text-[var(--color-text)]">
                      <span className="font-bold">{skill.name}</span>
                      <span className="text-[var(--color-accent)] font-semibold">
                        {getCliProgress(skill.level)}
                      </span>
                    </div>
                    {/* Simulated visual progress meter bar */}
                    <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-1">
                      <div
                        className="h-1 rounded-full bg-[var(--color-accent)] transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies Grid */}
            <div>
              <h5 className={sectionTitleClass}>
                <FaReact className="text-[var(--color-accent)]" />
                Technologies & Languages
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                <span className={skillItemClass}>
                  <FaHtml5 className="text-lg text-orange-500" /> HTML5
                </span>
                <span className={skillItemClass}>
                  <FaCss3Alt className="text-lg text-blue-500" /> CSS3
                </span>
                <span className={skillItemClass}>
                  <IoLogoJavascript className="text-lg text-yellow-500" /> JavaScript
                </span>
                <span className={skillItemClass}>
                  <BiLogoTypescript className="text-lg text-blue-600" /> TypeScript
                </span>
                <span className={skillItemClass}>
                  <FaReact className="text-lg text-cyan-400" /> ReactJS
                </span>
                <span className={skillItemClass}>
                  <FaNodeJs className="text-lg text-green-600" /> NodeJS
                </span>
                <span className={skillItemClass}>
                  <SiExpress className="text-lg text-zinc-400" /> Express
                </span>
                <span className={skillItemClass}>
                  <SiTailwindcss className="text-lg text-cyan-500" /> Tailwind v4
                </span>
                <span className={skillItemClass}>
                  <FaJava className="text-lg text-red-500" /> Java Web
                </span>
                <span className={skillItemClass}>
                  <DiMongodb className="text-lg text-emerald-500" /> MongoDB
                </span>
                <span className={skillItemClass}>
                  <FaDatabase className="text-lg text-sky-600" /> SQL Server
                </span>
                <span className={skillItemClass}>
                  <FaDatabase className="text-lg text-teal-600" /> MySQL
                </span>
              </div>
            </div>

            {/* Tools and Methodologies grids */}
            <div className="grid md:grid-cols-2 gap-6">
              
              <div>
                <h5 className={sectionTitleClass}>
                  <FaGitAlt className="text-[var(--color-accent)]" />
                  Tools & IDEs
                </h5>
                <div className="flex flex-wrap gap-2">
                  <span className={skillItemClass}><FaGitAlt className="text-sm text-orange-600" /> Git</span>
                  <span className={skillItemClass}><DiGithubAlt className="text-sm" /> GitHub</span>
                  <span className={skillItemClass}><FaGitlab className="text-sm text-orange-500" /> GitLab</span>
                  <span className={skillItemClass}><SiPostman className="text-sm text-orange-500" /> Postman</span>
                  <span className={skillItemClass}><FaFigma className="text-sm text-purple-500" /> Figma</span>
                  <span className={skillItemClass}><SiVite className="text-sm text-[#bd34fe]" /> Vite</span>
                </div>
              </div>

              <div>
                <h5 className={sectionTitleClass}>
                  <MdArchitecture className="text-[var(--color-accent)]" />
                  Methodologies
                </h5>
                <div className="flex flex-wrap gap-2">
                  {user_info.skills.methodologies.map((method, index) => (
                    <span key={index} className={skillItemClass}>
                      {method.includes("Agile") && <VscSymbolMethod className="text-xs text-[var(--color-accent)]" />}
                      {method.includes("MVC") && <MdArchitecture className="text-xs text-[var(--color-accent)]" />}
                      {method.includes("RESTful") && <MdApi className="text-xs text-[var(--color-accent)]" />}
                      {method.includes("TDD") && <MdCode className="text-xs text-[var(--color-accent)]" />}
                      {method.includes("OOP") && <FaDatabase className="text-xs text-[var(--color-accent)]" />}
                      <span>{method}</span>
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Soft skills & Terminal Sandbox */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Soft Skills Cards */}
            <div>
              <h5 className={sectionTitleClass}>
                <FaUsers className="text-[var(--color-accent)]" />
                Soft Skills
              </h5>
              <div className="grid gap-3 select-none">
                {user_info.skills.soft.map((skill, index) => {
                  let Icon = FaLightbulb;
                  if (index === 1) Icon = FaUsers;
                  if (index === 2) Icon = FaCode;
                  if (index === 3) Icon = FaComments;

                  return (
                    <div
                      key={index}
                      className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-accent)] hover:shadow-xs transition-all flex items-center gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-bg-component)] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-all flex items-center justify-center text-[var(--color-accent)] text-sm flex-shrink-0">
                        <Icon />
                      </div>
                      <span className="font-code font-bold text-xs text-[var(--color-text)] leading-4">
                        {skill}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sandbox Shell Widget */}
            <div className="editor-window border border-zinc-800 bg-[#0d1117] text-[#c9d1d9] rounded-xl shadow-lg flex flex-col h-64 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-1.5 bg-[#161b22] border-b border-[#21262d] select-none text-[8px] font-mono text-[#8b949e]">
                <span className="flex items-center gap-1.5"><FaTerminal /> SKILLS SANDBOX</span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
              </div>

              {/* Console window logs */}
              <div className="flex-1 overflow-y-auto p-3 font-mono text-[9px] leading-4 bg-[#05070c] custom-scrollbar">
                {cliLogs.map((log, idx) => (
                  <div key={idx} className="whitespace-pre-wrap">
                    {log.startsWith("tiendat@portfolio:~$") ? (
                      <span>
                        <span className="text-cyan-400 font-bold">tiendat@portfolio:~$</span>{" "}
                        <span className="text-white">{log.substring(21)}</span>
                      </span>
                    ) : (
                      <span className="text-zinc-400">{log}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Form Input CLI prompts */}
              <form onSubmit={handleSubmit} className="border-t border-[#21262d] bg-[#0d1117] flex items-center px-2 py-1">
                <span className="text-cyan-400 font-bold font-mono text-[9px] mr-1.5 select-none">tiendat@portfolio:~$</span>
                <input
                  type="text"
                  value={cliInput}
                  onChange={(e) => setCliInput(e.target.value)}
                  placeholder="type help or skills..."
                  className="flex-1 py-1 text-[9px] font-mono bg-transparent text-white border-none outline-none placeholder:text-zinc-600"
                />
              </form>

              {/* Quick CLI helpers buttons */}
              <div className="px-2 py-1 bg-[#161b22] border-t border-[#21262d] flex gap-1.5 flex-wrap select-none">
                {["help", "skills", "neofetch"].map((helper) => (
                  <button
                    key={helper}
                    type="button"
                    onClick={() => handleCommand(helper)}
                    className="px-1.5 py-0.5 rounded border border-zinc-700 bg-zinc-800 text-[8px] font-mono text-zinc-400 hover:text-white hover:border-zinc-500 cursor-pointer transition-colors"
                  >
                    {helper}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
        
      </div>
    </section>
  );
};

export default Skills;