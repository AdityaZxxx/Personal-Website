"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Category {
  _id: string;
  title: string;
  slug: {
    _type: string;
    current: string;
  };
}

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

  const handleCategoryChange = (categorySlug?: string) => {
    const params = new URLSearchParams(currentUrlSearchParams.toString());

    if (categorySlug && categorySlug.trim() !== "") {
      params.set("category", categorySlug);
    } else {
      params.delete("category");
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const activeCategoryData = categories.find(
    (category) => category.slug.current === activeCategory
  );
  const activeCategoryTitle = activeCategoryData?.title || "All Categories";

  const allCategoriesPill = {
    _id: "all-categories-option",
    title: "All",
    slug: { _type: "slug", current: "" },
  };

  const displayPillCategories = [allCategoriesPill, ...categories];

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {displayPillCategories.map((categoryItem) => {
          const isActive =
            activeCategory === categoryItem.slug.current ||
            (!activeCategory && categoryItem.slug.current === "");

          return (
            <Button
              key={categoryItem._id}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() =>
                handleCategoryChange(
                  categoryItem.slug.current === ""
                    ? undefined
                    : categoryItem.slug.current
                )
              }
              className={cn(
                "rounded-full px-4 py-1.5 text-sm transition-all duration-200 ease-out",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 dark:bg-sky-500 dark:hover:bg-sky-600 dark:text-slate-50" // Styling tombol aktif
                  : "border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100 dark:hover:border-slate-500" // Styling tombol non-aktif
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
