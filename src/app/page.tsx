export const instant = false;

import Link from "next/link";
import Image from "next/image";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Search,
  ShieldCheck,
  TrendingDown,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { ProductCard } from "@/components/products/product-card";
import { CATEGORY_ITEMS } from "@/constants/categories";
import { getProducts } from "@/lib/api";
import type { Product } from "@/types/product";

function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel = "সব দেখুন",
}: {
  eyebrow: string;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="section-eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{description}</p>
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
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} rank={index + 1} />
      ))}
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
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />

          <div className="site-container hero-inner">
            <div className="hero-copy">
              <div className="hero-kicker">
                <span className="hero-kicker-dot" />
                আপনার নিত্যদিনের বাজার সহকারী
              </div>

              <h1>
                বাজারের দাম জানুন,
                <br />
                <span>সাশ্রয় হোক প্রতিদিন।</span>
              </h1>

              <p className="hero-description">
                চাল, ডাল, মাছ, মাংস থেকে শুরু করে নিত্যপ্রয়োজনীয় পণ্য—
                বাজারে যাওয়ার আগেই জেনে নিন আজকের দাম।
              </p>

              <div className="hero-actions">
                <Link href="#সব-পণ্য" className="button-primary">
                  আজকের বাজারদর দেখুন <ArrowRight size={17} />
                </Link>
                <Link href="#দামের-পরিবর্তন" className="button-secondary">
                  দামের পরিবর্তন <BarChart3 size={17} />
                </Link>
              </div>

              <div className="hero-trust-row">
                <span>
                  <CheckCircle2 size={15} /> সহজে দাম তুলনা
                </span>
                <span>
                  <ShieldCheck size={15} /> স্বচ্ছ বাজার তথ্য
                </span>
              </div>
            </div>

            <div className="hero-visual" aria-label="বাজারের পণ্যের চিত্র">
              <div className="hero-visual-label">
                <span className="status-pulse" />
                আজকের বাজার
              </div>

              <div className="hero-market-art">
                <Image
                  src="/images/bazar-hero.png"
                  alt="নিত্যপ্রয়োজনীয় বাজারের পণ্য"
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 400px"
                  className="hero-image"
                />
              </div>

              <div className="hero-floating-card floating-card-top">
                <span className="floating-icon green-icon">
                  <TrendingDown size={18} />
                </span>
                <span>
                  <strong>দাম তুলনা করুন</strong>
                  <small>সঠিক সিদ্ধান্ত নিন</small>
                </span>
              </div>

              <div className="hero-floating-card floating-card-bottom">
                <span className="floating-icon orange-icon">
                  <Clock3 size={18} />
                </span>
                <span>
                  <strong>এক নজরে বাজার</strong>
                  <small>সময় বাঁচান প্রতিদিন</small>
                </span>
              </div>
            </div>

            <div className="hero-bottom-note">
              <span className="hero-note-line" />
              <span>প্রতিদিনের বাজার পরিকল্পনা হোক আরও সহজ</span>
            </div>
          </div>
        </section>

        <section className="benefits-strip">
          <div className="site-container benefits-grid">
            <div className="benefit-item">
              <span className="benefit-icon">
                <Search size={19} />
              </span>
              <div>
                <strong>সহজে খুঁজুন</strong>
                <p>প্রয়োজনীয় পণ্য এক জায়গায়</p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">
                <BarChart3 size={19} />
              </span>
              <div>
                <strong>দামের পরিবর্তন</strong>
                <p>বাড়ছে নাকি কমছে, জেনে নিন</p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">
                <ShieldCheck size={19} />
              </span>
              <div>
                <strong>সচেতন কেনাকাটা</strong>
                <p>বাজারে যাওয়ার আগে পরিকল্পনা</p>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section category-section" id="ক্যাটাগরি">
          <div className="site-container">
            <SectionHeading
              eyebrow="ক্যাটাগরি"
              title="কী কিনবেন আজ?"
              description="আপনার প্রয়োজনীয় পণ্যের বিভাগ বেছে নিন।"
            />

            <div className="category-grid">
              {CATEGORY_ITEMS.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="category-card"
                >
                  <span className="category-emoji" aria-hidden="true">
                    {category.emoji}
                  </span>
                  <span className="category-name">{category.name}</span>
                  <ChevronRight className="category-arrow" size={17} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section trend-section" id="দামের-পরিবর্তন">
          <div className="site-container">
            <SectionHeading
              eyebrow="বাজারের ওঠানামা"
              title="দামের পরিবর্তন"
              description="কোন পণ্যের দাম বাড়ছে আর কোনটির কমছে, এক নজরে দেখুন।"
              href="#সব-পণ্য"
              linkLabel="সব পণ্য"
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
            ) : (
              <div className="trend-grid">
                <div className="trend-panel rise-panel">
                  <div className="trend-panel-heading">
                    <span className="trend-heading-icon rise-icon">
                      <ArrowUpRight size={19} />
                    </span>
                    <div>
                      <h3>দাম বেড়েছে</h3>
                      <p>যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে</p>
                    </div>
                  </div>
                  {risers.length > 0 ? (
                    <div className="trend-list">
                      {risers.map((product) => (
                        <Link
                          href={`/product/${product.slug}`}
                          key={product.id}
                          className="trend-row"
                        >
                          <span className="trend-product-emoji">
                            {CATEGORY_ITEMS.find(
                              (item) => item.slug === product.category,
                            )?.emoji ?? "🛍️"}
                          </span>
                          <span className="trend-product-info">
                            <strong>{product.nameBn}</strong>
                            <small>
                              ৳
                              {product.today.toLocaleString("bn-BD")} /{" "}
                              {product.unit === "kg"
                                ? "কেজি"
                                : product.unit}
                            </small>
                          </span>
                          <span className="trend-percent up">
                            <ArrowUpRight size={14} />
                            {Math.abs(product.change.pct).toLocaleString(
                              "bn-BD",
                              { maximumFractionDigits: 1 },
                            )}
                            %
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="trend-empty">দাম বৃদ্ধির তথ্য নেই।</p>
                  )}
                </div>

                <div className="trend-panel fall-panel">
                  <div className="trend-panel-heading">
                    <span className="trend-heading-icon fall-icon">
                      <ArrowDownRight size={19} />
                    </span>
                    <div>
                      <h3>দাম কমেছে</h3>
                      <p>যেসব পণ্যের দাম সবচেয়ে বেশি কমেছে</p>
                    </div>
                  </div>
                  {fallers.length > 0 ? (
                    <div className="trend-list">
                      {fallers.map((product) => (
                        <Link
                          href={`/product/${product.slug}`}
                          key={product.id}
                          className="trend-row"
                        >
                          <span className="trend-product-emoji">
                            {CATEGORY_ITEMS.find(
                              (item) => item.slug === product.category,
                            )?.emoji ?? "🛍️"}
                          </span>
                          <span className="trend-product-info">
                            <strong>{product.nameBn}</strong>
                            <small>
                              ৳
                              {product.today.toLocaleString("bn-BD")} /{" "}
                              {product.unit === "kg"
                                ? "কেজি"
                                : product.unit}
                            </small>
                          </span>
                          <span className="trend-percent down">
                            <ArrowDownRight size={14} />
                            {Math.abs(product.change.pct).toLocaleString(
                              "bn-BD",
                              { maximumFractionDigits: 1 },
                            )}
                            %
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="trend-empty">দাম হ্রাসের তথ্য নেই।</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="content-section products-section" id="সব-পণ্য">
          <div className="site-container">
            <SectionHeading
              eyebrow="আজকের বাজার"
              title="সব পণ্যের দাম"
              description="নিত্যপ্রয়োজনীয় পণ্যের বর্তমান দাম দেখে আপনার বাজারের তালিকা তৈরি করুন।"
            />

            {apiError ? (
              <div className="empty-state">
                পণ্যের তথ্য এই মুহূর্তে পাওয়া যাচ্ছে না। পৃষ্ঠাটি রিফ্রেশ করে
                আবার চেষ্টা করুন।
              </div>
            ) : (
              <>
                <div className="products-toolbar">
                  <p>
                    মোট <strong>{validProducts.length.toLocaleString("bn-BD")}</strong>{" "}
                    টি পণ্য
                  </p>
                  <span className="products-toolbar-note">
                    <span className="status-pulse" />
                    বাজারের তথ্য
                  </span>
                </div>

                <ProductGrid
                  products={validProducts}
                  emptyMessage="এই মুহূর্তে কোনো পণ্যের তথ্য পাওয়া যায়নি।"
                />
              </>
            )}

            {validProducts.length > 0 && (
              <div className="products-bottom-note">
                <span>আপনার বাজার, আরও পরিকল্পিত</span>
                <Link href="/categories/chal">
                  পণ্যের বিভাগ দেখুন <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="closing-cta">
          <div className="site-container closing-cta-inner">
            <div>
              <span className="section-eyebrow">স্মার্ট বাজারের শুরু</span>
              <h2>
                দাম জানুন আগে।
                <br />
                <span>কেনাকাটা করুন বুঝে।</span>
              </h2>
            </div>
            <Link href="#সব-পণ্য" className="button-primary">
              বাজারদর দেখুন <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-container footer-main">
          <Link href="/" className="brand footer-brand">
            <Image
            src="/images/logo-icon.png"
            alt=""
            width={43}
            height={43}
            className="brand-icon"
            aria-hidden="true"
          />
            <span className="brand-copy">
              <span className="brand-name">বাজার দর</span>
              <span className="brand-tagline">প্রয়োজনীয় পণ্যের দাম এক নজরে।</span>
            </span>
          </Link>
          <p>
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
          <Link href="/#সব-পণ্য" className="footer-link">
            সব পণ্য <ArrowRight size={15} />
          </Link>
        </div>
        <div className="site-container footer-bottom">
          <span>© {new Date().getFullYear()} বাজার দর</span>
          <span>বাংলাদেশের নিত্যদিনের বাজার সহকারী</span>
        </div>
      </footer>
    </>
  );
}
