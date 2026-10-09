export const instant = false;

import Link from "next/link";
import { ArrowRight, ChevronRight, Layers3 } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { ProductCatalog } from "@/components/products/product-catalog";
import { CATEGORY_ITEMS, getCategoryVisual } from "@/constants/categories";
import { getCategories, getProducts } from "@/lib/api";
import type { Category, Product } from "@/types/product";

export const metadata = {
  title: "সব ক্যাটাগরি",
  description: "নিত্যপ্রয়োজনীয় পণ্যের ক্যাটাগরি, সার্চ ও বাজারদর দেখুন।",
};

export default async function CategoriesPage() {
  let categories: Category[] = [];
  let products: Product[] = [];
  let failed = false;

  try {
    [categories, products] = await Promise.all([
      getCategories(),
      getProducts(),
    ]);
  } catch {
    failed = true;
  }

  const displayedCategories =
    categories.length > 0
      ? categories.map((item) => ({
          slug: item.slug || item.id,
          name: item.nameBn,
          emoji: getCategoryVisual(item.slug || item.id).emoji,
        }))
      : CATEGORY_ITEMS.map((item) => ({
          slug: item.slug,
          name: item.name,
          emoji: item.emoji,
        }));

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
            <span className="catalog-eyebrow">
              <Layers3 size={15} /> পণ্য অন্বেষণ
            </span>
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
              {displayedCategories.map((item) => {
                const count = products.filter(
                  (product) => product.category === item.slug,
                ).length;

                return (
                  <Link
                    href={`/categories/${item.slug}`}
                    key={item.slug}
                    className="catalog-category-card"
                  >
                    <span className="catalog-category-emoji" aria-hidden="true">
                      {item.emoji}
                    </span>
                    <span className="catalog-category-copy">
                      <strong>{item.name}</strong>
                      <small>{count.toLocaleString("bn-BD")} টি পণ্য</small>
                    </span>
                    <ArrowRight size={17} className="catalog-category-arrow" />
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="catalog-section" id="সব-পণ্য">
            <div className="catalog-section-heading">
              <div>
                <span className="catalog-eyebrow">বাজারের তালিকা</span>
                <h2>সব পণ্য</h2>
                <p>নাম দিয়ে খুঁজুন, ক্যাটাগরি বাছুন অথবা দাম অনুযায়ী সাজান।</p>
              </div>
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
              <ProductCatalog
                products={products}
                categories={displayedCategories}
              />
            )}
          </section>
        </div>
      </main>
    </>
  );
}
