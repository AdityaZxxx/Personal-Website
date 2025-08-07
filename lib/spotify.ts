import { Buffer } from "buffer";

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

interface SpotifyTokenResponse {
  access_token: string;
}

async function getAccessToken() {
  if (!refresh_token) {
    throw new Error(
      "Spotify refresh token is missing from environment variables."
    );
  }

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch access token: ${response.statusText}`);
  }

  const data = (await response.json()) as SpotifyTokenResponse;
  return data.access_token;
}

export interface NowPlayingData {
  isPlaying: boolean;
  songUrl?: string;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
}

export async function getNowPlaying(): Promise<NowPlayingData> {
  try {
    const access_token = await getAccessToken();

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
    });

    if (response.status === 204 || response.status > 400) {
      return { isPlaying: false };
    }

    const song = await response.json();
    if (!song || !song.item) {
      return { isPlaying: false };
    }

    return {
      isPlaying: song.is_playing,
      songUrl: song.item.external_urls.spotify,
      title: song.item.name,
      artist: song.item.artists.map((_artist: any) => _artist.name).join(", "),
      albumImageUrl: song.item.album.images[0]?.url,
    };
  } catch (error) {
    console.error("Error fetching from Spotify API:", error);
    return { isPlaying: false };
  }
}
