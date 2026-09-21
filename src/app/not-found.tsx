import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-[var(--nav-height)] text-center">
      <p className="type-eyebrow">404</p>
      <h1 className="type-section mt-3">Page not found</h1>
      <p className="type-body mt-4 max-w-md text-pretty">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to home
      </Link>
    </div>
  );
}
