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


    </>
  );
}
