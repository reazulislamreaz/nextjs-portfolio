"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface ProjectCarouselProps {
  images: string[];
  title: string;
  priority?: boolean;
  showThumbs?: boolean;
  /** Override responsive sizes (e.g. wider modal frames). */
  sizes?: string;
  /** Disable autoplay (e.g. inside a case-study modal). */
  autoplay?: boolean;
}

/** Stable frame — avoids decoding every slide just to measure natural size. */
const FRAME_RATIO = "16 / 10";

/** Match card/modal CSS width closely so Retina can pick a sharp srcset candidate. */
const DEFAULT_SIZES =
  "(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 3rem), (max-width: 1279px) 58vw, 800px";

export default function ProjectCarousel({
  images,
  title,
  priority = false,
  showThumbs = true,
  sizes = DEFAULT_SIZES,
  autoplay = true,
}: ProjectCarouselProps) {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const rootRef = useRef<HTMLElement>(null);
  const touchStartX = useRef<number | null>(null);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback(
    (next: number) => {
      if (!images.length) return;
      const normalized = (next + images.length) % images.length;
      setIndex((current) => {
        if (current === normalized) return current;
        setPrevIndex(current);
        return normalized;
      });
    },
    [images.length],
  );

  useEffect(() => {
    setIndex(0);
    setPrevIndex(null);
  }, [images]);

  useEffect(() => {
    if (prevIndex == null || reduceMotion) {
      setPrevIndex(null);
      return;
    }
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    fadeTimer.current = setTimeout(() => setPrevIndex(null), 320);
    return () => {
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
    };
  }, [index, prevIndex, reduceMotion]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (
      !autoplay ||
      images.length <= 1 ||
      reduceMotion ||
      paused ||
      !inView
    ) {
      return;
    }
    const timer = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      setIndex((prev) => {
        const next = (prev + 1) % images.length;
        setPrevIndex(prev);
        return next;
      });
    }, 7000);
    return () => window.clearInterval(timer);
  }, [autoplay, images.length, inView, paused, reduceMotion]);

  if (!images.length) {
    return (
      <div className="flex aspect-[2/1] w-full items-center justify-center bg-zinc-800 text-sm text-zinc-500">
        No preview available
      </div>
    );
  }

  const visibleIndexes = new Set<number>([index]);
  if (prevIndex != null && prevIndex !== index) visibleIndexes.add(prevIndex);
  if (images.length > 1) {
    visibleIndexes.add((index + 1) % images.length);
  }

  return (
    <figure
      ref={rootRef}
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="relative w-full overflow-hidden bg-zinc-800"
        style={{ aspectRatio: FRAME_RATIO }}
        role="region"
        aria-roledescription="carousel"
        aria-label={`${title} screenshots`}
        onTouchStart={(event) => {
          touchStartX.current = event.changedTouches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const start = touchStartX.current;
          const end = event.changedTouches[0]?.clientX;
          touchStartX.current = null;
          if (start == null || end == null || images.length < 2) return;
          const delta = end - start;
          if (Math.abs(delta) < 40) return;
          go(delta < 0 ? index + 1 : index - 1);
        }}
      >
        {[...visibleIndexes].map((imageIndex) => {
          const src = images[imageIndex];
          const active = imageIndex === index;
          return (
            <Image
              key={src}
              src={src}
              alt={
                active
                  ? `${title} — screenshot ${imageIndex + 1} of ${images.length}`
                  : ""
              }
              fill
              priority={priority && imageIndex === 0}
              quality={80}
              sizes={sizes}
              className={`object-contain object-center ${
                reduceMotion ? "" : "transition-opacity duration-300"
              } ${
                active
                  ? "z-[1] opacity-100"
                  : "pointer-events-none z-0 opacity-0"
              }`}
              aria-hidden={!active}
            />
          );
        })}

        {images.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="absolute left-3 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md bg-zinc-950/70 text-zinc-50 transition hover:bg-zinc-950"
              aria-label={`Previous screenshot of ${title}`}
            >
              <FiChevronLeft size={18} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="absolute right-3 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md bg-zinc-950/70 text-zinc-50 transition hover:bg-zinc-950"
              aria-label={`Next screenshot of ${title}`}
            >
              <FiChevronRight size={18} aria-hidden />
            </button>
          </>
        ) : null}
      </div>

      <p className="sr-only" aria-live="polite">
        Screenshot {index + 1} of {images.length}
      </p>

      {showThumbs && images.length > 1 ? (
        <div
          className="flex gap-2 overflow-x-auto px-3 py-3 sm:px-4"
          aria-label={`${title} screenshot thumbnails`}
        >
          {images.map((src, imageIndex) => {
            const active = imageIndex === index;
            return (
              <button
                key={src}
                type="button"
                onClick={() => go(imageIndex)}
                aria-label={`Show screenshot ${imageIndex + 1} of ${images.length}`}
                aria-current={active}
                className={`relative h-12 w-[4.75rem] shrink-0 overflow-hidden rounded-md border bg-zinc-800 transition sm:h-14 sm:w-[5.5rem] ${
                  active
                    ? "border-emerald-400"
                    : "border-zinc-700 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  quality={70}
                  sizes="(max-width: 639px) 76px, 88px"
                  loading="lazy"
                  className="object-contain"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </figure>
  );
}
