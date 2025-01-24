import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-managenet.s3.sa-east-1.amazonaws.com/",
        port: "",
        pathname: "/**",
      }
    ]
  }
};

export default nextConfig;
