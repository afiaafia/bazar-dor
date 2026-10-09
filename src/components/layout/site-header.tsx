import Image from "next/image";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { HeaderAuthActions } from "@/components/auth/header-auth-actions";
import Link from "next/link";
import { CATEGORY_ITEMS } from "@/constants/categories";
import { CategoryNavigation } from "@/components/layout/category-navigation";
import { getProducts } from "@/lib/api";
import { PriceTicker } from "@/components/home/price-ticker";
import { SiteDate } from "@/components/layout/site-date";
import type { Product } from "@/types/product";

export async function SiteHeader() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const headerUser = session
    ? {
        name: session.user.name || "",
        email: session.user.email || "",
        image: session.user.image || null,
      }
    : null;

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

          <HeaderAuthActions user={headerUser} />
        </div>

        <div className="header-category-row">
          <CategoryNavigation categories={CATEGORY_ITEMS} />
        </div>
      </header>

      <PriceTicker products={products} />
    </>
  );
}
