import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.BETTER_AUTH_URL ??
    "http://localhost:3000"
  ).replace(/\/+$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/categories/"],
      disallow: [
        "/profile/",
        "/products/",
        "/product/",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
