import React, { useState } from "react";
import { FaTerminal, FaCodeBranch, FaGraduationCap, FaBriefcase, FaCertificate, FaArrowRight, FaCode } from "react-icons/fa";
import { PiCertificateFill } from "react-icons/pi";
import user_info from "../data/userdata";

interface CommitNode {
  hash: string;
  type: "education" | "experience" | "achievement";
  title: string; // school or company
  subtitle: string; // degree or position
  duration: string;
  image?: string;
  descriptions: string[];
  branch: "main" | "feature/experience";
}

const EducationAndExperience: React.FC = () => {
  // Convert our data into chronological git commit nodes
  const commitNodes: CommitNode[] = [
    // 1. OJT & Student web dev (FPT)
    {
      hash: "8df20b1",
      type: "experience",
      title: "FPT University – Đà Nẵng",
      subtitle: "Web Developer (Student)",
      duration: "2023 - Hiện tại",
      image: "fpt.png",
      descriptions: user_info.experience[2].descriptions,
      branch: "feature/experience"
    },
    // 2. FPT Education
    {
      hash: "ed5a07c",
      type: "education",
      title: "FPT University – Đà Nẵng",
      subtitle: "Cử nhân Công nghệ Thông tin – Kỹ thuật Phần mềm (BIT_SE)",
      duration: "2023 - Hiện tại (Hệ Chính Quy)",
      image: "fpt.png",
      descriptions: user_info.education[0].descriptions,
      branch: "main"
    },
    // 3. Library system project
    {
      hash: "fa82c9e",
      type: "experience",
      title: "Library Management System",
      subtitle: "Full-stack Developer",
      duration: "2025 - Hiện tại",
      image: "fpt.png",
      descriptions: user_info.experience[1].descriptions,
      branch: "feature/experience"
    },
    // 4. JobFinder project
    {
      hash: "c29d0f3",
      type: "experience",
      title: "Dự án JobFinder",
      subtitle: "Front-end Developer",
      duration: "10/2024 - Hiện tại",
      image: "jobfinder.ico",
      descriptions: user_info.experience[0].descriptions,
      branch: "feature/experience"
    },
    // 5. Academic Achievement
    {
      hash: "ae3c8b9",
      type: "achievement",
      title: "Academic Achievement",
      subtitle: "Thành tựu học tập & chuyên môn",
      duration: "2025 - Hiện tại",
      descriptions: user_info.achievements[0].descriptions,
      branch: "main"
    }
  ];

  // Active commit node to display in "git show" terminal
  const [selectedCommit, setSelectedCommit] = useState<CommitNode>(commitNodes[1]); // Default to FPT Edu

  return (
    <section
      id="education-and-experience"
      className="py-16 px-4 md:px-8 lg:px-16 bg-[var(--color-bg)] transition-colors duration-500 border-b border-[var(--color-border)]"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-component)] font-mono text-[10px] text-[var(--color-accent)] mb-4 select-none shadow-sm">
            <FaTerminal className="text-xs" />
            <span>tiendat@portfolio:~$ git log --graph --oneline</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-code font-bold text-[var(--color-text)]">
            Git <span className="text-[var(--color-accent)]">Timeline</span> & Experience
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[var(--color-subtext)] max-w-2xl mx-auto font-sans font-light">
            Nhấp vào từng Commit Node trên cây thư mục Git để xem chi tiết học tập & kinh nghiệm dưới dạng lệnh &quot;git show&quot;.
          </p>
        </div>

        {/* Timeline Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Columns: Visual Git Graph Tree */}
          <div className="lg:col-span-6 border border-[var(--color-border)] rounded-xl p-6 bg-[var(--color-bg-component)]">
            <div className="flex items-center gap-2 mb-6 border-b border-[var(--color-border)] pb-3 select-none">
              <FaCodeBranch className="text-[var(--color-accent)]" />
              <span className="font-mono text-xs text-[var(--color-text)]">REPOS BRANCHING FLOW</span>
            </div>

            {/* Tree Nodes List */}
            <div className="relative font-mono text-xs pl-2 space-y-6">
              
              {commitNodes.map((node) => {
                const isSelected = selectedCommit.hash === node.hash;
                const isMainBranch = node.branch === "main";

                return (
                  <div
                    key={node.hash}
                    onClick={() => setSelectedCommit(node)}
                    className={`flex items-start gap-4 p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? "bg-zinc-100 dark:bg-zinc-900 border-[var(--color-accent)] shadow-sm"
                        : "border-transparent hover:bg-zinc-100/50 dark:hover:bg-zinc-900/30"
                    }`}
                  >
                    {/* Visual Git Lines indicator */}
                    <div className="flex flex-col items-center select-none pt-0.5">
                      <div className="flex gap-2.5">
                        {/* Main Branch Line */}
                        <div className="flex flex-col items-center">
                          {isMainBranch ? (
                            <div
                              className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border-2 ${
                                isSelected
                                  ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white scale-110"
                                  : "border-zinc-400 dark:border-zinc-600 bg-[var(--color-bg-component)]"
                              }`}
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-current" />
                            </div>
                          ) : (
                            <div className="w-0.5 h-3.5 border-l-2 border-dashed border-zinc-400/40" />
                          )}
                        </div>

                        {/* Experience Branch Line */}
                        <div className="flex flex-col items-center">
                          {!isMainBranch ? (
                            <div
                              className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border-2 ${
                                isSelected
                                  ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white scale-110"
                                  : "border-cyan-500/70 bg-[var(--color-bg-component)]"
                              }`}
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-current" />
                            </div>
                          ) : (
                            <div className="w-0.5 h-3.5 border-l-2 border-dashed border-zinc-400/40" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Commit Info details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[10px] text-[var(--color-accent)] font-bold">
                          commit {node.hash}
                        </span>
                        <span className={`text-[8px] px-1 rounded font-semibold ${
                          isMainBranch
                            ? "bg-green-500/10 text-green-500"
                            : "bg-cyan-500/10 text-cyan-500"
                        }`}>
                          {node.branch}
                        </span>
                        <span className="text-[9px] text-zinc-400 dark:text-zinc-500">
                          ({node.duration})
                        </span>
                      </div>
                      <h4 className="font-code font-bold text-xs text-[var(--color-text)] truncate">
                        {node.subtitle}
                      </h4>
                      <p className="text-[10px] text-[var(--color-subtext)] truncate">
                        {node.title}
                      </p>
                    </div>

                  </div>
                );
              })}

            </div>

            {/* Certificates Subsection */}
            <div className="mt-8 pt-6 border-t border-[var(--color-border)] select-none">
              <h4 className="font-mono text-xs font-bold text-[var(--color-text)] mb-4 flex items-center gap-2">
                <PiCertificateFill className="text-base text-[var(--color-accent)]" />
                <span>CERTIFICATES & BADGES</span>
              </h4>
              <div className="grid gap-2.5">
                {user_info.certificates.map((cert, index) => (
                  <a
                    key={index}
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-accent)] hover:shadow-xs transition-all group"
                  >
                    <div className="w-7 h-7 rounded-md bg-[var(--color-bg-component)] flex items-center justify-center text-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-all text-xs flex-shrink-0">
                      <FaCertificate />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-code font-bold text-[10px] text-[var(--color-text)] truncate">
                          {cert.title}
                        </span>
                        <span className="text-[9px] text-zinc-400 dark:text-zinc-500 flex-shrink-0">{cert.year}</span>
                      </div>
                      <p className="text-[9px] text-[var(--color-subtext)] truncate">
                        {cert.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Right Columns: Simulated Git Show Terminal Viewport */}
          <div className="lg:col-span-6 flex flex-col h-full min-h-[440px]">
            <div className="editor-window flex-1 flex flex-col border border-zinc-800 bg-[#0d1117] text-[#c9d1d9] rounded-xl shadow-2xl relative overflow-hidden">
              
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#21262d] select-none">
                <div className="flex gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <span className="text-[9px] font-mono text-[#8b949e] flex items-center gap-1.5">
                  <FaTerminal /> bash --cmd &quot;git show {selectedCommit.hash}&quot;
                </span>
                <div className="w-6" />
              </div>

              {/* Terminal screen content (Git diff details) */}
              <div className="flex-1 overflow-y-auto p-4 font-mono text-[10px] leading-5 select-text custom-scrollbar bg-[#05070c]">
                
                {/* Simulated cmd */}
                <div className="mb-4">
                  <span className="text-cyan-400">tiendat@portfolio:~$</span>{" "}
                  <span className="text-white">git show {selectedCommit.hash}</span>
                </div>

                {/* Git commit metadata */}
                <div className="text-yellow-500 font-semibold mb-1">
                  commit {selectedCommit.hash}b210e74ff983e200c01a2d59df4a32ef
                </div>
                <div>Author: Mai Nguyen Tien Dat &lt;tiendatyyy2005@gmail.com&gt;</div>
                <div className="mb-2">Date:   {selectedCommit.duration}</div>
                
                <div className="text-sky-400 font-semibold pl-4 mb-3 border-l-2 border-sky-400/50">
                  {selectedCommit.subtitle} @ {selectedCommit.title}
                </div>

                {/* Simulated file header diff */}
                <div className="text-[#8b949e] mb-1">
                  --- a/milestones/{selectedCommit.type === "education" ? "education" : "experience"}.md<br />
                  +++ b/milestones/{selectedCommit.type === "education" ? "education" : "experience"}.md
                </div>
                <div className="text-blue-400 mb-2">@@ -0,0 +1,{selectedCommit.descriptions.length} @@</div>

                {/* Commit Diff items (responsibilities/descriptions) */}
                <div className="space-y-1.5">
                  {selectedCommit.descriptions.map((desc, idx) => (
                    <div
                      key={idx}
                      className="pl-2 py-1 rounded-sm diff-added flex items-start gap-2 text-green-400"
                    >
                      <span className="font-bold select-none text-green-500 flex-shrink-0">+</span>
                      <span className="text-green-300/90 whitespace-normal leading-4">{desc}</span>
                    </div>
                  ))}
                </div>

                {/* Certificate node image */}
                {selectedCommit.image && (
                  <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center gap-3">
                    <img
                      src={`/${selectedCommit.image}`}
                      alt="milestone logo"
                      className="w-10 h-10 rounded-full border border-zinc-800 p-0.5 bg-white flex-shrink-0"
                    />
                    <div>
                      <div className="text-zinc-500 font-semibold">Related Node</div>
                      <div className="text-white text-[9px] font-bold">{selectedCommit.title}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Terminal footer status */}
              <div className="px-3 py-1 bg-[#161b22] border-t border-[#21262d] flex items-center justify-between text-[8px] text-[#8b949e] select-none">
                <span>git commit diff tracker</span>
                <span>ESC to clear log</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default EducationAndExperience;
