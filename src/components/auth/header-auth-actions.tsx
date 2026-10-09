"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";

type HeaderAuthActionsProps = {
  user: {
    name: string;
    email: string;
    image?: string | null;
  } | null;
};

export function HeaderAuthActions({ user }: HeaderAuthActionsProps) {
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  async function handleSignOut() {
    if (signingOut) return;

    setSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        console.error("Sign out failed:", result.error);
        setSigningOut(false);
        return;
      }

      setOpen(false);
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
      setSigningOut(false);
    }
  }

  if (!user) {
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

  const displayName = user.name.trim() || "ব্যবহারকারী";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="header-actions header-account" ref={menuRef}>
      <Link
        href="/profile"
        className="header-profile-trigger"
        aria-label="আমার প্রোফাইল"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={displayName}
            width={36}
            height={36}
            className="header-profile-image"
            unoptimized
          />
        ) : (
          <span className="header-profile-avatar" aria-hidden="true">
            {initial || <UserRound size={19} />}
          </span>
        )}
      </Link>

      <button
        type="button"
        className="header-account-toggle"
        aria-label="অ্যাকাউন্ট মেনু"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        <ChevronDown size={17} />
      </button>

      {open && (
        <div className="header-account-menu" role="menu">
          <div className="header-account-identity">
            <strong title={displayName}>{displayName}</strong>
            <span title={user.email}>{user.email}</span>
          </div>

          <div className="header-account-divider" />

          <Link
            href="/profile"
            role="menuitem"
            className="header-account-menu-item"
            onClick={() => setOpen(false)}
          >
            <UserRound size={17} />
            <span>আমার প্রোফাইল</span>
          </Link>

          <button
            type="button"
            role="menuitem"
            className="header-account-menu-item header-account-signout"
            onClick={handleSignOut}
            disabled={signingOut}
          >
            <LogOut size={17} />
            <span>{signingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
