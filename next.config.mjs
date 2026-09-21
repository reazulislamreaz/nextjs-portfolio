/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const staticAssetCache = [
  {
    key: "Cache-Control",
    value: "public, max-age=31536000, immutable",
  },
];

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Include ~2× of hero CSS widths (352–448px) so Retina picks a sharp candidate
    deviceSizes: [640, 750, 828, 896, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 448],
    qualities: [75, 88, 92],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    optimizePackageImports: ["react-icons", "lucide-react", "gsap"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/:path*(svg|jpg|jpeg|png|gif|webp|avif|ico|woff2)",
        headers: staticAssetCache,
      },
      {
        source:
          "/Reazul_Islam_Reaz_Full_Stack_Engineer_Resume.pdf",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
