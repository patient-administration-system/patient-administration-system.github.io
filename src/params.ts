import { defineParams } from "@sveltejs/kit/params";
import { isLocale } from "./lib/locales.ts";

export const params = defineParams({
  locale: (param: string) => (isLocale(param) ? param : undefined),
});
