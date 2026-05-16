import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-800/50 bg-zinc-950/50 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-sm font-medium text-zinc-500">
            © {currentYear} <span className="text-zinc-300">Reazul Islam Reaz</span>. All rights
            reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <Link
              href="/#about"
              className="text-sm font-medium text-zinc-500 transition-colors hover:text-emerald-400"
            >
              About
            </Link>
            <Link
              href="/#system-architecture"
              className="text-sm font-medium text-zinc-500 transition-colors hover:text-emerald-400"
            >
              Architecture
            </Link>
            <Link
              href="/#skills"
              className="text-sm font-medium text-zinc-500 transition-colors hover:text-emerald-400"
            >
              Skills
            </Link>
            <Link
              href="/#ai-workflow"
              className="text-sm font-medium text-zinc-500 transition-colors hover:text-emerald-400"
            >
              Workflow
            </Link>
            <Link
              href="/#projects"
              className="text-sm font-medium text-zinc-500 transition-colors hover:text-emerald-400"
            >
              Projects
            </Link>
            <Link
              href="/#contact"
              className="text-sm font-medium text-zinc-500 transition-colors hover:text-emerald-400"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
