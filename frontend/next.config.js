/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com"],
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
      }
    ],
  },
};

module.exports = nextConfig;
