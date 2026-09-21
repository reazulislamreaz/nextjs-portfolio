"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        mounted
          ? `Switch to ${isDark ? "light" : "dark"} mode`
          : "Toggle color theme"
      }
      className={`icon-btn ${className}`}
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        <FiSun
          size={16}
          aria-hidden
          className={`absolute transition-[opacity,transform] duration-200 ease-out ${
            mounted && !isDark
              ? "scale-75 opacity-0"
              : "scale-100 opacity-100"
          }`}
        />
        <FiMoon
          size={16}
          aria-hidden
          className={`absolute transition-[opacity,transform] duration-200 ease-out ${
            mounted && !isDark
              ? "scale-100 opacity-100"
              : "scale-75 opacity-0"
          }`}
        />
      </span>
    </button>
  );
}
