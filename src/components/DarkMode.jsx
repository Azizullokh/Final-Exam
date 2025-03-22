import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useApplyTheme, useThemeStore } from "../store/darkmodeSlice";
import { Moon, Sun } from "lucide-react";
import { clsx } from "clsx";

const themes = [
  { label: "Light", value: "light", icon: <Sun className="w-5 h-5" /> },
  { label: "Dark", value: "dark", icon: <Moon className="w-5 h-5" /> },
];

export default function DarkModeToggle() {
  const { theme, setTheme } = useThemeStore();
  useApplyTheme();
  return (
    <div className="z-10">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800">
            {themes.find((t) => t.value === theme)?.icon}
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="bg-white dark:bg-gray-900 border rounded-md shadow-lg p-2 w-36">
          {themes.map((t) => (
            <DropdownMenu.Item
              key={t.value}
              onClick={() => setTheme(t.value)}
              className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer",
                theme === t.value
                  ? "bg-gray-300 dark:bg-gray-700"
                  : "hover:bg-gray-200 dark:hover:bg-gray-800"
              )}
            >
              {t.icon}
              {t.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
