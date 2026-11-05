import status from "./status.json";
import type { Locale } from "./locales";

/** A measure from spec/14-implementation-status.md. A renamed measure fails the build rather than showing nothing. */
export function measure(name: string): number {
  const value = (status.measures as Record<string, number>)[name];
  if (value === undefined) throw new Error(`status.json has no measure called "${name}"`);
  return value;
}

export function formatDate(iso: string, locale: Locale): string {
  // ar-SA would otherwise give a Hijri date, and some locales give digits unlike the figures beside them.
  return new Date(iso).toLocaleDateString(locale, {
    calendar: "gregory",
    numberingSystem: "latn",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function retrievedOn(locale: Locale): string {
  return formatDate(status.retrievedOn, locale);
}
