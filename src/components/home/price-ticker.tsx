import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  Minus,
} from "lucide-react";
import type { Product } from "@/types/product";
import { getCategoryVisual } from "@/constants/categories";
import { formatBengaliNumber, formatUnit } from "@/lib/format";

export function PriceTicker({ products }: { products: Product[] }) {
  const items = products.slice(0, 12);

  if (items.length === 0) return null;

  return (
    <div className="ticker-shell figma-ticker" aria-label="সাম্প্রতিক বাজারদর">
      <div className="ticker-viewport">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div
              className="ticker-group"
              key={copy}
              aria-hidden={copy === 1}
            >
              {items.map((product) => {
                const visual = getCategoryVisual(product.category);
                const direction = product.change?.dir ?? "flat";
                const percentage = Math.abs(product.change?.pct ?? 0);

                return (
                  <Link
                    href={`/products/${product.id}`}
                    className="ticker-item"
                    key={`${copy}-${product.id}`}
                    tabIndex={copy === 1 ? -1 : undefined}
                  >
                    <span aria-hidden="true">{visual.emoji}</span>
                    <span className="ticker-product">{product.nameBn}</span>
                    <strong>
                      {formatBengaliNumber(product.today)} টাকা/
                      {formatUnit(product.unit)}
                    </strong>
                    <span className={`ticker-change ${direction}`}>
                      {direction === "up" ? (
                        <ArrowUpRight size={12} />
                      ) : direction === "down" ? (
                        <ArrowDownRight size={12} />
                      ) : (
                        <Minus size={11} />
                      )}
                      {formatBengaliNumber(percentage)}%
                    </span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
