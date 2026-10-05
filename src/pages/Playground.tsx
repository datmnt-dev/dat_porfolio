import React, { useState, useEffect, useRef, useContext } from "react";
import { FaTerminal, FaPlay, FaSearch, FaPalette, FaKeyboard, FaEyeDropper } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import user_info from "../data/userdata";
import PageHero from "../components/ui/PageHero";
import { AppContext } from "../context/AppContext";
import type { AccentTheme } from "../types/AppContext";

// Retro Snake Game Component
const SnakeGameModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem("snake_high_score") || "0");
  });
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Refs for game state to avoid closure issues in loops
  const snakeRef = useRef<{ x: number; y: number }[]>([{ x: 10, y: 10 }]);
  const foodRef = useRef<{ x: number; y: number }>({ x: 5, y: 5 });
  const dirRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const nextDirRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const gridSize = 20;
  const tileCount = 20;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(e.key)) {
        setGameStarted(true);
      }

      const currentDir = dirRef.current;
      switch (e.key.toLowerCase()) {
        case "arrowup":
        case "w":
          if (currentDir.y === 0) nextDirRef.current = { x: 0, y: -1 };
          break;
        case "arrowdown":
        case "s":
          if (currentDir.y === 0) nextDirRef.current = { x: 0, y: 1 };
          break;
        case "arrowleft":
        case "a":
          if (currentDir.x === 0) nextDirRef.current = { x: -1, y: 0 };
          break;
        case "arrowright":
        case "d":
          if (currentDir.x === 0) nextDirRef.current = { x: 1, y: 0 };
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, gameStarted]);

  // Game Loop
  useEffect(() => {
    if (!isOpen || gameOver || !gameStarted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const interval = setInterval(() => {
      dirRef.current = nextDirRef.current;
      const dir = dirRef.current;

      const newHead = {
        x: snakeRef.current[0].x + dir.x,
        y: snakeRef.current[0].y + dir.y,
      };

      // Wrap-around grid collision
      if (newHead.x < 0) newHead.x = tileCount - 1;
      if (newHead.x >= tileCount) newHead.x = 0;
      if (newHead.y < 0) newHead.y = tileCount - 1;
      if (newHead.y >= tileCount) newHead.y = 0;

      // Self collision check
      const selfCollision = snakeRef.current.some(
        (segment, idx) => idx > 0 && segment.x === newHead.x && segment.y === newHead.y
      );

      if (selfCollision) {
        setGameOver(true);
        if (score > highScore) {
          setHighScore(score);
          localStorage.setItem("snake_high_score", score.toString());
        }
        clearInterval(interval);
        return;
      }

      snakeRef.current.unshift(newHead);

      // Check if food eaten
      if (newHead.x === foodRef.current.x && newHead.y === foodRef.current.y) {
        setScore((s) => s + 1);
        let newFood: { x: number; y: number };
        do {
          newFood = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount),
          };
        } while (
          snakeRef.current.some((seg) => seg.x === newFood.x && seg.y === newFood.y)
        );
        foodRef.current = newFood;
      } else {
        snakeRef.current.pop();
      }

      draw();
    }, 110);

    const draw = () => {
      ctx.fillStyle = "#05070c";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "rgba(148, 163, 184, 0.05)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
      }

      // Draw food
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      const foodX = foodRef.current.x * gridSize + gridSize / 2;
      const foodY = foodRef.current.y * gridSize + gridSize / 2;
      ctx.arc(foodX, foodY, gridSize / 2 - 2, 0, Math.PI * 2);
      ctx.fill();

      // Draw snake
      snakeRef.current.forEach((segment, idx) => {
        ctx.fillStyle = idx === 0 ? "var(--color-accent)" : "rgba(6, 182, 212, 0.6)";
        ctx.strokeStyle = "#05070c";
        ctx.lineWidth = 1;
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        ctx.strokeRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
      });
    };

    draw();

    return () => clearInterval(interval);
  }, [isOpen, gameOver, gameStarted, score, highScore]);

  const handleReset = () => {
    snakeRef.current = [{ x: 10, y: 10 }];
    foodRef.current = { x: 5, y: 5 };
    dirRef.current = { x: 0, y: 0 };
    nextDirRef.current = { x: 0, y: 0 };
    setScore(0);
    setGameOver(false);
    setGameStarted(false);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#05070c";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.arc(5 * gridSize + gridSize / 2, 5 * gridSize + gridSize / 2, gridSize / 2 - 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "var(--color-accent)";
        ctx.fillRect(10 * gridSize, 10 * gridSize, gridSize, gridSize);
      }
    }
  };

  const handleMobileControl = (direction: string) => {
    if (!gameStarted) setGameStarted(true);
    const currentDir = dirRef.current;
    switch (direction) {
      case "up":
        if (currentDir.y === 0) nextDirRef.current = { x: 0, y: -1 };
        break;
      case "down":
        if (currentDir.y === 0) nextDirRef.current = { x: 0, y: 1 };
        break;
      case "left":
        if (currentDir.x === 0) nextDirRef.current = { x: -1, y: 0 };
        break;
      case "right":
        if (currentDir.x === 0) nextDirRef.current = { x: 1, y: 0 };
        break;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#0a0f1d] border border-zinc-800 rounded-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-5 py-4 bg-[#111827] border-b border-zinc-800 select-none">
          <span className="font-mono text-xs text-[var(--color-accent)] flex items-center gap-1.5">
            <FaTerminal /> SNAKE_GAME.EXE
          </span>
          <button onClick={onClose} className="text-zinc-500 hover:text-white font-mono text-xs cursor-pointer">
            [ESC] Close
          </button>
        </div>

        {/* Display panel */}
        <div className="p-4 flex items-center justify-between border-b border-zinc-800/60 font-mono text-xs">
          <span>Score: <strong className="text-white">{score}</strong></span>
          <span>High Score: <strong className="text-[var(--color-accent)]">{highScore}</strong></span>
        </div>

        {/* Game screen area */}
        <div className="relative bg-[#05070c] grid place-items-center p-4">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="border border-zinc-800 rounded-lg shadow-inner max-w-full aspect-square"
          />

          {/* Overlays */}
          {!gameStarted && !gameOver && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center font-mono text-xs p-5 select-none pointer-events-none">
              <p className="text-white font-bold mb-2">SNAKE GAME RETRO</p>
              <p className="text-[var(--color-subtext)]">Press arrow keys or WASD to start.</p>
              <p className="text-zinc-500 text-[10px] mt-4">Personal High Score: {highScore}</p>
            </div>
          )}

          {gameOver && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center font-mono text-xs p-5 select-none">
              <p className="text-red-500 font-bold mb-2">GAME OVER</p>
              <p className="text-white">Score reached: {score}</p>
              <button
                onClick={handleReset}
                className="mt-4 px-4 py-2 bg-[var(--color-accent)] text-white font-bold rounded-lg cursor-pointer transition"
              >
                Play Again
              </button>
            </div>
          )}
        </div>

        {/* Virtual mobile controls */}
        <div className="p-4 bg-[#111827] border-t border-zinc-800 flex flex-col items-center select-none gap-1 sm:hidden">
          <button
            onClick={() => handleMobileControl("up")}
            className="w-12 h-10 bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-white rounded-lg flex items-center justify-center font-bold"
          >
            ▲
          </button>
          <div className="flex gap-4">
            <button
              onClick={() => handleMobileControl("left")}
              className="w-12 h-10 bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-white rounded-lg flex items-center justify-center font-bold"
            >
              ◀
            </button>
            <div className="w-12" />
            <button
              onClick={() => handleMobileControl("right")}
              className="w-12 h-10 bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-white rounded-lg flex items-center justify-center font-bold"
            >
              ▶
            </button>
          </div>
          <button
            onClick={() => handleMobileControl("down")}
            className="w-12 h-10 bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-white rounded-lg flex items-center justify-center font-bold"
          >
            ▼
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Playground component
const Playground = () => {
  const { accent, setAccent } = useContext(AppContext);
  const [isSnakeOpen, setIsSnakeOpen] = useState(false);
  const [hexColor, setHexColor] = useState("#06b6d4");

  // Typewriter effect state
  const [roleText, setRoleText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const roles = user_info.main.roles;

  useEffect(() => {
    const current = roles[roleIdx];
    const t = setTimeout(
      () => {
        if (!isDeleting) {
          if (roleText.length < current.length) {
            setRoleText(current.slice(0, roleText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (roleText.length > 0) {
            setRoleText(current.slice(0, roleText.length - 1));
          } else {
            setIsDeleting(false);
            setRoleIdx((p) => (p + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 75
    );
    return () => clearTimeout(t);
  }, [roleText, isDeleting, roleIdx, roles]);

  const triggerMatrixRain = () => {
    window.dispatchEvent(new CustomEvent("activate-matrix-rain"));
  };

  const triggerCommandPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  // Hex conversion helpers
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) || 0;
    const g = parseInt(hex.slice(3, 5), 16) || 0;
    const b = parseInt(hex.slice(5, 7), 16) || 0;
    return `rgb(${r}, ${g}, ${b})`;
  };

  const hexToHsl = (hex: string) => {
    let r = parseInt(hex.slice(1, 3), 16) || 0;
    let g = parseInt(hex.slice(3, 5), 16) || 0;
    let b = parseInt(hex.slice(5, 7), 16) || 0;
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return `hsl(${Math.round(h * 360)}°, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  return (
    <div>
      <PageHero
        eyebrow="Interactive Lab"
        title={
          <>
            Browser experiments & <span className="text-[var(--color-accent)]">prototypes</span>
          </>
        }
        subtitle="A secondary sandbox for small browser experiments, Canvas API interactions, and custom UI primitives built into this portfolio."
      />

      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Matrix Rain */}
          <div className="card-surface p-6 flex flex-col justify-between h-full">
            <div>
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 grid place-items-center text-sm mb-4 border border-emerald-500/20">
                <FaTerminal />
              </div>
              <h3 className="font-display font-semibold text-base mb-2">Matrix Rain Easter Egg</h3>
              <p className="text-xs text-[var(--color-subtext)] leading-relaxed font-sans">
                Full-screen falling katakana stream rendered with pure HTML5 2D Canvas. Press Ctrl+K and search &quot;matrix&quot;, or launch directly below.
              </p>
            </div>
            <button
              onClick={triggerMatrixRain}
              className="btn-ghost mt-6 w-full justify-center text-xs font-mono"
            >
              Launch Matrix Rain
            </button>
          </div>

          {/* Card 2: Command Palette */}
          <div className="card-surface p-6 flex flex-col justify-between h-full">
            <div>
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 grid place-items-center text-sm mb-4 border border-cyan-500/20">
                <FaSearch />
              </div>
              <h3 className="font-display font-semibold text-base mb-2">Command Palette Controller</h3>
              <p className="text-xs text-[var(--color-subtext)] leading-relaxed font-sans">
                Fast keyboard-first navigation with action triggers, routing fuzzy search, and accent controls. Accessible anywhere with Ctrl + K.
              </p>
            </div>
            <button
              onClick={triggerCommandPalette}
              className="btn-ghost mt-6 w-full justify-center text-xs font-mono"
            >
              Open Command Palette (Ctrl+K)
            </button>
          </div>

          {/* Card 3: Live Accent Themer */}
          <div className="card-surface p-6 flex flex-col justify-between h-full">
            <div>
              <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 grid place-items-center text-sm mb-4 border border-purple-500/20">
                <FaPalette />
              </div>
              <h3 className="font-display font-semibold text-base mb-2">Live Accent Themer</h3>
              <p className="text-xs text-[var(--color-subtext)] leading-relaxed font-sans">
                Interactive theme selector dynamically syncing 4 color presets across CSS custom variables with persistent local storage.
              </p>
              
              {/* Mini Color Picker Widget */}
              <div className="mt-4 flex items-center gap-2 select-none">
                {(["cyan", "green", "purple", "amber"] as AccentTheme[]).map((c) => {
                  const bg =
                    c === "cyan"
                      ? "bg-cyan-500"
                      : c === "green"
                        ? "bg-emerald-500"
                        : c === "purple"
                          ? "bg-purple-500"
                          : "bg-amber-500";
                  return (
                    <button
                      key={c}
                      onClick={() => setAccent(c)}
                      className={`flex-1 h-7 rounded-lg ${bg} transition-all cursor-pointer ${
                        accent === c ? "ring-2 ring-offset-2 ring-offset-[var(--color-bg)] ring-[var(--color-accent)] scale-105" : "opacity-80 hover:opacity-100"
                      }`}
                      title={c}
                    />
                  );
                })}
              </div>
            </div>
            <div className="mt-6 text-[11px] text-center font-mono text-[var(--color-accent)]">
              active: {accent}
            </div>
          </div>

          {/* Card 4: Typewriter Roles */}
          <div className="card-surface p-6 flex flex-col justify-between h-full">
            <div>
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 grid place-items-center text-sm mb-4 border border-amber-500/20">
                <FaKeyboard />
              </div>
              <h3 className="font-display font-semibold text-base mb-2">Typewriter Hook Sandbox</h3>
              <p className="text-xs text-[var(--color-subtext)] leading-relaxed font-sans">
                Custom zero-dependency character sequencer hook demonstrating recursive timeout state management and string slicing.
              </p>
              
              {/* Typewriter Demo Display */}
              <div className="mt-4 p-3 rounded-lg bg-[var(--color-bg-component)] border border-[var(--color-border)] font-mono text-xs flex items-center min-h-[36px]">
                <span className="text-[var(--color-accent)] mr-2">&gt;</span>
                <span className="text-[var(--color-text)]">{roleText}</span>
                <span className="inline-block w-1.5 h-4 ml-0.5 bg-[var(--color-accent)] animate-pulse" />
              </div>
            </div>
            <div className="mt-6 text-[10px] text-center font-mono text-[var(--color-subtext)]">
              Isolated hook prototype
            </div>
          </div>

          {/* Card 5: Hex Color Convertor */}
          <div className="card-surface p-6 flex flex-col justify-between h-full">
            <div>
              <div className="w-9 h-9 rounded-lg bg-pink-500/10 text-pink-400 grid place-items-center text-sm mb-4 border border-pink-500/20">
                <FaEyeDropper />
              </div>
              <h3 className="font-display font-semibold text-base mb-2">Color Space Math</h3>
              <p className="text-xs text-[var(--color-subtext)] leading-relaxed font-sans">
                Real-time color calculation transforming hex color inputs into RGB channel tuples and cylindrical HSL coordinates.
              </p>

              {/* Live Picker display */}
              <div className="mt-4 flex gap-3 items-center">
                <input
                  type="color"
                  value={hexColor}
                  onChange={(e) => setHexColor(e.target.value)}
                  className="w-10 h-10 border-0 rounded-lg cursor-pointer bg-transparent"
                />
                <div className="font-mono text-[10px] space-y-1">
                  <div>Hex: <span className="font-semibold text-[var(--color-text)]">{hexColor.toUpperCase()}</span></div>
                  <div className="text-[var(--color-subtext)]">RGB: {hexToRgb(hexColor)}</div>
                  <div className="text-[var(--color-subtext)]">HSL: {hexToHsl(hexColor)}</div>
                </div>
              </div>
            </div>
            <div className="mt-6 text-[10px] text-center font-mono text-[var(--color-subtext)]">
              Client-side color calculations
            </div>
          </div>

          {/* Card 6: Snake Game Retro */}
          <div className="card-surface p-6 flex flex-col justify-between h-full">
            <div>
              <div className="w-9 h-9 rounded-lg bg-[var(--color-accent-soft)] text-[var(--color-accent)] grid place-items-center text-sm mb-4 border border-[var(--color-accent)]/20">
                <HiSparkles />
              </div>
              <h3 className="font-display font-semibold text-base mb-2">Retro Snake Engine</h3>
              <p className="text-xs text-[var(--color-subtext)] leading-relaxed font-sans">
                A 20x20 cell retro snake game implemented with pure 2D Canvas rendering, wrap-around grid boundary math, and high score caching.
              </p>
            </div>
            <button
              onClick={() => setIsSnakeOpen(true)}
              className="btn-primary mt-6 w-full justify-center text-xs font-mono flex items-center gap-2"
            >
              <FaPlay size={10} />
              <span>Launch Snake Sandbox</span>
            </button>
          </div>

        </div>
      </section>

      {/* Snake Game Modal rendering */}
      <SnakeGameModal isOpen={isSnakeOpen} onClose={() => setIsSnakeOpen(false)} />
    </div>
  );
};

export default Playground;
