"use client";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({
  error,
  reset,
}: GlobalErrorProps) {
  return (
    <html lang="bn">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "24px",
          background: "#f8fafc",
          color: "#0f172a",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <main
          style={{
            width: "100%",
            maxWidth: "480px",
            textAlign: "center",
            padding: "36px 24px",
            border: "1px solid #e2e8f0",
            borderRadius: "20px",
            background: "#ffffff",
            boxSizing: "border-box",
          }}
        >
          <p style={{ fontSize: "48px", margin: "0 0 16px" }}>
            🛒
          </p>

          <h1 style={{ fontSize: "28px", margin: "0 0 12px" }}>
            কিছু একটা সমস্যা হয়েছে
          </h1>

          <p style={{ color: "#64748b", lineHeight: 1.7 }}>
            পেজটি লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।
          </p>

          {error.digest ? (
            <p style={{ color: "#64748b", fontSize: "12px" }}>
              Error reference: {error.digest}
            </p>
          ) : null}

          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "16px",
              border: 0,
              borderRadius: "10px",
              padding: "12px 20px",
              background: "#15803d",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            আবার চেষ্টা করুন
          </button>
        </main>
      </body>
    </html>
  );
}
