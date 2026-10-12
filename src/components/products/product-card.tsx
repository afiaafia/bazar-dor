import Link from "next/link";
import type { Product } from "@/types/product";
import { getProductEmoji } from "@/constants/categories";
import { formatTaka, formatUnit } from "@/lib/format";

interface ProductCardProps {
  product: Product;
  rank?: number;
}

export function ProductCard({ product }: ProductCardProps) {
  const emoji =
    product.image || getProductEmoji(product.nameBn, product.category);
  const direction = product.change?.dir ?? "flat";
  const percentage = Math.abs(product.change?.pct ?? 0);

  return (
    <Link
      href={`/product/${product.slug || product.id}`}
      scroll
      className="fo-ref-card"
      aria-label={`${product.nameBn} পণ্যের বিস্তারিত দেখুন`}
    >
      <div className="fo-ref-card-top">
        <div className="fo-ref-card-emoji" aria-hidden="true">
          {emoji}
        </div>

        <div className="fo-ref-card-heading">
          <h3 className="fo-ref-card-name">{product.nameBn}</h3>
          <p className="fo-ref-card-unit">প্রতি {formatUnit(product.unit)}</p>
        </div>
      </div>

      <div className="fo-ref-card-price-block">
        <p className="fo-ref-card-label">আজকের দাম</p>
        <p className="fo-ref-card-price">{formatTaka(product.today)}</p>
      </div>

      <span className={`fo-ref-card-change ${direction}`}>
        {direction === "up" ? "▲ " : direction === "down" ? "▼ " : "• "}
        {percentage.toLocaleString("bn-BD", {
          maximumFractionDigits: 1,
        })}%
      </span>
    </Link>
  );
}
