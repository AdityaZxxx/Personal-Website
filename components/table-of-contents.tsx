"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function TableOfContents() {
  const [headings, setHeadings] = useState<HTMLHeadingElement[]>([]);

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll("article h2, article h3")
    ) as HTMLHeadingElement[];
    setHeadings(headingElements);
  }, []);

  return (
    <div className="space-y-2 text-sm">
      <h2 className="text-base font-semibold mb-2">Table of Contents</h2>
      <ul className="space-y-1">
        {headings.map((heading) => (
          <li key={heading.id || heading.textContent}>
            <Link
              href={`#${heading.id}`}
              className="text-muted-foreground hover:text-primary block transition-colors"
            >
              {heading.textContent}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
