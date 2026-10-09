import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Minus } from "lucide-react";
import type { Product } from "@/types/product";
import { getCategoryVisual } from "@/constants/categories";
import { formatTaka, formatUnit } from "@/lib/format";

interface ProductCardProps {
  product: Product;
  rank?: number;
}

export function ProductCard({ product, rank }: ProductCardProps) {
  const visual = getCategoryVisual(product.category);
  const direction = product.change?.dir ?? "flat";
  const percentage = Math.abs(product.change?.pct ?? 0);

  return (
    <article className="product-card">
      <Link
        href={`/product/${product.slug}`}
        className="product-card-link"
        aria-label={`${product.nameBn} পণ্যের বিস্তারিত দেখুন`}
      >
        <div className="product-card-top">
          <div className="product-visual" aria-hidden="true">
            <span>{visual.emoji}</span>
            <span className="product-visual-orbit" />
          </div>

          {rank !== undefined && (
            <span className="product-rank">
              #{rank.toLocaleString("bn-BD")}
            </span>
          )}

          <span className={`change-badge ${direction}`}>
            {direction === "up" ? (
              <ArrowUpRight size={14} />
            ) : direction === "down" ? (
              <ArrowDownRight size={14} />
            ) : (
              <Minus size={13} />
            )}
            {percentage.toLocaleString("bn-BD", {
              maximumFractionDigits: 1,
            })}
            %
          </span>
        </div>

        <div className="product-card-info">
          <span className="product-category">{visual.name}</span>
          <h3 className="product-name">{product.nameBn}</h3>
          <p className="product-unit">প্রতি {formatUnit(product.unit)}</p>
        </div>

        <div className="product-card-bottom">
          <div>
            <span className="price-label">আজকের দাম</span>
            <p className="product-price">{formatTaka(product.today)}</p>
          </div>
          <span className="product-open" aria-hidden="true">
            <ArrowRight size={17} />
          </span>
        </div>
      </Link>
    </article>
  );
}
