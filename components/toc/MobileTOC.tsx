"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { ChevronRight, List } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

const SCROLL_OFFSET_FOR_STICKY_HEADER = 96;

interface HeadingData {
  id: string;
  text: string;
  level: number;
}

export function MobileTOC() {
  const [headings, setHeadings] = useState<HeadingData[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
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
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
          return;
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: `-${SCROLL_OFFSET_FOR_STICKY_HEADER}px 0px -70% 0px`,
    });

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

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

        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        window.history.replaceState(null, "", `#${id}`);
        setActiveId(id);
        setDrawerOpen(false);
      }
    },
    []
  );

  const HeadingsList = () => (
    <nav aria-label="Table of contents">
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

  return (
    <>
      <div className="lg:hidden fixed bottom-3 right-3 z-40">
        <Drawer open={isDrawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <Button className="rounded-md h-10 backdrop-blur-sm max-w-sm bg-zinc-600 hover:bg-zinc-700 opacity-40 hover:opacity-100 transition-colors shadow-lg active:scale-95 ">
              <List className="h-3 w-3 text-neutral-100" />
              <span className="text-neutral-100 text-xs">
                Table of Contents
              </span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="bg-background border-neutral-800 text-slate-200 max-h-[80vh]">
            <div className="mx-auto w-full max-w-md p-2">
              <DrawerHeader className="text-left mb-2">
                <DrawerTitle className="text-xl font-bold">
                  Table of Contents
                </DrawerTitle>
              </DrawerHeader>
              <div className="overflow-y-auto px-4 pb-4">
                {headings.length > 0 ? (
                  <HeadingsList />
                ) : (
                  <p className="text-muted text-sm">No sub-headings found.</p>
                )}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
