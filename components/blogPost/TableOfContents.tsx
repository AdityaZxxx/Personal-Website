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
    if (!articleElement) {
      return;
    }

    const headingElements = Array.from(
      articleElement.querySelectorAll("h2, h3")
    ) as HTMLHeadingElement[];

    if (headingElements.length === 0) {
      setHeadings([]);
      return;
    }

    const idSet = new Set<string>();
    const mappedHeadings = headingElements.map((heading, index) => {
      let baseIdTry =
        heading.id ||
        heading.textContent
          ?.trim()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, "") ||
        "";

      if (!baseIdTry) {
        baseIdTry = `toc-heading-${index}`;
      }

      let uniqueId = baseIdTry;
      let counter = 1;
      while (idSet.has(uniqueId)) {
        uniqueId = `${baseIdTry}-${counter++}`;
      }
      idSet.add(uniqueId);

      if (heading.id !== uniqueId) {
        heading.id = uniqueId;
      }

      return {
        id: uniqueId,
        text: heading.textContent?.trim() || "Untitled Section",
        level: parseInt(heading.tagName.substring(1), 10),
      };
    });

    setHeadings(mappedHeadings);

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      rootMargin: "0px 0px -65% 0px", // Menjadikan aktif sedikit lebih awal saat scroll ke bawah
      threshold: 0.1, // Cukup sedikit bagian dari heading terlihat
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    headingElements.forEach((element) => observer.observe(element));

    // Cleanup observer saat komponen di-unmount
    return () => observer.disconnect();
  }, []);

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
        setActiveId(id);
      }
    },
    []
  );

  if (headings.length === 0) {
    return null;
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
                    "w-3 h-3 mt-[5px] flex-shrink-0 transition-transform duration-150 ease-in-out",
                    activeId === heading.id
                      ? "text-sky-400 opacity-100"
                      : "text-slate-500 group-hover:text-slate-300 opacity-70"
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
