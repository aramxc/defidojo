import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Monaco Editor webpack config
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        'crypto': false,
      };
    }
  },
};

export default nextConfig;
