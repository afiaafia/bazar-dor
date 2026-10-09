import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bell, Heart, Settings2, UserRound } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";

export const instant = false;

export const metadata: Metadata = {
  title: "আমার প্রোফাইল",
  description: "আপনার বাজার দর প্রোফাইল ও পছন্দের সেটিংস।",
};

export default function ProfilePage() {
  return (
    <>
      <SiteHeader />
      <main className="catalog-page">
        <div className="catalog-container">
          <div className="profile-heading">
            <span className="catalog-eyebrow">আপনার অ্যাকাউন্ট</span>
            <h1>আমার প্রোফাইল</h1>
            <p>আপনার ব্যক্তিগত তথ্য এবং পছন্দের সেটিংস পরিচালনা করুন।</p>
          </div>

          <section className="profile-summary-card">
            <div className="profile-avatar"><UserRound size={32} /></div>
            <div className="profile-summary-copy">
              <h2>স্বাগতম!</h2>
              <p>প্রোফাইলের তথ্য দেখতে ও পরিবর্তন করতে সাইন ইন করতে হবে।</p>
            </div>
            <Link href="/signin" className="profile-signin-link">
              সাইন ইন <ArrowRight size={16} />
            </Link>
          </section>

          <div className="profile-options-grid">
            <article className="profile-option-card">
              <span className="profile-option-icon"><Heart size={21} /></span>
              <h2>পছন্দের পণ্য</h2>
              <p>আপনার নজরে রাখা পণ্যগুলো এক জায়গায় রাখুন।</p>
              <span className="profile-option-status">সাইন ইন প্রয়োজন</span>
            </article>
            <article className="profile-option-card">
              <span className="profile-option-icon"><Bell size={21} /></span>
              <h2>দামের আপডেট</h2>
              <p>পণ্যের দাম পরিবর্তনের বিজ্ঞপ্তি ব্যবস্থাপনা।</p>
              <span className="profile-option-status">সাইন ইন প্রয়োজন</span>
            </article>
            <article className="profile-option-card">
              <span className="profile-option-icon"><Settings2 size={21} /></span>
              <h2>প্রোফাইল সেটিংস</h2>
              <p>আপনার নাম এবং অন্যান্য তথ্য পরিবর্তন করুন।</p>
              <Link href="/profile/update" className="profile-option-link">
                সেটিংস খুলুন <ArrowRight size={15} />
              </Link>
            </article>
          </div>
        </div>
      </main>
    </>
  );
}
