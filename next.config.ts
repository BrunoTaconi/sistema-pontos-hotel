import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Adiciona esta seção para ignorar todos os erros de TypeScript durante o build
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
