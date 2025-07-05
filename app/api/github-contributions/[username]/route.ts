import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // or use 'auto' with revalidation

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  const apiUrl = `https://github-contributions-api.jogruber.de/v4/${username}`;

  try {
    const cacheKey = `github_contrib_${username}`;
    const cached = await fetch(apiUrl, {
      next: {
        revalidate: 60 * 60 * 6, // cache 6 jam
        tags: [cacheKey],
      },
    });

    if (!cached.ok) {
      throw new Error("Failed to fetch GitHub contribution data");
    }

    const data = await cached.json();

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
}
