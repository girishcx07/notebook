/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@notebook/ui"],
  experimental: {
    typedEnv: true,
    mcpServer: true,
  },
  typedRoutes: true,
  reactCompiler: true,
};

export default nextConfig;
