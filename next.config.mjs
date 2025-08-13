import withBundleAnalyzer from "@next/bundle-analyzer";
import { withNextVideo } from "next-video/process";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "origin-when-cross-origin" },
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel.app https://giscus.app https://cloud.umami.is;
      style-src 'self' 'unsafe-inline' https://giscus.app;
      img-src 'self' data: blob: https://cdn.sanity.io https://images.unsplash.com https://pbs.twimg.com;
      media-src 'self' https://cdn.sanity.io https://lh3.googleusercontent.com;
      font-src 'self';
      connect-src 'self' https://*.sanity.io https://vitals.vercel-insights.com https://github-contributions-api.jogruber.de https://cloud.umami.is;
      frame-src 'self' https://*.youtube-nocookie.com https://giscus.app;
    `.replace(/\s+/g, " "),
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  staticPageGenerationTimeout: 120,
  output: "standalone",

  // eslint: { ignoreDuringBuilds: process.env.NODE_ENV !== "production" },
  // typescript: { ignoreBuildErrors: process.env.NODE_ENV !== "production" },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "i.scdn.co", pathname: "/image/**" },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        pathname: "/profile_images/**",
      },
    ],
    minimumCacheTTL: 2592000, // 30 days
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [32, 64, 96, 128, 256],
  },

  // async headers() {
  //   return [
  //     { source: "/(.*)", headers: securityHeaders },
  //     {
  //       source: "/_next/static/(.*)",
  //       headers: [
  //         {
  //           key: "Cache-Control",
  //           value: "public, max-age=31536000, immutable",
  //         },
  //       ],
  //     },
  //   ];
  // },

  turbopack: {
    rules: {
      "*.jpg": ["image-loader"],
      "*.png": ["image-loader"],
      "*.svg": ["svg-loader"],
      "*.mp4": ["video-loader"],
      "*.mp4": ["file-loader"],
    },
  },
};

export default bundleAnalyzer(withNextVideo(nextConfig));
