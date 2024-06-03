import { useState } from "react";
import { Themes } from "@shared/types";

import { ThemeProviderProps } from "./themeProvider.props";

import {
  ThemeContext,
  LOCAL_STORAGE_THEME_KEY,
  defaultTheme,
} from "../config/themeContext";

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme);

  const toggle = () => {
    const newTheme = theme == Themes.DARK ? Themes.LIGHT : Themes.DARK;
    setTheme(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggle,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
