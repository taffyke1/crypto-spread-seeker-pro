
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Set up a listener for system theme changes and persist to localStorage
  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "system";
    document.documentElement.classList.toggle("dark", 
      savedTheme === "dark" || 
      (savedTheme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (localStorage.getItem("theme") === "system") {
        document.documentElement.classList.toggle("dark", mediaQuery.matches);
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
