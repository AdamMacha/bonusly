import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
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
    ];
  },
};

export default nextConfig;
