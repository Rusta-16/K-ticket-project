/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xn----clcqoiid5avq1l.xn--p1ai',
      },
      {
        protocol: 'https',
        hostname: 'www.xn----clcqoiid5avq1l.xn--p1ai',
      },
    ],
  },
  reactCompiler: true,
}

export default nextConfig