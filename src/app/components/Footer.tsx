import Link from "next/link";
import { navLinks } from "@/config/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerLinks = navLinks.filter((link) => link.sectionId);

  return (
    <footer className="w-full border-t border-zinc-800/50 bg-zinc-950/50 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 py-8 md:flex-row">
          <p className="text-sm font-medium text-zinc-500">
            © {currentYear} <span className="text-zinc-300">Reazul Islam Reaz</span>. All
            rights reserved.
          </p>

          <nav
            className="flex flex-wrap items-center justify-center gap-6 md:gap-8"
            aria-label="Footer"
          >
            {footerLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-zinc-500 transition-colors hover:text-emerald-400"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
