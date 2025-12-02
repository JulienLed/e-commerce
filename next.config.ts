import type { NextConfig } from "next";

const hostnames = ["lh3.googleusercontent.com", "images.pexels.com"];

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: hostnames.map((hostname) => ({
      protocol: "https",
      hostname,
    })),
  },
};

export default nextConfig;
