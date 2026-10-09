"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut, Save, UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

type ProfileActionsProps = {
  initialName: string;
  email: string;
  image?: string | null;
};

export function ProfileActions({
  initialName,
  email,
  image,
}: ProfileActionsProps) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success",
  );

  async function saveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const cleanName = name.trim();

    if (cleanName.length < 2) {
      setMessageType("error");
      setMessage("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
      return;
    }

    setBusy(true);

    try {
      const result = await authClient.updateUser({ name: cleanName });

      if (result.error) {
        setMessageType("error");
        setMessage(result.error.message ?? "নাম আপডেট করা যায়নি।");
        return;
      }

      setName(cleanName);
      setMessageType("success");
      setMessage("আপনার নাম সফলভাবে আপডেট হয়েছে।");
      toast.success("Profile updated successfully.");
      router.refresh();
    } catch {
      setMessageType("error");
      setMessage("আপডেট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    setBusy(true);
    setMessage("");

    try {
      const result = await authClient.signOut();

      if (result.error) {
        setMessageType("error");
        setMessage(result.error.message ?? "সাইন আউট করা যায়নি।");
        setBusy(false);
        return;
      }

      toast.success("Signed out successfully.");
      router.replace("/signin");
    } catch {
      setMessageType("error");
      setMessage("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
      setBusy(false);
    }
  }

  const initials = name.trim().charAt(0).toUpperCase() || "ব";

  return (
    <div className="account-profile-content">
      <section className="account-user-card" aria-label="ব্যবহারকারীর তথ্য">
        <div className="account-user-identity">
          <div className="account-user-avatar">
            {image ? (
              <Image
                src={image}
                alt={`${name || "ব্যবহারকারী"}-এর প্রোফাইল ছবি`}
                width={76}
                height={76}
                unoptimized
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="account-user-avatar-fallback">
                {initials || <UserRound size={30} />}
              </span>
            )}
          </div>

          <div className="account-user-copy">
            <h2>{name || "ব্যবহারকারী"}</h2>
            <p>{email}</p>
          </div>
        </div>

        <button
          className="account-signout-button"
          type="button"
          onClick={signOut}
          disabled={busy}
        >
          <LogOut size={17} />
          <span>{busy ? "অপেক্ষা করুন..." : "সাইন আউট"}</span>
        </button>
      </section>

      <section className="account-information-card">
        <h2>তথ্য</h2>

        <form onSubmit={saveProfile} className="account-profile-form">
          <label htmlFor="profile-name">নাম</label>

          <input
            id="profile-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            minLength={2}
            maxLength={100}
            autoComplete="name"
            placeholder="আপনার নাম লিখুন"
            required
            disabled={busy}
          />

          {message && (
            <p
              className={`account-profile-message ${messageType}`}
              role="status"
              aria-live="polite"
            >
              {message}
            </p>
          )}

          <button
            className="account-profile-update-button"
            type="submit"
            disabled={busy}
          >
            <Save size={17} />
            {busy ? "আপডেট হচ্ছে..." : "আপডেট"}
          </button>
        </form>
      </section>
    </div>
  );
}
