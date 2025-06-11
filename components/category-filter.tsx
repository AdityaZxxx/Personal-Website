"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// PERBAIKAN 1: Sesuaikan tipe data 'slug' menjadi string
interface Category {
  _id: string;
  title: string;
  slug: string;
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

    if (categorySlug) {
      params.set("category", categorySlug);
    } else {
      params.delete("category");
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const allCategoriesPill = {
    _id: "all-categories-option",
    title: "All",
    slug: "", // Slug untuk "All" adalah string kosong
  };

  const displayPillCategories = [allCategoriesPill, ...categories];

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {displayPillCategories.map((categoryItem) => {
          // PERBAIKAN 2: Logika pengecekan 'isActive' disesuaikan
          const isActive =
            activeCategory === categoryItem.slug ||
            (!activeCategory && categoryItem.slug === "");

          return (
            <Button
              key={categoryItem._id}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() =>
                // PERBAIKAN 3: Logika onClick disesuaikan
                handleCategoryChange(
                  categoryItem.slug === "" ? undefined : categoryItem.slug
                )
              }
              className={cn(
                "rounded-full px-4 py-1.5 text-sm transition-all duration-200 ease-out",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 dark:bg-sky-500 dark:hover:bg-sky-600 dark:text-slate-50"
                  : "border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100 dark:hover:border-slate-500"
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
