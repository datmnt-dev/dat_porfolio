import React from "react";

const PageLoader: React.FC = () => {
  return (
    <div
      className="min-h-[50vh] w-full flex flex-col items-center justify-center gap-3 text-center px-4 animate-fade-in"
      role="status"
      aria-label="Loading page content"
    >
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 rounded-full border-2 border-[var(--color-border)] opacity-30" />
        <div className="absolute inset-0 rounded-full border-2 border-t-[var(--color-accent)] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
      </div>
      <span className="font-code text-[11px] text-[var(--color-subtext)] tracking-widest uppercase">
        Loading...
      </span>
    </div>
  );
};

export default PageLoader;
