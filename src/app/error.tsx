"use client";

import { useEffect } from "react";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Bazar Dor page error:", error);
  }, [error]);

  return (
    <main className="catalog-page">
      <div className="catalog-container">
        <section className="catalog-state" role="alert">
          <AlertTriangle
            size={42}
            aria-hidden="true"
            className="mx-auto"
          />

          <span className="catalog-eyebrow">
            অপ্রত্যাশিত সমস্যা
          </span>

          <h1>পৃষ্ঠাটি লোড করা যায়নি</h1>

          <p>
            সাময়িক সমস্যা হতে পারে। আবার চেষ্টা করুন অথবা হোম পেজে ফিরে যান।
          </p>

          {error.digest && (
            <p className="text-sm" aria-label="Error reference">
              Error reference: {error.digest}
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="catalog-action-link"
            >
              <RefreshCw size={16} />
              আবার চেষ্টা করুন
            </button>

            <Link href="/" className="catalog-action-link">
              <Home size={16} />
              হোম পেজে ফিরে যান
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
