import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";

export const instant = false;

export const metadata: Metadata = {
  title: "সাইন ইন",
  description: "বাজার দর অ্যাকাউন্টে সাইন ইন করুন।",
};

export default function SignInPage() {
  return (
    <main className="auth-page">
      <div className="auth-layout">
        <div className="auth-side-panel">
          <span className="auth-side-eyebrow">BAZAR DOR · বাজার দর</span>
          <h2>বাজার বুঝুন।<br />সাশ্রয় করুন।</h2>
          <p>
            নিত্যপ্রয়োজনীয় পণ্যের দাম তুলনা করুন এবং সচেতনভাবে
            বাজার করার পরিকল্পনা নিন।
          </p>
          <div className="auth-side-stat">
            <span aria-hidden="true">৳</span>
            <div>
              <strong>দাম থাকুক আপনার জানা</strong>
              <small>বাজার করার আগে, বাজারদর দেখুন</small>
            </div>
          </div>
        </div>
        <AuthForm mode="signin" />
      </div>
    </main>
  );
}
