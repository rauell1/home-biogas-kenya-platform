export type ConsentCategories = {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

export type ConsentRegion = "EU" | "US_CA" | "GLOBAL";

export type ConsentModeV2Payload = {
  ad_storage: "granted" | "denied";
  analytics_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "granted" | "denied";
};

export const DEFAULT_CONSENT: ConsentCategories = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

export const ALL_GRANTED_CONSENT: ConsentCategories = {
  necessary: true,
  functional: true,
  analytics: true,
  marketing: true,
};

export const COOKIE_CONSENT_KEY = "hbk_cookie_consent_v2";

export function detectUserRegion(): ConsentRegion {
  if (typeof window === "undefined") return "GLOBAL";
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz && (tz.startsWith("Europe/") || tz.startsWith("Atlantic/"))) {
      return "EU";
    }
    if (tz && (tz.includes("Los_Angeles") || tz.includes("Pacific"))) {
      return "US_CA";
    }
  } catch {
    /* fallback to GLOBAL */
  }
  return "GLOBAL";
}

export function buildConsentModeV2(categories: ConsentCategories): ConsentModeV2Payload {
  return {
    ad_storage: categories.marketing ? "granted" : "denied",
    analytics_storage: categories.analytics ? "granted" : "denied",
    ad_user_data: categories.marketing ? "granted" : "denied",
    ad_personalization: categories.marketing ? "granted" : "denied",
  };
}

export function applyGoogleConsentModeV2(categories: ConsentCategories) {
  if (typeof window === "undefined") return;
  const payload = buildConsentModeV2(categories);
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === "function") {
    gtag("consent", "update", payload);
  }
}

export function saveUserConsent(categories: ConsentCategories, region: ConsentRegion = detectUserRegion()) {
  if (typeof window === "undefined") return;
  const consentId = "c_" + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
  const data = {
    consentId,
    categories,
    region,
    timestamp: new Date().toISOString(),
    consentModeV2: buildConsentModeV2(categories),
  };

  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(data));
  } catch {
    /* ignore storage block */
  }

  applyGoogleConsentModeV2(categories);

  // Async server log sync
  fetch("/api/consent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ consentId, categories, region }),
  }).catch(() => {
    /* ignore network failure */
  });
}

export function loadUserConsent(): { consentId: string; categories: ConsentCategories; region: ConsentRegion; timestamp: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore parse error */
  }
  return null;
}
