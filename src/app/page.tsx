export const instant = false;

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteDate } from "@/components/layout/site-date";
import { formatTaka, formatUnit } from "@/lib/format";

import { getProducts } from "@/lib/api";
import type { Product } from "@/types/product";



function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  indicator,
  linkLabel = "সব দেখুন",
}: {
  eyebrow: string;
  title: string;
  description: string;
  href?: string;
  indicator?: "rise" | "fall";
  linkLabel?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
        <h2>
          {indicator && (
            <span
              className={`price-direction-indicator ${indicator}`}
              aria-hidden="true"
            >
              {indicator === "rise" ? "▲" : "▼"}
            </span>
          )}
          {title}
        </h2>
        {description && <p>{description}</p>}
      </div>
      {href && (
        <Link href={href} className="section-link">
          {linkLabel} <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}

function ProductGrid({
  products,
  emptyMessage,
}: {
  products: Product[];
  emptyMessage: string;
}) {
  if (products.length === 0) {
    return <div className="empty-state">{emptyMessage}</div>;
  }

  return (
    <div className="all-products-grid trend-products-grid">
      {products.map((product) => {
        const direction =
          product.change?.dir === "up"
            ? "up"
            : product.change?.dir === "down"
              ? "down"
              : "flat";

        const percentage = Math.abs(product.change?.pct ?? 0);
        const changeLabel =
          direction === "up"
            ? `▲${percentage}%`
            : direction === "down"
              ? `▼${percentage}%`
              : `—${percentage}%`;

        return (
          <Link
            key={product.id}
            href={`/product/${product.slug || product.id}`}
            className="all-product-card trend-product-card"
          >
            <div className="all-product-first-row">
              <span className="all-product-emoji" aria-hidden="true">
                {product.categoryIcon || "🛒"}
              </span>
              <div className="all-product-identity">
                <h3>{product.nameBn}</h3>
                <p>{formatUnit(product.unit)}</p>
              </div>
            </div>

            <div className="all-product-price-label">আজকের দাম</div>

            <div className="all-product-last-row">
              <strong className="all-product-price">
                {formatTaka(product.today)} টাকা
              </strong>
              <span
                className={`all-product-change ${direction}`}
                aria-label={`দামের পরিবর্তন ${percentage} শতাংশ`}
              >
                {changeLabel}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default async function Home() {
  let products: Product[] = [];
  let apiError = false;

  try {
    products = await getProducts();
  } catch {
    apiError = true;
  }

  const validProducts = products.filter(
    (product) =>
      product &&
      typeof product.id === "number" &&
      typeof product.nameBn === "string" &&
      typeof product.today === "number",
  );

  const risers = [...validProducts]
    .filter((product) => product.change?.dir === "up")
    .sort((a, b) => (b.change?.pct ?? 0) - (a.change?.pct ?? 0))
    .slice(0, 6);

  const fallers = [...validProducts]
    .filter((product) => product.change?.dir === "down")
    .sort((a, b) => (a.change?.pct ?? 0) - (b.change?.pct ?? 0))
    .slice(0, 6);

  return (
    <>
      <SiteHeader />

      <main>
        <section className="hero-section">
          <div className="site-container hero-inner">
            <div className="hero-copy">
              <div className="hero-kicker">
                <span className="hero-kicker-dot" />
                <SiteDate />
              </div>

              <h1>
                আজকের বাজারের দাম
                <br />
                <span>এক নজরে</span>
              </h1>

              <p className="hero-description">
                চাল · ডাল · তেল · সবজি · মাছ · মাংস · ডিম
              </p>

              <div className="hero-actions">
                <Link href="#সব-পণ্য" className="button-primary">
                  সব পণ্য দেখুন <ArrowRight size={17} />
                </Link>
              </div>
            </div>

            <div className="hero-visual" aria-label="বাজারের পণ্যের চিত্র">
              <div className="hero-market-art">
                <Image
                  src="/images/bazar-hero.png"
                  alt="নিত্যপ্রয়োজনীয় বাজারের পণ্য"
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 380px"
                  className="hero-image"
                />
              </div>
            </div>
          </div>
        </section>

        

        

        <section className="content-section trend-section price-rise-section" id="আজ-দাম-বেড়েছে">
          <div className="site-container">
            <SectionHeading
              eyebrow=""
              title="আজ দাম বেড়েছে"
              description=""
              indicator="rise"
            />

            {apiError ? (
              <div className="api-error">
                <span className="api-error-icon">!</span>
                <div>
                  <strong>বাজারের তথ্য লোড করা যায়নি</strong>
                  <p>
                    সংযোগে সাময়িক সমস্যা হতে পারে। কিছুক্ষণ পর পৃষ্ঠাটি আবার
                    রিফ্রেশ করুন।
                  </p>
                </div>
              </div>
            ) : risers.length > 0 ? (
              <ProductGrid
                products={risers}
                emptyMessage="দাম বৃদ্ধির তথ্য নেই।"
              />
            ) : (
              <p className="trend-empty">দাম বৃদ্ধির তথ্য নেই।</p>
            )}
          </div>
        </section>

        <section className="content-section trend-section" id="আজ-দাম-কমেছে">
          <div className="site-container">
            <SectionHeading
              eyebrow=""
              title="আজ দাম কমেছে"
              description=""
              indicator="fall"
            />

            {apiError ? (
              <div className="api-error">
                <span className="api-error-icon">!</span>
                <div>
                  <strong>বাজারের তথ্য লোড করা যায়নি</strong>
                  <p>
                    সংযোগে সাময়িক সমস্যা হতে পারে। কিছুক্ষণ পর পৃষ্ঠাটি আবার
                    রিফ্রেশ করুন।
                  </p>
                </div>
              </div>
            ) : fallers.length > 0 ? (
              <ProductGrid
                products={fallers}
                emptyMessage="দাম হ্রাসের তথ্য নেই।"
              />
            ) : (
              <p className="trend-empty">দাম হ্রাসের তথ্য নেই।</p>
            )}
          </div>
        </section>

        <section className="content-section products-section all-products-list-section" id="সব-পণ্য">
          <div className="site-container">
            <div className="all-products-heading">
              <h2>সব পণ্যের দাম</h2>
              <p>মোট {products.length.toLocaleString("bn-BD")} টি পণ্য দেখানো হচ্ছে</p>
            </div>

            {products.length > 0 ? (
              <div className="all-products-grid">
                {products.map((product) => {
                  const direction =
                    product.change?.dir === "up"
                      ? "up"
                      : product.change?.dir === "down"
                        ? "down"
                        : "flat";

                  const percentage = Math.abs(product.change?.pct ?? 0);
                  const changeLabel =
                    direction === "up"
                      ? `▲${percentage}%`
                      : direction === "down"
                        ? `▼${percentage}%`
                        : `—${percentage}%`;

                  return (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug || product.id}`}
                      className="all-product-card"
                    >
                      <div className="all-product-first-row">
                        <span className="all-product-emoji" aria-hidden="true">
                          {product.categoryIcon || "🛒"}
                        </span>
                        <div className="all-product-identity">
                          <h3>{product.nameBn}</h3>
                          <p>{formatUnit(product.unit)}</p>
                        </div>
                      </div>

                      <div className="all-product-price-label">আজকের দাম</div>

                      <div className="all-product-last-row">
                        <strong className="all-product-price">
                          {formatTaka(product.today)} টাকা
                        </strong>
                        <span
                          className={`all-product-change ${direction}`}
                          aria-label={`দামের পরিবর্তন ${percentage} শতাংশ`}
                        >
                          {changeLabel}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p className="trend-empty">
                {apiError
                  ? "পণ্যের তথ্য লোড করা যায়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।"
                  : "এখন কোনো পণ্যের তথ্য পাওয়া যায়নি।"}
              </p>
            )}

          </div>
        </section>

        
      </main>
      


    </>
  );
}
