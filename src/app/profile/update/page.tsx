import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowLeft, UserRound } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { ProfileActions } from "@/components/profile/profile-actions";
import { auth } from "@/lib/auth";

export const instant = false;

export const metadata: Metadata = {
  title: "প্রোফাইল আপডেট",
  description: "বাজার দর প্রোফাইলের তথ্য পরিবর্তন করুন।",
};

export default async function UpdateProfilePage() {
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
          <Link href="/profile" className="catalog-back-link">
            <ArrowLeft size={16} /> প্রোফাইলে ফিরে যান
          </Link>

          <section className="profile-edit-card">
            <div className="profile-edit-icon">
              <UserRound size={25} />
            </div>
            <span className="catalog-eyebrow">অ্যাকাউন্ট সেটিংস</span>
            <h1>প্রোফাইল আপডেট</h1>
            <p>
              আপনার অ্যাকাউন্টের নাম আপডেট করুন। পরিবর্তনগুলো Better Auth-এর
              মাধ্যমে সংরক্ষিত হবে।
            </p>
            <ProfileActions
              initialName={session.user.name || ""}
              email={session.user.email || ""}
              image={session.user.image || null}
              mode="edit"
            />
          </section>
        </div>
      </main>
    </>
  );
}
