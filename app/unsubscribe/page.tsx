"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function UnsubscribePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");

  useEffect(() => {
    if (!id) {
      setStatus("error");
      return;
    }
    fetch("/api/unsubscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        setStatus("done");
      })
      .catch(() => setStatus("error"));
  }, [id]);

  return (
    <div style={{ maxWidth: 480, margin: "80px auto", padding: "0 24px", fontFamily: "Georgia, serif", textAlign: "center" }}>
      <h1 style={{ fontSize: 22, color: "#0f4c4c", marginBottom: 16 }}>CareCompass</h1>

      {status === "loading" && <p>Updating your preferences…</p>}

      {status === "done" && (
        <>
          <p style={{ fontSize: 16, marginBottom: 8 }}>You've been unsubscribed from checkup reminders.</p>
          <p style={{ fontSize: 14, color: "#666" }}>
            You can turn them back on anytime from your account settings on CareCompass.
          </p>
        </>
      )}

      {status === "error" && (
        <p style={{ fontSize: 16, color: "#a33" }}>
          Something went wrong. Please try again or contact us.
        </p>
      )}
    </div>
  );
}