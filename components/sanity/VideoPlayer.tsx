"use client";

import Video from "next-video";

export function VideoPlayer({ value }: { value: any }) {
  if (!value || !value.video || value.video.length === 0) {
    return <p>Video not found.</p>;
  }

  const videoBlock = value.video[0];
  if (!videoBlock || !videoBlock.video || !videoBlock.video.asset) {
    return <p>Video asset not found.</p>;
  }

  const playbackId = videoBlock.video.asset.playbackId;
  const src = `https://stream.mux.com/${playbackId}.m3u8`;

  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-lg border border-background">
        <Video
          src={src}
          className="h-auto w-full"
          poster={`https://image.mux.com/${playbackId}/thumbnail.jpg`}
          autoPlay={videoBlock.autoplay}
          loop={videoBlock.loop}
          muted={videoBlock.autoplay}
        />
      </div>
      {videoBlock.caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {videoBlock.caption}
        </figcaption>
      )}
    </figure>
  );
}
