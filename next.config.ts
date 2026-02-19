import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Google profile pictures (used when signing in with Google)
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      // Facebook profile pictures
      {
        protocol: "https",
        hostname: "graph.facebook.com",
      },
    ],
  },
};

export default nextConfig;
