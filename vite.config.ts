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
      // GitHub Pages cannot set headers, so the policy goes in a <meta> tag on every page. The site ships no
      // scripts at all (`csr = false` in +layout.ts), so script-src is 'none'. frame-ancestors has no effect
      // in a <meta> tag, so it is left out.
      csp: {
        mode: "hash",
        directives: {
          "default-src": ["none"],
          "script-src": ["none"],
          "style-src": ["self"],
          "img-src": ["self"],
          "font-src": ["self"],
          "base-uri": ["none"],
          "form-action": ["none"],
        },
      },
    }),
  ],
  test: { include: ["tests/unit/**/*.test.{ts,js}"] },
});
