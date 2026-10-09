import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthFooter } from "@/components/layout/auth-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const instant = false;

export const metadata: Metadata = {
  title: "সাইন ইন",
  description: "বাজার দর অ্যাকাউন্টে সাইন ইন করুন।",
};

export default function SignInPage() {
  return (
    <>
      <SiteHeader />
      <main className="auth-page figma-auth-page">
        <AuthForm
          mode="signin"
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
