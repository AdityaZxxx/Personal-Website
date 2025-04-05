"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Check } from "lucide-react"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface CategoryFilterProps {
  categories: Array<{
    _id: string
    title: string
    slug: string
  }>
  activeCategory?: string
}

export function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleCategoryChange = (categorySlug?: string) => {
    const params = new URLSearchParams(searchParams)

    if (categorySlug) {
      params.set("category", categorySlug)
    } else {
      params.delete("category")
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  const activeCategoryTitle = categories.find((category) => category.slug === activeCategory)?.title || "All Categories"

  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{activeCategoryTitle}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuItem onClick={() => handleCategoryChange()} className="flex justify-between">
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
              {activeCategory === category.slug && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

