import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowRight, Bell, Heart, Settings2, UserRound } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { ProfileActions } from "@/components/profile/profile-actions";
import { auth } from "@/lib/auth";

export const instant = false;

export const metadata: Metadata = {
  title: "আমার প্রোফাইল",
  description: "আপনার বাজার দর প্রোফাইল ও পছন্দের সেটিংস।",
};

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

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
            <div className="profile-avatar">
              <UserRound size={32} />
            </div>
            <div className="profile-summary-copy">
              <h2>{session.user.name || "ব্যবহারকারী"}</h2>
              <p>{session.user.email}</p>
              <span className="profile-option-status">সাইন ইন করা আছে</span>
            </div>
            <Link href="/profile/update" className="profile-signin-link">
              প্রোফাইল সম্পাদনা <ArrowRight size={16} />
            </Link>
          </section>

          <div className="profile-options-grid">
            <article className="profile-option-card">
              <span className="profile-option-icon">
                <Heart size={21} />
              </span>
              <h2>পছন্দের পণ্য</h2>
              <p>আপনার নজরে রাখা পণ্যগুলো এক জায়গায় রাখুন।</p>
              <span className="profile-option-status">
                ফিচারটি এখনো সংযুক্ত নয়
              </span>
            </article>

            <article className="profile-option-card">
              <span className="profile-option-icon">
                <Bell size={21} />
              </span>
              <h2>দামের আপডেট</h2>
              <p>পণ্যের দাম পরিবর্তনের বিজ্ঞপ্তি ব্যবস্থাপনা।</p>
              <span className="profile-option-status">
                ফিচারটি এখনো সংযুক্ত নয়
              </span>
            </article>

            <article className="profile-option-card">
              <span className="profile-option-icon">
                <Settings2 size={21} />
              </span>
              <h2>প্রোফাইল সেটিংস</h2>
              <p>আপনার নাম পরিবর্তন করুন অথবা সাইন আউট করুন।</p>
              <Link href="/profile/update" className="profile-option-link">
                সেটিংস খুলুন <ArrowRight size={15} />
              </Link>
            </article>
          </div>

          <ProfileActions initialName={session.user.name || ""} />
        </div>
      </main>
    </>
  );
}
