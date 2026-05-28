export type AccentTheme = "cyan" | "green" | "purple" | "amber";

export interface AppContextType {
  theme: "light" | "dark";
  switchTheme: () => void;
  accent: AccentTheme;
  setAccent: (accent: AccentTheme) => void;
}