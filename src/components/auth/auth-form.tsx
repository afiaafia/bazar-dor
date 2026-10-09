"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";

type AuthFormProps = {
  mode: "signin" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const isSignup = mode === "signup";
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(
      "ফর্মের ইনপুট যাচাই করা হয়েছে। অ্যাকাউন্ট চালু করতে এখনো authentication service সংযুক্ত করতে হবে।",
    );
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
              type="password"
              placeholder={isSignup ? "কমপক্ষে ৮ অক্ষর" : "আপনার পাসওয়ার্ড"}
              autoComplete={isSignup ? "new-password" : "current-password"}
              minLength={isSignup ? 8 : 1}
              required
              style={showPassword ? { WebkitTextSecurity: "none" } as React.CSSProperties : undefined}
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

        <button className="auth-submit" type="submit">
          {isSignup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন করুন"}
        </button>

        {message && (
          <p className="auth-notice" role="status">
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
