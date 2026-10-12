"use client";

import { useMemo, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { ProductCard } from "@/components/products/product-card";
import type { Product } from "@/types/product";

type SortOption = "default" | "price-asc" | "price-desc";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
];

interface CategoryProductListProps {
  products: Product[];
}

export function CategoryProductList({
  products,
}: CategoryProductListProps) {
  const [sortOption, setSortOption] = useState<SortOption>("default");
  const [isOpen, setIsOpen] = useState(false);

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sortOption === "price-asc") {
      result.sort((a, b) => a.today - b.today);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sortOption]);

  const selectedOption = sortOptions.find(
    (option) => option.value === sortOption,
  );
  const totalProducts = products.length.toLocaleString("bn-BD");

  return (
    <>
      <div className="fo-category-toolbar">
        <p className="fo-category-product-count">
          মোট {totalProducts}টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="fo-category-sort">
          <span className="fo-category-sort-label">সাজান</span>

          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((previous) => !previous)}
            className="fo-category-sort-trigger"
          >
            <span>{selectedOption?.label}</span>
            <ChevronDown
              size={15}
              className={isOpen ? "fo-category-chevron-open" : ""}
            />
          </button>

          {isOpen && (
            <>
              <button
                type="button"
                aria-label="সাজানোর মেনু বন্ধ করুন"
                className="fo-category-menu-backdrop"
                onClick={() => setIsOpen(false)}
              />
              <div className="fo-category-sort-menu" role="listbox">
                {sortOptions.map((option) => {
                  const selected = option.value === sortOption;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => {
                        setSortOption(option.value);
                        setIsOpen(false);
                      }}
                      className={`fo-category-sort-option${
                        selected ? " is-selected" : ""
                      }`}
                    >
                      <span>{option.label}</span>
                      {selected && <Check size={14} />}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="product-grid fo-category-grid">
        {sortedProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
}
