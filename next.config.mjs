/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      type: "asset/resource", // Treat SVGs as static assets
    });
    return config;
  },
};

export default nextConfig;
