"use client";
import { EyeIcon, SortAsc, SortDesc } from "lucide-react";
import { useMemo, useState } from "react";
import { ShortType } from "../../types/ShortType";
import { ShortNotFound } from "../common/CustomNotFound";
import { SortFilter } from "../filters/SortFilter";
import { TagFilter } from "../filters/TagFilter";
import ShortCard from "./ShortCard";

interface ShortListProps {
  shorts: ShortType[];
  notFoundMessage?: string;
  allTags: string[];
  activeTag?: string;
}

export function ShortList({
  shorts,
  notFoundMessage,
  allTags,
  activeTag,
}: ShortListProps) {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("newest");

  const handleMouseEnter = (id: string) => {
    setHoveredCardId(id);
  };

  const handleMouseLeave = () => {
    setHoveredCardId(null);
  };

  const sortOptions = [
    { value: "newest", label: "Newest", icon: <SortDesc /> },
    { value: "oldest", label: "Oldest", icon: <SortAsc /> },
    { value: "most-viewed", label: "Most Viewed", icon: <EyeIcon /> },
  ];

  const sortedShorts = useMemo(() => {
    const sorted = [...shorts];
    switch (sortBy) {
      case "newest":
        sorted.sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        );
        break;
      case "oldest":
        sorted.sort(
          (a, b) =>
            new Date(a.publishedAt).getTime() -
            new Date(b.publishedAt).getTime()
        );
        break;
      case "most-viewed":
        sorted.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
        break;
      default:
        break;
    }
    return sorted;
  }, [shorts, sortBy]);

  if (!shorts || shorts.length === 0) {
    return <ShortNotFound message={notFoundMessage} />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1 flex flex-col gap-4 lg:order-last lg:sticky lg:top-24 lg:self-start">
        <SortFilter
          options={sortOptions}
          defaultValue={sortBy}
          onValueChange={setSortBy}
        />
        <TagFilter tags={allTags} activeTag={activeTag} />
      </div>
      <div className="lg:col-span-3 lg:order-first">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedShorts.map((short) => (
            <ShortCard
              key={short._id}
              short={short}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              isDimmed={hoveredCardId !== null && hoveredCardId !== short._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
