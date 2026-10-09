import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, UserRound } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";

export const instant = false;

export const metadata: Metadata = {
  title: "প্রোফাইল আপডেট",
  description: "বাজার দর প্রোফাইলের তথ্য পরিবর্তন করুন।",
};

export default function UpdateProfilePage() {
  return (
    <>
      <SiteHeader />
      <main className="catalog-page">
        <div className="catalog-container">
          <Link href="/profile" className="catalog-back-link">
            <ArrowLeft size={16} /> প্রোফাইলে ফিরে যান
          </Link>

          <section className="profile-edit-card">
            <div className="profile-edit-icon"><UserRound size={25} /></div>
            <span className="catalog-eyebrow">অ্যাকাউন্ট সেটিংস</span>
            <h1>প্রোফাইল আপডেট</h1>
            <p>
              ব্যক্তিগত তথ্য সম্পাদনা করতে প্রথমে আপনার অ্যাকাউন্টে
              সাইন ইন করুন। প্রোফাইল সংরক্ষণ এখনো authentication
              backend-এর সঙ্গে সংযুক্ত নয়।
            </p>
            <Link href="/signin" className="auth-submit profile-edit-cta">
              সাইন ইন করুন
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
