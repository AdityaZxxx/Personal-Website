import { GalleryItem } from "@/components/gallery-item";
import { getAllGalleryItems } from "@/lib/sanity/queries";
import { GalleryNotFound } from "./custom-not-found";

interface GalleryGridProps {
  category?: string;
}

export async function GalleryGrid({ category }: GalleryGridProps) {
  const items = await getAllGalleryItems(category);

  if (items.length === 0) {
    return <GalleryNotFound message="No gallery items found." />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item: any) => (
        <GalleryItem key={item._id} item={item} />
      ))}
    </div>
  );
}
