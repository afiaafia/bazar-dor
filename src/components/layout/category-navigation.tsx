"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategoryNavigationItem {
  readonly slug: string;
  readonly emoji: string;
  readonly name: string;
}

interface CategoryNavigationProps {
  readonly categories: readonly CategoryNavigationItem[];
}

export function CategoryNavigation({
  categories,
}: CategoryNavigationProps) {
  const pathname = usePathname();

  return (
    <nav
      className="header-category-nav header-container"
      aria-label="পণ্যের ক্যাটাগরি"
    >
      {categories.map((category) => {
        const href = `/categories/${category.slug}`;
        const isActive = pathname === href;

        return (
          <Link
            key={category.slug}
            href={href}
            className={`header-category-link${isActive ? " header-category-link-active" : ""}`}
            aria-current={isActive ? "page" : undefined}
          >
            <span aria-hidden="true">{category.emoji}</span>
            <span>{category.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
