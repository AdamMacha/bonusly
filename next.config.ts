import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  experimental: {
    staticGenerationRetryCount: 3,
    staticGenerationMaxConcurrency: 2,
    staticGenerationMinPagesPerWorker: 50,
  },
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/logos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/blog/:file(.+\\.(?:jpg|jpeg|png|webp|avif|svg))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/kategorie/karty",
        destination: "/kategorie/banky",
        permanent: true,
      },
      {
        source: "/kategorie/privydelek",
        destination: "/kategorie/extra-prijem",
        permanent: true,
      },
      {
        source: "/slevove-kody",
        destination: "/akce-a-kupony",
        permanent: true,
      },
      {
        source: "/slevove-kupony",
        destination: "/akce-a-kupony",
        permanent: true,
      },
      {
        source: "/kupony",
        destination: "/akce-a-kupony",
        permanent: true,
      },
      {
        source: "/akce",
        destination: "/akce-a-kupony",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
