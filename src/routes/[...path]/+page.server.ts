import { error } from "@sveltejs/kit";
import { LOCALES, parsePath } from "#lib/locales.js";
import { findPage, allPages, navOf, peerOf, pageHref } from "#lib/server/content.js";
import { renderPage } from "#lib/server/render.js";

export function entries() {
  const pages = allPages().map((page) => ({ path: `${page.locale}${page.slug ? `/${page.slug}` : ""}` }));
  const root = allPages()
    .filter((page) => page.locale === "en-001")
    .map((page) => ({ path: page.slug }));
  const search = [{ path: "search" }, ...LOCALES.map((locale) => ({ path: `${locale}/search` }))];
  return [...root, ...pages, ...search];
}

export function load({ params }) {
  const { locale, slug } = parsePath(`/${params.path ?? ""}`);
  if (slug === "search") return { kind: "search" as const };
  const page = findPage(locale, slug);
  if (!page) error(404);
  const html = renderPage(page);
  if (slug !== "") return { kind: "topic" as const, meta: page.meta, html };
  const en = findPage("en-001", "compare");
  const compare = en && peerOf(en, locale);
  const features = navOf(locale)[1];
  return {
    kind: "home" as const,
    meta: page.meta,
    html,
    actions: {
      primary: { href: features?.href ?? "/", label: page.meta.primary ?? "" },
      secondary: { href: compare ? pageHref(compare) : "/", label: page.meta.secondary ?? "" },
    },
  };
}
