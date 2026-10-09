import type { Category, Product } from "@/types/product";

const API_BASE_URL =
  process.env.BAZAR_DOR_API_URL ??
  "https://api.api-store.workers.dev/api/bazardor";

async function fetchApi<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Bazar Dor API request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<T>;
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
