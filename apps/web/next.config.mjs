/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@notebook/ui"],
  experimental: {
    // typedRoutes: true, // TODO: Enable this after Next.js 15.1.3
    typedEnv: true,
  },
};

export default nextConfig;
