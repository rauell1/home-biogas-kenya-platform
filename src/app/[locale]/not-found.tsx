import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell py-24 md:py-36 text-center max-w-2xl mx-auto">
      <p className="chapter-marker text-clay mb-4">Error 404  -  Page Not Found</p>
      <h1 className="display-hero">System route unavailable</h1>
      <p className="editorial mt-6 text-lg text-ink/75">
        The requested page or resource could not be found. It may have been moved, renamed, or is currently under technical review.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link href="/en" className="btn btn-primary">
          Return to homepage →
        </Link>
        <Link href="/en/solutions" className="btn btn-outline">
          Explore solutions
        </Link>
        <Link href="/en/request-assessment" className="btn btn-accent">
          Request assessment
        </Link>
      </div>
    </div>
  );
}
