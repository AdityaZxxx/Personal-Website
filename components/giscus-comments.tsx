"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

const GISCUS_CONFIG = {
  repo: "AdityaZxxx/Personal-Website",
  repoId: "R_kgDOOUZR5Q",
  category: "Show and tell",
  categoryId: "DIC_kwDOOUZR5c4Co2d9",
  mapping: "pathname",
  strict: "1",
  reactionsEnabled: "1",
  emitMetadata: "1",
  inputPosition: "top",
  lang: "en",
  loading: "lazy",
} as const;

export function GiscusComments() {
  const { resolvedTheme } = useTheme();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMounted, setIsMounted] = useState(false);
  const commentsContainerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  // Initialize component and theme
  useEffect(() => {
    setIsMounted(true);
    setTheme(resolvedTheme === "dark" ? "dark" : "light");
  }, [resolvedTheme]);

  // Load or update Giscus
  useEffect(() => {
    if (!isMounted) return;

    const loadGiscus = () => {
      if (loadedRef.current) return;

      const script = document.createElement("script");
      script.src = "https://giscus.app/client.js";
      script.async = true;
      script.crossOrigin = "anonymous";

      // Set Giscus configuration attributes
      Object.entries(GISCUS_CONFIG).forEach(([key, value]) => {
        script.setAttribute(`data-${key}`, value);
      });
      script.setAttribute("data-theme", theme);

      const container = commentsContainerRef.current;
      if (container) {
        // Clear previous instance
        container.innerHTML = "";
        container.appendChild(script);
        loadedRef.current = true;
      }
    };

    const updateGiscusTheme = () => {
      const iframe = document.querySelector<HTMLIFrameElement>(
        "iframe.giscus-frame"
      );
      iframe?.contentWindow?.postMessage(
        { giscus: { setConfig: { theme } } },
        "https://giscus.app"
      );
    };

    loadedRef.current ? updateGiscusTheme() : loadGiscus();
  }, [isMounted, theme]);

  if (!isMounted) return null;

  return (
    <section className="mt-10 pt-10 border-t">
      <h2 className="text-2xl font-bold mb-8">Comments</h2>
      <div ref={commentsContainerRef} className="giscus-wrapper" />
    </section>
  );
}
