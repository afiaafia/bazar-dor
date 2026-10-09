import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import type { Product } from "@/types/product";
import { getCategoryVisual } from "@/constants/categories";
import { formatTaka, formatUnit } from "@/lib/format";

export function PriceTicker({ products }: { products: Product[] }) {
  const items = products.slice(0, 10);

  if (items.length === 0) return null;

  return (
    <div className="ticker-shell" aria-label="সাম্প্রতিক পণ্যের দাম">
      <div className="ticker-label">
        <span className="ticker-live-dot" />
        বাজার আপডেট
      </div>

      <div className="ticker-viewport">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div className="ticker-group" key={copy} aria-hidden={copy === 1}>
              {items.map((product) => {
                const visual = getCategoryVisual(product.category);
                const direction = product.change?.dir ?? "flat";

                return (
                  <Link
                    href={`/product/${product.slug}`}
                    className="ticker-item"
                    key={`${copy}-${product.id}`}
                    tabIndex={copy === 1 ? -1 : undefined}
                  >
                    <span aria-hidden="true">{visual.emoji}</span>
                    <span className="ticker-product">{product.nameBn}</span>
                    <strong>{formatTaka(product.today)}</strong>
                    <span className={`ticker-change ${direction}`}>
                      {direction === "up" ? (
                        <ArrowUpRight size={13} />
                      ) : direction === "down" ? (
                        <ArrowDownRight size={13} />
                      ) : (
                        <Minus size={12} />
                      )}
                      {Math.abs(product.change?.pct ?? 0).toLocaleString(
                        "bn-BD",
                        { maximumFractionDigits: 1 },
                      )}
                      %
                    </span>
                    <span className="ticker-unit">
                      / {formatUnit(product.unit)}
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
