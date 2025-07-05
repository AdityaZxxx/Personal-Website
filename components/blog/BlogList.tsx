"use client";
import { PostType } from "@/types";
import { Calendar, EyeIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { PostNotFound } from "../common/CustomNotFound";
import { CategoryFilter } from "../filters/CategoryFilter";
import { SortFilter } from "../filters/SortFilter";
import { BlogPostCard } from "./BlogPostCard";

interface PostListProps {
  posts: PostType[];
  notFoundMessage?: string;
  allCategories: { _id: string; title: string; slug: string }[];
  activeCategory?: string;
  showFilters?: boolean; // New prop
}

export function BlogList({
  posts,
  notFoundMessage,
  allCategories,
  activeCategory,
  showFilters = true, // Default to true
}: PostListProps) {
  const [sortBy, setSortBy] = useState<string>("date");

  const sortOptions = [
    { value: "date", label: "Date", icon: <Calendar /> },
    { value: "views", label: "Most Viewed", icon: <EyeIcon /> },
  ];

  const sortedPosts = useMemo(() => {
    const sortablePosts = [...posts];
    switch (sortBy) {
      case "views":
        sortablePosts.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
        break;
      default:
        // Default to sorting by publishedAt desc (latest)
        sortablePosts.sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        );
        break;
    }
    return sortablePosts;
  }, [posts, sortBy]);

  if (!posts || posts.length === 0) {
    return <PostNotFound message={notFoundMessage} />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {showFilters && (
        <div className="lg:col-span-1 flex flex-col gap-4 lg:order-last lg:sticky lg:top-24 self-start">
          <SortFilter
            options={sortOptions}
            defaultValue={sortBy}
            onValueChange={setSortBy}
          />
          <CategoryFilter
            categories={allCategories}
            activeCategory={activeCategory}
          />
        </div>
      )}
      <div
        className={
          showFilters ? "lg:col-span-3 lg:order-first" : "lg:col-span-4"
        }
      >
        <div className="grid grid-cols-1">
          {sortedPosts.map((post, index) => (
            <BlogPostCard
              key={post._id}
              post={post}
              isLCPCandidate={index === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
