"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn, formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Bookmark,
  Heart,
  Image as ImageIconPlaceholder,
  Loader2,
  MessageSquare,
  Play,
  Share2,
  UserCircle2,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface SanityImage {
  alt?: string;
  lqip: string;
  asset: { _id: string; url: string; width: number; height: number };
}
export interface GalleryItemType {
  _id: string;
  title: string;
  slug: {
    _type: string;
    current: string;
  };
  mediaType: "image" | "video";
  thumbnail: SanityImage;
}

type DetailedGalleryItem = {
  mediaType: string;
  description?: string;
  videoUrl?: string;
  image?: SanityImage;
  videoThumbnail?: SanityImage;
  date: string;
  categories?: Array<{ _id: string; title: string; slug: string }>;
};

export function GalleryItem({ item }: { item: GalleryItemType }) {
  const [isOpen, setIsOpen] = useState(false);
  const [detailedItem, setDetailedItem] = useState<DetailedGalleryItem | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleOpenDialog = async () => {
    setIsOpen(true);

    if (detailedItem) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/gallery/${item.slug}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const data: DetailedGalleryItem = await response.json();
      setDetailedItem(data);
    } catch (err) {
      console.error("Failed to fetch gallery item details:", err);
      setError("Could not load details. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const thumbnail = item.thumbnail;
  const hasValidThumbnail = thumbnail?.asset?.url;

  return (
    <>
      {/* Gallery Thumbnail */}
      <div
        className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-slate-800 shadow-md"
        onClick={handleOpenDialog}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleOpenDialog()}
        aria-label={`View details for ${item.title}`}
      >
        {hasValidThumbnail ? (
          <Image
            src={thumbnail.asset.url}
            alt={thumbnail.alt || `Thumbnail for ${item.title}`}
            fill
            className="object-cover transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-90"
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
            placeholder="blur"
            blurDataURL={thumbnail.lqip}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-700 text-slate-500">
            <ImageIconPlaceholder className="h-12 w-12" />
          </div>
        )}
        {item.mediaType === "video" && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="rounded-full bg-black/60 p-3 backdrop-blur-sm shadow-lg">
              <Play className="h-5 w-5 fill-white text-primary sm:h-6 sm:w-6" />
            </div>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-full flex-col justify-end p-3 sm:p-4">
            <div className="translate-y-4 transform transition-transform duration-300 group-hover:translate-y-0">
              <h3 className="text-sm font-semibold text-primary sm:text-base line-clamp-2 leading-tight">
                {item.title}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog Tampilan Detail */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl lg:max-w-5xl w-[95vw] sm:w-full h-[90vh] max-h-[800px] p-0 flex flex-col sm:flex-row overflow-hidden data-[state=open]:animate-contentShow">
          <DialogHeader className="sr-only">
            <DialogTitle>{item.title}</DialogTitle>
            {detailedItem?.description && (
              <DialogDescription>{detailedItem.description}</DialogDescription>
            )}
          </DialogHeader>

          {/* Konten Dialog: Loading, Error, atau Data */}
          {isLoading && (
            <div className="w-full h-full flex items-center justify-center bg-black">
              <Loader2 className="h-8 w-8 text-sky-400 animate-spin" />
            </div>
          )}
          {error && (
            <div className="w-full h-full flex items-center justify-center bg-black p-4 text-center text-red-400">
              <p>Error: {error}</p>
            </div>
          )}
          {detailedItem && !isLoading && (
            <>
              {/* Bagian Media */}
              <div className="relative flex h-1/2 w-full items-center justify-center overflow-hidden bg-black sm:h-full sm:w-[60%]">
                {detailedItem.mediaType === "image" &&
                detailedItem.image?.asset?.url ? (
                  <Image
                    src={detailedItem.image.asset.url}
                    alt={detailedItem.image.alt || item.title}
                    width={detailedItem.image.asset.width}
                    height={detailedItem.image.asset.height}
                    className="h-auto w-auto max-h-full max-w-full object-contain"
                    placeholder="blur"
                    blurDataURL={detailedItem.image.lqip}
                    priority
                  />
                ) : detailedItem.mediaType === "video" &&
                  detailedItem.videoUrl ? (
                  <video
                    src={detailedItem.videoUrl}
                    controls
                    autoPlay
                    loop
                    className="h-full w-full object-contain"
                    poster={detailedItem.videoThumbnail?.asset?.url}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-slate-900 text-slate-500">
                    <ImageIconPlaceholder className="h-24 w-24" />
                  </div>
                )}
              </div>

              {/* Bagian Info & Aksi */}
              <div className="flex w-full flex-1 flex-col border-t border-border bg-card text-card-foreground sm:h-full sm:w-[40%] sm:border-t-0 sm:border-l min-h-0">
                <div className="p-4 border-b border-border flex-shrink-0">
                  <div className="flex items-center space-x-3">
                    <UserCircle2 className="h-9 w-9 text-muted-foreground rounded-full" />
                    <div>
                      <span className="font-semibold text-sm block">
                        adxxya30
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    <span className="font-semibold text-sm mr-1">adxxya30</span>
                    {detailedItem.description || item.title}
                  </p>
                  <time
                    dateTime={detailedItem.date}
                    className="block text-xs text-muted-foreground hover:underline pt-1"
                  >
                    {formatDate(detailedItem.date)}
                  </time>
                  {detailedItem.categories &&
                    detailedItem.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {detailedItem.categories.map((category) => (
                          <Badge key={category._id} variant="secondary">
                            {category.title}
                          </Badge>
                        ))}
                      </div>
                    )}
                </div>
                <div className="p-4 border-t border-border space-y-3 bg-background/50 sm:bg-transparent flex-shrink-0">
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-1 sm:space-x-2">
                      <motion.div whileTap={{ scale: 0.9 }}>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setIsLiked(!isLiked)}
                          aria-label={isLiked ? "Unlike" : "Like"}
                        >
                          <Heart
                            className={cn(
                              "h-6 w-6 transition-colors",
                              isLiked
                                ? "fill-red-500 text-red-500"
                                : "text-foreground hover:text-red-500/80"
                            )}
                          />
                        </Button>
                      </motion.div>
                      <Button variant="ghost" size="icon" aria-label="Comment">
                        <MessageSquare className="h-6 w-6 text-foreground hover:text-foreground/80" />
                      </Button>
                      <Button variant="ghost" size="icon" aria-label="Share">
                        <Share2 className="h-6 w-6 text-foreground hover:text-foreground/80" />
                      </Button>
                    </div>
                    <motion.div whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsSaved(!isSaved)}
                        aria-label={isSaved ? "Unsave" : "Save"}
                      >
                        <Bookmark
                          className={cn(
                            "h-6 w-6 transition-colors",
                            isSaved
                              ? "fill-foreground text-foreground"
                              : "text-foreground hover:text-foreground/80"
                          )}
                        />
                      </Button>
                    </motion.div>
                  </div>
                  <div className="flex items-center pt-2 border-t border-border">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground py-1"
                      aria-label="Add a comment"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary/80 font-semibold"
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
