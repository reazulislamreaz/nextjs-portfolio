"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface ProjectCarouselProps {
  images: string[];
  title: string;
  priority?: boolean;
  showThumbs?: boolean;
}

interface NaturalSize {
  width: number;
  height: number;
}

export default function ProjectCarousel({
  images,
  title,
  priority = false,
  showThumbs = true,
}: ProjectCarouselProps) {
  const [index, setIndex] = useState(0);
  const [sizes, setSizes] = useState<Record<string, NaturalSize>>({});
  const [reduceMotion, setReduceMotion] = useState(false);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const current = images[index] ?? "";
  const size = current ? sizes[current] : undefined;
  const ratio = size ? `${size.width} / ${size.height}` : "2 / 1";

  const go = useCallback(
    (next: number) => {
      if (!images.length) return;
      setIndex((next + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    setIndex(0);
  }, [images]);

  useEffect(() => {
    if (!images.length) return;
    let cancelled = false;

    for (const src of images) {
      const img = new window.Image();
      const ready = () => {
        if (cancelled || !img.naturalWidth || !img.naturalHeight) return;
        setSizes((prev) => {
          if (prev[src]) return prev;
          return {
            ...prev,
            [src]: { width: img.naturalWidth, height: img.naturalHeight },
          };
        });
      };
      img.addEventListener("load", ready);
      img.src = src;
      if (img.complete) ready();
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
    if (images.length <= 1 || reduceMotion || paused) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      setIndex((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [images.length, paused, reduceMotion]);

  if (!images.length) {
    return (
      <div className="flex aspect-[2/1] w-full items-center justify-center bg-zinc-800 text-sm text-zinc-500">
        No preview available
      </div>
    );
  }

  return (
    <figure
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="relative w-full overflow-hidden bg-zinc-800"
        style={{ aspectRatio: ratio }}
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
        {images.map((src, imageIndex) => {
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
              sizes="(max-width: 1024px) 100vw, 58vw"
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

      {showThumbs && images.length > 1 ? (
        <div
          className="flex gap-2 overflow-x-auto px-3 py-3 sm:px-4"
          aria-label={`${title} screenshot thumbnails`}
        >
          {images.map((src, imageIndex) => {
            const thumb = sizes[src];
            const active = imageIndex === index;
            return (
              <button
                key={src}
                type="button"
                onClick={() => go(imageIndex)}
                aria-label={`Show screenshot ${imageIndex + 1} of ${images.length}`}
                aria-current={active}
                className={`relative h-12 shrink-0 overflow-hidden rounded-md border bg-zinc-800 transition sm:h-14 ${
                  active
                    ? "border-emerald-400"
                    : "border-zinc-700 opacity-70 hover:opacity-100"
                }`}
                style={{
                  aspectRatio: thumb
                    ? `${thumb.width} / ${thumb.height}`
                    : "2 / 1",
                }}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="120px"
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
