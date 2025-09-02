/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lgbcvwlrqkvrmbvlbxnn.supabase.co",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
}

export default nextConfig
