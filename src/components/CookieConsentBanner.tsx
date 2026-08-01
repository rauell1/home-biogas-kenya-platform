"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  type ConsentCategories,
  ALL_GRANTED_CONSENT,
  DEFAULT_CONSENT,
  loadUserConsent,
  saveUserConsent,
} from "@/lib/consent-manager";

export default function CookieConsentBanner({
  locale,
  labels,
}: {
  locale: string;
  labels: {
    bannerTitle: string;
    bannerBody: string;
    acceptAll: string;
    rejectOptional: string;
    customize: string;
    savePreferences: string;
    manageTitle: string;
    necessaryTitle: string;
    necessaryDesc: string;
    functionalTitle: string;
    functionalDesc: string;
    analyticsTitle: string;
    analyticsDesc: string;
    marketingTitle: string;
    marketingDesc: string;
  };
}) {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [categories, setCategories] = useState<ConsentCategories>(DEFAULT_CONSENT);

  useEffect(() => {
    const existing = loadUserConsent();
    if (!existing) {
      // Show banner on first visit
      const timer = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(timer);
    } else {
      queueMicrotask(() => setCategories(existing.categories));
    }
  }, []);

  function handleAcceptAll() {
    setCategories(ALL_GRANTED_CONSENT);
    saveUserConsent(ALL_GRANTED_CONSENT);
    setOpen(false);
    setModalOpen(false);
  }

  function handleRejectOptional() {
    setCategories(DEFAULT_CONSENT);
    saveUserConsent(DEFAULT_CONSENT);
    setOpen(false);
    setModalOpen(false);
  }

  function handleSaveCustom() {
    saveUserConsent(categories);
    setOpen(false);
    setModalOpen(false);
  }

  return (
    <>
      {/* Floating Preference Trigger in Footer / Corner */}
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full border border-ink/20 bg-ink px-3.5 py-2 text-xs mono-label text-bone shadow-xl hover:bg-clay transition-colors"
        aria-label="Manage cookie preferences"
      >
        <span aria-hidden>🍪</span> Cookie Preferences
      </button>

      {/* Main Consent Banner Overlay */}
      {open && !modalOpen && (
        <div
          role="region"
          aria-label={labels.bannerTitle}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/20 bg-ink/95 text-bone p-5 md:p-8 backdrop-blur-md shadow-2xl animate-fade-in"
        >
          <div className="shell flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="mono-label text-methane">GDPR & CCPA COMPLIANCE</span>
                <span className="h-1.5 w-1.5 rounded-full bg-methane" />
              </div>
              <h2 className="display-md text-bone">{labels.bannerTitle}</h2>
              <p className="editorial mt-2 text-sm text-bone/80">{labels.bannerBody}</p>
              <div className="mt-3 flex flex-wrap gap-4 text-xs mono-label text-bone/50">
                <Link href={`/${locale}/privacy-policy`} className="underline hover:text-methane">
                  Privacy Policy
                </Link>
                <Link href={`/${locale}/cookie-policy`} className="underline hover:text-methane">
                  Cookie Policy
                </Link>
                <Link href={`/${locale}/terms`} className="underline hover:text-methane">
                  Terms of Service
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={handleAcceptAll} className="btn btn-accent btn-sm">
                {labels.acceptAll}
              </button>
              <button type="button" onClick={handleRejectOptional} className="btn btn-outline-invert btn-sm">
                {labels.rejectOptional}
              </button>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="mono-label border border-bone/30 px-3 py-2 text-xs text-bone hover:bg-bone hover:text-ink transition-colors"
              >
                {labels.customize}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Category Customization Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={labels.manageTitle}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/75 backdrop-blur-sm overflow-y-auto"
        >
          <div className="relative w-full max-w-2xl bg-cream border border-ink/20 text-ink p-6 md:p-8 shadow-2xl rounded-sm my-8">
            <div className="flex items-center justify-between border-b border-ink/15 pb-4 mb-6">
              <div>
                <p className="mono-label text-clay">Consent Center</p>
                <h3 className="display-lg mt-1">{labels.manageTitle}</h3>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="mono-label border border-ink/20 px-3 py-1.5 hover:bg-ink hover:text-bone transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
              {/* Necessary */}
              <div className="border border-ink/12 bg-bone p-4">
                <div className="flex items-center justify-between">
                  <span className="display-md text-base">{labels.necessaryTitle}</span>
                  <span className="mono-label text-clay border border-clay/30 px-2 py-0.5 text-[0.65rem]">ALWAYS ACTIVE</span>
                </div>
                <p className="text-sm mt-2 text-ink/70">{labels.necessaryDesc}</p>
              </div>

              {/* Functional */}
              <div className="border border-ink/12 p-4">
                <div className="flex items-center justify-between">
                  <span className="display-md text-base">{labels.functionalTitle}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={categories.functional}
                      onChange={(e) => setCategories((p) => ({ ...p, functional: e.target.checked }))}
                      className="accent-[#a85532] h-5 w-5"
                    />
                  </label>
                </div>
                <p className="text-sm mt-2 text-ink/70">{labels.functionalDesc}</p>
              </div>

              {/* Analytics */}
              <div className="border border-ink/12 p-4">
                <div className="flex items-center justify-between">
                  <span className="display-md text-base">{labels.analyticsTitle}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={categories.analytics}
                      onChange={(e) => setCategories((p) => ({ ...p, analytics: e.target.checked }))}
                      className="accent-[#5db7c4] h-5 w-5"
                    />
                  </label>
                </div>
                <p className="text-sm mt-2 text-ink/70">{labels.analyticsDesc}</p>
              </div>

              {/* Marketing */}
              <div className="border border-ink/12 p-4">
                <div className="flex items-center justify-between">
                  <span className="display-md text-base">{labels.marketingTitle}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={categories.marketing}
                      onChange={(e) => setCategories((p) => ({ ...p, marketing: e.target.checked }))}
                      className="accent-[#e5b83b] h-5 w-5"
                    />
                  </label>
                </div>
                <p className="text-sm mt-2 text-ink/70">{labels.marketingDesc}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-ink/15 flex flex-wrap items-center justify-between gap-4">
              <button type="button" onClick={handleRejectOptional} className="btn btn-outline btn-sm">
                {labels.rejectOptional}
              </button>

              <div className="flex gap-3">
                <button type="button" onClick={handleAcceptAll} className="btn btn-primary btn-sm">
                  {labels.acceptAll}
                </button>
                <button type="button" onClick={handleSaveCustom} className="btn btn-accent btn-sm">
                  {labels.savePreferences}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
