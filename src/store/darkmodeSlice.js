import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: "system",
  setTheme: (theme) => {
    set({ theme });
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: black)").matches ? "dark" : "light";
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(systemTheme);
    } else {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
    }
  },
}));
3