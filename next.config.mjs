// next.config.mjs（ESM）
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: '/works/swift-revise', destination: '/works/studyflow', permanent: true }];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'via.placeholder.com', pathname: '/**' },
    ],
  },
};
export default nextConfig;
