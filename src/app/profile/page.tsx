import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { ProfileActions } from "@/components/profile/profile-actions";
import { auth } from "@/lib/auth";
import "./profile.css";

export const instant = false;

export const metadata: Metadata = {
  title: "আমার প্রোফাইল | বাজার দর",
  description: "আপনার বাজার দর অ্যাকাউন্টের তথ্য পরিচালনা করুন।",
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

      <main className="account-profile-page">
        <div className="account-profile-container">
          <div className="account-profile-mark" aria-hidden="true">
            <span>ব</span>
          </div>

          <header className="account-profile-heading">
            <h1>আমার প্রোফাইল</h1>
            <p>আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
          </header>

          <ProfileActions
            initialName={session.user.name || ""}
            email={session.user.email || ""}
            image={session.user.image || null}
          />
        </div>
      </main>

      <footer className="account-profile-footer">
        <div>
          <span>বাজার দর</span>
          <p>প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        </div>
        <p className="account-profile-footer-note">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </footer>
    </>
  );
}
