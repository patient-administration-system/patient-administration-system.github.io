import { PAGES, SITE_URL } from "#lib/site.js";

export const prerender = true;

export function GET(): Response {
  const urls = PAGES.map((path) => `<url><loc>${SITE_URL}${path === "/" ? "/" : path}</loc></url>`).join("");
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new Response(body, { headers: { "content-type": "application/xml" } });
}
