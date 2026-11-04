import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    sveltekit({
      preprocess: vitePreprocess(),
      // src/routes/404 is prerendered to build/404.html, which GitHub Pages serves for a missing path.
      adapter: adapter({ strict: true }),
      // 404.html is served at any missing address, so asset paths must not be relative to the page.
      paths: { relative: false },
      // GitHub Pages cannot set headers, so the policy goes in a <meta> tag on every page, with a hash for
      // SvelteKit's inline start script. frame-ancestors has no effect in a <meta> tag, so it is left out.
      csp: {
        mode: "hash",
        directives: {
          "default-src": ["none"],
          "script-src": ["self"],
          "style-src": ["self"],
          // SvelteKit's screen-reader announcer sets one style attribute; this is its hash, the same value the
          // main repository's UI allows.
          "style-src-attr": ["unsafe-hashes", "sha256-S8qMpvofolR8Mpjy4kQvEm7m1q8clzU4dfDH0AmvZjo="],
          "img-src": ["self", "data:"],
          "font-src": ["self"],
          "connect-src": ["self"],
          "base-uri": ["none"],
          "form-action": ["self"],
        },
      },
    }),
  ],
  test: { include: ["tests/unit/**/*.test.{ts,js}"] },
});
