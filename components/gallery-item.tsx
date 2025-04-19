"use client";

import { BlurImage } from "@/components/blur-image";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { urlForImage } from "@/lib/sanity/image";
import { formatDate } from "@/lib/utils";
import { Bookmark, Heart, MessageSquare, Play, Share2 } from "lucide-react";
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
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const thumbnailImage =
    item.mediaType === "image" ? item.image : item.videoThumbnail;

  return (
    <>
      {/* Gallery Thumbnail */}
      <div
        className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer bg-black"
        onClick={() => setIsOpen(true)}
      >
        {thumbnailImage ? (
          <BlurImage
            image={thumbnailImage}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
            <span className="text-muted-foreground">No media</span>
          </div>
        )}

        {/* Video Indicator */}
        {item.mediaType === "video" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-black/50 p-2 backdrop-blur-sm">
              <Play className="h-6 w-6 text-white fill-white" />
            </div>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-between p-3">
          <div className="flex justify-end w-full">
            <div className="flex gap-2">
              <span className="text-white text-sm font-medium flex items-center">
                <Heart className="h-4 w-4 mr-1" /> 0
              </span>
              <span className="text-white text-sm font-medium flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" /> 0
              </span>
            </div>
          </div>

          <div>
            {item.categories && item.categories.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-1">
                {item.categories.map((category) => (
                  <Badge
                    key={category._id}
                    variant="secondary"
                    className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                  >
                    {category.title}
                  </Badge>
                ))}
              </div>
            )}
            <h3 className="text-white font-medium line-clamp-2">
              {item.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Instagram-like Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-6xl w-full h-[90vh] p-0 overflow-hidden rounded-none sm:rounded-lg">
          <div className="flex flex-col sm:flex-row h-full w-full">
            {/* Media Section */}
            <div className="relative w-full sm:w-3/5 bg-black flex items-center justify-center">
              {item.mediaType === "image" && item.image ? (
                <BlurImage
                  image={item.image}
                  alt={item.title}
                  width={1200}
                  height={1200}
                  className="w-full h-full object-contain"
                  priority
                />
              ) : item.mediaType === "video" && item.video ? (
                <video
                  src={item.video}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  poster={
                    item.videoThumbnail
                      ? urlForImage(item.videoThumbnail)?.url()
                      : undefined
                  }
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <span className="text-muted-foreground">
                    No media available
                  </span>
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="w-full sm:w-2/5 flex flex-col border-t sm:border-t-0 sm:border-l border-gray-200 dark:border-gray-800">
              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Caption */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600"></div>
                    <div>
                      <span className="font-semibold">adxxya30</span>
                      <p className="text-sm">
                        {item.description || item.title}
                      </p>
                    </div>
                  </div>

                  <time
                    dateTime={item.date}
                    className="block text-xs text-gray-500 dark:text-gray-400"
                  >
                    {formatDate(item.date)}
                  </time>
                </div>

                {/* Categories */}
                {item.categories && item.categories?.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.categories.map((category) => (
                      <Badge
                        key={category._id}
                        variant="outline"
                        className="text-xs"
                      >
                        {category.title}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
                <div className="flex justify-between">
                  <div className="flex space-x-4">
                    <button onClick={() => setIsLiked(!isLiked)}>
                      <Heart
                        className={`h-6 w-6 ${
                          isLiked
                            ? "fill-red-500 text-red-500"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      />
                    </button>
                    <button>
                      <MessageSquare className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                    </button>
                    <button>
                      <Share2 className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                    </button>
                  </div>
                  <button onClick={() => setIsSaved(!isSaved)}>
                    <Bookmark
                      className={`h-6 w-6 ${
                        isSaved
                          ? "fill-current text-gray-700 dark:text-gray-300"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    />
                  </button>
                </div>

                <div className="text-sm font-semibold">296 likes</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(item.date)}
                </div>

                {/* Comment Input */}
                <div className="flex items-center pt-2 border-t border-gray-200 dark:border-gray-800">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 bg-transparent text-sm outline-none"
                  />
                  <button className="text-blue-500 font-semibold text-sm">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
