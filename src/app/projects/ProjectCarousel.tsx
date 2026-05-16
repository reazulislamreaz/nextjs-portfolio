"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface ProjectCarouselProps {
  images: string[];
  title: string;
  priority?: boolean;
  className?: string;
  compact?: boolean;
}

export default function ProjectCarousel({
  images,
  title,
  priority = false,
  className = "h-64 sm:h-80 md:h-96 lg:h-[500px]",
  compact = false,
}: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length]);

  const frameClass = compact
    ? "rounded-xl border border-zinc-700/50 bg-zinc-900/80 shadow-md ring-1 ring-white/5"
    : "rounded-2xl border border-zinc-800/80 bg-zinc-950 shadow-lg shadow-black/30 transition-transform duration-200 lg:hover:scale-[1.02]";

  const slideClass = compact
    ? "bg-gradient-to-b from-zinc-100 to-zinc-200/90"
    : "bg-zinc-950";

  if (!images.length) {
    return (
      <div
        className={`flex w-full items-center justify-center text-sm text-zinc-500 ${frameClass} ${className}`}
        role="img"
        aria-label="No project preview"
      >
        No preview available
      </div>
    );
  }

  return (
    <figure className="w-full">
      <div className={`relative w-full overflow-hidden ${frameClass} ${className}`}>
        <div
          className="flex h-full w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          aria-live="polite"
        >
          {images.map((img, idx) => (
            <div
              key={img}
              className={`relative h-full min-w-full w-full flex-shrink-0 ${slideClass}`}
            >
              <Image
                src={img}
                alt={`${title} — screenshot ${idx + 1} of ${images.length}`}
                fill
                quality={90}
                className="object-contain object-center p-3 sm:p-4"
                sizes={
                  compact
                    ? "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
                    : "(max-width: 1024px) 100vw, 50vw"
                }
                priority={priority && idx === 0}
                loading={priority && idx === 0 ? undefined : "lazy"}
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevSlide}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/70 p-1.5 text-white backdrop-blur-sm transition hover:bg-black/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 sm:left-3 sm:p-2"
              aria-label={`Previous screenshot of ${title}`}
            >
              <FiChevronLeft size={16} aria-hidden />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/70 p-1.5 text-white backdrop-blur-sm transition hover:bg-black/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 sm:right-3 sm:p-2"
              aria-label={`Next screenshot of ${title}`}
            >
              <FiChevronRight size={16} aria-hidden />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <figcaption className={`flex justify-center gap-2 ${compact ? "mt-3" : "mt-4"}`}>
          {images.map((_, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                idx === currentIndex
                  ? compact
                    ? "h-2 w-6 bg-emerald-400"
                    : "h-2 w-6 bg-emerald-400"
                  : "h-2 w-2 bg-zinc-600 hover:bg-zinc-500"
              }`}
              aria-label={`Show screenshot ${idx + 1} of ${images.length}`}
              aria-current={idx === currentIndex}
            />
          ))}
        </figcaption>
      )}
    </figure>
  );
}
