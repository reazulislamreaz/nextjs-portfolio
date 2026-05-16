"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { HiMenu, HiX } from "react-icons/hi";

interface NavLink {
  href: string;
  label: string;
}

const links: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#system-architecture", label: "Architecture" },
  { href: "/#skills", label: "Skills" },
  { href: "/#ai-workflow", label: "Workflow" },
  { href: "/#education", label: "Education" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-zinc-950/70 backdrop-blur-xl border-b border-zinc-800/50 top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 md:px-20">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold group">
              <div className="relative w-14 h-14 transition-transform duration-300 group-hover:scale-102">
                {/* Placeholder logo with gradient border */}
                <div className="w-full h-full rounded-full bg-gradient-to-r from-zinc-600 to-zinc-800 p-1">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <span className="text-white font-bold text-lg">R</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {links.map(({ href, label }) => {
              const isActive =
                label === "Home"
                  ? pathname === "/"
                  : pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-2 font-medium text-sm transition-all duration-300 rounded-lg ${
                    isActive
                      ? "text-emerald-400 bg-emerald-500/10"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/50 hover:shadow-sm"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-4">
            {/* Resume */}
            <a
              href="/Reazul_Islam_Reaz_Resume.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:block "
            >
              <button className="px-5 py-2.5 rounded-lg cursor-pointer bg-zinc-100 text-zinc-900 font-semibold hover:bg-white hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 text-sm">
                Resume
              </button>
            </a>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-300 backdrop-blur-sm"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-zinc-950 border-t border-zinc-900 shadow-2xl relative z-50">
          <div className="px-4 pt-4 pb-6 space-y-1">
            {links.map(({ href, label }) => {
              const isActive =
                label === "Home"
                  ? pathname === "/"
                  : pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`block px-4 py-3 font-medium transition-all duration-300 rounded-lg ${
                    isActive
                      ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900 hover:border hover:border-zinc-800"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              );
            })}
            
            <a
              href="/Reazul_Islam_Reaz_Resume.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4"
            >
              <button className="w-full px-5 py-3 rounded-lg bg-zinc-100 text-zinc-900 font-semibold hover:bg-white transition-all duration-300 text-sm">
                Download Resume
              </button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
