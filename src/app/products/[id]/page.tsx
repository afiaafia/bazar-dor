export const instant = false;

import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  Minus,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { ProductCard } from "@/components/products/product-card";
import { getCategoryVisual } from "@/constants/categories";
import { getProductBySlug, getProducts } from "@/lib/api";
import { formatBengaliNumber, formatTaka, formatUnit } from "@/lib/format";
import type { Product } from "@/types/product";
import { auth } from "@/lib/auth";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  try {
    const product = await getProductBySlug(id);
    if (product) {
      return {
        title: `${product.nameBn} — বাজারদর`,
        description: `${product.nameBn}-এর বর্তমান দাম ও বাজারভিত্তিক মূল্য তুলনা করুন।`,
      };
    }
  } catch {
    // Metadata should not fail just because the API is temporarily unavailable.
  }
  return { title: "পণ্যের বিস্তারিত" };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?reason=auth-required");
  }

  const { id } = await params;
  let product: Product | null = null;
  let relatedProducts: Product[] = [];
  let apiFailed = false;

  try {
    product = await getProductBySlug(id);
    if (product) {
      relatedProducts = (await getProducts())
        .filter((item) => item.id !== product!.id && item.category === product!.category)
        .slice(0, 4);
    }
  } catch {
    apiFailed = true;
  }

  if (!product && !apiFailed) notFound();

  if (!product) {
    return (
      <>
        <SiteHeader />
        <main className="catalog-page">
          <div className="catalog-container">
            <div className="catalog-state">
              <h1>পণ্যের তথ্য পাওয়া যায়নি</h1>
              <p>ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।</p>
              <Link href="/categories" className="catalog-action-link">
                সব পণ্য দেখুন
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  const visual = getCategoryVisual(product.category);
  const change = product.today - product.yesterday;
  const direction = change > 0 ? "up" : change < 0 ? "down" : "flat";
  const changeClass =
    direction === "up" ? "price-up" : direction === "down" ? "price-down" : "price-flat";

  return (
    <>
      <SiteHeader />
      <main className="catalog-page">
        <div className="catalog-container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">হোম</Link>
            <span>/</span>
            <Link href="/categories">ক্যাটাগরি</Link>
            <span>/</span>
            <Link href={`/categories/${product.category}`}>{product.categoryNameBn}</Link>
            <span>/</span>
            <span>{product.nameBn}</span>
          </nav>

          <Link href="/categories" className="catalog-back-link">
            <ArrowLeft size={16} /> সব পণ্যে ফিরে যান
          </Link>

          <section className="product-detail-card">
            <div className="product-detail-visual">
              {product.image ? (
                // The API supplies product image URLs; use a regular image to avoid
                // requiring remote image host configuration.
                // eslint-disable-next-line @next/next/no-img-element
                <img src={product.image} alt={product.nameBn} />
              ) : (
                <span aria-hidden="true">{visual.emoji}</span>
              )}
            </div>

            <div className="product-detail-copy">
              <Link href={`/categories/${product.category}`} className="product-detail-category">
                <span aria-hidden="true">{visual.emoji}</span>
                {product.categoryNameBn || visual.name}
              </Link>
              <h1>{product.nameBn}</h1>
              <p className="product-detail-unit">প্রতি {formatUnit(product.unit)}</p>

              <span className="product-detail-price-label">আজকের দাম</span>
              <div className="product-detail-price-row">
                <strong>{formatTaka(product.today)}</strong>
                <span className={`product-change-pill ${changeClass}`}>
                  {direction === "up" ? (
                    <ArrowUpRight size={16} />
                  ) : direction === "down" ? (
                    <ArrowDownRight size={16} />
                  ) : (
                    <Minus size={15} />
                  )}
                  {change > 0 ? "+" : change < 0 ? "−" : ""}
                  {formatTaka(Math.abs(change))}
                </span>
              </div>
              <p className="product-detail-caption">
                গতকালের তুলনায় {direction === "up" ? "দাম বেড়েছে" : direction === "down" ? "দাম কমেছে" : "দাম অপরিবর্তিত"}।
              </p>
              <div className="product-detail-meta">
                <span><MapPin size={15} /> বাজারভিত্তিক দামের তুলনা</span>
                <span><TrendingUp size={15} /> পরিবর্তন: {formatBengaliNumber(product.change?.pct ?? 0)}%</span>
              </div>
            </div>
          </section>

          <section className="catalog-section">
            <div className="catalog-section-heading">
              <div>
                <span className="catalog-eyebrow">দামের তুলনা</span>
                <h2>বিভিন্ন সময়ের দাম</h2>
                <p>API-তে সরবরাহ করা মূল্য-স্ন্যাপশটের তুলনা।</p>
              </div>
            </div>

            <div className="price-comparison-grid">
              <article className="price-comparison-card current">
                <span>আজকের দাম</span>
                <strong>{formatTaka(product.today)}</strong>
                <small>প্রতি {formatUnit(product.unit)}</small>
              </article>
              <article className="price-comparison-card">
                <span>গতকালের দাম</span>
                <strong>{formatTaka(product.yesterday)}</strong>
                <small>প্রতি {formatUnit(product.unit)}</small>
              </article>
              <article className="price-comparison-card">
                <span>গত সপ্তাহের দাম</span>
                <strong>{formatTaka(product.lastWeek)}</strong>
                <small>প্রতি {formatUnit(product.unit)}</small>
              </article>
              <article className="price-comparison-card">
                <span>গত মাসের দাম</span>
                <strong>{formatTaka(product.lastMonth)}</strong>
                <small>প্রতি {formatUnit(product.unit)}</small>
              </article>
            </div>
          </section>

          <section className="catalog-section">
            <div className="catalog-section-heading">
              <div>
                <span className="catalog-eyebrow">বাজার অনুযায়ী</span>
                <h2>বিভিন্ন বাজারে {product.nameBn}-এর দাম</h2>
                <p>API-তে উপলব্ধ সর্বনিম্ন ও সর্বোচ্চ দামের তথ্য।</p>
              </div>
            </div>

            {product.markets.length === 0 ? (
              <div className="catalog-state">
                <p>এই পণ্যের জন্য বাজারভিত্তিক মূল্য এখনো পাওয়া যায়নি।</p>
              </div>
            ) : (
              <div className="market-table-wrap">
                <table className="market-table">
                  <thead>
                    <tr>
                      <th>বাজার</th>
                      <th>বিভাগ</th>
                      <th>সর্বনিম্ন দাম</th>
                      <th>সর্বোচ্চ দাম</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.markets.map((market, index) => (
                      <tr key={`${market.market}-${market.division}-${index}`}>
                        <td>{market.market}</td>
                        <td>{market.division}</td>
                        <td>{formatTaka(market.min)}</td>
                        <td>{formatTaka(market.max)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {relatedProducts.length > 0 && (
            <section className="catalog-section">
              <div className="catalog-section-heading">
                <div>
                  <span className="catalog-eyebrow">আরও পণ্য</span>
                  <h2>একই ক্যাটাগরির পণ্য</h2>
                </div>
                <Link href={`/categories/${product.category}`} className="catalog-action-link">
                  সব দেখুন
                </Link>
              </div>
              <div className="product-grid">
                {relatedProducts.map((item, index) => (
                  <ProductCard key={item.id} product={item} rank={index + 1} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
