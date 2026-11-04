import { SITE_URL } from "#lib/constants.js";
import { allPages, pageHref } from "#lib/server/content.js";

export const prerender = true;

export function GET(): Response {
  const urls = allPages().map((page) => `<url><loc>${encodeURI(SITE_URL + pageHref(page))}</loc></url>`);
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`;
  return new Response(body, { headers: { "content-type": "application/xml" } });
}
