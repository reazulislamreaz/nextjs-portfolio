interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-10 px-1 text-center sm:mb-12 lg:mb-16">
      <h2 className="relative mb-3 inline-block max-w-full text-2xl font-black tracking-tight sm:mb-4 sm:text-3xl lg:text-5xl">
        <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
          {title}
        </span>
        {/* Unified Emerald underline */}
        <div className="absolute -bottom-2 left-1/2 h-[2px] w-1/3 min-w-[4rem] -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
      </h2>

      {subtitle && (
        <p className="mx-auto mt-3 max-w-2xl px-2 text-sm font-light leading-relaxed text-zinc-400 sm:mt-4 sm:text-base lg:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
