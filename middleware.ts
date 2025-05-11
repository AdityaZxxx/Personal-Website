import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const res = NextResponse.next();

  // Hide Footer di /studio
  if (pathname.startsWith("/studio")) {
    res.headers.set("x-hide-footer", "true");
  }

  // Hide AIChatWidget di /blog/[slug]
  const blogDetailRegex = /^\/blog\/[^\/]+$/;
  if (blogDetailRegex.test(pathname)) {
    res.headers.set("x-hide-aichat", "true");
  }

  return res;
}

// Middleware hanya aktif di URL tertentu
export const config = {
  matcher: ["/studio/:path*", "/blog/:slug*"],
};
