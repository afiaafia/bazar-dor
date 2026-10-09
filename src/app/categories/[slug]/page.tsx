export const instant = false;

import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, PackageSearch } from "lucide-react";
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
    allProducts = await getProducts();
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

  // Use the category endpoint when it returns data; otherwise filter the full list.
  const filteredProducts =
    products.length > 0
      ? products
      : allProducts.filter((product) => product.category === slug);

  return (
    <>
      <SiteHeader />
      <main className="catalog-page">
        <div className="catalog-container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">হোম</Link>
            <ChevronRight size={15} />
            <Link href="/categories">ক্যাটাগরি</Link>
            <ChevronRight size={15} />
            <span>{categoryName}</span>
          </nav>

          <section className="category-detail-hero">
            <span className="category-detail-emoji" aria-hidden="true">
              {visual.emoji}
            </span>
            <div>
              <span className="catalog-eyebrow">পণ্যের ক্যাটাগরি</span>
              <h1>{categoryName}</h1>
              <p>এই ক্যাটাগরির পণ্যের বর্তমান বাজারদর তুলনা করুন।</p>
            </div>
            <span className="category-detail-count">
              {filteredProducts.length.toLocaleString("bn-BD")} টি পণ্য
            </span>
          </section>

          <section className="catalog-section">
            <div className="catalog-section-heading">
              <div>
                <span className="catalog-eyebrow">আজকের বাজার</span>
                <h2>{categoryName} — পণ্যের তালিকা</h2>
              </div>
            </div>

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
          </section>
        </div>
      </main>
    </>
  );
}
