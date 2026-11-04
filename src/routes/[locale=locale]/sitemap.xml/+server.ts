import { error } from "@sveltejs/kit";
import { SITE_URL } from "#lib/constants.js";
import { LOCALES, isLocale } from "#lib/locales.js";
import { pageHref, pagesIn } from "#lib/server/content.js";

export const prerender = true;

export function entries() {
  return LOCALES.map((locale) => ({ locale }));
}

export function GET({ params }): Response {
  if (!isLocale(params.locale)) error(404);
  const urls = pagesIn(params.locale).map((page) => `<url><loc>${encodeURI(SITE_URL + pageHref(page))}</loc></url>`);
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`;
  return new Response(body, { headers: { "content-type": "application/xml" } });
}
