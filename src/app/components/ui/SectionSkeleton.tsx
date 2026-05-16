export default function SectionSkeleton() {
  return (
    <div
      className="mx-auto max-w-7xl animate-pulse px-4 py-16 sm:px-6 lg:px-8"
      aria-hidden
    >
      <div className="mx-auto mb-10 h-10 w-48 rounded-lg bg-zinc-800/80" />
      <div className="mx-auto mb-4 h-4 w-full max-w-xl rounded bg-zinc-800/60" />
      <div className="mx-auto h-4 w-full max-w-md rounded bg-zinc-800/40" />
    </div>
  );
}
