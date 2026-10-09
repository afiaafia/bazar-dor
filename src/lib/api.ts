import type { Category, Product } from "@/types/product";

const PRIMARY_API_URL =
  process.env.BAZAR_DOR_API_URL ??
  "https://api.api-store.workers.dev/api/bazardor";

const FALLBACK_API_URL =
  "https://api.abcz.workers.dev/api/bazardor";

async function fetchApi<T>(path: string): Promise<T> {
  const apiUrls = [
    ...new Set([PRIMARY_API_URL, FALLBACK_API_URL]),
  ];

  let lastError: Error | null = null;

  for (const baseUrl of apiUrls) {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(
          `Bazar Dor API request failed: ${response.status} ${response.statusText}`,
        );
      }

      return (await response.json()) as T;
    } catch (error) {
      lastError =
        error instanceof Error
          ? error
          : new Error("Unknown API request error");
    }
  }

  throw lastError ?? new Error("All Bazar Dor API endpoints failed.");
}

export function getProducts(): Promise<Product[]> {
  return fetchApi<Product[]>("/products");
}

export function getProductsByCategory(
  categorySlug: string,
): Promise<Product[]> {
  return fetchApi<Product[]>(
    `/products?category=${encodeURIComponent(categorySlug)}`,
  );
}

export function getCategories(): Promise<Category[]> {
  return fetchApi<Category[]>("/categories");
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | null> {
  const products = await getProducts();

  return (
    products.find(
      (product) =>
        product.slug === slug || String(product.id) === slug,
    ) ?? null
  );
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  const categories = await getCategories();

  return (
    categories.find(
      (category) =>
        category.slug === slug || category.id === slug,
    ) ?? null
  );
}
