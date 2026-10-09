"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/products/product-card";
import type { Product } from "@/types/product";

type CategoryOption = {
  slug: string;
  name: string;
  emoji: string;
};

type ProductCatalogProps = {
  products: Product[];
  categories: CategoryOption[];
};

type SortOption = "recommended" | "price-asc" | "price-desc" | "name" | "change";

export function ProductCatalog({
  products,
  categories,
}: ProductCatalogProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortOption>("recommended");

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    const result = products.filter((product) => {
      const matchesSearch =
        !query ||
        product.nameBn.toLocaleLowerCase().includes(query) ||
        product.categoryNameBn.toLocaleLowerCase().includes(query);

      const matchesCategory =
        category === "all" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.today - b.today);
        break;
      case "price-desc":
        result.sort((a, b) => b.today - a.today);
        break;
      case "name":
        result.sort((a, b) => a.nameBn.localeCompare(b.nameBn, "bn"));
        break;
      case "change":
        result.sort(
          (a, b) =>
            Math.abs(b.change?.pct ?? 0) - Math.abs(a.change?.pct ?? 0),
        );
        break;
      default:
        break;
    }

    return result;
  }, [products, search, category, sort]);

  const hasFilters = search.trim() !== "" || category !== "all" || sort !== "recommended";

  function resetFilters() {
    setSearch("");
    setCategory("all");
    setSort("recommended");
  }

  return (
    <div className="product-catalog">
      <div className="catalog-toolbar">
        <label className="catalog-search">
          <Search size={19} aria-hidden="true" />
          <span className="sr-only">পণ্য খুঁজুন</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="পণ্যের নাম লিখে খুঁজুন..."
          />
          {search && (
            <button
              type="button"
              className="catalog-clear-search"
              aria-label="সার্চ মুছুন"
              onClick={() => setSearch("")}
            >
              <X size={16} />
            </button>
          )}
        </label>

        <label className="catalog-filter">
          <SlidersHorizontal size={17} aria-hidden="true" />
          <span className="sr-only">ক্যাটাগরি</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="all">সব ক্যাটাগরি</option>
            {categories.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.emoji} {item.name}
              </option>
            ))}
          </select>
        </label>

        <label className="catalog-filter catalog-sort">
          <span className="sr-only">পণ্য সাজান</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
          >
            <option value="recommended">সাজানো: ডিফল্ট</option>
            <option value="price-asc">দাম: কম থেকে বেশি</option>
            <option value="price-desc">দাম: বেশি থেকে কম</option>
            <option value="name">নাম অনুযায়ী</option>
            <option value="change">দামের পরিবর্তন অনুযায়ী</option>
          </select>
        </label>
      </div>

      <div className="catalog-toolbar-summary">
        <p aria-live="polite">
          মোট <strong>{filteredProducts.length.toLocaleString("bn-BD")}</strong> টি পণ্য
        </p>
        {hasFilters && (
          <button
            type="button"
            className="catalog-reset-button"
            onClick={resetFilters}
          >
            <X size={14} /> ফিল্টার মুছুন
          </button>
        )}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} rank={index + 1} />
          ))}
        </div>
      ) : (
        <div className="catalog-state" role="status">
          <Search size={30} />
          <h3>কোনো পণ্য পাওয়া যায়নি</h3>
          <p>অন্য নাম লিখুন অথবা ফিল্টার পরিবর্তন করুন।</p>
          <button
            type="button"
            className="catalog-action-link"
            onClick={resetFilters}
          >
            সব পণ্য দেখুন
          </button>
        </div>
      )}
    </div>
  );
}
