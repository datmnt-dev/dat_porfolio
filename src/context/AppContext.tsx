import { createContext } from "react";
import type { AppContextType } from "../types/AppContext";

export const AppContext = createContext<AppContextType>({
  theme: "dark",
  switchTheme: () => {},
  accent: "cyan",
  setAccent: () => {},
});
