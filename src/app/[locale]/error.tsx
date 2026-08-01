"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled runtime error:", error);
  }, [error]);

  return (
    <div className="shell py-24 text-center max-w-2xl mx-auto">
      <p className="chapter-marker text-clay mb-4">System Exception</p>
      <h1 className="display-lg">An unexpected error occurred</h1>
      <p className="editorial mt-4 text-ink/75">
        Our engineering monitoring systems have logged this issue. You may attempt to reload the view or return to the platform homepage.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <button type="button" onClick={() => reset()} className="btn btn-primary">
          Try again
        </button>
        <Link href="/en" className="btn btn-outline">
          Return home
        </Link>
      </div>
    </div>
  );
}
