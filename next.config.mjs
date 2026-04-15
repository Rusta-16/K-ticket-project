/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true // обязательно для статического экспорта
  },
  reactCompiler: true,
};

export default nextConfig;
