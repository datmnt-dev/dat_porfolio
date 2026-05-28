import React, { useEffect, useState, useContext } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaGithub, FaLinkedin, FaFacebook, FaTerminal, FaFileCode, FaFolder, FaFolderOpen, FaPalette, FaChevronRight } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import user_info from "../data/userdata";
import type { AccentTheme } from "../types/AppContext";

type EditorTab = "tiendat.json" | "skills.ts" | "experience.sh";

const Hero = () => {
  const { theme, accent, setAccent } = useContext(AppContext);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<EditorTab>("tiendat.json");
  const [isExplorerOpen, setIsExplorerOpen] = useState(true);
  const [terminalLog, setTerminalLog] = useState<string[]>([
    "System initialization... OK",
    "Loading portfolio libraries...",
    "tiendat@portfolio:~$ npm run start-portfolio"
  ]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Log terminal output when tab changes
  useEffect(() => {
    let output = "";
    if (activeTab === "tiendat.json") {
      output = "cat ./src/data/tiendat.json - Successfully loaded profile data (256 bytes).";
    } else if (activeTab === "skills.ts") {
      output = "tsc ./src/data/skills.ts --resolve - Compiled technical stack array successfully.";
    } else if (activeTab === "experience.sh") {
      output = "bash ./src/milestones/experience.sh - Executed timeline loader script.";
    }
    setTerminalLog((prev) => [...prev, `tiendat@portfolio:~$ ${output}`]);
  }, [activeTab]);

  // Typing effect for terminal greeting
  const roles = ["Front-End Developer", "ReactJS Specialist", "Software Engineering Student"];
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
          setTimeout(() => setIsDeleting(true), 2500);
        }
      } else {
        if (displayedRole.length > 0) {
          setDisplayedRole(currentRole.slice(0, displayedRole.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [displayedRole, isDeleting, currentRoleIndex]);

  const handleAccentChange = (color: AccentTheme) => {
    setAccent(color);
    setTerminalLog((prev) => [
      ...prev,
      `tiendat@portfolio:~$ set-accent --color=${color} - UI variables successfully remapped.`
    ]);
  };

  return (
    <section
      id="hero"
      className="relative pt-24 pb-16 px-4 md:px-8 lg:px-16 overflow-hidden bg-[var(--color-bg)] transition-colors duration-500"
    >
      {/* Coder Grid and Neon Blur Backgrounds */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-[var(--color-accent)] opacity-10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-[var(--color-accent)] opacity-10 blur-3xl pointer-events-none" />

      <div
        className={`w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 items-stretch relative z-10 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Left Side: Coder Bio & CLI Prompts */}
        <div className="flex-1 flex flex-col justify-between py-2">
          <div>
            {/* Coder neofetch-style system status */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-component)] font-mono text-[10px] text-[var(--color-accent)] mb-6 select-none shadow-sm">
              <FaTerminal className="text-xs" />
              <span>tiendat@portfolio:~$ neofetch --status</span>
            </div>

            {/* Name */}
            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-[var(--color-text)] tracking-tight leading-tight">
              Hi, I&apos;m{" "}
              <span className="text-[var(--color-accent)] font-code font-extrabold relative inline-block">
                {user_info.main.name}
              </span>
            </h1>

            {/* Role with cursor blinking */}
            <div className="mt-3 min-h-[32px] flex items-center font-code text-base sm:text-lg font-medium text-[var(--color-subtext)]">
              <span className="text-[var(--color-accent)] mr-2 select-none">&gt;</span>
              <span>{displayedRole}</span>
              <span className="w-1.5 h-4 ml-1 bg-[var(--color-accent)] animate-pulse" />
            </div>

            {/* Profile Intro / Description */}
            <p className="mt-6 text-sm sm:text-base leading-7 text-[var(--color-subtext)] font-light max-w-xl">
              {user_info.main.description}
            </p>

            {/* Accent Theme Quick Switcher */}
            <div className="mt-8 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-component)] max-w-sm">
              <div className="flex items-center gap-2 mb-3 text-xs font-mono text-[var(--color-text)]">
                <FaPalette className="text-[var(--color-accent)]" />
                <span>SELECT ACCENT THEME:</span>
              </div>
              <div className="flex gap-3">
                {(["cyan", "green", "purple", "amber"] as AccentTheme[]).map((col) => {
                  const isActive = accent === col;
                  let bgClass = "bg-cyan-500 shadow-cyan-500/20";
                  if (col === "green") bgClass = "bg-emerald-500 shadow-emerald-500/20";
                  if (col === "purple") bgClass = "bg-purple-500 shadow-purple-500/20";
                  if (col === "amber") bgClass = "bg-amber-500 shadow-amber-500/20";

                  return (
                    <button
                      key={col}
                      onClick={() => handleAccentChange(col)}
                      className={`w-7 h-7 rounded-lg ${bgClass} transition-all duration-300 relative flex items-center justify-center hover:scale-110 active:scale-95 shadow-md`}
                      title={`Switch accent to ${col}`}
                    >
                      {isActive && (
                        <span className="absolute inset-0.5 rounded-md border-2 border-white dark:border-zinc-950" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action buttons styled as CLI runners */}
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="#projects"
              className="group px-6 py-2.5 bg-[var(--color-accent)] hover:opacity-95 text-white font-mono text-xs rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg shadow-[var(--color-accent-glow)] hover:-translate-y-0.5"
            >
              <span>./run-projects.sh</span>
              <IoIosArrowForward className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#contact"
              className="px-6 py-2.5 border border-[var(--color-border)] text-[var(--color-text)] font-mono text-xs rounded-lg hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 flex items-center gap-2 bg-white/20 dark:bg-black/20"
            >
              <span>ssh contact-me</span>
            </a>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4 mt-8">
            <span className="text-xs font-mono text-[var(--color-subtext)]">~/socials:</span>
            <div className="flex gap-2">
              <a
                href={user_info.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] transition-all duration-300 text-sm"
              >
                <FaGithub />
              </a>
              <a
                href={user_info.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] transition-all duration-300 text-sm"
              >
                <FaLinkedin />
              </a>
              <a
                href={user_info.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] transition-all duration-300 text-sm"
              >
                <FaFacebook />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Mock Code Editor (IDE mockup) */}
        <div className="flex-1 flex min-h-[460px] md:min-h-[480px]">
          <div className="editor-window w-full flex flex-col border border-zinc-800 bg-[#0d1117] text-[#c9d1d9] rounded-xl shadow-2xl relative">
            
            {/* Editor Window Header Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-[#21262d] select-none">
              <div className="flex gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-[10px] font-mono text-[#8b949e] flex items-center gap-1.5">
                <FaFileCode className="text-xs" />
                portfolio_workspace - VS Code
              </span>
              <div className="w-12" />
            </div>

            {/* Editor Workspace Panel (Sidebar + Main Editor) */}
            <div className="flex-1 flex overflow-hidden">
              
              {/* Sidebar Explorer */}
              <div
                className={`border-r border-[#21262d] bg-[#0d1117] transition-all duration-300 flex flex-col font-mono text-xs select-none ${
                  isExplorerOpen ? "w-40" : "w-0 overflow-hidden border-none"
                }`}
              >
                <div className="p-3 border-b border-[#21262d] font-bold text-[9px] text-[#8b949e] uppercase tracking-wider flex items-center justify-between">
                  <span>Workspace Explorer</span>
                </div>
                <div className="p-2 space-y-2 text-[10px] text-[#8b949e]">
                  <div className="flex items-center gap-1.5 cursor-pointer text-white/90">
                    <FaFolderOpen className="text-amber-500/80 text-xs" />
                    <span>src/portfolio</span>
                  </div>
                  <div className="pl-4 space-y-1.5">
                    <div className="flex items-center gap-1.5 cursor-pointer">
                      <FaFolder className="text-sky-500/80 text-xs" />
                      <span>data</span>
                    </div>
                    <div className="pl-4 space-y-1">
                      <button
                        onClick={() => setActiveTab("tiendat.json")}
                        className={`flex items-center gap-1.5 w-full text-left cursor-pointer hover:text-white ${
                          activeTab === "tiendat.json" ? "text-[var(--color-accent)] font-semibold" : ""
                        }`}
                      >
                        <FaFileCode className="text-cyan-500/70" />
                        <span>tiendat.json</span>
                      </button>
                      <button
                        onClick={() => setActiveTab("skills.ts")}
                        className={`flex items-center gap-1.5 w-full text-left cursor-pointer hover:text-white ${
                          activeTab === "skills.ts" ? "text-[var(--color-accent)] font-semibold" : ""
                        }`}
                      >
                        <FaFileCode className="text-blue-500/70" />
                        <span>skills.ts</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-1.5 cursor-pointer">
                      <FaFolder className="text-sky-500/80 text-xs" />
                      <span>milestones</span>
                    </div>
                    <div className="pl-4">
                      <button
                        onClick={() => setActiveTab("experience.sh")}
                        className={`flex items-center gap-1.5 w-full text-left cursor-pointer hover:text-white ${
                          activeTab === "experience.sh" ? "text-[var(--color-accent)] font-semibold" : ""
                        }`}
                      >
                        <FaFileCode className="text-emerald-500/70" />
                        <span>experience.sh</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Editor Workspace viewport */}
              <div className="flex-1 flex flex-col overflow-hidden bg-[#0d1117]">
                
                {/* Editor Tabs bar */}
                <div className="flex bg-[#161b22] border-b border-[#21262d] overflow-x-auto select-none">
                  {(["tiendat.json", "skills.ts", "experience.sh"] as EditorTab[]).map((tab) => {
                    const isActive = activeTab === tab;
                    let iconColor = "text-cyan-500";
                    if (tab === "skills.ts") iconColor = "text-blue-500";
                    if (tab === "experience.sh") iconColor = "text-emerald-500";

                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-2 border-r border-[#21262d] font-mono text-[10px] flex items-center gap-2 cursor-pointer transition-colors ${
                          isActive
                            ? "bg-[#0d1117] text-white border-t border-t-[var(--color-accent)]"
                            : "text-[#8b949e] hover:bg-[#0d1117] hover:text-white"
                        }`}
                      >
                        <FaFileCode className={iconColor} />
                        <span>{tab}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Editor File Content Area */}
                <div className="flex-1 overflow-y-auto p-4 font-mono text-[11px] leading-6 select-text custom-scrollbar">
                  {activeTab === "tiendat.json" && (
                    <div>
                      <div className="flex"><span className="text-zinc-600 select-none mr-4 w-5 text-right">1</span><span className="syntax-keyword">{`{`}</span></div>
                      <div className="flex"><span className="text-zinc-600 select-none mr-4 w-5 text-right">2</span><span>  <span className="syntax-property">&quot;name&quot;</span>: <span className="syntax-string">&quot;${user_info.main.name}&quot;</span>,</span></div>
                      <div className="flex"><span className="text-zinc-600 select-none mr-4 w-5 text-right">3</span><span>  <span className="syntax-property">&quot;role&quot;</span>: <span className="syntax-string">&quot;${user_info.main.role}&quot;</span>,</span></div>
                      <div className="flex"><span className="text-zinc-600 select-none mr-4 w-5 text-right">4</span><span>  <span className="syntax-property">&quot;birthday&quot;</span>: <span className="syntax-string">&quot;${user_info.main.birthday}&quot;</span>,</span></div>
                      <div className="flex"><span className="text-zinc-600 select-none mr-4 w-5 text-right">5</span><span>  <span className="syntax-property">&quot;address&quot;</span>: <span className="syntax-string">&quot;${user_info.main.address}&quot;</span>,</span></div>
                      <div className="flex"><span className="text-zinc-600 select-none mr-4 w-5 text-right">6</span><span>  <span className="syntax-property">&quot;email&quot;</span>: <span className="syntax-string">&quot;${user_info.main.email}&quot;</span>,</span></div>
                      <div className="flex"><span className="text-zinc-600 select-none mr-4 w-5 text-right">7</span><span>  <span className="syntax-property">&quot;phone&quot;</span>: <span className="syntax-string">&quot;${user_info.main.phone}&quot;</span>,</span></div>
                      <div className="flex"><span className="text-zinc-600 select-none mr-4 w-5 text-right">8</span><span>  <span className="syntax-property">&quot;github&quot;</span>: <span className="syntax-string">&quot;${user_info.socials.github}&quot;</span></span></div>
                      <div className="flex"><span className="text-zinc-600 select-none mr-4 w-5 text-right">9</span><span className="syntax-keyword">{`}`}</span></div>
                    </div>
                  )}

                  {activeTab === "skills.ts" && (
                    <div>
                      <div className="flex"><span className="text-zinc-600 select-none mr-4 w-5 text-right">1</span><span className="syntax-keyword">export const</span> <span className="syntax-function">technicalSkills</span> = [</div>
                      {user_info.skills.technical.map((s, idx) => (
                        <div key={idx} className="flex">
                          <span className="text-zinc-600 select-none mr-4 w-5 text-right">{idx + 2}</span>
                          <span>  {`{`} <span className="syntax-property">name</span>: <span className="syntax-string">&quot;{s.name}&quot;</span>, <span className="syntax-property">proficiency</span>: <span className="syntax-number">{s.level}%</span> {`}`},</span>
                        </div>
                      ))}
                      <div className="flex"><span className="text-zinc-600 select-none mr-4 w-5 text-right">10</span>];</div>
                      <div className="flex"><span className="text-zinc-600 select-none mr-4 w-5 text-right">11</span></div>
                      <div className="flex"><span className="text-zinc-600 select-none mr-4 w-5 text-right">12</span><span className="syntax-keyword">export const</span> <span className="syntax-function">methodologies</span> = [</div>
                      {user_info.skills.methodologies.map((m, idx) => (
                        <div key={idx} className="flex">
                          <span className="text-zinc-600 select-none mr-4 w-5 text-right">{idx + 13}</span>
                          <span>  <span className="syntax-string">&quot;{m}&quot;</span>,</span>
                        </div>
                      ))}
                      <div className="flex"><span className="text-zinc-600 select-none mr-4 w-5 text-right">20</span>];</div>
                    </div>
                  )}

                  {activeTab === "experience.sh" && (
                    <div>
                      <div className="flex"><span className="text-zinc-600 select-none mr-4 w-5 text-right">1</span><span className="syntax-comment">#!/bin/bash</span></div>
                      <div className="flex"><span className="text-zinc-600 select-none mr-4 w-5 text-right">2</span><span className="syntax-keyword">echo</span> <span className="syntax-string">&quot;Loading corporate and student projects...&quot;</span></div>
                      <div className="flex"><span className="text-zinc-600 select-none mr-4 w-5 text-right">3</span></div>
                      <div className="flex"><span className="text-zinc-600 select-none mr-4 w-5 text-right">4</span><span className="syntax-comment"># Active Milestones</span></div>
                      {user_info.experience.map((exp, idx) => (
                        <React.Fragment key={idx}>
                          <div className="flex"><span className="text-zinc-600 select-none mr-4 w-5 text-right">{idx * 4 + 5}</span><span><span className="syntax-keyword">load_experience</span> <span className="syntax-property">--company</span>=<span className="syntax-string">&quot;{exp.company}&quot;</span> \</span></div>
                          <div className="flex"><span className="text-zinc-600 select-none mr-4 w-5 text-right">{idx * 4 + 6}</span><span>    <span className="syntax-property">--role</span>=<span className="syntax-string">&quot;{exp.position}&quot;</span> \</span></div>
                          <div className="flex"><span className="text-zinc-600 select-none mr-4 w-5 text-right">{idx * 4 + 7}</span><span>    <span className="syntax-property">--duration</span>=<span className="syntax-string">&quot;{exp.duration}&quot;</span></span></div>
                          <div className="flex"><span className="text-zinc-600 select-none mr-4 w-5 text-right">{idx * 4 + 8}</span><span className="syntax-comment"># -------------------------------------</span></div>
                        </React.Fragment>
                      ))}
                      <div className="flex"><span className="text-zinc-600 select-none mr-4 w-5 text-right">17</span><span className="syntax-keyword">echo</span> <span className="syntax-string">&quot;Status: AVAILABLE_FOR_HIRE&quot;</span></div>
                    </div>
                  )}
                </div>

                {/* Editor Terminal Panel */}
                <div className="h-28 border-t border-[#21262d] bg-[#090d16] flex flex-col font-mono text-[9px] leading-4 text-zinc-400 select-none overflow-hidden">
                  <div className="flex items-center justify-between px-3 py-1 bg-[#161b22] border-b border-[#21262d] text-[8px] text-[#8b949e]">
                    <span className="flex items-center gap-1.5"><FaTerminal /> TERMINAL (PORTFOLIO CONSOLE)</span>
                    <button onClick={() => setTerminalLog(["tiendat@portfolio:~$ clear"])} className="hover:text-white cursor-pointer uppercase">Clear</button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-2 scroll-smooth custom-scrollbar">
                    {terminalLog.map((log, idx) => (
                      <div key={idx} className="font-mono text-emerald-400/90 whitespace-pre-wrap">
                        {log.startsWith("tiendat@portfolio:~$") ? (
                          <span>
                            <span className="text-cyan-400 font-bold">tiendat@portfolio:~$</span>{" "}
                            <span className="text-white">{log.substring(21)}</span>
                          </span>
                        ) : (
                          <span>{log}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Status Footer */}
            <div className="px-3 py-1 bg-[#161b22] border-t border-[#21262d] flex items-center justify-between text-[9px] text-[#8b949e] font-mono select-none">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsExplorerOpen(!isExplorerOpen)}
                  className="hover:text-white cursor-pointer flex items-center gap-1"
                >
                  <FaChevronRight className={`transition-transform ${isExplorerOpen ? "rotate-90" : ""}`} />
                  <span>Explorer</span>
                </button>
                <span>UTF-8</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Line {activeTab === "tiendat.json" ? 9 : activeTab === "skills.ts" ? 20 : 17}, Col 1</span>
                <span>TypeScript React</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;