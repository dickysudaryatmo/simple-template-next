import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add other Next.js config options here if you have them.
  
  webpack: (config, { isServer }) => {
    // We want to polyfill 'fs' for the client-side bundle.
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback, // Spread existing fallback to avoid overwriting it
        fs: false, // Provide a mock for the 'fs' module
      };
    }

    return config;
  },
};

export default nextConfig;