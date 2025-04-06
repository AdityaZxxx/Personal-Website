"use client";

import { Check } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CategoryFilterProps {
  categories: Array<{
    _id: string;
    title: string;
    slug: string;
  }>;
  searchParams: {
    category?: string;
  };
}

export function CategoryFilter({
  categories,
  searchParams,
}: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Extract activeCategory from searchParams
  const activeCategory = searchParams?.category;

  const handleCategoryChange = (categorySlug?: string) => {
    // Create a new URLSearchParams object
    const params = new URLSearchParams();

    if (categorySlug) {
      params.set("category", categorySlug);
    }

    // Navigate to the new URL
    router.push(`${pathname}?${params.toString()}`);
  };

  const activeCategoryTitle =
    categories.find((category) => category.slug === activeCategory)?.title ||
    "All Categories";

  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{activeCategoryTitle}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuItem
            onClick={() => handleCategoryChange()}
            className="flex justify-between"
          >
            All Categories
            {!activeCategory && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
          {categories.map((category) => (
            <DropdownMenuItem
              key={category._id}
              onClick={() => handleCategoryChange(category.slug)}
              className="flex justify-between"
            >
              {category.title}
              {activeCategory === category.slug && (
                <Check className="h-4 w-4" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
