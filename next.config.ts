import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [new URL("https://amber-central-ape-305.mypinata.cloud/ipfs/**")],
  },
};

export default nextConfig;
