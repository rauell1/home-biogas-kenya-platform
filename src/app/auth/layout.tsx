import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate grain min-h-screen bg-ink text-bone flex flex-col overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 15% 0%, #372b22 0%, #121412 60%)" }}
      />
      <div aria-hidden className="absolute inset-0 grid-lines opacity-40" />

      <header className="relative shell py-6 flex items-center justify-between">
        <Link href="/en" className="inline-block bg-white p-2">
          <BrandLogo className="w-[150px]" />
        </Link>
        <Link href="/en" className="mono-label text-bone/50 hover:text-methane">
          ← Public site
        </Link>
      </header>

      <main className="relative flex-1 flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md border border-bone/15 bg-ink/60 backdrop-blur-sm p-8 md:p-10">{children}</div>
      </main>

      <footer className="relative shell py-6 mono-label text-bone/35">
        Invitation-controlled access · Home Biogas Kenya
      </footer>
    </div>
  );
}
