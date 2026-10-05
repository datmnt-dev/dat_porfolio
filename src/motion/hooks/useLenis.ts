import { useContext } from "react";
import { LenisContext, type LenisContextValue } from "../providers/LenisContext";

export function useLenis(): LenisContextValue {
  return useContext(LenisContext);
}
