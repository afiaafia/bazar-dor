"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Save } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export function ProfileActions({ initialName }: { initialName: string }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function saveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const cleanName = name.trim();

    if (cleanName.length < 2) {
      setMessage("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
      return;
    }

    setBusy(true);

    try {
      const result = await authClient.updateUser({ name: cleanName });

      if (result.error) {
        setMessage(result.error.message ?? "নাম আপডেট করা যায়নি।");
        return;
      }

      setMessage("আপনার নাম সফলভাবে আপডেট হয়েছে।");
      router.refresh();
    } catch {
      setMessage("অনুরোধ সম্পন্ন হয়নি। আবার চেষ্টা করুন।");
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
        setMessage(result.error.message ?? "সাইন আউট করা যায়নি।");
        return;
      }

      window.location.assign("/signin");
    } catch {
      setMessage("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="profile-actions">
      <form className="profile-name-form" onSubmit={saveProfile}>
        <label className="auth-field">
          <span>আপনার নাম</span>
          <input
            className="profile-name-input"
            value={name}
            onChange={(event) => setName(event.target.value)}
            minLength={2}
            maxLength={100}
            autoComplete="name"
            required
          />
        </label>

        <button className="auth-submit" type="submit" disabled={busy}>
          <Save size={16} />
          {busy ? "অপেক্ষা করুন..." : "নাম সংরক্ষণ করুন"}
        </button>
      </form>

      <button
        className="profile-signout-button"
        type="button"
        onClick={signOut}
        disabled={busy}
      >
        <LogOut size={16} />
        সাইন আউট
      </button>

      {message && (
        <p className="auth-notice" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
