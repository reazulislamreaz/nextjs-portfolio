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
      className={`relative inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.08] transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 ${className}`}
    >
      {/* Render a stable icon until mounted to avoid hydration mismatch */}
      {mounted && !isDark ? (
        <FiMoon size={15} className="transition-transform duration-300 rotate-0 hover:-rotate-12" aria-hidden />
      ) : (
        <FiSun size={15} className="transition-transform duration-300 rotate-0 hover:rotate-45 text-amber-400/90" aria-hidden />
      )}
    </button>
  );
}
