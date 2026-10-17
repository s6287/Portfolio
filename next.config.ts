import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [{ source: "/work/attenview", destination: "/work/supplier-journey-crm", permanent: true }];
  },
};

export default nextConfig;
