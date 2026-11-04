// Reads locales/<code>/. Each page is a folder holding index.md and .locale-peer-id. The peer id is what says "this
// page, in locale X": slugs differ between locales, and nothing here assumes they match.
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { LOCALES, type Locale, localePath } from "../locales";

export type Meta = Record<string, string>;
export type Page = { locale: Locale; peer: string; slug: string; meta: Meta; body: string };

const ROOT = join(process.cwd(), "locales");

/** key: value lines between --- markers. Values run to the end of the line and may hold colons. */
export function parseFrontmatter(source: string): { meta: Meta; body: string } {
  const match = source.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) throw new Error("page has no frontmatter");
  const meta: Meta = {};
  for (const line of (match[1] ?? "").split("\n")) {
    const colon = line.indexOf(":");
    if (colon > 0) meta[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
  }
  return { meta, body: source.slice(match[0].length) };
}

function read(locale: Locale, folder: string, slug: string): Page {
  const { meta, body } = parseFrontmatter(readFileSync(join(folder, "index.md"), "utf8"));
  const peer = readFileSync(join(folder, ".locale-peer-id"), "utf8").trim();
  return { locale, peer, slug, meta, body };
}

function walk(locale: Locale, folder: string, slug: string): Page[] {
  const children = readdirSync(folder, { withFileTypes: true }).filter((entry) => entry.isDirectory());
  return [
    read(locale, folder, slug),
    ...children.flatMap((child) => walk(locale, join(folder, child.name), slug ? `${slug}/${child.name}` : child.name)),
  ];
}

function loadLocale(locale: Locale): Page[] {
  const base = join(ROOT, locale);
  const topics = join(base, "topics");
  const home = read(locale, base, "");
  if (!existsSync(topics)) return [home];
  const entries = readdirSync(topics, { withFileTypes: true }).filter((entry) => entry.isDirectory());
  return [home, ...entries.flatMap((entry) => walk(locale, join(topics, entry.name), entry.name))];
}

let cache: Page[] | undefined;

export function allPages(): Page[] {
  cache ??= LOCALES.flatMap(loadLocale);
  return cache;
}

export function pagesIn(locale: Locale): Page[] {
  return allPages().filter((page) => page.locale === locale);
}

export function findPage(locale: Locale, slug: string): Page | undefined {
  return allPages().find((page) => page.locale === locale && page.slug === slug);
}

/** The same page in another locale. */
export function peerOf(page: Page, locale: Locale): Page | undefined {
  return allPages().find((other) => other.locale === locale && other.peer === page.peer);
}

export function pageHref(page: Page): string {
  return localePath(page.locale, page.slug);
}

/** The top-level pages of a locale, in menu order. */
export function navOf(locale: Locale): { href: string; label: string; peer: string }[] {
  return pagesIn(locale)
    .filter((page) => page.meta.order)
    .sort((a, b) => Number(a.meta.order) - Number(b.meta.order))
    .map((page) => ({ href: pageHref(page), label: page.meta.nav ?? page.meta.title ?? page.slug, peer: page.peer }));
}
