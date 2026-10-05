import React, { useState } from "react";
import {
  Reveal,
  TiltCard,
  CountUp,
  ProgressRing,
  EcgWave,
  PhoneFrame,
  ScrollVideoReveal,
  GlyphPortalScene,
  celebrate,
  sound,
  useScrollSpy,
  useLenis,
} from "../index";
import {
  FaArrowLeft,
  FaVolumeUp,
  FaVolumeMute,
  FaMousePointer,
  FaCompass,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { Link } from "react-router-dom";

export const MotionKitDemo: React.FC = () => {
  const [soundActive, setSoundActive] = useState(true);
  const [count, setCount] = useState(78);
  const { scrollTo } = useLenis();

  const sectionIds = [
    "demo-intro",
    "demo-reveal",
    "demo-tilt",
    "demo-micro",
    "demo-metrics",
    "demo-scenes",
    "demo-feedback",
  ];

  const activeSection = useScrollSpy(sectionIds, 120);

  const handleToggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    sound.setEnabled(next);
    if (next) sound.tap();
  };

  const handleCelebrateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (soundActive) sound.chime();
    celebrate({ element: e.currentTarget });
  };

  const handleTapClick = () => {
    if (soundActive) sound.tap();
  };

  return (
    <div className="min-h-screen bg-[var(--mk-canvas)] text-[var(--mk-text)] selection:bg-[var(--mk-primary)] selection:text-white">
      {/* Top Glass Navigation Bar */}
      <header className="sticky top-0 z-40 w-full mk-glass-nav flex items-center justify-between px-6 border-b border-[var(--mk-border)]">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-mono text-[var(--mk-text-muted)] hover:text-white transition-colors"
          >
            <FaArrowLeft className="text-[10px]" />
            <span>Portfolio</span>
          </Link>
          <span className="text-zinc-600">/</span>
          <span className="font-display font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[var(--mk-primary)]" />
            Motion Kit Playground
          </span>
        </div>

        {/* Section Spy Pills on Desktop */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-mono">
          {[
            { id: "demo-reveal", label: "Reveal" },
            { id: "demo-tilt", label: "TiltCard" },
            { id: "demo-micro", label: "Micro" },
            { id: "demo-metrics", label: "Metrics" },
            { id: "demo-scenes", label: "Scenes" },
            { id: "demo-feedback", label: "Feedback" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(`#${id}`, { offset: -90 })}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeSection === id
                  ? "bg-white/10 text-[var(--mk-primary)] font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Sound toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleSound}
            className="p-2 rounded-lg border border-[var(--mk-border)] bg-[var(--mk-surface)] text-xs text-[var(--mk-text-muted)] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            title="Toggle Web Audio"
          >
            {soundActive ? <FaVolumeUp /> : <FaVolumeMute />}
            <span className="font-mono text-[10px] hidden sm:inline">
              {soundActive ? "AUDIO ON" : "MUTED"}
            </span>
          </button>
        </div>
      </header>

      {/* Intro Hero Section */}
      <section
        id="demo-intro"
        className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center border-b border-[var(--mk-border)]"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-[var(--mk-border)] bg-[var(--mk-surface)] text-[var(--mk-primary)] mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--mk-primary)] animate-pulse" />
          Reusable Creative Motion Suite · Brand Agnostic
        </div>

        <h1 className="mk-clamp-heading font-display font-extrabold tracking-tight text-white mb-6">
          Motion Kit <span className="text-[var(--mk-primary)]">Architecture</span>
        </h1>

        <p className="text-base sm:text-lg text-[var(--mk-text-muted)] max-w-2xl mx-auto leading-relaxed mk-text-pretty mb-8">
          Hệ thống animation, smooth scroll Lenis và micro-interactions cao cấp được chuẩn hóa theo các tham số vàng, đồng bộ GSAP ticker và hỗ trợ trợ năng reduced-motion.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => scrollTo("#demo-reveal", { offset: -90 })}
            className="px-5 py-2.5 rounded-xl text-xs font-mono font-semibold bg-white text-black hover:bg-zinc-200 transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Explore Primitives</span>
            <FaCompass />
          </button>
          <button
            onClick={handleCelebrateClick}
            className="px-5 py-2.5 rounded-xl text-xs font-mono border border-[var(--mk-border)] bg-[var(--mk-surface)] text-[var(--mk-primary)] hover:border-[var(--mk-primary)] transition-all cursor-pointer flex items-center gap-2 mk-press"
          >
            <HiSparkles />
            <span>Trigger Confetti Wave</span>
          </button>
        </div>
      </section>

      {/* 1. Reveal Primitives (4 Directions) */}
      <section
        id="demo-reveal"
        className="max-w-6xl mx-auto px-6 py-20 border-b border-[var(--mk-border)]"
      >
        <div className="mb-12">
          <span className="text-xs font-mono text-[var(--mk-primary)] uppercase tracking-wider">
            Primitive 01
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mt-1">
            Reveal · IntersectionObserver (4 Hướng)
          </h2>
          <p className="text-sm text-[var(--mk-text-muted)] mt-1">
            Áp dụng golden timing 750ms với đường cong cubic-bezier(0.16, 1, 0.3, 1), khoảng cách 28px và scale 0.985.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Reveal direction="up" delay={0}>
            <div className="p-6 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] h-full">
              <span className="text-xs font-mono text-[var(--mk-primary)]">UP</span>
              <h3 className="font-display font-semibold text-base text-white mt-2 mb-1">
                Direction Up
              </h3>
              <p className="text-xs text-[var(--mk-text-muted)] leading-relaxed">
                Di chuyển từ dưới lên 28px kết hợp phóng to vi mô.
              </p>
            </div>
          </Reveal>

          <Reveal direction="down" delay={100}>
            <div className="p-6 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] h-full">
              <span className="text-xs font-mono text-[var(--mk-primary)]">DOWN</span>
              <h3 className="font-display font-semibold text-base text-white mt-2 mb-1">
                Direction Down
              </h3>
              <p className="text-xs text-[var(--mk-text-muted)] leading-relaxed">
                Xuất hiện từ phía trên trượt xuống êm ái.
              </p>
            </div>
          </Reveal>

          <Reveal direction="left" delay={200}>
            <div className="p-6 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] h-full">
              <span className="text-xs font-mono text-[var(--mk-primary)]">LEFT</span>
              <h3 className="font-display font-semibold text-base text-white mt-2 mb-1">
                Direction Left
              </h3>
              <p className="text-xs text-[var(--mk-text-muted)] leading-relaxed">
                Trượt nhẹ sang trái với độ trễ stagger 100ms.
              </p>
            </div>
          </Reveal>

          <Reveal direction="right" delay={300}>
            <div className="p-6 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] h-full">
              <span className="text-xs font-mono text-[var(--mk-primary)]">RIGHT</span>
              <h3 className="font-display font-semibold text-base text-white mt-2 mb-1">
                Direction Right
              </h3>
              <p className="text-xs text-[var(--mk-text-muted)] leading-relaxed">
                Trượt sang phải, tự động vô hiệu hóa khi bật reduced-motion.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. TiltCard 3D Perspective + Glare */}
      <section
        id="demo-tilt"
        className="max-w-6xl mx-auto px-6 py-20 border-b border-[var(--mk-border)]"
      >
        <div className="mb-12">
          <span className="text-xs font-mono text-[var(--mk-primary)] uppercase tracking-wider">
            Primitive 02
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mt-1">
            TiltCard · Nghiêng 3D & Ánh sáng Glare theo chuột
          </h2>
          <p className="text-sm text-[var(--mk-text-muted)] mt-1">
            Perspective 1000px, maxTilt 7°, scale 1.015, leave easing 450ms cubic-bezier(.2,.8,.2,1).
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <TiltCard className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-6">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 grid place-items-center text-sm mb-4">
              <FaMousePointer />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              Default 3D Glare
            </h3>
            <p className="text-xs text-[var(--mk-text-muted)] leading-relaxed">
              Di chuột qua khối để kiểm tra chuyển động nghiêng 3D mượt mà kèm vệt sáng phản chiếu radial glare.
            </p>
          </TiltCard>

          <TiltCard
            maxTilt={12}
            scale={1.03}
            className="rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-cyan-950/20 to-transparent p-6"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 grid place-items-center text-sm mb-4">
              <HiSparkles />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              High Dynamics (12°)
            </h3>
            <p className="text-xs text-[var(--mk-text-muted)] leading-relaxed">
              Biên độ nghiêng 12° với độ phóng đại 1.03x cho các thẻ kêu gọi hành động trọng điểm.
            </p>
          </TiltCard>

          <TiltCard
            glare={false}
            className="rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-6"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 grid place-items-center text-sm mb-4">
              <FaCompass />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              Matte Finish (No Glare)
            </h3>
            <p className="text-xs text-[var(--mk-text-muted)] leading-relaxed">
              Chế độ nghiêng 3D thuần túy không có vệt sáng, thích hợp cho các card kỹ thuật tối giản.
            </p>
          </TiltCard>
        </div>
      </section>

      {/* 3. Micro-interactions (Float, Beacon, Ping, Shimmer, Press) */}
      <section
        id="demo-micro"
        className="max-w-6xl mx-auto px-6 py-20 border-b border-[var(--mk-border)]"
      >
        <div className="mb-12">
          <span className="text-xs font-mono text-[var(--mk-primary)] uppercase tracking-wider">
            Micro-interactions
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mt-1">
            CSS Micro-Interactions (D1 – D8)
          </h2>
          <p className="text-sm text-[var(--mk-text-muted)] mt-1">
            Bộ vi cử động tinh tế: Float, Beacon radar, Ping pulse, Skeleton shimmer và Press feedback.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* D1: Float */}
          <div className="p-6 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] text-center flex flex-col items-center justify-between">
            <span className="text-xs font-mono text-[var(--mk-text-muted)]">D1 · FLOAT</span>
            <div className="mk-float my-6 px-4 py-2 rounded-xl bg-[var(--mk-surface-subtle)] border border-[var(--mk-border)] text-xs font-mono text-[var(--mk-primary)] shadow-sm">
              6.5s Float Motion
            </div>
            <p className="text-[11px] text-[var(--mk-text-muted)]">
              Chuyển vị dọc 8px êm dịu, không tiêu tốn reflow.
            </p>
          </div>

          {/* D2: Beacon Radar */}
          <div className="p-6 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] text-center flex flex-col items-center justify-between">
            <span className="text-xs font-mono text-[var(--mk-text-muted)]">D2 · BEACON</span>
            <div className="my-6">
              <div className="mk-beacon w-6 h-6 rounded-full bg-[var(--mk-primary)] mx-auto flex items-center justify-center" />
            </div>
            <p className="text-[11px] text-[var(--mk-text-muted)]">
              Radar sóng xung kích 2.2s cubic-bezier(0, .2, .8, 1).
            </p>
          </div>

          {/* D7: Skeleton Shimmer */}
          <div className="p-6 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] text-center flex flex-col items-center justify-between">
            <span className="text-xs font-mono text-[var(--mk-text-muted)]">D7 · SHIMMER</span>
            <div className="my-6 w-full space-y-2">
              <div className="h-4 rounded-md mk-shimmer w-3/4 mx-auto" />
              <div className="h-3 rounded-md mk-shimmer w-1/2 mx-auto" />
            </div>
            <p className="text-[11px] text-[var(--mk-text-muted)]">
              Vệt sáng quét loading êm dịu thay thế spinner.
            </p>
          </div>

          {/* D8: Press Feedback */}
          <div className="p-6 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] text-center flex flex-col items-center justify-between">
            <span className="text-xs font-mono text-[var(--mk-text-muted)]">D8 · PRESS</span>
            <button
              onClick={handleTapClick}
              className="my-6 px-5 py-2 rounded-xl border border-[var(--mk-border)] bg-[var(--mk-surface-subtle)] text-xs font-mono text-white hover:border-[var(--mk-primary)] cursor-pointer mk-press"
            >
              Click / Tap Me
            </button>
            <p className="text-[11px] text-[var(--mk-text-muted)]">
              Phản hồi đàn hồi scale(0.97) translateY(1px) trong 80ms.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Metrics & Device (CountUp, ProgressRing, ECG, PhoneFrame) */}
      <section
        id="demo-metrics"
        className="max-w-6xl mx-auto px-6 py-20 border-b border-[var(--mk-border)]"
      >
        <div className="mb-12">
          <span className="text-xs font-mono text-[var(--mk-primary)] uppercase tracking-wider">
            Data & Device
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mt-1">
            Metrics & Device Mockup (CountUp, Ring, Ecg, PhoneFrame)
          </h2>
          <p className="text-sm text-[var(--mk-text-muted)] mt-1">
            Hiển thị trực quan dữ liệu số với ease-out cubic, SVG gradient và khung mockup phần cứng.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left metrics column: 7 cols */}
          <div className="lg:col-span-7 space-y-6">
            {/* CountUp & ProgressRing Card */}
            <div className="p-6 rounded-2xl border border-[var(--mk-border)] bg-[var(--mk-surface)] flex flex-wrap items-center justify-between gap-6">
              <div>
                <span className="text-xs font-mono text-[var(--mk-text-muted)] uppercase">
                  Animated Counter (1800ms)
                </span>
                <div className="text-4xl sm:text-5xl font-display font-extrabold text-white mt-1">
                  <CountUp target={1420} suffix="+" />
                </div>
                <p className="text-xs text-[var(--mk-text-muted)] mt-1">
                  Commit & đóng góp mã nguồn thực tế
                </p>
              </div>

              <div className="flex items-center gap-4">
                <ProgressRing percentage={count} size={90} strokeWidth={8}>
                  <span className="text-xs font-mono font-bold text-white">
                    {count}%
                  </span>
                </ProgressRing>
                <div className="space-y-1">
                  <span className="text-xs font-mono text-zinc-400 block">
                    Interactive Ring
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setCount((c) => Math.max(c - 15, 0))}
                      className="w-6 h-6 rounded bg-zinc-800 text-xs text-white grid place-items-center cursor-pointer"
                    >
                      -
                    </button>
                    <button
                      onClick={() => setCount((c) => Math.min(c + 15, 100))}
                      className="w-6 h-6 rounded bg-zinc-800 text-xs text-white grid place-items-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* EcgWave Card */}
            <div>
              <EcgWave
                label="LIVE_SYSTEM_TELEMETRY"
                rate="98.7% HEALTH"
                height={84}
              />
            </div>
          </div>

          {/* Right PhoneFrame column: 5 cols */}
          <div className="lg:col-span-5 flex justify-center">
            <PhoneFrame statusTime="10:42">
              <div className="p-4 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 mx-auto grid place-items-center text-lg mt-2">
                  <HiSparkles />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white">
                    Mobile Viewport
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Trải nghiệm responsive được kiểm tra trọn vẹn trong mockup.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-left space-y-1">
                  <span className="text-[10px] font-mono text-[var(--mk-primary)]">
                    STATUS: OK
                  </span>
                  <p className="text-[10px] text-zinc-300">
                    60fps rendering with hardware acceleration.
                  </p>
                </div>
              </div>
            </PhoneFrame>
          </div>
        </div>
      </section>

      {/* 5. Set-piece Scenes (Video Pin Reveal & Glyph Portal) */}
      <section id="demo-scenes" className="w-full">
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-10">
          <span className="text-xs font-mono text-[var(--mk-primary)] uppercase tracking-wider">
            Set-Piece Scenes
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mt-1">
            ScrollVideoReveal & GlyphPortal
          </h2>
          <p className="text-sm text-[var(--mk-text-muted)] mt-1">
            Hai trải nghiệm cuộn điện ảnh độc lập thương hiệu với GSAP matchMedia và Typography Aperture Zoom.
          </p>
        </div>

        {/* ScrollVideoReveal Demo Block */}
        <ScrollVideoReveal
          topText="Cinematic Set-piece 01"
          headingText="Precision Engineering In Motion"
          tags={["GSAP MatchMedia", "Anticipate Pin", "Circle Aperture", "Kinetic Stagger"]}
          subText="Khối video tự động cố định (pin) màn hình trong khi mở rộng mặt nạ clip-path hình tròn theo tốc độ cuộn chuột của người dùng."
          bottomText="Aperture Expanded to 150% · Seamless Unpin"
        />

        {/* GlyphPortal Demo Block */}
        <div className="mt-20">
          <GlyphPortalScene
            word="ENGINEER"
            focusChar="N"
            scrollLength={1.6}
            enterLabel="SCROLL TO DIVE THROUGH 'N'"
            tag="Aperture Zoom Metaphor"
            subTitle="Tương tác bằng cách cuộn chuột để phóng to xuyên qua ký tự vào không gian phía sau."
          />
        </div>
      </section>

      {/* 6. Feedback & Web Audio */}
      <section
        id="demo-feedback"
        className="max-w-6xl mx-auto px-6 py-24 text-center border-t border-[var(--mk-border)]"
      >
        <div className="max-w-md mx-auto space-y-4">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            Audio & Celebration Feedback
          </h2>
          <p className="text-xs sm:text-sm text-[var(--mk-text-muted)] leading-relaxed">
            Hợp âm Chime 3 nốt bằng Web Audio Oscillator và 2 đợt pháo hoa Confetti theo đúng tham số vàng.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <button
              onClick={handleCelebrateClick}
              className="px-6 py-3 rounded-xl text-xs font-mono font-bold bg-[var(--mk-primary)] text-black hover:opacity-95 transition-all cursor-pointer flex items-center gap-2 mk-press"
            >
              <HiSparkles />
              <span>Chime + Confetti (Two Waves)</span>
            </button>
            <button
              onClick={handleTapClick}
              className="px-6 py-3 rounded-xl text-xs font-mono border border-[var(--mk-border)] bg-[var(--mk-surface)] text-white hover:border-white transition-all cursor-pointer mk-press"
            >
              <span>Tap Sound (440Hz Triangle)</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MotionKitDemo;
