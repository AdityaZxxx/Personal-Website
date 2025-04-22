"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export function TableOfContents() {
  const [headings, setHeadings] = useState<
    {
      id: string;
      text: string;
      level: number;
    }[]
  >([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;

    const headingElements = Array.from(
      article.querySelectorAll("h2, h3")
    ) as HTMLElement[];

    const mappedHeadings = headingElements.map((heading) => {
      if (!heading.id) {
        heading.id =
          heading.textContent
            ?.toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "") || "";
      }
      return {
        id: heading.id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName.substring(1)),
      };
    });

    setHeadings(mappedHeadings);

    // Set up IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0px 0px -50% 0px",
        threshold: 0.5,
      }
    );

    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const handleClick = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Adjust for header height
        behavior: "smooth",
      });
    }
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`transition-colors ${
              heading.level === 3 ? "pl-4" : ""
            } ${
              activeId === heading.id
                ? "text-primary font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Link
              href={`#${heading.id}`}
              className="flex items-start gap-2 py-1"
              onClick={(e) => handleClick(e, heading.id)}
              aria-current={activeId === heading.id ? "location" : undefined}
            >
              {heading.level === 3 && (
                <ChevronRight className="w-3 h-3 mt-1.5 flex-shrink-0" />
              )}
              <span className="leading-snug">{heading.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
