"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";

type AuthFormProps = {
  mode: "signin" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const isSignup = mode === "signup";
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const name = String(form.get("name") ?? "").trim();
    const confirmation = String(form.get("confirmPassword") ?? "");

    if (isSignup && password !== confirmation) {
      setMessage("দুটি পাসওয়ার্ড মিলছে না। আবার পরীক্ষা করুন।");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = isSignup
        ? await authClient.signUp.email({ name, email, password })
        : await authClient.signIn.email({ email, password });

      if (result.error) {
        setMessage(
          result.error.message ?? "অনুরোধটি সম্পন্ন করা যায়নি। আবার চেষ্টা করুন।",
        );
        return;
      }

      window.location.assign("/profile");
    } catch {
      setMessage(
        "সার্ভারের সঙ্গে সংযোগ করা যায়নি। MongoDB সংযোগ এবং development server পরীক্ষা করুন।",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="auth-card">
      <div className="auth-brand-mark" aria-hidden="true">
        <LockKeyhole size={25} />
      </div>

      <span className="catalog-eyebrow">
        {isSignup ? "নতুন অ্যাকাউন্ট" : "আপনার অ্যাকাউন্ট"}
      </span>

      <h1>{isSignup ? "বাজার দর-এ যোগ দিন" : "আবার ফিরে আসুন"}</h1>

      <p className="auth-description">
        {isSignup
          ? "বাজারদর পর্যবেক্ষণ এবং আপনার পছন্দের পণ্য এক জায়গায় রাখুন।"
          : "আপনার বাজারদর দেখার অভিজ্ঞতা চালিয়ে যেতে সাইন ইন করুন।"}
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        {isSignup && (
          <label className="auth-field">
            <span>আপনার নাম</span>
            <span className="auth-input-wrap">
              <UserRound size={17} aria-hidden="true" />
              <input
                name="name"
                type="text"
                placeholder="সম্পূর্ণ নাম লিখুন"
                autoComplete="name"
                minLength={2}
                required
              />
            </span>
          </label>
        )}

        <label className="auth-field">
          <span>ইমেইল ঠিকানা</span>
          <span className="auth-input-wrap">
            <Mail size={17} aria-hidden="true" />
            <input
              name="email"
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              required
            />
          </span>
        </label>

        <label className="auth-field">
          <span>পাসওয়ার্ড</span>
          <span className="auth-input-wrap">
            <LockKeyhole size={17} aria-hidden="true" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder={isSignup ? "কমপক্ষে ৮ অক্ষর" : "আপনার পাসওয়ার্ড"}
              autoComplete={isSignup ? "new-password" : "current-password"}
              minLength={isSignup ? 8 : 1}
              required
            />
            <button
              type="button"
              className="auth-password-toggle"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </span>
        </label>

        {isSignup && (
          <label className="auth-field">
            <span>পাসওয়ার্ড নিশ্চিত করুন</span>
            <span className="auth-input-wrap">
              <LockKeyhole size={17} aria-hidden="true" />
              <input
                name="confirmPassword"
                type="password"
                placeholder="পাসওয়ার্ড আবার লিখুন"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </span>
          </label>
        )}

        {isSignup && (
          <label className="auth-terms">
            <input type="checkbox" required />
            <span>আমি ব্যবহারের শর্তাবলি ও গোপনীয়তা নীতিতে সম্মত।</span>
          </label>
        )}

        <button className="auth-submit" type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "অপেক্ষা করুন..."
            : isSignup
              ? "অ্যাকাউন্ট তৈরি করুন"
              : "সাইন ইন করুন"}
        </button>

        {message && (
          <p className="auth-notice" role="alert">
            {message}
          </p>
        )}
      </form>

      <div className="auth-switch">
        {isSignup ? "আগে থেকেই অ্যাকাউন্ট আছে?" : "নতুন ব্যবহারকারী?"}{" "}
        <Link href={isSignup ? "/signin" : "/signup"}>
          {isSignup ? "সাইন ইন করুন" : "অ্যাকাউন্ট তৈরি করুন"}
        </Link>
      </div>

      <Link href="/" className="auth-home-link">
        ← হোমপেজে ফিরে যান
      </Link>
    </section>
  );
}
