export const instant = false;

import Link from "next/link";
import { ArrowRight, ChevronRight, Layers3 } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { ProductCard } from "@/components/products/product-card";
import { CATEGORY_ITEMS } from "@/constants/categories";
import { getCategories, getProducts } from "@/lib/api";
import { getCategoryVisual } from "@/constants/categories";
import type { Category, Product } from "@/types/product";

export const metadata = {
  title: "সব ক্যাটাগরি",
  description: "নিত্যপ্রয়োজনীয় পণ্যের ক্যাটাগরি ও বাজারদর দেখুন।",
};

export default async function CategoriesPage() {
  let categories: Category[] = [];
  let products: Product[] = [];
  let failed = false;

  try {
    [categories, products] = await Promise.all([getCategories(), getProducts()]);
  } catch {
    failed = true;
  }

  const displayedCategories =
    categories.length > 0
      ? categories.map((category) => ({
          slug: category.slug || category.id,
          name: category.nameBn,
          emoji: getCategoryVisual(category.slug || category.id).emoji,
        }))
      : CATEGORY_ITEMS;

  return (
    <>
      <SiteHeader />
      <main className="catalog-page">
        <div className="catalog-container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">হোম</Link>
            <ChevronRight size={15} />
            <span>ক্যাটাগরি</span>
          </nav>

          <section className="catalog-hero">
            <span className="catalog-eyebrow"><Layers3 size={15} /> পণ্য অন্বেষণ</span>
            <h1>ক্যাটাগরি অনুযায়ী বাজারদর</h1>
            <p>আপনার প্রয়োজনীয় পণ্য খুঁজুন এবং আজকের দাম তুলনা করুন।</p>
            <div className="catalog-hero-count">
              <strong>{displayedCategories.length.toLocaleString("bn-BD")}</strong>
              <span>টি ক্যাটাগরি</span>
              <span className="catalog-count-divider" />
              <strong>{products.length.toLocaleString("bn-BD")}</strong>
              <span>টি পণ্য</span>
            </div>
          </section>

          <section className="catalog-section">
            <div className="catalog-section-heading">
              <div>
                <span className="catalog-eyebrow">ক্যাটাগরি ব্রাউজ করুন</span>
                <h2>আপনি কী খুঁজছেন?</h2>
              </div>
            </div>

            <div className="catalog-category-grid">
              {displayedCategories.map((category) => {
                const count = products.filter(
                  (product) => product.category === category.slug,
                ).length;

                return (
                  <Link
                    href={`/categories/${category.slug}`}
                    key={category.slug}
                    className="catalog-category-card"
                  >
                    <span className="catalog-category-emoji" aria-hidden="true">
                      {category.emoji}
                    </span>
                    <span className="catalog-category-copy">
                      <strong>{category.name}</strong>
                      <small>{count.toLocaleString("bn-BD")} টি পণ্য</small>
                    </span>
                    <ArrowRight size={17} className="catalog-category-arrow" />
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="catalog-section">
            <div className="catalog-section-heading">
              <div>
                <span className="catalog-eyebrow">বাজারের তালিকা</span>
                <h2>সব পণ্য</h2>
                <p>বর্তমানে API-তে পাওয়া পণ্যের দাম দেখুন।</p>
              </div>
              <span className="catalog-result-count">
                {products.length.toLocaleString("bn-BD")} টি পণ্য
              </span>
            </div>

            {failed ? (
              <div className="catalog-state" role="status">
                <h3>পণ্যের তথ্য লোড করা যায়নি</h3>
                <p>ইন্টারনেট সংযোগ পরীক্ষা করে পৃষ্ঠাটি আবার খুলুন।</p>
              </div>
            ) : products.length === 0 ? (
              <div className="catalog-state">
                <h3>এখনো কোনো পণ্য পাওয়া যায়নি</h3>
                <p>পরে আবার চেষ্টা করুন।</p>
              </div>
            ) : (
              <div className="product-grid">
                {products.map((product, index) => (
                  <ProductCard key={product.id} product={product} rank={index + 1} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
