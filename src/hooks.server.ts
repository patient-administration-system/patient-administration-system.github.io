import type { Handle } from "@sveltejs/kit/hooks";
import { parsePath, textDirection } from "./lib/locales";

export const handle: Handle = ({ event, resolve }) => {
  const { locale } = parsePath(event.url.pathname);
  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%lang%", locale).replace("%dir%", textDirection(locale)),
  });
};
