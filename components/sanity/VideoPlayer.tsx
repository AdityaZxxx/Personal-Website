"use client";

import { urlForFile } from "@/lib/sanity/file";
import Video from "next-video";

interface VideoEmbedValue {
  videoFile: {
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
  };
  caption?: string;
  autoplay?: boolean;
  loop?: boolean;
}

export function VideoPlayer({ value }: { value: VideoEmbedValue }) {
  if (!value?.videoFile.asset?._ref) return null;

  const videoUrl = urlForFile(value.videoFile);
  const aspectRatio =
    value.videoFile.asset.metadata?.dimensions?.aspectRatio || 16 / 9;

  return (
    <figure className="my-8">
      <div
        className="relative w-full overflow-hidden rounded-lg border border-border"
        style={{ aspectRatio: `${aspectRatio}` }}
      >
        <Video
          src={videoUrl}
          className="h-full w-full object-contain"
          autoPlay={value.autoplay}
          loop={value.loop}
          muted={value.autoplay}
        />
      </div>
      {value.caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}
