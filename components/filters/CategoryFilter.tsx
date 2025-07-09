"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface CategoryFilterProps {
  categories: Category[];
  activeCategory?: string;
}

export function CategoryFilter({
  categories,
  activeCategory,
}: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentUrlSearchParams = useSearchParams();

  const handleCategoryChange = (clickedCategorySlug: string) => {
    const params = new URLSearchParams(currentUrlSearchParams.toString());

    if (activeCategory === clickedCategorySlug) {
      params.delete("category");
    } else {
      params.set("category", clickedCategorySlug);
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full">
      <p className="text-sm text-muted-foreground font-medium mb-3">
        Choose a category
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((categoryItem) => {
          const isActive = activeCategory === categoryItem.slug;

          return (
            <Button
              key={categoryItem._id}
              variant="ghost"
              size="sm"
              onClick={() => handleCategoryChange(categoryItem.slug)}
              className={cn(
                "rounded-full px-2 py-0.5 h-8 text-xs font-medium transition-all cursor-pointer",
                "border border-border hover:border-primary/50",
                "hover:bg-primary/5 hover:text-primary",
                "dark:hover:bg-primary/10 dark:hover:text-primary",
                isActive
                  ? "bg-primary/10 text-primary border-primary/30 dark:bg-primary/20 dark:border-primary/30"
                  : "bg-transparent text-muted-foreground"
              )}
            >
              {categoryItem.title}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
