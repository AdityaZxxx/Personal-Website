"use client";

import { urlForImage } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";
import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

interface BlurImageProps extends Omit<ImageProps, "src" | "alt"> {
  image: any; // Sanity image reference
  alt: string;
  sizes?: string;
  className?: string;
  fill?: boolean;
  quality?: number;
  priority?: boolean;
}

export function BlurImage({
  image,
  alt,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  className,
  fill = false,
  quality = 80,
  priority = false,
  ...props
}: BlurImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [src, setSrc] = useState<string | null>(null);
  const [blurDataURL, setBlurDataURL] = useState<string | null>(null);

  useEffect(() => {
    if (!image?.asset?._ref) return;

    // Generate the full-size image URL
    const imageUrl = urlForImage(image).quality(quality).url();
    setSrc(imageUrl);

    // Generate a tiny placeholder image for the blur effect
    const placeholderUrl = urlForImage(image)
      .width(20)
      .height(20)
      .blur(10)
      .quality(20)
      .url();

    setBlurDataURL(placeholderUrl);
  }, [image, quality]);

  if (!src) {
    return (
      <div
        className={cn(
          "bg-muted animate-pulse rounded-md",
          fill ? "absolute inset-0" : "relative",
          className
        )}
        style={
          !fill
            ? {
                aspectRatio:
                  props.width && props.height
                    ? `${props.width}/${props.height}`
                    : "16/9",
              }
            : {}
        }
      />
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden",
        fill ? "relative h-full w-full" : "relative",
        className
      )}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill={fill}
        sizes={sizes}
        quality={quality}
        priority={priority}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL || undefined}
        className={cn(
          "object-cover duration-700 ease-in-out",
          isLoading ? "scale-105 blur-sm" : "scale-100 blur-0",
          className
        )}
        onLoadingComplete={() => setIsLoading(false)}
        {...props}
      />
    </div>
  );
}
