import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'], // add any external image domains if needed like AWS S3
  },
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
    return config;
  },
};

export default nextConfig;
