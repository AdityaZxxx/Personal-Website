/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimasi SEO
  siteUrl: "https://adxxya30.vercel.app",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.7,

  // Optimasi Gambar
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "**",
      },
    ],
    minimumCacheTTL: 60, // 60 detik cache untuk gambar
    formats: ["image/webp"], // Otomatis konversi ke WebP
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Ukuran device
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Ukuran gambar
  },

  // Optimasi Kompresi
  compress: true,

  // Optimasi Caching
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
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
          key: "Cache-Control",
          value: "public, max-age=3600, stale-while-revalidate=86400",
        },
      ],
    },
  ],

  // Optimasi Build & Runtime
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: false, // Matikan sourcemap di production
  optimizeFonts: true,
  staticPageGenerationTimeout: 60, // Timeout 60 detik untuk static generation

  // Fitur Experimental
  experimental: {
    turbo: true,
    serverActions: true, // Aktifkan Server Actions
    optimizeCss: true, // Optimasi CSS
    scrollRestoration: true, // Restore scroll position
    workerThreads: true, // Gunakan worker threads
    nextScriptWorkers: true, // Optimasi script loading
    gzipSize: true, // Laporkan ukuran gzip
  },

  // Optimasi On-Demand ISR
  onDemandEntries: {
    maxInactiveAge: 60 * 1000, // 1 menit
    pagesBufferLength: 10,
  },

  // Webpack Configuration
  webpack: (config, { isServer, dev }) => {
    // Optimasi khusus untuk Sanity
    if (isServer) {
      config.externals.push("@sanity/server");
    }

    // Optimasi bundle analyzer (hanya development)
    if (process.env.ANALYZE) {
      const withBundleAnalyzer = require("@next/bundle-analyzer")({
        enabled: true,
      });
      config = withBundleAnalyzer(config);
    }

    // Optimasi module federation (jika diperlukan)
    config.plugins.push(
      new (require("webpack").container.ModuleFederationPlugin)({
        name: "frontend",
        remotes: {},
        shared: {},
      })
    );

    return config;
  },

  // Redirect dan Rewrite (contoh)
  async redirects() {
    return [
      {
        source: "/old-blog/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
    ];
  },

  // Internationalization (jika diperlukan)
  i18n: {
    locales: ["en", "id"],
    defaultLocale: "en",
    localeDetection: true,
  },
};

// Konfigurasi untuk bundle analyzer
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
