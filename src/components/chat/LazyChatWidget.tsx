"use client";

import { useState, useEffect, lazy, Suspense } from "react";

// Lazy load the actual ChatWidget
const ChatWidget = lazy(() => import("./ChatWidget"));

export default function LazyChatWidget() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Load chat widget after user interaction OR after 5 seconds idle
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        setShouldLoad(true);
      }
    };

    // Listen for any user interaction
    const events = ["scroll", "click", "touchstart", "mousemove", "keydown"];
    events.forEach((event) => {
      window.addEventListener(event, handleInteraction, { once: true, passive: true });
    });

    // Fallback: load after 5 seconds of page load
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 5000);

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleInteraction);
      });
      clearTimeout(timer);
    };
  }, [hasInteracted]);

  if (!shouldLoad) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <ChatWidget />
    </Suspense>
  );
}

