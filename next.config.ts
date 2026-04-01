import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  images: {
    remotePatterns: [new URL("https://blogger.googleusercontent.com/img/**")],
  },
};

export default nextConfig;
