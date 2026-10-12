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
    <nav className="border-b border-[#e1e8e179] bg-[#fafcfa]">
      <div className="mx-auto w-full max-w-[1120px] overflow-x-auto px-4 lg:px-0">
        <div className="flex h-[48px] min-w-max items-center gap-2">
          {categories.map((category) => {
            const href = `/categories/${category.slug}`;
            const isActive = pathname === href;

            return (
              <Link
                key={category.slug}
                href={href}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-medium whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? "bg-[#05893e] text-white"
                    : "text-[#1d271f] hover:bg-[#edf8f0] hover:text-[#05893e]"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="text-sm" aria-hidden="true">
                  {category.emoji}
                </span>
                <span>{category.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
