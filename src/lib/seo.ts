import type { Metadata } from "next";
import { locales } from "@/lib/i18n";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://homebiogas.co.ke";
const OG_IMAGE = `${SITE_URL}/opengraph-image`;

/**
 * Builds per-page metadata: locale-correct canonical + hreflang alternates,
 * an openGraph/twitter title that does not depend on the root title template
 * (so it never doubles up with the site name), and an explicit reference to
 * the shared dynamic OG image. Next.js metadata objects replace the parent's
 * object wholesale per field rather than deep-merging, so every page that
 * sets its own `openGraph` must repeat `images` itself or it silently loses
 * the image inherited from the root layout.
 *
 * Omit `title` for the homepage to inherit the root layout's default title
 * verbatim instead of appending the "· Home Biogas Kenya" suffix.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: string;
  path: string;
  title?: string;
  description: string;
}): Metadata {
  const canonical = `${SITE_URL}/${locale}${path}`;
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `${SITE_URL}/${l}${path}`;
  languages["x-default"] = `${SITE_URL}/en${path}`;

  const ogTitle = title ? `${title} · Home Biogas Kenya` : "Home Biogas Kenya  -  Waste contains energy";

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
      siteName: "Home Biogas Kenya",
      type: "website",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Home Biogas Kenya" }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [OG_IMAGE],
    },
  };
}
