"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const AiPortfolioAssistant = dynamic(() => import("./AiPortfolioAssistant"), {
  ssr: false,
  loading: () => null,
});

/**
 * Loads the floating assistant after the browser is idle so it never
 * competes with Hero/LCP or first-interaction work.
 */
export default function DeferredAiAssistant() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const enable = () => {
      if (!cancelled) setReady(true);
    };

    const ric = window.requestIdleCallback?.bind(window);
    if (ric) {
      idleId = ric(enable, { timeout: 3500 });
    } else {
      timeoutId = setTimeout(enable, 2000);
    }

    // Also unlock on first meaningful interaction (faster on heavy devices)
    const onInteract = () => enable();
    window.addEventListener("pointerdown", onInteract, {
      once: true,
      passive: true,
    });
    window.addEventListener("keydown", onInteract, { once: true });

    return () => {
      cancelled = true;
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
    };
  }, []);

  if (!ready) return null;
  return <AiPortfolioAssistant />;
}
