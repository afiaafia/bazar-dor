export const instant = false;

import Link from "next/link";
import { notFound } from "next/navigation";
import { PackageSearch } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { CategoryProductList } from "@/components/products/category-product-list";
import { CATEGORY_ITEMS, getCategoryVisual } from "@/constants/categories";
import { getCategories, getProducts, getProductsByCategory } from "@/lib/api";
import type { Category, Product } from "@/types/product";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let categories: Category[] = [];
  let products: Product[] = [];
  let allProducts: Product[] = [];
  let apiFailed = false;

  try {
    [categories, products] = await Promise.all([
      getCategories(),
      getProductsByCategory(slug),
    ]);

    if (products.length === 0) {
      allProducts = await getProducts();
    }
  } catch {
    apiFailed = true;
    try {
      allProducts = await getProducts();
    } catch {
      allProducts = [];
    }
  }

  const apiCategory = categories.find(
    (category) => category.slug === slug || category.id === slug,
  );
  const localCategory = CATEGORY_ITEMS.find((category) => category.slug === slug);

  if (!apiCategory && !localCategory) notFound();

  const visual = getCategoryVisual(slug);
  const categoryName = apiCategory?.nameBn ?? localCategory?.name ?? visual.name;

  const filteredProducts =
    products.length > 0
      ? products
      : allProducts.filter((product) => product.category === slug);

  const totalProducts = filteredProducts.length.toLocaleString("bn-BD");

  return (
    <>
      <SiteHeader />
      <main className="catalog-page fo-category-page">
        <div className="catalog-container fo-category-container">
          <section className="fo-category-header">
            <div className="fo-category-icon" aria-hidden="true">
              {visual.emoji}
            </div>

            <div className="fo-category-heading">
              <h1>{categoryName}</h1>
              <p>{totalProducts}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
            </div>
          </section>

          {apiFailed && filteredProducts.length === 0 ? (
            <div className="catalog-state" role="status">
              <h3>তথ্য লোড করা যায়নি</h3>
              <p>সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="catalog-state">
              <PackageSearch size={30} />
              <h3>এই ক্যাটাগরিতে পণ্য পাওয়া যায়নি</h3>
              <p>অন্য ক্যাটাগরি দেখুন অথবা পরে আবার চেষ্টা করুন।</p>
              <Link href="/" className="catalog-action-link">
                হোম পেজে ফিরে যান
              </Link>
            </div>
          ) : (
            <CategoryProductList products={filteredProducts} />
          )}
        </div>
      </main>
    </>
  );
}
