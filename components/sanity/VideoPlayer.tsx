"use client";

import { urlForFile } from "@/lib/sanity/file";
import Video from "next-video";

interface VideoEmbedValue {
  videoFile: {
    asset: {
      _ref: string;
    };
  };
  caption?: string;
  autoplay?: boolean;
  loop?: boolean;
}

export function VideoPlayer({ value }: { value: VideoEmbedValue }) {
  if (!value?.videoFile?.asset?._ref) {
    return <p>Video not found.</p>;
  }

  const videoUrl = urlForFile(value.videoFile);
  const posterUrl = urlForFile(value.videoFile.asset);

  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-lg border border-background">
        <Video
          src={videoUrl}
          className="h-auto w-full"
          poster={posterUrl}
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
