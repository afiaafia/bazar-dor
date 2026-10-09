import ProductDetailPage from "@/app/products/[id]/page";
import { getProductBySlug } from "@/lib/api";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  try {
    const product = await getProductBySlug(slug);

    if (product) {
      return {
        title: `${product.nameBn} — বাজারদর`,
        description: `${product.nameBn}-এর বর্তমান দাম ও বাজারভিত্তিক মূল্য তুলনা করুন।`,
      };
    }
  } catch {
    // Keep metadata available when the API is temporarily unavailable.
  }

  return { title: "পণ্যের বিস্তারিত" };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  return ProductDetailPage({
    params: Promise.resolve({ id: slug }),
  });
}
