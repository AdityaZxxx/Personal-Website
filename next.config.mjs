import withBundleAnalyzer from "@next/bundle-analyzer";
import { withNextVideo } from "next-video/process";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Core Optimization Settings
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  staticPageGenerationTimeout: 120,
  output: "standalone",

  // ESLint and TypeScript (ensure these are false for production builds)
  eslint: {
    ignoreDuringBuilds: true, // Set to false for production
  },
  typescript: {
    ignoreBuildErrors: true, // Set to false for production
  },

  // Image Optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
        pathname: "/image/**",
      },
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
    minimumCacheTTL: 86400, // 1 day
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [32, 64, 96, 128, 256],
  },

  // Headers & Security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Sanity-specific Optimizations
  experimental: {
    // optimizePackageImports: ["@sanity/client", "react-icons"], // Removed: often default or no longer needed
    // serverExternalPackages: ["@sanity/client"], // Removed: often default or no longer needed
    // optimizeServerReact: true, // Removed: often default or no longer needed
    webpackBuildWorker: true,
  },

  // Webpack Customization
  webpack: (config, { isServer, dev, webpack }) => {
    // Silence critical dependency warnings
    config.module.exprContextCritical = false;

    // Optimize Sanity client
    if (!dev && isServer) {
      config.externals.push("@sanity/server");
    }

    // Better chunk splitting
    config.optimization.splitChunks = {
      chunks: "all",
      maxSize: 244 * 1024, // Consider increasing this value or removing it
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        sanity: {
          test: /[\\/]node_modules[\\/](@sanity)[\\/]/,
          name: "sanity",
          chunks: "all",
        },
      },
    };

    return config;
  },
};

// Security Headers Configuration
const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' *.vercel.app giscus.app cloud.umami.is;
      style-src 'self' 'unsafe-inline' giscus.app;
      img-src 'self' data: blob: cdn.sanity.io images.unsplash.com pbs.twimg.com;
      media-src 'self' cdn.sanity.io;
      font-src 'self';
      connect-src 'self' *.sanity.io vitals.vercel-insights.com github-contributions-api.jogruber.de cloud.umami.is;
      frame-src 'self' *.youtube-nocookie.com giscus.app;
    `.replace(/\s+/g, " "),
  },
];

export default bundleAnalyzer(withNextVideo(nextConfig));
