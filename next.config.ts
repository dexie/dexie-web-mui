import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/cloud/docs/:path*",
        destination: "/docs/cloud/:path*",
        permanent: false,
      },
      {
        source: "/cloud",
        destination: "/product",
        permanent: false,
      },
      {
        source: "/docs/cloud/pricing",
        destination: "/pricing",
        permanent: false,
      },
      {
        source: "/cloud/pricing",
        destination: "/pricing",
        permanent: false,
      },
    ]
  },
}

export default nextConfig
