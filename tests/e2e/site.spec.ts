import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { PAGES } from "../../src/lib/site";

for (const path of [...PAGES, "/does-not-exist"]) {
  test(`${path}: passes axe, loads no script, breaks no policy`, async ({ page }) => {
    const problems: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error" && !message.text().includes("404")) problems.push(message.text());
    });
    page.on("pageerror", (error) => problems.push(error.message));

    await page.goto(path);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("script")).toHaveCount(0);
    await expect(page.locator('meta[http-equiv="content-security-policy"]')).toHaveCount(1);

    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(violations.map((v) => `${v.id}: ${v.nodes[0]?.html}`)).toEqual([]);
    expect(problems).toEqual([]);
  });

  test(`${path}: reflows at 320 pixels`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test("the skip link is the first thing the keyboard reaches and it moves to the content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(":focus")).toHaveText("Skip to main content");
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});

test("the navigation marks the current page", async ({ page }) => {
  await page.goto("/status");
  await expect(page.locator('nav a[aria-current="page"]')).toHaveText("Status");
});

test("a missing address answers 404 with the site's own page", async ({ page }) => {
  const response = await page.goto("/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveText("Page not found");
});
