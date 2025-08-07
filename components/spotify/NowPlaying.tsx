import { getNowPlaying, NowPlayingData } from "@/lib/spotify";
import { Music } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SiSpotify } from "react-icons/si";

export default async function NowPlaying() {
  const data: NowPlayingData = await getNowPlaying();

  if (!data.isPlaying || !data.songUrl) {
    return (
      <div className="flex items-center gap-3 rounded-md px-3 py-2">
        <SiSpotify className="text-green-500" />
        <p className="text-sm text-neutral-400">Not Listening - Spotify</p>
      </div>
    );
  }

  return (
    <Link
      href={data.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-neutral-900"
    >
      {data.albumImageUrl ? (
        <Image
          src={data.albumImageUrl}
          alt={data.title || "Album cover"}
          width={40}
          height={40}
          className="rounded-sm"
        />
      ) : (
        <Music className="h-10 w-10 text-neutral-500" />
      )}
      <div className="flex flex-col overflow-hidden">
        <p className="truncate font-semibold text-primary/80 hover:text-primary transition-colors">
          {data.title}
        </p>
        <p className="truncate text-sm text-muted-foreground">{data.artist}</p>
      </div>
      <div className="ml-auto">
        <SiSpotify className="text-green-500 animate-spin-slow" />
      </div>
    </Link>
  );
}
