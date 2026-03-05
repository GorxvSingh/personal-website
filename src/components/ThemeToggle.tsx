"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  if (!mounted) {
    return <div className="h-[21px] w-[42px]" />;
  }

  return (
    <button
      onClick={toggle}
      role="switch"
      aria-checked={dark}
      aria-label="Toggle dark mode"
      className="relative h-[21px] w-[42px] shrink-0 cursor-pointer overflow-hidden rounded-full transition-all duration-300"
      style={{
        background: dark
          ? "linear-gradient(135deg, #0d1b2a, #1b2838)"
          : "linear-gradient(135deg, #87CEEB, #60B0D8)",
      }}
    >
      {/* Stars (dark mode) */}
      <span
        className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${dark ? "opacity-100" : "opacity-0"}`}
      >
        <span className="absolute top-[4px] left-[5px] h-[2px] w-[2px] rounded-full bg-white" />
        <span className="absolute top-[12px] left-[10px] h-[1.5px] w-[1.5px] rounded-full bg-white/80" />
        <span className="absolute top-[7px] left-[16px] h-[2px] w-[2px] rounded-full bg-white" />
        <span className="absolute top-[15px] left-[6px] h-[1.5px] w-[1.5px] rounded-full bg-white/60" />
      </span>

      {/* Clouds (light mode) */}
      <span
        className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${dark ? "opacity-0" : "opacity-100"}`}
      >
        <span className="absolute top-[6px] right-[5px] h-[5px] w-[8px] rounded-full bg-white/80" />
        <span className="absolute top-[11px] right-[9px] h-[4px] w-[6px] rounded-full bg-white/60" />
      </span>

      {/* Sun / Moon knob */}
      <span
        className={`absolute top-[2px] left-[2px] h-[17px] w-[17px] rounded-full transition-all duration-300 ${
          dark
            ? "translate-x-[21px] bg-[#E8E0D0] shadow-[0_0_4px_rgba(232,224,208,0.4)]"
            : "translate-x-0 bg-[#FFD700] shadow-[0_0_6px_rgba(255,215,0,0.5)]"
        }`}
      >
        {/* Moon craters */}
        {dark && (
          <>
            <span className="absolute top-[4px] left-[4px] h-[3px] w-[3px] rounded-full bg-[#D4C8B0]/50" />
            <span className="absolute top-[9px] left-[8px] h-[2px] w-[2px] rounded-full bg-[#D4C8B0]/40" />
          </>
        )}
      </span>
    </button>
  );
}
