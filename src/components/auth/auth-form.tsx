"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

type ProviderAvailability = {
  google: boolean;
  github: boolean;
};

type AuthFormProps = {
  mode: "signin" | "signup";
  socialProviders: ProviderAvailability;
};

export function AuthForm({
  mode,
  socialProviders,
}: AuthFormProps) {
  const router = useRouter();
  const isSignup = mode === "signup";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  function getSafeCallbackURL() {
    const value = new URLSearchParams(window.location.search).get("callbackURL");

    // Only allow local paths; reject external redirect destinations.
    return value && value.startsWith("/") && !value.startsWith("//")
      ? value
      : "/";
  }

  useEffect(() => {
    const reason = new URLSearchParams(window.location.search).get("reason");

    if (mode === "signin" && reason === "auth-required") {
      toast.error("Please sign in to view product details.");
    }
  }, [mode]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const name = String(form.get("name") ?? "").trim();
    const confirmation = String(form.get("confirmPassword") ?? "");

    if (isSignup && name.length < 2) {
      const error = "আপনার নাম কমপক্ষে ২ অক্ষরের হতে হবে।";
      setMessage(error);
      toast.error(error);
      return;
    }

    if (isSignup && password !== confirmation) {
      const error = "দুটি পাসওয়ার্ড মিলছে না। আবার পরীক্ষা করুন।";
      setMessage(error);
      toast.error(error);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = isSignup
        ? await authClient.signUp.email({ name, email, password })
        : await authClient.signIn.email({ email, password });

      if (result.error) {
        const errorMessage =
          result.error.message ??
          "অনুরোধটি সম্পন্ন করা যায়নি। আবার চেষ্টা করুন.";
        setMessage(errorMessage);
        toast.error(errorMessage);
        return;
      }

      if (isSignup) {
        toast.success("Account created. Please sign in.");
        router.push("/signin");
      } else {
        toast.success("Signed in successfully.");
        router.push(getSafeCallbackURL());
      }
    } catch {
      const error =
        "সার্ভারের সঙ্গে সংযোগ করা যায়নি। MongoDB ও server configuration পরীক্ষা করুন।";
      setMessage(error);
      toast.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSocial(provider: "google" | "github") {
    setMessage("");

    if (!socialProviders[provider]) {
      const variables =
        provider === "google"
          ? "GOOGLE_CLIENT_ID এবং GOOGLE_CLIENT_SECRET"
          : "GITHUB_CLIENT_ID এবং GITHUB_CLIENT_SECRET";

      const error =
        `${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন ইন চালু করতে .env.local-এ ${variables} সেট করতে হবে।`;
      setMessage(error);
      toast.error(error);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: getSafeCallbackURL(),
      });

      if (result.error) {
        const errorMessage =
          result.error.message ??
          "সোশ্যাল সাইন ইন সম্পন্ন হয়নি। আবার চেষ্টা করুন।";
        setMessage(errorMessage);
        toast.error(errorMessage);
      }
    } catch {
      const error = "সোশ্যাল সাইন ইন করা যায়নি। আবার চেষ্টা করুন।";
      setMessage(error);
      toast.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className={`auth-card figma-auth-card ${isSignup ? "is-signup" : "is-signin"}`}>
      <h1>{isSignup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন করুন"}</h1>

      <p className="auth-description">
        {isSignup
          ? "বিনা খরচে সাইন আপ করে সব বাজারদর নজরে রাখুন।"
          : "সাইন ইন করে আপনার বাজারদরের অভিজ্ঞতা চালিয়ে যান।"}
      </p>

      <form className="auth-form figma-auth-form" onSubmit={handleSubmit}>
        {isSignup && (
          <label className="auth-field figma-auth-field">
            <span>নাম</span>
            <input
              className="figma-auth-input"
              name="name"
              type="text"
              placeholder="যেমন: রহিম উদ্দিন"
              autoComplete="name"
              minLength={2}
              maxLength={100}
              required
            />
          </label>
        )}

        <label className="auth-field figma-auth-field">
          <span>ইমেইল</span>
          <input
            className="figma-auth-input"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </label>

        <label className="auth-field figma-auth-field">
          <span>পাসওয়ার্ড</span>
          <input
            className="figma-auth-input"
            name="password"
            type="password"
            placeholder={isSignup ? "কমপক্ষে ৮ অক্ষর" : "আপনার পাসওয়ার্ড"}
            autoComplete={isSignup ? "new-password" : "current-password"}
            minLength={isSignup ? 8 : 1}
            required
          />
        </label>

        {isSignup && (
          <label className="auth-field figma-auth-field">
            <span>পাসওয়ার্ড নিশ্চিত করুন</span>
            <input
              className="figma-auth-input"
              name="confirmPassword"
              type="password"
              placeholder="আবার লিখুন"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>
        )}

        <button
          className="auth-submit figma-auth-submit"
          type="submit"
          disabled={isSubmitting}
        >
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

      <div className="figma-divider">
        <span />
        <span>অথবা</span>
        <span />
      </div>

      <div className="figma-social-row">
        <button
          type="button"
          className="figma-social-button"
          onClick={() => handleSocial("google")}
          disabled={isSubmitting}
        >
          <span className="google-g" aria-hidden="true">G</span>
          Google দিয়ে চালিয়ে যান
        </button>

        <button
          type="button"
          className="figma-social-button"
          onClick={() => handleSocial("github")}
          disabled={isSubmitting}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 .5A11.5 11.5 0 0 0 8.36 22.91c.58.11.79-.25.79-.56v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.3 1.18-3.11-.12-.29-.51-1.47.11-3.07 0 0 .96-.31 3.15 1.19a10.95 10.95 0 0 1 5.73 0c2.19-1.5 3.15-1.19 3.15-1.19.62 1.6.23 2.78.11 3.07.74.81 1.18 1.85 1.18 3.11 0 4.43-2.69 5.4-5.25 5.69.41.36.77 1.06.77 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
          </svg>
          GitHub দিয়ে চালিয়ে যান
        </button>
      </div>

      <p className="auth-switch figma-auth-switch">
        {isSignup ? "অ্যাকাউন্ট আছে?" : "অ্যাকাউন্ট নেই?"}{" "}
        <Link href={isSignup ? "/signin" : "/signup"}>
          {isSignup ? "সাইন ইন করুন" : "সাইন আপ করুন"}
        </Link>
      </p>

      <Link href="/" className="auth-home-link figma-auth-home">
        ← হোম পেজে ফিরে যান
      </Link>
    </section>
  );
}
