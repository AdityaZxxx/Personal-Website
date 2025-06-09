"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/use-debounce";

export function BlogSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const debouncedQuery = useDebounce(query, 1000);

  useEffect(() => {
    if (debouncedQuery) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("search", debouncedQuery);
      router.push(`?${params.toString()}`, { scroll: false });
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("search");
      router.push(`?${params.toString()}`, { scroll: false });
    }
  }, [debouncedQuery, router, searchParams]);

  return (
    <div className="flex w-full h-full max-w-md">
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground " />
      <Input
        type="search"
        placeholder="Search articles..."
        className="w-full pl-10"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
