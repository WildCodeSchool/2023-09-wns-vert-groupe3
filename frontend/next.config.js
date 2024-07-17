/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "via.placeholder.com",
      "*.unsplash.com",
      "localhost",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "**.burton.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "**.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "**/localhost/**",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
