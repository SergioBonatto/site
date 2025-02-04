import withMDX from '@next/mdx';

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  /* outras configurações */
};

export default withMDX({
  extension: /\.mdx?$/,
  ...nextConfig,
});
