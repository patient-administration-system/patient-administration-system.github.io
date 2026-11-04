/** Sorted by code, the order of the picker. See spec/locale/index.md. */
export const LOCALES = ["cy-001", "cy-gb", "en-001", "en-gb", "en-gb-oxendict", "en-us", "zh-001", "zh-cn"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en-001";

/** Each locale named in its own language. */
export const LOCALE_LABELS: Record<Locale, string> = {
  "cy-001": "Cymraeg (Byd)",
  "cy-gb": "Cymraeg (Prydain Fawr)",
  "en-001": "English (World)",
  "en-gb": "English (Great Britain)",
  "en-gb-oxendict": "English (Oxford)",
  "en-us": "English (United States)",
  "zh-001": "中文（世界）",
  "zh-cn": "中文（中国）",
};

/** The world variant of each language, with its endonym, for the hero's Translations sentence. */
export const TRANSLATIONS: { locale: Locale; name: string }[] = [
  { locale: "cy-001", name: "Cymraeg" },
  { locale: "en-001", name: "English" },
  { locale: "zh-001", name: "中文" },
];

export function isLocale(value: string | undefined): value is Locale {
  return (LOCALES as readonly string[]).includes(value ?? "");
}

/** The site path of a page in a locale. The default locale also lives at the root, which is its canonical address. */
export function localePath(locale: Locale, slug: string): string {
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  return slug ? `${prefix}/${slug}/` : `${prefix}/`;
}

/** Splits an address into its locale and the rest. Slugs may be in any script, so nothing here assumes ASCII. */
export function parsePath(pathname: string): { locale: Locale; slug: string; prefixed: boolean } {
  const parts = decodeURI(pathname).split("/").filter(Boolean);
  const first = parts[0];
  if (isLocale(first)) return { locale: first, slug: parts.slice(1).join("/"), prefixed: true };
  return { locale: DEFAULT_LOCALE, slug: parts.join("/"), prefixed: false };
}
