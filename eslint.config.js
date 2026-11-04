import js from "@eslint/js";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import ts from "typescript-eslint";

export default ts.config(
  { ignores: ["build/", "static/themes/", ".svelte-kit/", "node_modules/", "test-results/", "playwright-report/"] },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs.recommended,
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  { files: ["**/*.svelte", "**/*.svelte.ts"], languageOptions: { parserOptions: { parser: ts.parser } } },
  // Links are built with `localize` so that each carries its language, not with SvelteKit's `resolve()`.
  { rules: { "svelte/no-navigation-without-resolve": "off" } },
);
