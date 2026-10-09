import Image from "next/image";
import Link from "next/link";
import { CATEGORY_ITEMS } from "@/constants/categories";
import { getProducts } from "@/lib/api";
import { PriceTicker } from "@/components/home/price-ticker";
import { SiteDate } from "@/components/layout/site-date";
import type { Product } from "@/types/product";

export async function SiteHeader() {
  let products: Product[] = [];

  try {
    products = await getProducts();
  } catch {
    products = [];
  }

  return (
    <>
      <header className="site-header figma-header">
        <div className="site-container header-container header-main">
          <Link href="/" className="brand" aria-label="বাজার দর হোম">
            <Image
              src="/images/logo-icon.png"
              alt=""
              width={34}
              height={34}
              className="brand-icon"
              priority
            />
            <span className="brand-copy">
              <span className="brand-name">বাজার দর</span>
              <SiteDate />
            </span>
          </Link>

          <div className="header-actions">
            <Link href="/signin" className="signin-link">
              সাইন ইন
            </Link>
            <Link href="/signup" className="register-link">
              সাইন আপ
            </Link>
          </div>
        </div>

        <div className="header-category-row">
          <nav
            className="header-category-nav header-container"
            aria-label="পণ্যের ক্যাটাগরি"
          >
            {CATEGORY_ITEMS.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="header-category-link"
              >
                <span aria-hidden="true">{category.emoji}</span>
                <span>{category.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <PriceTicker products={products} />
    </>
  );
}
