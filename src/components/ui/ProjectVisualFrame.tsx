import React, { useState } from "react";
import {
  FaCodeBranch,
  FaTerminal,
  FaCheckCircle,
  FaHome,
  FaCommentDots,
  FaBriefcase,
  FaFilePdf,
  FaSearch,
  FaShieldAlt,
  FaMusic,
  FaLeaf,
  FaBook,
  FaStore,
  FaMobileAlt,
  FaServer,
  FaLayerGroup,
  FaUserCheck,
  FaBolt,
} from "react-icons/fa";
import type { Project } from "../../data/userdata";

interface ProjectVisualFrameProps {
  project: Project;
  variant?: "showcase" | "compact" | "badge";
  className?: string;
}

interface VisualTheme {
  domain: string;
  lightAura: string;
  darkAura: string;
  badgeBg: string;
  badgeText: string;
  accentBar: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const getProjectVisualTheme = (project: Project): VisualTheme => {
  switch (project.slug) {
    case "threadlearn":
      return {
        domain: "threadlearn.app",
        lightAura:
          "radial-gradient(circle at 18% 20%, rgba(124, 58, 237, 0.16), transparent 55%), radial-gradient(circle at 86% 80%, rgba(2, 132, 199, 0.16), transparent 55%)",
        darkAura:
          "radial-gradient(circle at 18% 20%, rgba(139, 92, 246, 0.24), transparent 55%), radial-gradient(circle at 86% 80%, rgba(6, 182, 212, 0.22), transparent 55%)",
        badgeBg: "bg-violet-600/12 dark:bg-violet-500/20 border-violet-600/25 dark:border-violet-400/30",
        badgeText: "text-violet-700 dark:text-violet-300",
        accentBar: "from-violet-600 to-cyan-500",
        Icon: FaTerminal,
      };
    case "myroomie":
      return {
        domain: "myroomie.vn",
        lightAura:
          "radial-gradient(circle at 16% 24%, rgba(13, 148, 136, 0.16), transparent 55%), radial-gradient(circle at 85% 78%, rgba(2, 132, 199, 0.15), transparent 55%)",
        darkAura:
          "radial-gradient(circle at 16% 24%, rgba(20, 184, 166, 0.24), transparent 55%), radial-gradient(circle at 85% 78%, rgba(6, 182, 212, 0.20), transparent 55%)",
        badgeBg: "bg-teal-600/12 dark:bg-teal-500/20 border-teal-600/25 dark:border-teal-400/30",
        badgeText: "text-teal-700 dark:text-teal-300",
        accentBar: "from-teal-500 to-cyan-500",
        Icon: FaHome,
      };
    case "jobfinder":
      return {
        domain: "fe-jobfinder.vercel.app",
        lightAura:
          "radial-gradient(circle at 20% 22%, rgba(2, 132, 199, 0.16), transparent 55%), radial-gradient(circle at 84% 78%, rgba(79, 70, 229, 0.15), transparent 55%)",
        darkAura:
          "radial-gradient(circle at 20% 22%, rgba(6, 182, 212, 0.22), transparent 55%), radial-gradient(circle at 84% 78%, rgba(99, 102, 241, 0.22), transparent 55%)",
        badgeBg: "bg-sky-600/12 dark:bg-sky-500/20 border-sky-600/25 dark:border-sky-400/30",
        badgeText: "text-sky-700 dark:text-sky-300",
        accentBar: "from-sky-500 to-indigo-500",
        Icon: FaBriefcase,
      };
    case "agrilink-vietnam":
      return {
        domain: "agrilink.vn",
        lightAura:
          "radial-gradient(circle at 22% 24%, rgba(5, 150, 105, 0.16), transparent 55%), radial-gradient(circle at 82% 80%, rgba(101, 163, 13, 0.14), transparent 55%)",
        darkAura:
          "radial-gradient(circle at 22% 24%, rgba(16, 185, 129, 0.22), transparent 55%), radial-gradient(circle at 82% 80%, rgba(132, 204, 22, 0.18), transparent 55%)",
        badgeBg: "bg-emerald-600/12 dark:bg-emerald-500/20 border-emerald-600/25 dark:border-emerald-400/30",
        badgeText: "text-emerald-700 dark:text-emerald-300",
        accentBar: "from-emerald-500 to-lime-500",
        Icon: FaLeaf,
      };
    case "music-web":
      return {
        domain: "musicweb.audio",
        lightAura:
          "radial-gradient(circle at 20% 25%, rgba(225, 29, 72, 0.14), transparent 55%), radial-gradient(circle at 80% 75%, rgba(124, 58, 237, 0.14), transparent 55%)",
        darkAura:
          "radial-gradient(circle at 20% 25%, rgba(244, 63, 94, 0.22), transparent 55%), radial-gradient(circle at 80% 75%, rgba(139, 92, 246, 0.22), transparent 55%)",
        badgeBg: "bg-rose-600/12 dark:bg-rose-500/20 border-rose-600/25 dark:border-rose-400/30",
        badgeText: "text-rose-700 dark:text-rose-300",
        accentBar: "from-rose-500 to-violet-500",
        Icon: FaMusic,
      };
    case "library-management":
      return {
        domain: "library-os.app",
        lightAura:
          "radial-gradient(circle at 20% 25%, rgba(5, 150, 105, 0.15), transparent 55%), radial-gradient(circle at 80% 75%, rgba(2, 132, 199, 0.14), transparent 55%)",
        darkAura:
          "radial-gradient(circle at 20% 25%, rgba(16, 185, 129, 0.2), transparent 55%), radial-gradient(circle at 80% 75%, rgba(6, 182, 212, 0.2), transparent 55%)",
        badgeBg: "bg-emerald-600/12 dark:bg-emerald-500/20 border-emerald-600/25 dark:border-emerald-400/30",
        badgeText: "text-emerald-700 dark:text-emerald-300",
        accentBar: "from-emerald-500 to-cyan-500",
        Icon: FaBook,
      };
    case "storeflow":
      return {
        domain: "storeflow.app",
        lightAura:
          "radial-gradient(circle at 20% 25%, rgba(13, 148, 136, 0.15), transparent 55%), radial-gradient(circle at 80% 75%, rgba(5, 150, 105, 0.14), transparent 55%)",
        darkAura:
          "radial-gradient(circle at 20% 25%, rgba(20, 184, 166, 0.22), transparent 55%), radial-gradient(circle at 80% 75%, rgba(16, 185, 129, 0.2), transparent 55%)",
        badgeBg: "bg-teal-600/12 dark:bg-teal-500/20 border-teal-600/25 dark:border-teal-400/30",
        badgeText: "text-teal-700 dark:text-teal-300",
        accentBar: "from-emerald-500 to-teal-500",
        Icon: FaStore,
      };
    case "face-auth-ai":
      return {
        domain: "face-auth.ai",
        lightAura:
          "radial-gradient(circle at 20% 25%, rgba(2, 132, 199, 0.16), transparent 55%), radial-gradient(circle at 80% 75%, rgba(37, 99, 235, 0.14), transparent 55%)",
        darkAura:
          "radial-gradient(circle at 20% 25%, rgba(6, 182, 212, 0.24), transparent 55%), radial-gradient(circle at 80% 75%, rgba(59, 130, 246, 0.22), transparent 55%)",
        badgeBg: "bg-blue-600/12 dark:bg-blue-500/20 border-blue-600/25 dark:border-blue-400/30",
        badgeText: "text-blue-700 dark:text-blue-300",
        accentBar: "from-cyan-500 to-blue-600",
        Icon: FaUserCheck,
      };
    case "product-management-mobile":
      return {
        domain: "mobile-inventory.expo",
        lightAura:
          "radial-gradient(circle at 20% 25%, rgba(234, 88, 12, 0.14), transparent 55%), radial-gradient(circle at 80% 75%, rgba(219, 39, 119, 0.14), transparent 55%)",
        darkAura:
          "radial-gradient(circle at 20% 25%, rgba(249, 115, 22, 0.22), transparent 55%), radial-gradient(circle at 80% 75%, rgba(236, 72, 153, 0.2), transparent 55%)",
        badgeBg: "bg-orange-600/12 dark:bg-orange-500/20 border-orange-600/25 dark:border-orange-400/30",
        badgeText: "text-orange-700 dark:text-orange-300",
        accentBar: "from-orange-500 to-pink-500",
        Icon: FaMobileAlt,
      };
    case "store-management-api":
      return {
        domain: "api.store-mgmt.dev",
        lightAura:
          "radial-gradient(circle at 20% 25%, rgba(79, 70, 229, 0.15), transparent 55%), radial-gradient(circle at 80% 75%, rgba(2, 132, 199, 0.15), transparent 55%)",
        darkAura:
          "radial-gradient(circle at 20% 25%, rgba(99, 102, 241, 0.22), transparent 55%), radial-gradient(circle at 80% 75%, rgba(6, 182, 212, 0.22), transparent 55%)",
        badgeBg: "bg-indigo-600/12 dark:bg-indigo-500/20 border-indigo-600/25 dark:border-indigo-400/30",
        badgeText: "text-indigo-700 dark:text-indigo-300",
        accentBar: "from-indigo-500 to-cyan-500",
        Icon: FaServer,
      };
    default:
      return {
        domain: `${project.slug}.app`,
        lightAura:
          "radial-gradient(circle at 20% 25%, rgba(2, 132, 199, 0.15), transparent 55%), radial-gradient(circle at 80% 75%, rgba(124, 58, 237, 0.14), transparent 55%)",
        darkAura:
          "radial-gradient(circle at 20% 25%, rgba(6, 182, 212, 0.22), transparent 55%), radial-gradient(circle at 80% 75%, rgba(139, 92, 246, 0.20), transparent 55%)",
        badgeBg: "bg-sky-600/12 dark:bg-cyan-500/20 border-sky-600/25 dark:border-cyan-400/30",
        badgeText: "text-sky-700 dark:text-cyan-300",
        accentBar: "from-cyan-500 to-violet-500",
        Icon: FaLayerGroup,
      };
  }
};

/* ---------- Tailored High-DPI Product UI Previews ---------- */

const ThreadLearnMockup = () => (
  <div className="relative z-10 w-full max-w-[520px] grid grid-cols-12 gap-3 text-left select-none">
    {/* Left: Monaco Sandbox Editor */}
    <div className="col-span-12 sm:col-span-7 rounded-xl border border-slate-200/90 dark:border-slate-700/80 bg-white/95 dark:bg-[#0b101b]/95 shadow-lg overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-[#101726]">
        <div className="flex items-center gap-1.5 font-code text-[10px] text-slate-700 dark:text-slate-300 font-medium">
          <FaTerminal className="text-violet-600 dark:text-violet-400 text-[9px]" />
          <span>sandbox.ts</span>
        </div>
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-violet-600/10 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 font-code text-[9px] font-semibold">
          <FaBolt className="text-[8px]" /> AI Stream
        </span>
      </div>

      <div className="p-3 font-code text-[10px] leading-[1.65] space-y-0.5 text-slate-700 dark:text-slate-300">
        <div className="flex gap-2.5">
          <span className="text-slate-400 dark:text-slate-600 w-3 text-right">1</span>
          <span>
            <span className="text-violet-600 dark:text-violet-400 font-medium">async function</span>{" "}
            <span className="text-sky-700 dark:text-cyan-300 font-semibold">runSandbox</span>
            <span>(ast) &#123;</span>
          </span>
        </div>
        <div className="flex gap-2.5 bg-sky-500/10 dark:bg-cyan-500/12 -mx-3 px-3 border-l-2 border-sky-600 dark:border-cyan-400">
          <span className="text-slate-400 dark:text-slate-500 w-3 text-right">2</span>
          <span>
            <span className="text-violet-600 dark:text-violet-400">const</span> res ={" "}
            <span className="text-violet-600 dark:text-violet-400">await</span>{" "}
            <span className="text-emerald-700 dark:text-emerald-300">execIsolated</span>(ast);
          </span>
        </div>
        <div className="flex gap-2.5">
          <span className="text-slate-400 dark:text-slate-600 w-3 text-right">3</span>
          <span>
            <span className="text-sky-700 dark:text-cyan-300">streamAI</span>.emit(
            <span className="text-amber-700 dark:text-amber-300">&apos;hint&apos;</span>, res);
          </span>
        </div>
        <div className="flex gap-2.5">
          <span className="text-slate-400 dark:text-slate-600 w-3 text-right">4</span>
          <span>
            <span className="text-violet-600 dark:text-violet-400">return</span> res.metrics;
          </span>
        </div>
        <div className="flex gap-2.5">
          <span className="text-slate-400 dark:text-slate-600 w-3 text-right">5</span>
          <span>&#125;</span>
        </div>
      </div>

      <div className="px-3 py-1.5 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/90 dark:bg-[#0d1320] flex items-center justify-between font-code text-[9px] text-slate-500 dark:text-slate-400">
        <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
          <FaCheckCircle className="text-[9px]" /> 4/4 tests passed
        </span>
        <span>18 ms</span>
      </div>
    </div>

    {/* Right: Live Telemetry & PayOS Status */}
    <div className="col-span-12 sm:col-span-5 flex flex-col gap-3">
      <div className="rounded-xl border border-slate-200/90 dark:border-slate-700/80 bg-white/95 dark:bg-[#0b101b]/95 p-3 shadow-md space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-code text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Code Lab Score
          </span>
          <span className="text-[10px] font-code font-bold text-violet-700 dark:text-violet-300">
            92%
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-violet-600 to-cyan-500" />
        </div>
        <p className="text-[10px] text-slate-600 dark:text-slate-300 leading-snug">
          Complexity O(n) verified. Clean closure capture.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200/90 dark:border-slate-700/80 bg-white/95 dark:bg-[#0b101b]/95 p-3 shadow-md space-y-2 flex-1 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="font-code text-[9px] uppercase text-slate-500 dark:text-slate-400">
            PayOS Sync
          </span>
          <span className="px-1.5 py-0.5 rounded-full bg-emerald-600/12 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-code text-[9px] font-semibold">
            PRO
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 pt-1 font-code text-[9px]">
          <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/70 text-center">
            <div className="font-bold text-slate-800 dark:text-white text-[11px]">157</div>
            <div className="text-slate-500 dark:text-slate-400">FE commits</div>
          </div>
          <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/70 text-center">
            <div className="font-bold text-slate-800 dark:text-white text-[11px]">78</div>
            <div className="text-slate-500 dark:text-slate-400">BE commits</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MyRoomieMockup = () => (
  <div className="relative z-10 w-full max-w-[520px] grid grid-cols-12 gap-3 text-left select-none">
    {/* Left: Room Listing & Match Card */}
    <div className="col-span-12 sm:col-span-6 rounded-xl border border-slate-200/90 dark:border-slate-700/80 bg-white/95 dark:bg-[#0b101b]/95 shadow-lg overflow-hidden flex flex-col">
      <div className="relative h-20 bg-gradient-to-br from-teal-500/20 via-cyan-500/15 to-sky-500/20 dark:from-teal-500/30 dark:via-cyan-500/20 dark:to-sky-600/25 p-2.5 flex flex-col justify-between border-b border-slate-200/70 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <span className="px-2 py-0.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-teal-700 dark:text-teal-300 font-code text-[9px] font-bold shadow-2xs">
            94% Match
          </span>
          <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white font-code text-[8px] font-semibold">
            Verified
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-display font-bold text-slate-800 dark:text-white">
          <FaHome className="text-teal-600 dark:text-teal-300 text-xs" />
          <span>FPT Plaza 2 Studio</span>
        </div>
      </div>
      <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
        <div className="flex items-baseline justify-between">
          <span className="font-display font-bold text-xs text-slate-900 dark:text-white">
            3.8M <span className="font-normal text-[10px] text-slate-500">/tháng</span>
          </span>
          <span className="font-code text-[9px] text-slate-500 dark:text-slate-400">Ngũ Hành Sơn</span>
        </div>
        <div className="flex flex-wrap gap-1 font-code text-[8.5px]">
          <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            Quiet Hours
          </span>
          <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            Non-smoking
          </span>
        </div>
      </div>
    </div>

    {/* Right: SignalR Realtime Chat Panel */}
    <div className="col-span-12 sm:col-span-6 rounded-xl border border-slate-200/90 dark:border-slate-700/80 bg-white/95 dark:bg-[#0b101b]/95 shadow-lg overflow-hidden flex flex-col justify-between">
      <div className="px-3 py-2 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-[#101726] flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-code text-[10px] font-semibold text-slate-800 dark:text-slate-200">
          <FaCommentDots className="text-teal-600 dark:text-teal-400 text-[10px]" />
          <span>Room Chat</span>
        </div>
        <span className="inline-flex items-center gap-1 font-code text-[9px] text-emerald-700 dark:text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          SignalR
        </span>
      </div>

      <div className="p-3 space-y-2 text-[10px]">
        <div className="max-w-[85%] rounded-lg rounded-tl-xs bg-slate-100 dark:bg-slate-800 px-2.5 py-1.5 text-slate-700 dark:text-slate-200 leading-snug">
          Phòng này cuối tháng còn trống không ạ?
        </div>
        <div className="ml-auto max-w-[85%] rounded-lg rounded-tr-xs bg-teal-600 dark:bg-teal-500 px-2.5 py-1.5 text-white leading-snug">
          Còn nha bạn! Mình gửi lịch xem phòng nhé.
        </div>
      </div>

      <div className="px-3 py-1.5 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-[#0d1320] flex items-center justify-between font-code text-[9px] text-slate-500 dark:text-slate-400">
        <span>ASP.NET Core 8 · Firestore</span>
        <span className="text-teal-700 dark:text-teal-300 font-semibold">Live</span>
      </div>
    </div>
  </div>
);

const JobFinderMockup = () => (
  <div className="relative z-10 w-full max-w-[520px] space-y-2.5 text-left select-none">
    {/* Search & Filter Header */}
    <div className="rounded-xl border border-slate-200/90 dark:border-slate-700/80 bg-white/95 dark:bg-[#0b101b]/95 px-3 py-2 shadow-md flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 text-[10px] font-code text-slate-600 dark:text-slate-300 truncate">
        <FaSearch className="text-sky-600 dark:text-cyan-400 text-[9px] flex-shrink-0" />
        <span className="truncate">React · Spring Boot · Đà Nẵng</span>
      </div>
      <span className="px-2 py-0.5 rounded-md bg-sky-600 text-white font-code text-[9px] font-semibold flex-shrink-0">
        128 jobs
      </span>
    </div>

    {/* Main Dashboard Split */}
    <div className="grid grid-cols-12 gap-2.5">
      {/* Left: Candidate Pipeline */}
      <div className="col-span-12 sm:col-span-7 space-y-2">
        {[
          {
            role: "Frontend Engineer",
            company: "TechCorp · Hybrid",
            badge: "96% Fit",
            status: "Interview",
            statusCls: "text-emerald-700 dark:text-emerald-300 bg-emerald-600/12 dark:bg-emerald-500/20",
          },
          {
            role: "Full-stack Intern",
            company: "CloudLabs · Da Nang",
            badge: "91% Fit",
            status: "Shortlisted",
            statusCls: "text-sky-700 dark:text-sky-300 bg-sky-600/12 dark:bg-sky-500/20",
          },
        ].map((job) => (
          <div
            key={job.role}
            className="rounded-xl border border-slate-200/90 dark:border-slate-700/80 bg-white/95 dark:bg-[#0b101b]/95 p-2.5 shadow-sm flex items-center justify-between gap-2"
          >
            <div className="min-w-0">
              <div className="font-display font-bold text-[11px] text-slate-900 dark:text-white truncate">
                {job.role}
              </div>
              <div className="font-code text-[9px] text-slate-500 dark:text-slate-400 truncate">
                {job.company}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0 font-code text-[8.5px]">
              <span className={`px-1.5 py-0.5 rounded font-semibold ${job.statusCls}`}>
                {job.status}
              </span>
              <span className="text-slate-500 dark:text-slate-400">{job.badge}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Right: CV Preview & Analytics */}
      <div className="col-span-12 sm:col-span-5 rounded-xl border border-slate-200/90 dark:border-slate-700/80 bg-white/95 dark:bg-[#0b101b]/95 p-3 shadow-sm flex flex-col justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-rose-600/12 dark:bg-rose-500/20 text-rose-600 dark:text-rose-300 grid place-items-center text-xs flex-shrink-0">
            <FaFilePdf />
          </div>
          <div className="min-w-0">
            <div className="font-code text-[10px] font-semibold text-slate-800 dark:text-slate-100 truncate">
              Resume_CV.pdf
            </div>
            <div className="font-code text-[8.5px] text-emerald-700 dark:text-emerald-400">
              JWT · Verified
            </div>
          </div>
        </div>

        {/* Mini pipeline bars */}
        <div className="space-y-1">
          <div className="flex items-end gap-1.5 h-10 pt-1">
            {[42, 68, 55, 88, 76, 100].map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-t-xs bg-gradient-to-t from-sky-600 to-indigo-500 dark:from-cyan-500 dark:to-indigo-400 opacity-85"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex items-center justify-between font-code text-[8.5px] text-slate-500 dark:text-slate-400">
            <span>Employer Metrics</span>
            <span className="text-sky-700 dark:text-cyan-300 font-semibold">+24%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const GenericBlueprintMockup: React.FC<{ project: Project; theme: VisualTheme }> = ({
  project,
  theme,
}) => {
  const Icon = theme.Icon;
  return (
    <div className="relative z-10 w-full max-w-[480px] rounded-xl border border-slate-200/90 dark:border-slate-700/80 bg-white/95 dark:bg-[#0b101b]/95 p-4 shadow-lg space-y-3 text-left select-none">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`w-9 h-9 rounded-xl border grid place-items-center text-sm flex-shrink-0 ${theme.badgeBg} ${theme.badgeText}`}
          >
            <Icon />
          </div>
          <div className="min-w-0">
            <div className="font-display font-bold text-sm text-slate-900 dark:text-white truncate">
              {project.title}
            </div>
            <div className="font-code text-[10px] text-slate-500 dark:text-slate-400 truncate">
              {theme.domain}
            </div>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-code text-[9px] uppercase font-semibold text-slate-700 dark:text-slate-300 flex-shrink-0">
          {project.category}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 font-code text-[9.5px]">
        {project.techStack.slice(0, 3).map((stack) => (
          <div
            key={stack}
            className="px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-center truncate font-medium"
          >
            {stack}
          </div>
        ))}
      </div>

      {project.languageBreakdown && project.languageBreakdown.length > 0 && (
        <div className="space-y-1.5 pt-1">
          <div className="h-1.5 rounded-full overflow-hidden flex bg-slate-200 dark:bg-slate-800">
            {project.languageBreakdown.map((lang) => (
              <div
                key={lang.name}
                style={{ width: lang.percent, backgroundColor: lang.color }}
              />
            ))}
          </div>
          <div className="flex items-center justify-between font-code text-[9px] text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1">
              <FaShieldAlt className="text-[9px] text-[var(--color-accent)]" />
              <span>Architecture verified</span>
            </span>
            <span>{project.duration}</span>
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------- Main Component ---------- */

const ProjectVisualFrame: React.FC<ProjectVisualFrameProps> = ({
  project,
  variant = "showcase",
  className = "",
}) => {
  const visual = getProjectVisualTheme(project);
  const Icon = visual.Icon;
  const [imgFailed, setImgFailed] = useState(false);
  const hasRealScreenshot = Boolean(project.screenshot) && !imgFailed;

  /* 1. Compact Square Icon Badge (Drawer Header / Small Thumbnails) */
  if (variant === "badge") {
    return (
      <div
        className={`relative rounded-xl border grid place-items-center overflow-hidden flex-shrink-0 ${visual.badgeBg} ${visual.badgeText} ${className}`}
      >
        <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${visual.accentBar}`} />
        <Icon className="text-xl relative z-10" />
      </div>
    );
  }

  /* 2. Compact Card / Command Palette Banner */
  if (variant === "compact") {
    if (hasRealScreenshot) {
      return (
        <div
          className={`relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-component)] flex flex-col ${className}`}
        >
          {/* Sleek mini browser chrome bar */}
          <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-[var(--color-border)] bg-[var(--color-card)]/95 flex-shrink-0">
            <div className="flex items-center gap-1 min-w-0">
              <span className="w-2 h-2 rounded-full bg-rose-400/80 dark:bg-rose-500/70" />
              <span className="w-2 h-2 rounded-full bg-amber-400/85 dark:bg-amber-500/70" />
              <span className="w-2 h-2 rounded-full bg-emerald-400/85 dark:bg-emerald-500/70" />
              <span className="ml-1.5 font-code text-[9.5px] text-[var(--color-subtext)] truncate">
                {visual.domain}
              </span>
            </div>
            {project.githubContributions ? (
              <span className="inline-flex items-center gap-1 font-code text-[9.5px] font-semibold text-[var(--color-accent)] flex-shrink-0 ml-1">
                <FaCodeBranch className="text-[8.5px]" />
                {project.githubContributions}
              </span>
            ) : null}
          </div>

          {/* Real HiDPI Product Screenshot */}
          <div className="relative flex-1 min-h-0 overflow-hidden bg-slate-100 dark:bg-[#080c14]">
            <img
              src={project.screenshot}
              alt={`${project.title} live UI preview`}
              loading="lazy"
              decoding="async"
              onError={() => setImgFailed(true)}
              className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/8 pointer-events-none" />
          </div>
        </div>
      );
    }

    return (
      <div
        className={`relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-component)] flex flex-col justify-between ${className}`}
      >
        {/* Soft Daylight & Dark Mode Aura */}
        <div
          className="absolute inset-0 dark:hidden pointer-events-none"
          style={{ backgroundImage: visual.lightAura }}
        />
        <div
          className="absolute inset-0 hidden dark:block pointer-events-none"
          style={{ backgroundImage: visual.darkAura }}
        />
        <div className="absolute inset-0 bg-grid opacity-55 pointer-events-none" />
        <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${visual.accentBar}`} />

        <div className="relative z-10 h-full w-full p-4 flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="font-code text-[10px] text-[var(--color-subtext)] truncate">
              {visual.domain}
            </span>
            {project.githubContributions ? (
              <div className="px-2 py-0.5 rounded-md border border-[var(--color-border)] bg-[var(--color-card)]/90 font-code text-[9.5px] font-semibold text-[var(--color-accent)] flex items-center gap-1 flex-shrink-0 shadow-2xs">
                <FaCodeBranch className="text-[8.5px]" />
                <span>{project.githubContributions}</span>
              </div>
            ) : (
              <div className="px-2 py-0.5 rounded-md border border-[var(--color-border)] bg-[var(--color-card)]/85 font-code text-[9px] uppercase text-[var(--color-subtext)] flex-shrink-0">
                {project.category}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 min-w-0 my-auto">
            <div
              className={`w-11 h-11 rounded-xl border grid place-items-center text-lg shadow-xs bg-white/90 dark:bg-slate-900/90 flex-shrink-0 ${visual.badgeBg} ${visual.badgeText}`}
            >
              <Icon />
            </div>
            <div className="min-w-0">
              <div className="font-display font-bold text-sm text-[var(--color-text)] truncate">
                {project.title}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5 font-code text-[9.5px] text-[var(--color-subtext)]">
                <span className="truncate">{project.techStack.slice(0, 3).join(" · ")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* 3. Full Showcase Editorial Product Frame (Home Selected Work / Case Study Hero) */
  return (
    <div
      className={`relative rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-medium)] group transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[var(--shadow-large)] hover:border-[var(--color-border-strong)] ${className}`}
    >
      {/* Top Accent Specular Line */}
      <div className={`h-[2px] w-full bg-gradient-to-r ${visual.accentBar}`} />

      {/* Window Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--color-border)] bg-[var(--color-bg-component)]/75 text-xs font-code text-[var(--color-subtext)]">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80 dark:bg-rose-500/65" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/85 dark:bg-amber-500/65" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/85 dark:bg-emerald-500/65" />
          </div>
          <span className="ml-1.5 px-2.5 py-0.5 rounded-md bg-[var(--color-card)] border border-[var(--color-border)] text-[10.5px] text-[var(--color-text)] truncate">
            {visual.domain}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          {hasRealScreenshot && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/12 border border-emerald-500/25 text-[9.5px] font-semibold text-emerald-700 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Live UI
            </span>
          )}
          <span className="text-[10px] uppercase font-semibold text-[var(--color-accent)]">
            {project.status === "in-progress" ? "Active" : "Shipped"}
          </span>
        </div>
      </div>

      {/* Preview Canvas: Real HiDPI Screenshot OR Crisp Coded UI Mockup */}
      {hasRealScreenshot ? (
        <div className="relative aspect-[16/10] bg-slate-100 dark:bg-[#080c14] overflow-hidden">
          <img
            src={project.screenshot}
            alt={`${project.title} — ${project.tagline}`}
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.022]"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-slate-900/6 dark:ring-white/8 pointer-events-none" />
        </div>
      ) : (
        <div className="relative min-h-[260px] sm:min-h-[300px] lg:aspect-[16/10] bg-slate-50/90 dark:bg-[#080c14] overflow-hidden flex items-center justify-center p-5 sm:p-7">
          {/* Theme-aware luminous backdrop */}
          <div
            className="absolute inset-0 dark:hidden pointer-events-none"
            style={{ backgroundImage: visual.lightAura }}
          />
          <div
            className="absolute inset-0 hidden dark:block pointer-events-none"
            style={{ backgroundImage: visual.darkAura }}
          />

          {/* Crisp Masked Architectural Grid */}
          <div className="absolute inset-0 bg-grid bg-grid-masked opacity-75 pointer-events-none" />

          {/* Subtle Inner Frame Glow */}
          <div className="absolute inset-0 ring-1 ring-inset ring-slate-900/4 dark:ring-white/5 pointer-events-none" />

          {/* Product UI Showcase */}
          <div className="w-full flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.015]">
            {project.slug === "threadlearn" ? (
              <ThreadLearnMockup />
            ) : project.slug === "myroomie" ? (
              <MyRoomieMockup />
            ) : project.slug === "jobfinder" ? (
              <JobFinderMockup />
            ) : (
              <GenericBlueprintMockup project={project} theme={visual} />
            )}
          </div>
        </div>
      )}

      {/* Bottom Quick Info Bar */}
      <div className="px-4 py-3 border-t border-[var(--color-border)] bg-[var(--color-card)] flex items-center justify-between text-xs font-code text-[var(--color-subtext)]">
        <span>{project.duration}</span>
        {project.githubContributions ? (
          <span className="inline-flex items-center gap-1.5 text-[var(--color-accent)] font-semibold">
            <FaCodeBranch className="text-[10px]" />
            <span>{project.githubContributions} commits</span>
          </span>
        ) : (
          <span className="text-[11px] capitalize">{project.category}</span>
        )}
      </div>
    </div>
  );
};

export default ProjectVisualFrame;
