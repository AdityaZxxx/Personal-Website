"use client";

import { useEffect, useRef, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const articleRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Find the article element
    articleRef.current = document.querySelector("article");

    if (!articleRef.current) return;

    const updateScrollProgress = () => {
      if (!articleRef.current) return;

      const article = articleRef.current;
      const articleTop = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate how much of the article is scrolled
      const scrollTop = window.scrollY;
      const articleVisibleStart = scrollTop - articleTop;
      const articleVisibleEnd = scrollTop + windowHeight - articleTop;

      // Calculate progress percentage (0-100)
      let scrolled = 0;

      if (articleVisibleStart <= 0) {
        // Before reaching article
        scrolled = 0;
      } else if (articleVisibleEnd >= articleHeight) {
        // After passing article
        scrolled = 100;
      } else {
        // Within article
        scrolled = (articleVisibleStart / (articleHeight - windowHeight)) * 100;
      }

      setProgress(Math.min(100, Math.max(0, scrolled)));
    };

    window.addEventListener("scroll", updateScrollProgress);
    window.addEventListener("resize", updateScrollProgress);

    // Initial calculation
    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 h-1 w-full bg-muted">
      <div
        className="h-full bg-sky-400 transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
