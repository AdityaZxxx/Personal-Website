// next.config.js
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Core Optimization Settings
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,
  staticPageGenerationTimeout: 120,
  output: "standalone",

  // Image Optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
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
    optimizePackageImports: ["@sanity/client", "react-icons"],
    serverComponentsExternalPackages: ["@sanity/client"],
    optimizeServerReact: true,
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
      maxSize: 244 * 1024,
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
      script-src 'self' 'unsafe-inline' 'unsafe-eval' *.vercel.app;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: blob: cdn.sanity.io;
      font-src 'self';
      connect-src 'self' *.sanity.io vitals.vercel-insights.com;
      frame-src 'self' *.youtube-nocookie.com;
    `.replace(/\s+/g, " "),
  },
];

module.exports = withBundleAnalyzer(nextConfig);
