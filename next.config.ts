import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Garante que o Next.js não trate automaticamente o i18n
  // pois estamos usando middleware customizado
  trailingSlash: false,
  images: {
    qualities: [100, 75],
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);

export default withBundleAnalyzer(nextConfig);
