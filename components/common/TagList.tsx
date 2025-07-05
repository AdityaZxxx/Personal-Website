import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface TagListProps {
  tags: string[];
  content: "blog" | "short" | "project";
  className?: string;
}

export function TagList({ tags, className = "", content }: TagListProps) {
  if (!tags || tags.length === 0) return null;
  const contentType =
    content === "blog" ? "blog" : content === "short" ? "shorts" : "projects";
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag, index) => (
        <Link key={index} href={`/${contentType}?tag=${tag}`}>
          <Badge variant="outline" className="hover:bg-secondary">
            #{tag}
          </Badge>
        </Link>
      ))}
    </div>
  );
}
