import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { CATEGORY_ITEMS } from "@/constants/categories";

export function SiteHeader() {
  const today = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  return (
    <header className="site-header">
      <div className="top-strip">
        <div className="site-container top-strip-inner">
          <p className="top-strip-date">
            <MapPin size={13} aria-hidden="true" />
            বাংলাদেশের বাজারদর, এক জায়গায়
          </p>
          <p>{today}</p>
        </div>
      </div>

      <div className="site-container header-main">
        <Link href="/" className="brand" aria-label="বাজার দর হোম">
          <span className="brand-icon" aria-hidden="true">
            🛒
          </span>
          <span className="brand-copy">
            <span className="brand-name">বাজার দর</span>
            <span className="brand-tagline">দাম জানুন, সাশ্রয় করুন</span>
          </span>
        </Link>

        <nav className="main-nav" aria-label="প্রধান নেভিগেশন">
          <Link href="/" className="nav-link nav-link-active">
            হোম
          </Link>
          <Link href="/#সব-পণ্য" className="nav-link">
            সব পণ্য
          </Link>
          {CATEGORY_ITEMS.slice(0, 4).map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="nav-link"
            >
              {category.name}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link href="/signin" className="signin-link">
            লগইন <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="mobile-category-nav">
        <div className="site-container mobile-category-list">
          {CATEGORY_ITEMS.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="mobile-category-link"
            >
              <span aria-hidden="true">{category.emoji}</span>
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
