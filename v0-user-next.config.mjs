/** @type {import('next').NextConfig} */
const nextConfig = {
  siteUrl: "https://adxxya30.vercel.app",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.7,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "**",
      },
    ],
  },
  experimental: {
    turbo: true,
  },
  onDemandEntries: {
    maxInactiveAge: 60 * 1000, // 1 menit
    pagesBufferLength: 10,
  },
  // Add webpack configuration for Sanity Studio files
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("@sanity/server");
    }
    return config;
  },
};

export default nextConfig;
