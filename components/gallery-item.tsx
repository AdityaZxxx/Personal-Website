"use client";

import { BlurImage } from "@/components/blur-image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { urlForImage } from "@/lib/sanity/image";
import { formatDate } from "@/lib/utils";
import { Play } from "lucide-react";
import { useState } from "react";

interface GalleryItemProps {
  item: {
    _id: string;
    title: string;
    slug: { current: string };
    description?: string;
    mediaType: "image" | "video";
    image?: any;
    video?: string;
    videoThumbnail?: any;
    date: string;
    categories?: Array<{
      _id: string;
      title: string;
      slug: { current: string };
    }>;
  };
}

export function GalleryItem({ item }: GalleryItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const thumbnailImage =
    item.mediaType === "image" ? item.image : item.videoThumbnail;

  return (
    <>
      <div
        className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {thumbnailImage ? (
          <BlurImage
            image={thumbnailImage}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}

        {item.mediaType === "video" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-black/50 p-3 text-white">
              <Play className="h-8 w-8" />
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4">
          <h3 className="font-bold text-white">{item.title}</h3>
          {item.categories && item.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {item.categories.map((category) => (
                <Badge
                  key={category._id}
                  variant="secondary"
                  className="bg-white/20 text-white"
                >
                  {category.title}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{item.title}</DialogTitle>
            {item.description && (
              <DialogDescription>{item.description}</DialogDescription>
            )}
          </DialogHeader>

          <div className="mt-4">
            {item.mediaType === "image" && item.image && (
              <AspectRatio
                ratio={16 / 9}
                className="overflow-hidden rounded-md"
              >
                <BlurImage
                  image={item.image}
                  alt={item.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 1200px"
                  priority
                />
              </AspectRatio>
            )}

            {item.mediaType === "video" && item.video && (
              <AspectRatio
                ratio={16 / 9}
                className="overflow-hidden rounded-md"
              >
                <video
                  src={item.video}
                  controls
                  className="h-full w-full"
                  poster={
                    item.videoThumbnail
                      ? urlForImage(item.videoThumbnail)?.url()
                      : undefined
                  }
                />
              </AspectRatio>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {item.categories?.map((category) => (
                <Badge key={category._id} variant="secondary">
                  {category.title}
                </Badge>
              ))}
            </div>

            <time
              dateTime={item.date}
              className="text-sm text-muted-foreground"
            >
              {formatDate(item.date)}
            </time>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
