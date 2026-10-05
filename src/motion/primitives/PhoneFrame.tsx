import React from "react";

export interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
  notch?: boolean;
  statusTime?: string;
  cameraLens?: boolean;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  className = "",
  notch = true,
  statusTime = "9:41",
  cameraLens = true,
}) => {
  return (
    <div
      className={`relative mx-auto w-[280px] sm:w-[320px] aspect-[9/19] rounded-[44px] p-3.5 bg-[#171922] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.12),inset_0_0_0_2px_#090a0f] ${className}`}
    >
      {/* Side buttons */}
      <div className="absolute -left-[3px] top-24 w-[3px] h-8 bg-zinc-700 rounded-l-sm" />
      <div className="absolute -left-[3px] top-36 w-[3px] h-12 bg-zinc-700 rounded-l-sm" />
      <div className="absolute -right-[3px] top-28 w-[3px] h-14 bg-zinc-700 rounded-r-sm" />

      {/* Screen container */}
      <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-[var(--mk-canvas)] border border-white/5 flex flex-col">
        {/* Dynamic Island / Notch */}
        {notch && (
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-between px-3 h-5 w-24 bg-black rounded-full shadow-sm">
            {cameraLens && (
              <div className="w-2.5 h-2.5 rounded-full bg-[#11131c] ring-1 ring-white/10 ml-0.5" />
            )}
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 mr-0.5" />
          </div>
        )}

        {/* Status bar */}
        <div className="pt-2 px-5 pb-1 flex items-center justify-between text-[10px] font-medium text-white/70 select-none z-20">
          <span>{statusTime}</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2 border border-current rounded-xs inline-block" />
            <span className="w-2 h-2 rounded-full bg-current inline-block" />
          </div>
        </div>

        {/* Content viewport */}
        <div className="relative flex-1 overflow-auto">{children}</div>

        {/* Bottom home indicator */}
        <div className="py-1.5 flex justify-center z-20">
          <div className="w-28 h-1 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  );
};
