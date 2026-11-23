import React, { useState, useEffect } from "react";
import { AppContext } from "./AppContext";
import type { AppContextType, AccentTheme } from "../types/AppContext";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return (localStorage.getItem("theme") as "light" | "dark") || "dark";
  });

  const [accent, setAccentState] = useState<AccentTheme>(() => {
    return (localStorage.getItem("accent") as AccentTheme) || "cyan";
  });

  const [customCursor, setCustomCursor] = useState<boolean>(() => {
    const saved = localStorage.getItem("custom_cursor");
    return saved === null ? true : saved === "true";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("accent-cyan", "accent-green", "accent-purple", "accent-amber");
    root.classList.add(`accent-${accent}`);
  }, [accent]);

  const switchTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      return next;
    });
  };

  const setAccent = (newAccent: AccentTheme) => {
    localStorage.setItem("accent", newAccent);
    setAccentState(newAccent);
  };

  const toggleCustomCursor = () => {
    setCustomCursor((prev) => {
      const next = !prev;
      localStorage.setItem("custom_cursor", String(next));
      return next;
    });
  };

  const contextValue: AppContextType = {
    theme,
    switchTheme,
    accent,
    setAccent,
    customCursor,
    toggleCustomCursor,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
