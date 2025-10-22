import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/cloud/docs/:path*",
        destination: "/docs/cloud/:path*",
        permanent: false,
      },
    ]
  },
}

export default nextConfig
