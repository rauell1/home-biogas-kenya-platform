import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { COMPANY } from "@/lib/content";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate grain min-h-screen bg-ink text-bone flex flex-col overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 15% 0%, #372b22 0%, #121412 60%)" }}
      />
      <div aria-hidden className="absolute inset-0 grid-lines opacity-40" />

      <header className="relative z-10 border-b border-ink/10 bg-cream text-ink">
        <div className="shell flex h-[72px] items-center justify-between gap-6">
          <Link href="/en" className="flex h-full shrink-0 items-center" aria-label="Home Biogas Kenya public site">
            <BrandLogo className="!h-[56px] !w-auto max-w-[132px] sm:!h-[60px] sm:max-w-[142px]" />
          </Link>
          <Link href="/en" className="mono-label text-ink/55 transition-colors hover:text-clay">
            ← Public site
          </Link>
        </div>
      </header>

      <main className="relative flex-1 flex items-center justify-center px-5 py-12">
        <div className="relative w-full max-w-md border border-bone/15 border-t-methane bg-ink/70 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.2)] backdrop-blur-sm md:p-10">
          {children}
        </div>
      </main>

      <footer className="relative shell flex flex-wrap items-center justify-between gap-3 py-6 mono-label text-bone/40">
        <span>Invitation-controlled access · Home Biogas Kenya</span>
        <a href={`mailto:${COMPANY.email}`} className="transition-colors hover:text-methane">{COMPANY.email}</a>
      </footer>
    </div>
  );
}
