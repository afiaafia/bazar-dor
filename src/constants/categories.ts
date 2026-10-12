export const CATEGORY_ITEMS = [
  { slug: "chal", name: "চাল", emoji: "🍚" },
  { slug: "dal", name: "ডাল", emoji: "🫘" },
  { slug: "tel", name: "তেল", emoji: "🛢️" },
  { slug: "sobji", name: "সবজি", emoji: "🥬" },
  { slug: "mach", name: "মাছ", emoji: "🐟" },
  { slug: "mangsho", name: "মাংস", emoji: "🍗" },
  { slug: "dim-dui", name: "ডিম ও দুধ", emoji: "🥛" },
  { slug: "mosla", name: "মসলা", emoji: "🌶️" },
] as const;

export function getCategoryVisual(slug: string) {
  return (
    CATEGORY_ITEMS.find((category) => category.slug === slug) ?? {
      slug,
      name: "অন্যান্য",
      emoji: "🛒",
    }
  );
}


/**
 * Pick an emoji for the actual product, not only its broad category.
 * Used by product cards so the same item looks consistent across pages.
 */
export function getProductEmoji(nameBn: string, category: string): string {
  const name = nameBn.toLowerCase().trim();

  // Specific product rules must appear before broader rules.
  const rules: Array<[string[], string]> = [
    // Rice
    [["স্বর্ণা", "মিনিকেট", "নাজির", "বাটার সাইজ", "চাল", "ধান"], "🍚"],

    // Pulses
    [["মসুর", "মুগ ডাল", "ছোলা", "অ্যাংকর", "অ্যাঙ্কর", "ডাল"], "🫘"],

    // Oils
    [["সরিষার তেল", "সরিষা তেল", "ঘানি ভাঙা", "ঘানি ভাঙ্গা"], "🍼"],
    [["পাম তেল"], "🥫"],
    [["সয়াবিন তেল", "সয়াবিন তেল"], "🫗"],
    [["নারিকেল তেল", "নারকেল তেল"], "🥥"],
    [["সূর্যমুখী তেল"], "🌻"],
    [["তেল"], "🫗"],

    // Vegetables
    [["আলু"], "🥔"],
    [["পেঁয়াজ", "পেঁয়াজ"], "🧅"],
    [["কাঁচামরিচ", "শুকনো মরিচ", "মরিচ", "লঙ্কা"], "🌶️"],
    [["বেগুন"], "🍆"],
    [["পটল"], "🟢"],
    [["টমেটো"], "🍅"],
    [["গাজর"], "🥕"],
    [["শসা", "খিরা"], "🥒"],
    [["ফুলকপি", "ব্রকলি"], "🥦"],
    [["বাঁধাকপি"], "🥬"],
    [["লাউ", "কুমড়া", "কুমড়া"], "🎃"],
    [["রসুন"], "🧄"],
    [["আদা"], "🫚"],
    [["পালং", "শাক", "লালশাক"], "🥬"],
    [["লেবু"], "🍋"],

    // Fish and seafood
    [["চিংড়ি", "চিংড়ি"], "🦐"],
    [["ইলিশ", "কাতলা"], "🐠"],
    [["রুই", "তেলাপিয়া", "তেলাপিয়া", "পাঙ্গাস", "মাছ"], "🐟"],

    // Meat
    [["খাসির মাংস", "খাসি", "ছাগল"], "🍖"],
    [["হাঁসের মাংস", "হাঁস"], "🦆"],
    [["গরুর মাংস", "গরু"], "🥩"],
    [["মুরগির মাংস", "মুরগি", "চিকেন"], "🍗"],

    // Eggs and dairy
    [["ডিম"], "🥚"],
    [["দুধ"], "🥛"],
    [["দই", "যোগার্ট", "ইয়োগার্ট", "ইয়োগার্ট"], "🥣"],
    [["মাখন", "বাটার"], "🧈"],

    // Spices
    [["হলুদ"], "🟡"],
    [["জিরা"], "🌿"],
    [["ধনে", "ধনেপাতা", "ধনে গুঁড়া", "ধনে গুঁড়া"], "🌿"],
    [["লবণ", "নুন"], "🧂"],
    [["দারুচিনি"], "🪵"],
    [["এলাচ"], "🌱"],
    [["গোলমরিচ"], "⚫"],

    // Fruits
    [["কলা"], "🍌"],
    [["আপেল"], "🍎"],
  ];

  for (const [keywords, emoji] of rules) {
    if (keywords.some((keyword) => name.includes(keyword))) {
      return emoji;
    }
  }

  const fallback = CATEGORY_ITEMS.find((item) => item.slug === category);
  return fallback?.emoji ?? "🛒";
}
