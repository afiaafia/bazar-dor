import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";

export const instant = false;

export const metadata: Metadata = {
  title: "অ্যাকাউন্ট তৈরি করুন",
  description: "বাজার দর-এ নতুন অ্যাকাউন্ট তৈরি করুন।",
};

export default function SignUpPage() {
  return (
    <main className="auth-page">
      <div className="auth-layout">
        <div className="auth-side-panel">
          <span className="auth-side-eyebrow">BAZAR DOR · বাজার দর</span>
          <h2>আরও সচেতন<br />বাজারের শুরু এখানে।</h2>
          <p>
            আপনার প্রয়োজনীয় পণ্য সম্পর্কে জানুন, দাম তুলনা করুন
            এবং বাজারের সিদ্ধান্ত নিন তথ্যের ভিত্তিতে।
          </p>
          <div className="auth-side-stat">
            <span aria-hidden="true">✓</span>
            <div>
              <strong>সহজ অভিজ্ঞতা</strong>
              <small>নিত্যদিনের বাজারদর, এক জায়গায়</small>
            </div>
          </div>
        </div>
        <AuthForm mode="signup" />
      </div>
    </main>
  );
}
