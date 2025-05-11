"use client";

import { urlForImage } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";
import Image, { type ImageProps } from "next/image";
import { useEffect, useMemo, useState } from "react";

// Base64 encoded 1x1 transparent pixel as fallback
const DEFAULT_PLACEHOLDER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

interface BlurImageProps extends Omit<ImageProps, "src" | "alt"> {
  image: any; // Accepts both Sanity image object and URL string
  alt: string;
  sizes?: string;
  className?: string;
  fill?: boolean;
  quality?: number;
  priority?: boolean;
  ratio?: number; // Optional aspect ratio (e.g., 16/9)
}

export function BlurImage({
  image,
  alt,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  className,
  fill = false,
  quality = 80,
  priority = false,
  ratio,
  ...props
}: BlurImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [src, setSrc] = useState<string>("");
  const [blurDataURL, setBlurDataURL] = useState<string>(DEFAULT_PLACEHOLDER);

  // Generate blur placeholder
  const generatedBlurDataURL = useMemo(() => {
    if (typeof image === "string") {
      return DEFAULT_PLACEHOLDER;
    }
    return (
      urlForImage(image)?.width(20).height(20).blur(10).quality(20).url() ||
      DEFAULT_PLACEHOLDER
    );
  }, [image]);

  useEffect(() => {
    let isMounted = true;

    const loadImage = async () => {
      try {
        // Handle direct URL strings
        if (typeof image === "string") {
          if (isMounted) {
            setSrc(image);
            setBlurDataURL(DEFAULT_PLACEHOLDER);
          }
          return;
        }

        // Handle Sanity image objects
        if (!image?.asset?._ref) {
          throw new Error("Invalid Sanity image reference");
        }

        const imageUrl = urlForImage(image)?.quality(quality).url();
        if (!imageUrl) throw new Error("Failed to generate image URL");

        if (isMounted) {
          setSrc(imageUrl);
          setBlurDataURL(generatedBlurDataURL);
        }
      } catch (error) {
        console.error("Image loading error:", error);
        if (isMounted) {
          setSrc("/placeholder.svg");
          setBlurDataURL(DEFAULT_PLACEHOLDER);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadImage();

    return () => {
      isMounted = false;
    };
  }, [image, quality, generatedBlurDataURL]);

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
                aspectRatio: ratio
                  ? ratio.toString()
                  : props.width && props.height
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
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
        quality={quality}
        priority={priority}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        className={cn(
          "object-cover duration-700 ease-in-out",
          isLoading ? "scale-105 blur-sm" : "scale-100 blur-0",
          className
        )}
        onLoad={(e) => {
          setIsLoading(false);
          props.onLoad?.(e);
        }}
        onError={(e) => {
          setSrc("/placeholder.svg");
          setIsLoading(false);
          props.onError?.(e);
        }}
        {...props}
      />
    </div>
  );
}
