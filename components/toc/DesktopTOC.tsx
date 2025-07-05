"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const SCROLL_OFFSET_FOR_STICKY_HEADER = 96;

interface HeadingData {
  id: string;
  text: string;
  level: number;
}

export function DesktopTOC() {
  const [headings, setHeadings] = useState<HeadingData[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeListItemRef = useRef<HTMLLIElement | null>(null);

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

  useEffect(() => {
    if (activeListItemRef.current) {
      activeListItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeId]);

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

        const newUrl = `${window.location.pathname}${window.location.search}#${id}`;
        window.history.replaceState(null, "", newUrl);

        setActiveId(id);
      }
    },
    []
  );

  if (headings.length === 0) {
    return (
      <p className="text-primary text-sm">
        There are no sub-headings in this article.
      </p>
    );
  }

  return (
    <nav aria-label="Table of contents" className="text-xs">
      <ul className="space-y-1.5">
        {headings.map((heading, i) => (
          <li
            key={i}
            ref={activeId === heading.id ? activeListItemRef : null}
            className={cn(
              "relative transition-opacity duration-200",
              activeId && activeId !== heading.id
                ? "opacity-50 hover:opacity-100"
                : "opacity-100"
            )}
          >
            <Link
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={cn(
                "flex items-start gap-2 py-1 group transition-colors duration-200",
                heading.level === 3 ? "pl-7" : "pl-3",
                activeId === heading.id
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-primary"
              )}
              aria-current={activeId === heading.id ? "location" : undefined}
            >
              <span
                className={cn(
                  "absolute left-0 top-0 h-full w-0.5 bg-sky-500 transition-transform duration-200 ease-in-out",
                  activeId === heading.id ? "scale-y-100" : "scale-y-0"
                )}
                style={{ transformOrigin: "center" }}
              />
              {heading.level === 3 && (
                <ChevronRight className="w-3 h-3 mt-1 flex-shrink-0" />
              )}
              <span className="leading-snug">{heading.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
