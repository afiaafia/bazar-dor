import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Product } from "@/types/product";
import { formatBengaliNumber, formatUnit } from "@/lib/format";

export function ProductDetailContent({
  product,
}: {
  product: Product;
}) {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const markets = product.markets ?? [];

  const minimumPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : null;

  const maximumPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : null;

  const averagePrice =
    markets.length > 0
      ? markets.reduce(
          (total, market) => total + (market.min + market.max) / 2,
          0,
        ) / markets.length
      : null;

  const cards = [
    {
      label: "সর্বনিম্ন দাম",
      value: minimumPrice,
      note: "সবচেয়ে কম দামের বাজার",
      color: "text-[#16804d]",
    },
    {
      label: "সর্বাধিক দাম",
      value: maximumPrice,
      note: "সবচেয়ে বেশি দামের বাজার",
      color: "text-[#c94e47]",
    },
    {
      label: "গড় দাম",
      value: averagePrice,
      note: `প্রতি ${formatUnit(product.unit)}-এর হিসাবে`,
      color: "text-[#16804d]",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-6 text-[#1d271f] sm:px-6">
      <div className="mx-auto w-full max-w-[1120px]">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-[13px] text-[#6f776f]">
          <Link href="/" className="hover:text-[#05893e]">হোম</Link>
          <ChevronRight size={13} />
          <Link href="/categories" className="hover:text-[#05893e]">ক্যাটাগরি</Link>
          <ChevronRight size={13} />
          <Link href={`/categories/${product.category}`} className="hover:text-[#05893e]">
            {product.categoryNameBn}
          </Link>
          <ChevronRight size={13} />
          <span className="font-medium text-[#1d271f]">{product.nameBn}</span>
        </nav>

        <section className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-5 sm:p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-[#edf8f0] text-3xl sm:size-[76px] sm:text-4xl" aria-hidden="true">
                {product.image || product.categoryIcon || "🛒"}
              </div>
              <div className="min-w-0">
                <h1 className="text-xl font-bold leading-snug sm:text-2xl">{product.nameBn}</h1>
                <p className="mt-1 text-sm text-[#6f776f]">
                  প্রতি {formatUnit(product.unit)} · {product.categoryNameBn}
                </p>
                <p className="mt-2 text-[13px] text-[#6f776f]">
                  গতকালের তুলনায় আজ দাম{" "}
                  <span className={`font-semibold ${isUp ? "text-[#d03739]" : isDown ? "text-[#1a9951]" : "text-[#6f776f]"}`}>
                    {isUp ? "বেড়েছে " : isDown ? "কমেছে " : "অপরিবর্তিত "}
                    {formatBengaliNumber(Math.abs(product.change?.pct ?? 0))}%
                  </span>
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-[#edf8f0] px-6 py-4 text-center sm:min-w-[155px]">
              <p className="text-xs text-[#6f776f]">আজকের দাম</p>
              <p className="mt-1 text-[25px] font-bold">{formatBengaliNumber(product.today)}</p>
              <p className="text-xs text-[#6f776f]">টাকা / {formatUnit(product.unit)}</p>
              <p className={`mt-1 text-xs font-semibold ${isUp ? "text-[#d03739]" : isDown ? "text-[#1a9951]" : "text-[#6f776f]"}`}>
                {isUp ? <span className="price-direction-indicator rise" style={{ color: "#E53935", fontWeight: 900, fontSize: "1.05em" }}>▲</span> : isDown ? <span className="price-direction-indicator fall" style={{ color: "#2EAD4A", fontWeight: 900, fontSize: "1.05em" }}>▼</span> : "• "}
                {formatBengaliNumber(Math.abs(product.change?.pct ?? 0))}%
              </p>
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-5 sm:p-6">
          <h2 className="text-lg font-bold sm:text-xl">দামের সারসংক্ষেপ</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {cards.map((card) => (
              <article key={card.label} className="rounded-xl border border-[#e1e8e1] bg-white p-4">
                <p className="text-xs text-[#6f776f]">{card.label}</p>
                <p className={`mt-1 text-xl font-bold ${card.color}`}>
                  {card.value === null ? "তথ্য নেই" : formatBengaliNumber(card.value)}
                  {card.value !== null && <span className="ml-1 text-sm font-medium">টাকা</span>}
                </p>
                <p className="mt-1 text-[11px] text-[#6f776f]">{card.note}</p>
              </article>
            ))}
          </div>

          <div className="mt-6">
            <h2 className="mb-3 text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
            {markets.length === 0 ? (
              <div className="rounded-xl border border-[#e1e8e1] bg-white px-4 py-8 text-center text-sm text-[#6f776f]">
                এই পণ্যের বাজারভিত্তিক দামের তথ্য এখনো পাওয়া যায়নি।
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-[#e1e8e1] bg-white">
                <table className="w-full min-w-[650px] text-[13px]">
                  <thead>
                    <tr className="border-b border-[#e1e8e1] bg-[#edf8f0] text-[#6f776f]">
                      <th className="px-4 py-3 text-left font-medium">বাজার</th>
                      <th className="px-4 py-3 text-left font-medium">বিভাগ</th>
                      <th className="px-4 py-3 text-right font-medium">সর্বনিম্ন</th>
                      <th className="px-4 py-3 text-right font-medium">সর্বাধিক</th>
                      <th className="px-4 py-3 text-right font-medium">গড়</th>
                    </tr>
                  </thead>
                  <tbody>
                    {markets.map((market, index) => (
                      <tr key={`${market.market}-${market.division}-${index}`} className={index % 2 === 0 ? "bg-[#edf8f0]/60" : "bg-white"}>
                        <td className="px-4 py-3">{market.market}</td>
                        <td className="px-4 py-3 text-[#6f776f]">{market.division}</td>
                        <td className="px-4 py-3 text-right">{formatBengaliNumber(market.min)} টাকা</td>
                        <td className="px-4 py-3 text-right">{formatBengaliNumber(market.max)} টাকা</td>
                        <td className="px-4 py-3 text-right font-semibold">
                          {formatBengaliNumber((market.min + market.max) / 2)} টাকা
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

      </div>
    </main>
  );
}
