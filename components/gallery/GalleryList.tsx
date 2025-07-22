import { getAllGalleryItems } from "@/lib/sanity/queries";
import { GalleryNotFound } from "../common/CustomNotFound";
import { GalleryItem, GalleryItemType } from "./GalleryItem";

interface GalleryGridProps {
  category?: string;
}

export async function GalleryGrid({ category }: GalleryGridProps) {
  const items = await getAllGalleryItems(category);

  if (items.length === 0) {
    return <GalleryNotFound message="No gallery items found." />;
  }

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item: GalleryItemType) => (
        <GalleryItem key={item._id} item={item} />
      ))}
    </div>
  );
}
