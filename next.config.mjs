// next.config.mjs（ESM）
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/works/swift-revise', destination: '/works/studyflow', permanent: true },
      { source: '/works/portfolio-site-v1', destination: 'https://portfolio-site-ver1.vercel.app/', permanent: true },
    ];
  },
  images: {
    qualities: [70, 75, 80, 90],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'via.placeholder.com', pathname: '/**' },
    ],
  },
};
export default nextConfig;
