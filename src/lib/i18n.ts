export const locales = ["en", "sw"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

type Dict = {
  nav: Record<string, string>;
  heroTitleA: string;
  heroTitleB: string;
  heroLead: string;
  heroKicker: string;
  ctaPrimary: string;
  ctaSecondary: string;
  chapters: string[];
  capabilityTitle: string;
  capabilityLead: string;
  zeroProjectsNotice: string;
  disclaimer: string;
  footerNote: string;
  cookies: {
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
};

export const dictionaries: Record<Locale, Dict> = {
  en: {
    nav: {
      about: "About",
      solutions: "Solutions",
      applications: "Applications",
      projects: "Projects",
      training: "Training",
      knowledge: "Knowledge",
      tools: "Tools",
      contact: "Contact",
      products: "Shop",
      request: "Request assessment",
    },
    heroKicker: "Kenyan Biogas Engineering",
    heroTitleA: "Waste contains energy.",
    heroTitleB: "We engineer the system that releases it.",
    heroLead:
      "Home Biogas Kenya designs and builds biogas and organic-waste systems for homes, farms, institutions and commercial facilities.",
    ctaPrimary: "Explore the System",
    ctaSecondary: "Start a Project",
    chapters: [
      "Waste contains energy",
      "Enter the plant",
      "See what the gas powers",
      "Built in Kenya",
      "Configure a possible solution",
      "Start a project",
    ],
    capabilityTitle: "From feasibility study to commissioning and maintenance",
    capabilityLead:
      "We design, construct, commission and maintain closed-loop anaerobic digesters engineered for East African agricultural and institutional waste streams.",
    zeroProjectsNotice:
      "No verified projects published in the database yet. Every project record undergoes rigorous technical review and media clearance before publication.",
    disclaimer:
      "This is a preliminary educational assessment and not a final engineering design, performance guarantee or quotation. Final sizing requires a Home Biogas Kenya site survey and technical assessment.",
    footerNote: "Engineering-led renewable energy and organic-waste solutions.",
    cookies: {
      bannerTitle: "Privacy & Cookie Compliance",
      bannerBody:
        "We use essential cookies for system security and session management. With your consent, we also use functional, analytics, and marketing tags compliant with GDPR, CCPA, and Kenyan Data Protection regulations.",
      acceptAll: "Accept all",
      rejectOptional: "Reject optional",
      customize: "Customize preferences",
      savePreferences: "Save preferences",
      manageTitle: "Cookie & Preference Management",
      necessaryTitle: "Essential System Cookies",
      necessaryDesc: "Required for core security, session validation, and site navigation. Cannot be disabled.",
      functionalTitle: "Functional Preferences",
      functionalDesc: "Remembers your language choice (English/Kiswahili) and preliminary configurator inputs.",
      analyticsTitle: "Performance & Analytics",
      analyticsDesc: "Helps us measure site usage and platform performance via Google Consent Mode v2.",
      marketingTitle: "Marketing & Communication",
      marketingDesc: "Allows localized assessment reminders and tailored engineering communications.",
    },
  },
  sw: {
    nav: {
      about: "Kuhusu",
      solutions: "Suluhisho",
      applications: "Matumizi",
      projects: "Miradi",
      training: "Mafunzo",
      knowledge: "Maarifa",
      tools: "Zana",
      contact: "Wasiliana",
      products: "Duka",
      request: "Omba tathmini",
    },
    heroKicker: "Uhandisi wa Biogesi Kenya",
    heroTitleA: "Taka zina nishati.",
    heroTitleB: "Tunabuni mfumo unaoiachilia.",
    heroLead:
      "Home Biogas Kenya inabuni na kujenga mifumo ya biogesi na usimamizi wa taka kwa nyumba, mashamba, taasisi na biashara.",
    ctaPrimary: "Chunguza Mfumo",
    ctaSecondary: "Anza Mradi",
    chapters: [
      "Taka zina nishati",
      "Ingia kwenye mtambo",
      "Ona gesi inavyotumika",
      "Imejengwa Kenya",
      "Panga suluhisho linalowezekana",
      "Anza mradi",
    ],
    capabilityTitle: "Kuanzia utafiti wa uwezekano hadi ujenzi na matengenezo",
    capabilityLead:
      "Tunabuni, tunajenga na kutunza mitambo ya biogesi iliyoundwa kwa ajili ya taka za kilimo na taasisi nchini Kenya.",
    zeroProjectsNotice:
      "Bado hakuna miradi iliyothibitishwa iliyochapishwa. Miradi yote hupitia ukaguzi wa kiufundi kabla ya kuchapishwa.",
    disclaimer:
      "Hii ni tathmini ya awali ya kielimu, si muundo wa mwisho wa uhandisi, dhamana ya utendaji wala nukuu ya bei. Ukubwa wa mwisho unahitaji uchunguzi wa eneo na tathmini ya kiufundi ya Home Biogas Kenya.",
    footerNote: "Suluhisho za nishati mbadala na taka za kikaboni zinazoongozwa na uhandisi.",
    cookies: {
      bannerTitle: "Ulinzi wa Data na Vidakuzi",
      bannerBody:
        "Tunatumia vidakuzi muhimu kwa ajili ya usalama wa mfumo. Kwa idhini yako, tunatumia pia vitambulisho vya uchanganuzi na masoko kulingana na sheria za GDPR, CCPA na Sheria ya Ulinzi wa Data ya Kenya.",
      acceptAll: "Kubali vyote",
      rejectOptional: "Kataa yasiyo ya lazima",
      customize: "Boresha mapendeleo",
      savePreferences: "Hifadhi mapendeleo",
      manageTitle: "Usimamizi wa Vidakuzi na Mapendeleo",
      necessaryTitle: "Vidakuzi Muhimu vya Mfumo",
      necessaryDesc: "Vinahitajika kwa ajili ya usalama, uthibitisho na urambazaji. Haviwezi kuzimwa.",
      functionalTitle: "Mapendeleo ya Utendaji",
      functionalDesc: "Hukumbuka lugha uliyochagua (Kiingereza/Kiswahili) na maelezo ya awali ya zana.",
      analyticsTitle: "Uchanganuzi wa Mfumo",
      analyticsDesc: "Hutusaidia kupima matumizi ya tovuti na utendaji kupitia Google Consent Mode v2.",
      marketingTitle: "Masoko na Mawasiliano",
      marketingDesc: "Huruhusu vikumbusho vya tathmini na mawasiliano maalum ya uhandisi.",
    },
  },
};

export function getDict(locale: string): Dict {
  return dictionaries[isLocale(locale) ? locale : "en"];
}
