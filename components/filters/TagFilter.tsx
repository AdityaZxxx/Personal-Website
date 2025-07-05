"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface TagFilterProps {
  tags: string[];
  activeTag?: string;
}

export function TagFilter({
  tags,
  activeTag,
}: TagFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentUrlSearchParams = useSearchParams();

  const handleTagChange = (clickedTag: string) => {
    const params = new URLSearchParams(currentUrlSearchParams.toString());

    if (activeTag === clickedTag) {
      // Jika tag yang diklik sudah aktif, nonaktifkan (hapus dari URL)
      params.delete("tag");
    } else {
      // Jika tag yang diklik tidak aktif, aktifkan (set di URL)
      params.set("tag", clickedTag);
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full">
      <p className="text-sm text-primary font-normal mt-2 mb-1">
        Choose tags
      </p>
      <div className="flex flex-wrap items-baseline justify-start gap-2 sm:gap-3 mt-6">
        {tags.map((tagItem) => {
          const isActive = activeTag === tagItem;

          return (
            <Button
              key={tagItem}
              variant={isActive ? "default" : "secondary"}
              size="sm"
              onClick={() => handleTagChange(tagItem)}
              className={cn(
                "rounded-lg px-2 text-xs transition-all duration-200 ease-out",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 dark:bg-sky-500 dark:hover:bg-sky-600 dark:text-primary"
                  : "border-card text-foreground hover:bg-foreground hover:border-foreground-foreground dark:border-slate-700 dark:text-muted-foreground dark:hover:bg-zinc-700 dark:hover:text-slate-100 dark:hover:border-slate-500"
              )}
            >
              {tagItem}
            </Button>
          );
        })}
      </div>
    </div>
  );
}