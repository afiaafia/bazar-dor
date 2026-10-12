import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { ProductDetailContent } from "@/components/products/product-detail-content";
import { getProductBySlug } from "@/lib/api";
import type { Product } from "@/types/product";
import { auth } from "@/lib/auth";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;

  try {
    const product = await getProductBySlug(id);

    if (product) {
      return {
        title: `${product.nameBn} — বাজারদর`,
        description: `${product.nameBn}-এর বর্তমান দাম ও বাজারভিত্তিক মূল্য তুলনা করুন।`,
      };
    }
  } catch {
    // The detail page handles API failures separately.
  }

  return { title: "পণ্যের বিস্তারিত" };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;

  let product: Product | null = null;
  let apiFailed = false;

  try {
    product = await getProductBySlug(id);
  } catch {
    apiFailed = true;
  }

  if (!product && !apiFailed) notFound();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(
      `/signin?reason=auth-required&callbackURL=${encodeURIComponent(`/product/${id}`)}`,
    );
  }

  if (!product) {
    return (
      <>
        <SiteHeader />
        <main className="min-h-[60vh] bg-[#f0f5f0] px-4 py-16">
          <div className="mx-auto max-w-280 rounded-2xl border border-[#e1e8e1] bg-white p-8 text-center">
            <h1 className="text-xl font-bold text-[#1d271f]">পণ্যের তথ্য লোড করা যায়নি</h1>
            <p className="mt-2 text-sm text-[#6f776f]">ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।</p>
            <Link href="/categories" className="mt-5 inline-flex rounded-lg bg-[#05893e] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#047f39]">
              সব পণ্য দেখুন
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <ProductDetailContent product={product} />
    </>
  );
}
