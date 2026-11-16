import { ui } from "#lib/i18n.js";
import { LOCALES, parsePath, localePath } from "#lib/locales.js";
import { findPage, navOf, pageHref, peerOf } from "#lib/server/content.js";

/** The privacy page in this locale (its peer of the English one), for the footer. */
function privacyHref(locale: (typeof LOCALES)[number]): string {
  const english = findPage("en-001", "privacy");
  const page = english && peerOf(english, locale);
  return page ? pageHref(page) : localePath(locale, "");
}

export function load({ url }) {
  const { locale, slug } = parsePath(url.pathname);
  const current = findPage(locale, slug);
  const alternates = LOCALES.map((code) => {
    const peer = current && peerOf(current, code);
    return { locale: code, href: peer ? pageHref(peer) : localePath(code, slug === "search" ? "search" : "") };
  });
  return {
    locale,
    brand: ui(locale).brand,
    isHome: slug === "",
    canonical: current ? pageHref(current) : localePath(locale, slug),
    nav: navOf(locale),
    privacy: privacyHref(locale),
    alternates,
  };
}
