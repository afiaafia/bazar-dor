import Link from "next/link";
import { Home, SearchX } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="catalog-page">
      <div className="catalog-container">
        <section className="catalog-state" role="status">
          <SearchX size={42} aria-hidden="true" />
          <span className="catalog-eyebrow">404 — পৃষ্ঠা পাওয়া যায়নি</span>
          <h1>আপনি যে পৃষ্ঠাটি খুঁজছেন, সেটি নেই</h1>
          <p>লিংকটি ভুল হতে পারে অথবা পৃষ্ঠাটি সরানো হয়েছে।</p>
          <Link href="/" className="catalog-action-link">
            <Home size={16} />
            হোম পেজে ফিরে যান
          </Link>
        </section>
      </div>
      </main>
    </>
}
