"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export function HeaderAccount() {
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const router = useRouter();

  if (isPending) {
    return <div className="header-actions" aria-label="অ্যাকাউন্ট লোড হচ্ছে" />;
  }

  if (!session?.user) {
    return (
      <div className="header-actions">
        <Link href="/signin" className="signin-link">
          সাইন ইন
        </Link>
        <Link href="/signup" className="register-link">
          সাইন আপ
        </Link>
      </div>
    );
  }

  const user = session.user;
  const name = user.name || "ব্যবহারকারী";
  const email = user.email || "";
  const image = user.image;
  const initials =
    name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "U";

  async function handleSignOut() {
    if (signingOut) return;
    setSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error(result.error.message || "সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      toast.success("সাইন আউট সম্পন্ন হয়েছে।");
      setOpen(false);
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <div className="header-account">
      <button
        type="button"
        className="header-account-trigger"
        aria-label="অ্যাকাউন্ট মেনু"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="header-account-avatar">
          {image ? (
            // Provider profile image; initials remain available if loading fails.
            <Image width={40} height={40} unoptimized
              src={image}
              alt=""
              referrerPolicy="no-referrer"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          ) : (
            initials
          )}
        </span>
        <ChevronDown size={16} className={open ? "is-rotated" : ""} />
      </button>

      {open && (
        <>
          <button
            type="button"
            className="header-account-dismiss"
            aria-label="মেনু বন্ধ করুন"
            onClick={() => setOpen(false)}
          />
          <div className="header-account-menu">
            <div className="header-account-identity">
              <span className="header-account-avatar header-account-avatar-large">
                {image ? (
                  <Image width={40} height={40} unoptimized src={image} alt="" referrerPolicy="no-referrer"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : initials}
              </span>
              <div className="header-account-user-copy">
                <strong title={name}>{name}</strong>
                <span title={email}>{email}</span>
              </div>
            </div>

            <div className="header-account-divider" />

            <Link
              href="/profile"
              className="header-account-menu-link"
              onClick={() => setOpen(false)}
            >
              <UserRound size={17} />
              <span>আমার প্রোফাইল</span>
            </Link>

            <button
              type="button"
              className="header-account-menu-link header-account-logout"
              onClick={handleSignOut}
              disabled={signingOut}
            >
              <LogOut size={17} />
              <span>{signingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
