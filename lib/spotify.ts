import axios from "axios";
import querystring from "querystring";

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const token = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
// --- PERBAIKAN: Gunakan endpoint Spotify API yang sebenarnya ---
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

// Interface SpotifyData tidak perlu di-export jika hanya digunakan di file ini
interface SpotifyData {
  is_playing: boolean;
  item?: {
    name: string;
    album: {
      name: string;
      artists: Array<{ name: string }>;
      images: [{ url: string }];
    };
    external_urls: {
      spotify: string;
    };
  };
  currently_playing_type: string;
}

export interface NowPlayingData {
  isPlaying: boolean;
  title?: string;
  album?: string;
  artist?: string;
  durationMs?: number;
  albumImageUrl?: string;
  songUrl?: string;
}

interface RecentlyPlayedItem {
  track: {
    name: string;
    album: {
      name: string;
      artists: Array<{ name: string }>;
      images: [{ url: string }];
    };
    external_urls: {
      spotify: string;
    };
  };
  played_at: string;
}

interface RecentlyPlayedResponse {
  items: RecentlyPlayedItem[];
}

export interface recentlyPlayedData {
  title: string;
  album: string;
  artist: string;
  albumImageUrl: string;
  songUrl: string;
  playedAt: string;
}

export const getAccessToken = async (): Promise<string> => {
  try {
    const response = await axios.post<{ access_token: string }>(
      TOKEN_ENDPOINT,
      querystring.stringify({
        grant_type: "refresh_token",
        refresh_token,
      }),
      {
        headers: {
          Authorization: `Basic ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw new Error("Failed to get Spotify access token");
  }
};

export const getNowPlaying = async (): Promise<NowPlayingData> => {
  const access_token = await getAccessToken();

  try {
    const response = await axios.get<SpotifyData>(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (
      response.status === 204 ||
      response.data.currently_playing_type !== "track" ||
      !response.data.item
    ) {
      return { isPlaying: false };
    }

    return {
      isPlaying: response.data.is_playing,
      title: response.data.item.name,
      album: response.data.item.album.name,
      artist: response.data.item.album.artists
        .map((artist) => artist.name)
        .join(", "),
      albumImageUrl: response.data.item.album.images[0].url,
      songUrl: response.data.item.external_urls.spotify,
    };
  } catch (error) {
    // Axios error handling untuk 204 bisa disederhanakan karena response.status sudah dicek
    if (axios.isAxiosError(error) && error.response?.status === 204) {
      return { isPlaying: false };
    }
    // Tidak perlu throw error di sini jika kita ingin API route yang menanganinya
    console.error("Error fetching now playing:", error);
    return { isPlaying: false };
  }
};

export const getRecentlyPlayed = async (
  limit = 3
): Promise<recentlyPlayedData[]> => {
  const access_token = await getAccessToken();

  try {
    const response = await axios.get<RecentlyPlayedResponse>(
      RECENTLY_PLAYED_ENDPOINT,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          limit,
        },
      }
    );

    return response.data.items.map((item) => ({
      title: item.track.name,
      album: item.track.album.name,
      artist: item.track.album.artists.map((artist) => artist.name).join(", "),
      albumImageUrl: item.track.album.images[0].url,
      songUrl: item.track.external_urls.spotify,
      playedAt: item.played_at,
    }));
  } catch (error) {
    console.error("Error fetching recently played tracks:", error);
    return []; // Kembalikan array kosong jika gagal
  }
};
