import { useEffect } from "react";

export default function ThemeProvider({ children }) {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    let dark;

    if (savedTheme) {
      dark = savedTheme === "dark";
    } else {
      dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    document.documentElement.classList.toggle("dark", dark);
  }, []);

  return children;
}