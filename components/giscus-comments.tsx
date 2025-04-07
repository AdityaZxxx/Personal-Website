"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

interface GiscusCommentsProps {
  slug: string;
}

export function GiscusComments({ slug }: GiscusCommentsProps) {
  const { resolvedTheme } = useTheme();
  const [theme, setTheme] = useState("light");
  const [isMounted, setIsMounted] = useState(false);
  const commentsContainerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  // Wait for client-side hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update theme when resolvedTheme changes
  useEffect(() => {
    if (resolvedTheme === "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [resolvedTheme]);

  // Load Giscus script
  useEffect(() => {
    if (!isMounted || loadedRef.current) return;

    const loadGiscus = () => {
      const script = document.createElement("script");
      script.src = "https://giscus.app/client.js";
      script.setAttribute("data-repo", "AdityaZxxx/Personal-Website");
      script.setAttribute("data-repo-id", "R_kgDOOUZR5Q");
      script.setAttribute("data-category", "Show and tell");
      script.setAttribute("data-category-id", "DIC_kwDOOUZR5c4Co2d9");
      script.setAttribute("data-mapping", "pathname");
      script.setAttribute("data-strict", "1");
      script.setAttribute("data-reactions-enabled", "1");
      script.setAttribute("data-emit-metadata", "1");
      script.setAttribute("data-input-position", "top");
      script.setAttribute("data-theme", theme);
      script.setAttribute("data-lang", "en");
      // script.setAttribute("data-loading", "lazy");
      script.setAttribute("crossorigin", "anonymous");
      script.async = true;

      // Clean up previous instance if it exists
      const giscusContainer = commentsContainerRef.current;
      if (giscusContainer) {
        // Remove any existing children
        while (giscusContainer.firstChild) {
          giscusContainer.removeChild(giscusContainer.firstChild);
        }
        giscusContainer.appendChild(script);
      }

      loadedRef.current = true;
    };

    loadGiscus();
  }, [isMounted, theme]);

  // Update Giscus theme when theme changes
  useEffect(() => {
    if (!isMounted || !loadedRef.current) return;

    const iframe = document.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame"
    );
    if (iframe) {
      iframe.contentWindow?.postMessage(
        { giscus: { setConfig: { theme } } },
        "https://giscus.app"
      );
    }
  }, [isMounted, theme]);

  // Only render on client-side
  if (!isMounted) return null;

  return (
    <section className="mt-10 pt-10 border-t">
      <h2 className="text-2xl font-bold mb-8">Comments</h2>
      <div ref={commentsContainerRef} className="giscus-wrapper"></div>
    </section>
  );
}
