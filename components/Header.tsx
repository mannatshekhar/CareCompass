"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useLanguage, LANGUAGES } from "@/lib/i18n";

type Profile = {
  reminderFrequencyMonths: number;
  remindersEnabled: boolean;
  lastCheckupAt: string | null;
  remindAt: string | null;
} | null;

export default function Header() {
  const { data: session, status } = useSession();
  const { lang, setLang, t } = useLanguage();
  const [profile, setProfile] = useState<Profile>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [saving, setSaving] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data) => setProfile(data.profile))
      .catch(() => {});
  }, [status]);

  // Close the reminders panel when clicking outside it.
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setShowSettings(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function saveReminderSettings(months: number, markDoneNow: boolean) {
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reminderFrequencyMonths: months,
          markCheckupDoneNow: markDoneNow,
          remindersEnabled: true,
        }),
      });
      const data = await res.json();
      setProfile(data.profile);
      if (markDoneNow) setShowSettings(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <header className="border-b" style={{ borderColor: "var(--line)" }}>
      <div className="max-w-3xl mx-auto px-5 py-4 flex items-center justify-between gap-3">
        <p className="font-display text-lg font-semibold" style={{ color: "var(--teal-dark)" }}>
          CareCompass
        </p>

        <div className="flex items-center gap-3">
          {/* Language dropdown — native <select> for guaranteed reliable clicking */}
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as typeof lang)}
            className="px-3 py-1.5 rounded-md border text-sm font-medium bg-white cursor-pointer"
            style={{ borderColor: "var(--line)", color: "var(--ink)" }}
            aria-label="Select language"
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>

          {status === "loading" && <div className="text-sm opacity-50">···</div>}

          {status === "unauthenticated" && (
            <button
              onClick={() => signIn("google")}
              className="px-4 py-2 rounded-md text-sm font-medium border-2 whitespace-nowrap"
              style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
            >
              {t("signInButton")}
            </button>
          )}

          {status === "authenticated" && session?.user && (
            <div className="relative flex items-center gap-3">
              <button
                onClick={() => setShowSettings((s) => !s)}
                className="text-sm font-medium px-3 py-1.5 rounded-md border whitespace-nowrap"
                style={{ borderColor: "var(--line)", color: "var(--ink)" }}
              >
                {session.user.name?.split(" ")[0] ?? "Account"} · {t("remindersLabel")}
              </button>
              <button
                onClick={() => signOut()}
                className="text-sm font-medium opacity-60 hover:opacity-100 whitespace-nowrap"
              >
                {t("signOutButton")}
              </button>

              {showSettings && (
                <div
                  ref={panelRef}
                  className="absolute right-0 top-12 w-80 p-4 rounded-lg border bg-white shadow-lg z-10"
                  style={{ borderColor: "var(--line)" }}
                >
                  <p className="text-sm font-medium mb-3">{t("remindersPanelTitle")}</p>
                  <p className="text-xs mb-3" style={{ opacity: 0.65 }}>
                    {t("remindersPanelSubtitle")}
                  </p>

                  <label className="block text-xs font-medium mb-1.5">{t("remindMeEvery")}</label>
                  <div className="flex gap-2 mb-4">
                    {[3, 6, 12].map((m) => (
                      <button
                        key={m}
                        onClick={() => saveReminderSettings(m, false)}
                        disabled={saving}
                        className="px-3 py-1.5 rounded-full text-xs border-2"
                        style={{
                          borderColor:
                            profile?.reminderFrequencyMonths === m ? "var(--teal)" : "var(--ink)",
                          background: profile?.reminderFrequencyMonths === m ? "var(--teal)" : "white",
                          color: profile?.reminderFrequencyMonths === m ? "white" : "var(--ink)",
                        }}
                      >
                        {m} {t("monthsSuffix")}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => saveReminderSettings(profile?.reminderFrequencyMonths ?? 6, true)}
                    disabled={saving}
                    className="w-full px-3 py-2 rounded-md text-xs font-medium text-white"
                    style={{ background: "var(--teal)" }}
                  >
                    {saving ? t("savingButton") : t("markDoneButton")}
                  </button>

                  {profile?.remindAt && (
                    <p className="text-xs mt-3" style={{ opacity: 0.6 }}>
                      {t("nextReminderLabel")} {new Date(profile.remindAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}