import { NextRequest, NextResponse } from "next/server";
import { getNowPlaying, getRecentlyPlayed } from "../../../lib/spotify";

// Gunakan 'export async function GET', bukan default export
export async function GET(request: NextRequest) {
  try {
    // Ambil searchParams dari URL, bukan dari req.query
    const { searchParams } = request.nextUrl;
    const type = searchParams.get("type");
    const limit = searchParams.get("limit");

    if (type === "now-playing") {
      const data = await getNowPlaying();
      // Gunakan NextResponse.json() untuk mengirim respons
      return NextResponse.json(data, { status: 200 });
    }

    if (type === "recently-played") {
      const parsedLimit = Number(limit) || 3;
      const data = await getRecentlyPlayed(parsedLimit);
      return NextResponse.json(data, { status: 200 });
    }

    return NextResponse.json(
      {
        error:
          "Bad Request: Missing or invalid 'type' parameter. Use 'now-playing' or 'recently-played'.",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Internal API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
