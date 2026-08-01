import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, isLocale, locales } from "@/lib/i18n";
import { SOCIALS, PROCESS_CHAIN } from "@/lib/content";
import SiteNav from "@/components/SiteNav";
import BrandLogo from "@/components/BrandLogo";
import NewsletterForm from "@/components/NewsletterForm";
import CookieConsentBanner from "@/components/CookieConsentBanner";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDict(locale);

  const columns = [
    {
      title: t.nav.solutions,
      links: [
        [t.nav.solutions, `/${locale}/solutions`],
        [t.nav.applications, `/${locale}/applications`],
        [t.nav.products, `/${locale}/products`],
        [t.nav.training, `/${locale}/training`],
      ],
    },
    {
      title: t.nav.projects,
      links: [
        [t.nav.projects, `/${locale}/projects`],
        [t.nav.about, `/${locale}/about`],
        [t.nav.knowledge, `/${locale}/knowledge`],
        [t.nav.contact, `/${locale}/contact`],
      ],
    },
    {
      title: t.nav.tools,
      links: [
        ["Solution configurator", `/${locale}/tools/solution-configurator`],
        ["Feedstock checker", `/${locale}/tools/feedstock-checker`],
        ["Fuel savings estimator", `/${locale}/tools/fuel-savings-estimator`],
        [t.nav.request, `/${locale}/request-assessment`],
      ],
    },
  ];

  return (
    <div lang={locale} className="min-h-screen flex flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:m-3 focus:bg-ink focus:text-bone focus:px-4 focus:py-3"
      >
        Skip to content
      </a>
      <SiteNav locale={locale} labels={t.nav} />
      <main id="main" className="flex-1">
        {children}
      </main>

      <CookieConsentBanner locale={locale} labels={t.cookies} />

      <footer className="relative overflow-hidden bg-ink text-bone">
        <div aria-hidden className="absolute inset-0 grid-lines opacity-40" />
        <div className="shell relative pt-20 pb-10">
          <section className="mb-16 grid gap-8 border-y border-bone/15 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="chapter-marker text-methane">Field notes</p>
              <h2 className="display-lg mt-4">{locale === "sw" ? "Habari kutoka kwa miradi yetu" : "Useful updates from the field"}</h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-bone/65">
                {locale === "sw" ? "Pokea mafunzo ya vitendo, habari za miradi na suluhisho mpya za biogas." : "Practical guidance, project stories, training dates and new biogas solutions, delivered occasionally."}
              </p>
            </div>
            <NewsletterForm locale={locale} />
          </section>
          <div className="grid gap-14 lg:grid-cols-[1.4fr_2fr]">
            <div>
              <div className="inline-block bg-white p-3"><BrandLogo className="w-[190px]" /></div>
              <p className="editorial mt-4 max-w-sm text-bone/70">{t.footerNote}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a className="btn btn-outline-invert btn-sm" href={SOCIALS.linkedin} rel="noopener noreferrer" target="_blank">
                  LinkedIn ↗
                </a>
                <a className="btn btn-outline-invert btn-sm" href={SOCIALS.facebook} rel="noopener noreferrer" target="_blank">
                  Facebook ↗
                </a>
              </div>
            </div>

            <div className="grid gap-10 sm:grid-cols-3">
              {columns.map((col) => (
                <nav key={col.title} aria-label={col.title}>
                  <p className="mono-label text-methane">{col.title}</p>
                  <ul className="mt-4 space-y-2.5 text-sm text-bone/75">
                    {col.links.map(([label, href]) => (
                      <li key={href}>
                        <Link href={href} className="link-quiet hover:text-bone">
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>

          <ol className="mt-16 flex flex-wrap gap-x-5 gap-y-2 mono-label text-bone/35">
            {PROCESS_CHAIN.map((step, i) => (
              <li key={step} className={i === 3 ? "text-methane" : undefined}>
                {String(i + 1).padStart(2, "0")} {step}
              </li>
            ))}
          </ol>

          <div className="mt-10 hairline-invert pt-6 flex flex-wrap items-center justify-between gap-4 mono-label text-bone/45">
            <span>© {new Date().getFullYear()} Home Biogas Kenya · Nairobi</span>
            <span className="flex flex-wrap gap-4 text-xs">
              <Link href={`/${locale}/privacy-policy`} className="hover:text-bone">
                Privacy Policy
              </Link>
              <Link href={`/${locale}/cookie-policy`} className="hover:text-bone">
                Cookie Policy
              </Link>
              <Link href={`/${locale}/terms`} className="hover:text-bone">
                Terms of Service
              </Link>
              <Link href={locale === "en" ? "/sw" : "/en"} className="hover:text-bone">
                {locale === "en" ? "Kiswahili" : "English"}
              </Link>
              <Link href="/auth/sign-in" className="hover:text-bone">
                Staff sign-in
              </Link>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
