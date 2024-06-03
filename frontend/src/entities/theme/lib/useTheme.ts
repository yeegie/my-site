import { ThemeContext } from "../config/themeContext";
import { useContext } from "react";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within an ThemeProvider");
  }
  return context;
};
