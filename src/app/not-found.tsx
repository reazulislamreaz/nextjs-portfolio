import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-emerald-500">404</p>
      <h1 className="mt-2 text-3xl font-bold text-zinc-50 sm:text-4xl">Page not found</h1>
      <p className="mt-4 max-w-md text-zinc-400">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-11 items-center rounded-xl bg-zinc-100 px-6 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-50"
      >
        Back to home
      </Link>
    </div>
  );
}
