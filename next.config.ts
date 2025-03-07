import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['i.annihil.us'],
  },
  experimental: {
    swcPlugins: [],
  },
};

export default nextConfig;
