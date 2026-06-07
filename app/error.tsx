"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="error-state bg-ink text-pearl">
      <div className="error-state-panel">
        <span>Runtime Guard</span>
        <h1>Something interrupted this experience.</h1>
        <p>
          The portfolio is still available. Retry the current view or return to
          the homepage.
        </p>
        <div>
          <button type="button" onClick={reset}>
            Try Again
          </button>
          <Link href="/">Go Home</Link>
        </div>
      </div>
    </main>
  );
}
