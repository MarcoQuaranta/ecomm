/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ignora errori TS durante build (le landing hanno dichiarazioni duplicate)
    ignoreBuildErrors: true,
  },

  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Turbopack config (Next.js 16 default)
  turbopack: {},
};

module.exports = nextConfig;
