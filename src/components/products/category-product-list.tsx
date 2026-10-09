"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ArrowUpDown } from "lucide-react";
import { ProductCard } from "@/components/products/product-card";
import type { Product } from "@/types/product";

type SortOption = "default" | "price-asc" | "price-desc";

interface CategoryProductListProps {
  products: Product[];
}

export function CategoryProductList({
  products,
}: CategoryProductListProps) {
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    // Keep the original API order unchanged for the default option.
    const result = [...products];

    if (sortOption === "price-asc") {
      result.sort((a, b) => a.today - b.today);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sortOption]);

  return (
    <div className="category-products-wrapper">
      <div className="category-sort-bar">
        <div className="category-sort-caption">
          <ArrowUpDown size={17} aria-hidden="true" />
          <label htmlFor="category-product-sort">সাজান</label>
        </div>

        <div className="category-sort-control">
          <select
            id="category-product-sort"
            value={sortOption}
            onChange={(event) =>
              setSortOption(event.target.value as SortOption)
            }
            aria-label="পণ্যের দাম অনুযায়ী সাজান"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-asc">দাম: কম থেকে বেশি</option>
            <option value="price-desc">দাম: বেশি থেকে কম</option>
          </select>

          <ChevronDown
            className="category-sort-chevron"
            size={17}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="product-grid">
        {sortedProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            rank={index + 1}
          />
        ))}
      </div>
    </div>
  );
}
