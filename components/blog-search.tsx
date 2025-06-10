"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "../hooks/use-debounce";

export function BlogSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const debouncedQuery = useDebounce(query, 500);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedQuery) {
      params.set("search", debouncedQuery);
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }, [debouncedQuery, router, searchParams]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div className="relative w-full max-w-md rounded-md">
      <SearchIcon
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        ref={inputRef}
        type="search"
        placeholder="Search articles...              Ctrl+S"
        className="w-full pl-10"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
