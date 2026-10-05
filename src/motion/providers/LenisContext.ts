import { createContext } from "react";
import type Lenis from "lenis";

export interface LenisContextValue {
  lenis: Lenis | null;
  scrollTo: (
    target: string | number | HTMLElement,
    options?: {
      offset?: number;
      duration?: number;
      immediate?: boolean;
      lock?: boolean;
      onComplete?: () => void;
    }
  ) => void;
}

export const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollTo: () => {},
});
