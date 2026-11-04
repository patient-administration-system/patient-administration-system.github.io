import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PW_PORT ?? 4273);

// The tests run against `build/`, the same files GitHub Pages serves.
export default defineConfig({
  testDir: "tests/e2e",
  use: { baseURL: `http://localhost:${PORT}` },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `node tests/e2e/serve-build.mjs ${PORT}`,
    port: PORT,
    reuseExistingServer: false,
  },
});
