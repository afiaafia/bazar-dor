import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthFooter } from "@/components/layout/auth-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const instant = false;

export const metadata: Metadata = {
  title: "অ্যাকাউন্ট তৈরি করুন",
  description: "বাজার দর-এ নতুন অ্যাকাউন্ট তৈরি করুন।",
};

export default function SignUpPage() {
  return (
    <>
      <SiteHeader />
      <main className="auth-page figma-auth-page">
        <AuthForm
          mode="signup"
          socialProviders={{
            google: Boolean(
              process.env.GOOGLE_CLIENT_ID &&
              process.env.GOOGLE_CLIENT_SECRET,
            ),
            github: Boolean(
              process.env.GITHUB_CLIENT_ID &&
              process.env.GITHUB_CLIENT_SECRET,
            ),
          }}
        />
      </main>
      <AuthFooter />
    </>
  );
}
