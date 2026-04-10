import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";

import { useTheme } from "@repo/ui/components/theme";
import { cn } from "@repo/ui/lib/utils";

type ThemeMode = "light" | "dark" | "auto";

const options: { icon: LucideIcon; value: ThemeMode }[] = [
  { value: "light", icon: SunIcon },
  { value: "auto", icon: MonitorIcon },
  { value: "dark", icon: MoonIcon },
];

export function ThemeSwitcher() {
  const { themeMode, setTheme } = useTheme();

  return (
    <div
      onClick={(e) => e.stopPropagation()} // 🔥 fixes your GitHub bug
      className="bg-muted flex w-[180px] items-center justify-between rounded-full border p-1"
    >
      <div className="relative flex w-full">
        {options.map((item) => {
          const Icon = item.icon;
          const isActive = themeMode === item.value;

          return (
            <button
              key={item.value}
              onClick={() => setTheme(item.value)}
              className="relative z-10 flex flex-1 items-center justify-center py-1.5"
            >
              {/* Animated pill */}
              {isActive && (
                <motion.div
                  layoutId="theme-pill"
                  className="bg-primary absolute inset-0 rounded-full"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                />
              )}

              <Icon
                className={cn(
                  "relative z-10 h-4 w-4 transition",
                  isActive ? "text-white" : "text-muted-foreground",
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
