import { NextConfig } from 'next';

const nextConfig: NextConfig = {
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);

export default withBundleAnalyzer(nextConfig);
