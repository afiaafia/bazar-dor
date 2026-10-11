export const CATEGORY_ITEMS = [
  { slug: "chal", name: "চাল", emoji: "🍚" },
  { slug: "dal", name: "ডাল", emoji: "🫘" },
  { slug: "tel", name: "তেল", emoji: "🫗" },
  { slug: "sobji", name: "সবজি", emoji: "🥬" },
  { slug: "mach", name: "মাছ", emoji: "🐟" },
  { slug: "mangsho", name: "মাংস", emoji: "🍗" },
  { slug: "dim-dui", name: "ডিম ও দুধ", emoji: "🥚" },
  { slug: "mosla", name: "মসলা", emoji: "🌶️" },
] as const;

export function getCategoryVisual(slug: string) {
  return (
    CATEGORY_ITEMS.find((category) => category.slug === slug) ?? {
      slug,
      name: "অন্যান্য",
      emoji: "🛍️",
    }
  );
}
