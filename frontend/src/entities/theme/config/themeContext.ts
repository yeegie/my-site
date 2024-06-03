import { Themes } from "@/shared/types";
import { createContext } from "react";

export type ThemeContextType = {
  theme: Themes;
  setTheme: (theme: Themes) => void;
  toggle: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const LOCAL_STORAGE_THEME_KEY = "theme";

export const defaultTheme = Themes.LIGHT;
