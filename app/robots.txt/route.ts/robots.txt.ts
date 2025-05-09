import { NextResponse } from "next/server";

export function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://aditya.vercel.app";

  const content = `
User-agent: *
Allow: /

Disallow: /studio
Disallow: /draft
Disallow: /api

Sitemap: ${baseUrl}/sitemap.xml
`;

  return new NextResponse(content.trim(), {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
