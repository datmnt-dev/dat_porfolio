import React, { useEffect, useRef, useContext } from "react";
import { AppContext } from "../context/AppContext";

interface MatrixRainProps {
  onClose: () => void;
}

const MatrixRain: React.FC<MatrixRainProps> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { accent } = useContext(AppContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Characters
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>[]{}+-*///&^%$#@!日本語";
    const charArr = chars.split("");

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Drops position
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; // staggered entry
    }

    // Color based on active accent
    let rainColor = "#06b6d4"; // cyan default
    if (accent === "green") rainColor = "#10b981";
    if (accent === "purple") rainColor = "#8b5cf6";
    if (accent === "amber") rainColor = "#f59e0b";

    const draw = () => {
      // Semi-transparent black background to create trails
      ctx.fillStyle = "rgba(3, 7, 18, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = rainColor;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArr[Math.floor(Math.random() * charArr.length)];
        
        // Randomly draw some characters as white for glowing effect
        if (Math.random() > 0.98) {
          ctx.fillStyle = "#ffffff";
        } else {
          ctx.fillStyle = rainColor;
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    // Escape listener to close
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, accent]);

  return (
    <div className="fixed inset-0 z-[100] cursor-pointer" onClick={onClose} title="Click or press ESC to exit Matrix Mode">
      <canvas ref={canvasRef} className="block w-full h-full" />
      <div className="absolute top-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full border bg-black/80 border-cyan-500/30 text-white/70 text-xs font-mono select-none pointer-events-none animate-pulse">
        [ MATRIX ACTIVE - CLICK CANVAS OR PRESS ESC TO DEACTIVATE ]
      </div>
    </div>
  );
};

export default MatrixRain;
