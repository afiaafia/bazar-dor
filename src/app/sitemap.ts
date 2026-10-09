import type { MetadataRoute } from "next";
import { CATEGORY_ITEMS } from "@/constants/categories";

function getBaseUrl() {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.BETTER_AUTH_URL ??
    "http://localhost:3000";

  return url.replace(/\/+$/, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  const staticRoutes = [
    "",
    "/categories",
    "/signin",
    "/signup",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.6,
  }));

  const categoryEntries: MetadataRoute.Sitemap = CATEGORY_ITEMS.map(
    (category) => ({
      url: `${baseUrl}/categories/${category.slug}`,
      changeFrequency: "weekly",
      priority: 0.7,
    }),
  );

  return [...staticEntries, ...categoryEntries];
}
