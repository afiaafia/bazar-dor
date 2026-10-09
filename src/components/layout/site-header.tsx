import Image from "next/image";
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
            <MapPin size={14} aria-hidden="true" />
            বাংলাদেশের বাজারদর, এক জায়গায়
          </p>
          <p>{today}</p>
        </div>
      </div>

      <div className="site-container header-main">
        <Link href="/" className="brand" aria-label="বাজার দর হোম">
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
            <span className="brand-tagline">
              দাম জানুন, সাশ্রয় করুন
            </span>
          </span>
        </Link>

        <nav className="main-nav" aria-label="প্রধান নেভিগেশন">
          <Link href="/" className="nav-link nav-link-active">
            হোম
          </Link>
          <Link href="/#ক্যাটাগরি" className="nav-link">
            ক্যাটাগরি
          </Link>
          <Link href="/#সব-পণ্য" className="nav-link">
            আজকের দর
          </Link>
          <Link href="/#দামের-পরিবর্তন" className="nav-link">
            দামের পরিবর্তন
          </Link>
        </nav>

        <div className="header-actions">
          <span className="location-pill">
            <MapPin size={14} aria-hidden="true" />
            ঢাকা
          </span>

          <Link href="/signin" className="signin-link">
            লগইন
          </Link>

          <Link href="/signup" className="register-link">
            রেজিস্টার
            <ArrowUpRight size={15} aria-hidden="true" />
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
