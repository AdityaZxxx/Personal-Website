"use client";

import { Check, ChevronDown, Filter } from "lucide-react"; // Menambahkan Filter dan ChevronDown
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel, // Menambahkan DropdownMenuLabel
  DropdownMenuSeparator, // Menambahkan Separator
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils"; // Asumsikan Anda memiliki utilitas cn

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
  activeCategory?: string; // Ini adalah slug dari kategori yang aktif
}

export function CategoryFilter({
  categories,
  activeCategory,
}: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentUrlSearchParams = useSearchParams(); // Menggunakan nama yang lebih deskriptif

  const handleCategoryChange = (categorySlug?: string) => {
    const params = new URLSearchParams(currentUrlSearchParams.toString()); // Salin parameter yang ada

    if (categorySlug && categorySlug.trim() !== "") {
      params.set("category", categorySlug);
    } else {
      params.delete("category"); // Hapus parameter 'category' untuk "All Categories"
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false }); // scroll: false agar tidak scroll ke atas
  };

  const activeCategoryData = categories.find(
    (category) => category.slug.current === activeCategory
  );
  const activeCategoryTitle = activeCategoryData?.title || "All Categories";

  // Opsi "All Categories" untuk desktop pills
  const allCategoriesPill = {
    _id: "all-categories-option",
    title: "All", // Dibuat singkat untuk pills
    slug: { _type: "slug", current: "" }, // Slug kosong untuk "All"
  };

  const displayPillCategories = [allCategoriesPill, ...categories];

  return (
    <div className="w-full">
      {/* Desktop: Tampilan Pills/Buttons */}
      <div className="hidden md:flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {/* Label "Filter by:" untuk Desktop */}
        {/* <span className="mr-2 text-sm font-medium text-muted-foreground dark:text-slate-400">Filter by:</span> */}
        {displayPillCategories.map((categoryItem) => {
          const isActive =
            activeCategory === categoryItem.slug.current ||
            (!activeCategory && categoryItem.slug.current === ""); // Cek jika "All" aktif

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

      {/* Mobile: Tampilan Dropdown */}
      <div className="md:hidden flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full max-w-xs flex items-center justify-between group px-4 py-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-foreground dark:text-slate-500 dark:group-hover:text-slate-300" />
                <span className="font-medium">{activeCategoryTitle}</span>
              </div>
              <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180 text-muted-foreground group-hover:text-foreground dark:text-slate-500 dark:group-hover:text-slate-300" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="center"
            className="w-[--radix-dropdown-menu-trigger-width] bg-card border-border shadow-lg dark:bg-slate-800 dark:border-slate-700"
          >
            <DropdownMenuLabel className="px-3 py-2 text-muted-foreground dark:text-slate-500">
              Filter by Category
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="dark:bg-slate-700" />
            <DropdownMenuItem
              onClick={() => handleCategoryChange(undefined)} // undefined untuk "All Categories"
              className={cn(
                "flex justify-between items-center cursor-pointer py-2 px-3 text-sm focus:bg-slate-100 dark:focus:bg-slate-700",
                !activeCategory
                  ? "font-semibold text-primary dark:text-sky-400"
                  : "text-foreground dark:text-slate-300"
              )}
              aria-selected={!activeCategory}
            >
              All Categories
              {!activeCategory && (
                <Check className="ml-auto h-4 w-4 text-primary dark:text-sky-400" />
              )}
            </DropdownMenuItem>
            {categories.map((categoryItem) => {
              const isActive = activeCategory === categoryItem.slug.current;
              return (
                <DropdownMenuItem
                  key={categoryItem._id}
                  onClick={() =>
                    handleCategoryChange(categoryItem.slug.current)
                  }
                  className={cn(
                    "flex justify-between items-center cursor-pointer py-2 px-3 text-sm focus:bg-slate-100 dark:focus:bg-slate-700",
                    isActive
                      ? "font-semibold text-primary dark:text-sky-400"
                      : "text-foreground dark:text-slate-300"
                  )}
                  aria-selected={isActive}
                >
                  {categoryItem.title}
                  {isActive && (
                    <Check className="ml-auto h-4 w-4 text-primary dark:text-sky-400" />
                  )}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
