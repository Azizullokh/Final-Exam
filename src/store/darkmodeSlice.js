import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: "light",
  setTheme: (theme) => {
    set({ theme });
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  },
}));
