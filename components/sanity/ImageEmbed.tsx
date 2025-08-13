"use client";

import { urlFor } from "@/lib/sanity/image";
import "@/styles/image-zoom.css";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

interface SanityImageValue {
  _key: string;
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
    metadata?: {
      lqip?: string;
      dimensions?: {
        width: number;
        height: number;
        aspectRatio: number;
      };
    };
  };
  caption?: string;
  alt?: string;
}

export function ImageEmbed({ value }: { value: SanityImageValue }) {
  if (!value?.asset?._ref) return null;

  const blurDataURL = value.asset.metadata?.lqip;
  const aspectRatio = value.asset.metadata?.dimensions?.aspectRatio || 16 / 9;

  return (
    <figure className="my-8">
      <div
        className="relative w-full overflow-hidden rounded-lg"
        style={{
          aspectRatio: `${aspectRatio}`,
        }}
      >
        <Zoom zoomMargin={40}>
          <Image
            src={urlFor(value).width(1600).url()}
            alt={value.alt || "Blog post image"}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 800px"
            placeholder={blurDataURL ? "blur" : "empty"}
            blurDataURL={blurDataURL}
          />
        </Zoom>
      </div>
      {value.caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}
