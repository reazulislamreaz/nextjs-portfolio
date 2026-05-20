"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiLoader } from "react-icons/fi";

interface ProjectCarouselProps {
  images: string[];
  title: string;
  priority?: boolean;
  className?: string;
  compact?: boolean;
}

function markSrcInCache(prev: Set<string>, src: string): Set<string> {
  if (prev.has(src)) return prev;
  const next = new Set(prev);
  next.add(src);
  return next;
}

export default function ProjectCarousel({
  images,
  title,
  priority = false,
  className = "aspect-[16/10]",
  compact = false,
}: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(() => new Set());

  const currentImage = images[currentIndex] ?? "";
  const isCurrentLoaded = currentImage ? loadedImages.has(currentImage) : false;

  const markLoaded = useCallback((src: string) => {
    setLoadedImages((prev) => markSrcInCache(prev, src));
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    setCurrentIndex(0);
    setLoadedImages(new Set());
  }, [images]);

  useEffect(() => {
    if (!images.length) return;

    let cancelled = false;

    for (const src of images) {
      const img = new window.Image();

      const handleReady = () => {
        if (cancelled) return;
        setLoadedImages((prev) => markSrcInCache(prev, src));
      };

      img.addEventListener("load", handleReady);
      img.addEventListener("error", handleReady);
      img.src = src;

      if (img.complete) {
        handleReady();
      }
    }

    return () => {
      cancelled = true;
    };
  }, [images]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (images.length <= 1 || reduceMotion) return;

    const interval = setInterval(() => {
      if (document.visibilityState !== "visible") return;
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length, reduceMotion]);

  const frameClass = compact
    ? "rounded-xl border border-zinc-800/80 bg-zinc-950/60 shadow-inner ring-1 ring-white/5"
    : "rounded-2xl border border-zinc-800/80 bg-zinc-950 shadow-lg shadow-black/30";

  const slideClass = compact
    ? "bg-gradient-to-b from-zinc-100 to-zinc-200/90"
    : "bg-zinc-950";

  const imageQuality = compact ? 92 : 88;
  const imageSizes = compact
    ? "(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 720px"
    : "(max-width: 768px) 100vw, (max-width: 1280px) min(92vw, 896px), 896px";

  const slideTransition = reduceMotion
    ? "transition-none"
    : "transition-opacity duration-500 ease-in-out";

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
      <div
        className={`relative w-full overflow-hidden ${frameClass} ${className}`}
        role="region"
        aria-roledescription="carousel"
        aria-label={`${title} screenshots`}
        aria-busy={!isCurrentLoaded}
      >
        <CarouselImageLoader
          show={!isCurrentLoaded}
          compact={compact}
          animate={!reduceMotion}
        />

        <div
          className={`absolute inset-0 flex items-center justify-center ${slideClass}`}
        >
          {images.map((src, idx) => {
            const isActive = idx === currentIndex;
            const isLoaded = loadedImages.has(src);

            return (
              <Image
                key={src}
                src={src}
                alt={
                  isActive
                    ? `${title} — screenshot ${idx + 1} of ${images.length}`
                    : ""
                }
                fill
                quality={imageQuality}
                sizes={imageSizes}
                priority={priority && idx === 0}
                aria-hidden={!isActive}
                onLoad={() => markLoaded(src)}
                className={`object-contain object-center p-2 sm:p-3 ${slideTransition} ${
                  isActive && isLoaded
                    ? "z-[2] opacity-100"
                    : "z-[1] opacity-0"
                }`}
              />
            );
          })}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevSlide}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full border border-white/10 bg-black/70 p-1.5 text-white backdrop-blur-sm transition hover:bg-black/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 sm:left-3 sm:p-2"
              aria-label={`Previous screenshot of ${title}`}
            >
              <FiChevronLeft size={16} aria-hidden />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full border border-white/10 bg-black/70 p-1.5 text-white backdrop-blur-sm transition hover:bg-black/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 sm:right-3 sm:p-2"
              aria-label={`Next screenshot of ${title}`}
            >
              <FiChevronRight size={16} aria-hidden />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <figcaption
          className={`flex justify-center gap-2 ${compact ? "mt-3" : "mt-4"}`}
        >
          {images.map((_, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                idx === currentIndex
                  ? "h-2 w-6 bg-emerald-500"
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

function CarouselImageLoader({
  show,
  compact,
  animate = true,
}: {
  show: boolean;
  compact: boolean;
  animate?: boolean;
}) {
  return (
    <div
      className={`absolute inset-0 z-[3] flex flex-col items-center justify-center gap-3 ${
        animate ? "transition-opacity duration-300 ease-out" : ""
      } ${show ? "opacity-100" : "pointer-events-none opacity-0"}`}
      aria-hidden={!show}
    >
      <div
        className={`absolute inset-0 animate-pulse ${
          compact
            ? "bg-gradient-to-b from-zinc-200/90 to-zinc-300/70"
            : "bg-zinc-900/90"
        }`}
      />
      <div className="relative flex flex-col items-center gap-2">
        <FiLoader
          size={28}
          className="animate-spin text-emerald-500/90"
          aria-hidden
        />
        <span
          className={`text-xs font-medium tracking-wide ${
            compact ? "text-zinc-600" : "text-zinc-500"
          }`}
        >
          Loading image…
        </span>
      </div>
    </div>
  );
}
