import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface TagListProps {
  tags: string[]
  className?: string
}

export function TagList({ tags, className = "" }: TagListProps) {
  if (!tags || tags.length === 0) return null

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <Link key={tag} href={`/blog?tag=${tag}`}>
          <Badge variant="outline" className="hover:bg-secondary">
            #{tag}
          </Badge>
        </Link>
      ))}
    </div>
  )
}

