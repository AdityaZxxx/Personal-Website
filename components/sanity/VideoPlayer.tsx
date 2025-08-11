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
}

export function VideoPlayer({ value }: { value: VideoEmbedValue }) {
  if (!value?.videoFile?.asset?._ref) {
    return <p>Video not found.</p>;
  }

  const videoUrl = urlForFile(value.videoFile);
  const posterUrl = urlForFile(value.videoFile.asset);

  return (
    <figure className="my-8 p-10">
      <div className="overflow-hidden rounded-lg border border-zinc-800">
        <Video src={videoUrl} className="w-full h-auto" poster={posterUrl} />
      </div>
      {value.caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}
