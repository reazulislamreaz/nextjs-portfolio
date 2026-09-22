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

/**
 * Match card CSS width (Section max-w-7xl × lg:col-span-7) so the browser
 * picks a sharp Retina candidate without overshooting to full-bleed widths.
 */
const DEFAULT_SIZES =
  "(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 3rem), (max-width: 1279px) 560px, 700px";

/** Start decoding before the card enters the viewport (after Hero LCP). */
const NEAR_VIEW_MARGIN = "560px 0px";
const NEAR_VIEW_PX = 560;

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
  const [nearView, setNearView] = useState(priority);
  const [inView, setInView] = useState(false);
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
    if (!root || typeof IntersectionObserver === "undefined") {
      setNearView(true);
      setInView(true);
      return;
    }

    const syncFromRect = () => {
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top < vh + NEAR_VIEW_PX && rect.bottom > -NEAR_VIEW_PX) {
        setNearView(true);
      }
      setInView(rect.top < vh * 0.85 && rect.bottom > vh * 0.15);
    };
    syncFromRect();

    const nearObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNearView(true);
      },
      { rootMargin: NEAR_VIEW_MARGIN, threshold: 0 },
    );

    const viewObserver = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );

    nearObserver.observe(root);
    viewObserver.observe(root);
    return () => {
      nearObserver.disconnect();
      viewObserver.disconnect();
    };
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

  const shouldLoad = priority || nearView;

  /** Current (+ fading previous). Prefetch next only while the carousel is on-screen. */
  const visibleIndexes = new Set<number>();
  if (shouldLoad) {
    visibleIndexes.add(index);
    if (prevIndex != null && prevIndex !== index) {
      visibleIndexes.add(prevIndex);
    }
    if (inView && images.length > 1) {
      visibleIndexes.add((index + 1) % images.length);
    }
  }

  /** Thumbs keep layout height; decode only once the carousel is on-screen. */
  const loadThumbs = showThumbs && images.length > 1 && inView;

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
          const isLcpCandidate = priority && imageIndex === 0;
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
              priority={isLcpCandidate}
              loading={
                isLcpCandidate ? undefined : active ? "eager" : "lazy"
              }
              quality={85}
              sizes={sizes}
              decoding="async"
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
                {loadThumbs ? (
                  <Image
                    src={src}
                    alt=""
                    fill
                    quality={70}
                    sizes="(max-width: 639px) 76px, 88px"
                    loading="lazy"
                    decoding="async"
                    className="object-contain"
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </figure>
  );
}
