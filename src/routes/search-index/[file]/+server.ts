import { error, json } from "@sveltejs/kit";
import { LOCALES, type Locale, isLocale } from "#lib/locales.js";
import { pageHref, pagesIn } from "#lib/server/content.js";
import { pageText } from "#lib/server/render.js";

export const prerender = true;

export function entries() {
  return LOCALES.map((locale) => ({ file: `${locale}.json` }));
}

export function GET({ params }) {
  const code = params.file.replace(/\.json$/, "");
  if (!isLocale(code)) error(404);
  const locale: Locale = code;
  return json(
    pagesIn(locale).map((page) => ({
      href: pageHref(page),
      title: page.meta.title ?? "",
      description: page.meta.description ?? "",
      text: pageText(page, locale),
    })),
  );
}
