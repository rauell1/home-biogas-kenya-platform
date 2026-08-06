"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import BrandLogo from "@/components/BrandLogo";

export default function SiteNav({
  locale,
  labels,
}: {
  locale: string;
  labels: Record<string, string>;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Focus trap + Escape key when mobile nav is open
  useEffect(() => {
    if (!open) return;
    const nav = navRef.current;
    if (!nav) return;

    // Focus first focusable element on open
    nav.querySelector<HTMLElement>("a[href], button:not([disabled])")?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      if (!nav) return;
      const focusable = Array.from(
        nav.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const links = [
    ["about", `/${locale}/about`],
    ["solutions", `/${locale}/solutions`],
    ["applications", `/${locale}/applications`],
    ["projects", `/${locale}/projects`],
    ["products", `/${locale}/products`],
    ["training", `/${locale}/training`],
    ["knowledge", `/${locale}/knowledge`],
    ["contact", `/${locale}/contact`],
  ] as const;

  const otherLocale = locale === "en" ? "sw" : "en";
  const swapped = pathname.replace(/^\/(en|sw)/, `/${otherLocale}`) || `/${otherLocale}`;

  return (
    <header
      className={`sticky top-0 z-50 bg-cream/95 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "border-b border-ink/12 shadow-[0_1px_24px_rgba(18,20,18,0.06)]" : "border-b border-ink/8"
      }`}
    >
      <div className="shell flex h-[72px] items-center justify-between gap-6">
        <Link href={`/${locale}`} className="group flex h-full shrink-0 items-center" aria-label="Home Biogas Kenya home">
          <BrandLogo className="!h-[56px] !w-auto max-w-[132px] sm:!h-[60px] sm:max-w-[142px]" />
        </Link>

        <nav aria-label="Primary" className="hidden xl:flex items-center gap-7 text-[0.9rem]">
          {links.map(([key, href]) => (
            <Link
              key={key}
              href={href}
              data-active={pathname === href}
              className="link-quiet py-1 hover:text-clay-text data-[active=true]:text-clay-text"
            >
              {labels[key]}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link href={swapped} className="mono-label border border-ink/25 px-2.5 py-1.5 hover:bg-ink hover:text-bone transition-colors">
            {otherLocale.toUpperCase()}
          </Link>
          <Link href={`/${locale}/request-assessment`} className="btn btn-primary btn-sm">
            {labels.request}
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="xl:hidden flex items-center gap-2 mono-label border border-ink/25 px-3 py-2"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="grid gap-[3px]" aria-hidden>
            <span className={`block h-px w-4 bg-current transition-transform ${open ? "translate-y-[4px] rotate-45" : ""}`} />
            <span className={`block h-px w-4 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px w-4 bg-current transition-transform ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
          </span>
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav
          ref={navRef}
          id="mobile-nav"
          aria-label="Mobile"
          className="xl:hidden fixed inset-x-0 top-[72px] bottom-0 overflow-y-auto bg-cream border-t border-ink/12 animate-slide-down"
        >
          <div className="shell py-6">
            {links.map(([key, href], i) => (
              <Link key={key} href={href} className="flex items-baseline gap-4 border-b border-ink/10 py-4">
                <span className="mono-label text-clay-text">{String(i + 1).padStart(2, "0")}</span>
                <span className="display-md">{labels[key]}</span>
              </Link>
            ))}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href={`/${locale}/request-assessment`} className="btn btn-primary flex-1">
                {labels.request}
              </Link>
              <Link href={swapped} className="mono-label border border-ink/25 px-4 py-3">
                {otherLocale.toUpperCase()}
              </Link>
            </div>
            <div className="mt-8 grid gap-2 mono-label text-ink/50">
              <Link href={`/${locale}/tools/solution-configurator`}>{labels.tools} · Configurator</Link>
              <Link href="/auth/sign-in">Staff sign-in</Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
