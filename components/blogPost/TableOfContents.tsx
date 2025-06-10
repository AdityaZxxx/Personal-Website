// components/blogPost/TableOfContents.tsx
"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const SCROLL_OFFSET_FOR_STICKY_HEADER = 96;

interface HeadingData {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<HeadingData[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const articleElement = document.querySelector("article");
    if (!articleElement) return;

    const headingElements = Array.from(
      articleElement.querySelectorAll<HTMLHeadingElement>("h2, h3")
    );

    const mappedHeadings = headingElements
      .map((heading) => {
        if (heading.id) {
          return {
            id: heading.id,
            text: heading.textContent?.trim() || "Untitled Section",
            level: parseInt(heading.tagName.substring(1), 10),
          };
        }
        return null;
      })
      .filter((h): h is HeadingData => h !== null);

    setHeadings(mappedHeadings);

    if (mappedHeadings.length === 0) return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const visibleHeadings = entries.filter((entry) => entry.isIntersecting);
      if (visibleHeadings.length > 0) {
        visibleHeadings.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        );
        setActiveId(visibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: `-${SCROLL_OFFSET_FOR_STICKY_HEADER}px 0px -55% 0px`,
    });

    headingElements.forEach((element) => {
      if (element.id) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // --- FUNGSI YANG DIPERBAIKI ---
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      event.preventDefault();

      const targetElement = document.getElementById(id);

      if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.scrollY - SCROLL_OFFSET_FOR_STICKY_HEADER;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Update URL di address bar
        const newUrl = `${window.location.pathname}${window.location.search}#${id}`;
        window.history.replaceState(null, "", newUrl);

        setActiveId(id);
      }
    },
    []
  );

  if (headings.length === 0) {
    return (
      <p className="text-slate-400 text-sm">
        There are no sub-headings in this article.
      </p>
    );
  }

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <ul className="space-y-1.5">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={cn(
              "transition-all duration-150 ease-in-out",
              heading.level === 3 ? "pl-4" : "pl-0",
              activeId === heading.id
                ? "text-sky-400 font-semibold"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            <Link
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className="flex items-start gap-2 py-1 group"
              aria-current={activeId === heading.id ? "location" : undefined}
            >
              {heading.level === 3 && (
                <ChevronRight
                  className={cn(
                    "w-3 h-3 mt-[5px] flex-shrink-0 transition-transform",
                    activeId === heading.id ? "text-sky-400" : "text-slate-500"
                  )}
                />
              )}
              <span className="leading-snug">{heading.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
