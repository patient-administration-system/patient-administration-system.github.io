import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

// Every address in the sitemap, plus the pages that are not in it.
const sitemap = readFileSync("build/sitemap.xml", "utf8");
const paths = [...sitemap.matchAll(/<loc>https:\/\/[^/]+([^<]*)<\/loc>/g)].map((match) => match[1] ?? "");

for (const path of [...paths, "/search/", "/does-not-exist/"]) {
  test(`${decodeURI(path)}: passes axe, reflows, breaks no policy`, async ({ page }) => {
    const problems: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error" && !message.text().includes("404")) problems.push(message.text());
    });
    page.on("pageerror", (error) => problems.push(error.message));

    await page.goto(path);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('meta[http-equiv="content-security-policy"]')).toHaveCount(1);

    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(violations.map((v) => `${v.id}: ${v.nodes[0]?.html}`)).toEqual([]);

    await page.setViewportSize({ width: 320, height: 640 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    expect(problems).toEqual([]);
  });
}

test("every link in the built pages is real", () => {
  const pages = readdirSync("build", { recursive: true, encoding: "utf8" }).filter((file) => file.endsWith(".html"));
  const broken: string[] = [];
  let checked = 0;
  for (const file of pages) {
    const html = readFileSync(join("build", file), "utf8");
    for (const [, href = ""] of html.matchAll(/<a [^>]*href="([^"]*)"/g)) {
      checked += 1;
      if (/^[a-z]+:/.test(href) && !/^(https?|mailto):/.test(href)) broken.push(`${file}: ${href}`);
      if (href.startsWith("/")) {
        const path = decodeURI(href.split(/[?#]/)[0] ?? "");
        const exists = existsSync(join("build", path, "index.html")) || existsSync(join("build", path));
        if (!exists) broken.push(`${file}: ${href}`);
      }
    }
  }
  expect(broken).toEqual([]);
  expect(checked).toBeGreaterThan(1000);
});

test("the requested comparison addresses exist at the root", async ({ page }) => {
  for (const slug of ["epic", "nervecentre"]) {
    const response = await page.goto(`/compare/${slug}/`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("note").first()).toContainText("independent comparison");
  }
});

test("addresses that moved send people to the new page", async ({ page }) => {
  await page.goto("/status/");
  await expect(page).toHaveURL(/\/trust\/$/);
  await page.goto("/architecture/");
  await expect(page).toHaveURL(/\/how-it-works\/$/);
  await page.goto("/get-started/");
  await expect(page).toHaveURL(/\/tutorial\/$/);
});

test("the hero has its headline, introduction and translations", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Open-source patient administration");
  await expect(page.locator(".site-translations")).toContainText("Cymraeg");
  await expect(page.locator(".site-translations")).toContainText("中文");
});

test("translated pages carry the right language, a draft notice and their own slugs", async ({ page }) => {
  await page.goto("/cy-gb/");
  await expect(page.locator("html")).toHaveAttribute("lang", "cy-gb");
  await expect(page.locator(".site-draft")).toContainText("Drafft cyntaf");
  await page.goto("/zh-cn/对比/");
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-cn");
  await expect(page.locator("h1")).toHaveText("对比");
});

test("the language picker goes to the same page in the other locale, across different slugs", async ({ page }) => {
  await page.goto("/compare/epic/");
  await page.getByRole("button", { name: "Language" }).click();
  await page.getByRole("option", { name: "中文（中国）" }).click();
  await expect(page).toHaveURL(/\/zh-cn\/.+\/epic\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-cn");
});

test("the picker bar has all seven pickers", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".site-pickers > *")).toHaveCount(7);
});

test("a picker dropdown does not move the page, and hovering changes the button colour", async ({ page }) => {
  await page.goto("/");
  const main = page.locator("main");
  const before = await main.boundingBox();
  const button = page.getByRole("button", { name: "Theme" });
  const colour = await button.evaluate((element) => getComputedStyle(element).backgroundColor);
  await button.hover();
  await expect.poll(() => button.evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe(colour);
  await button.click();
  await expect(page.getByRole("listbox")).toBeVisible();
  const list = await page.getByRole("listbox").boundingBox();
  const box = await button.boundingBox();
  expect(list!.y).toBeGreaterThanOrEqual(box!.y + box!.height - 1);
  expect(await main.boundingBox()).toEqual(before);
});

test("the theme picker swaps the stylesheet, breaks no policy and is remembered", async ({ page }) => {
  const problems: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") problems.push(message.text());
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Theme" }).click();
  await page.getByRole("option", { name: "Dark", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator('link[data-lily-theme-picker="theme"]')).toHaveAttribute("href", /dark\.css$/);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(problems).toEqual([]);
});

test("all 57 themes are published", () => {
  expect(readdirSync("build/themes").filter((file) => file.endsWith(".css"))).toHaveLength(57);
});

test("the text size picker changes the size of the text", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Text size" }).click();
  await page.getByRole("option", { name: "Largest" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-text-size", "largest");
  const size = await page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).fontSize));
  expect(size).toBeGreaterThan(20);
});

test("search finds a page, including in Chinese", async ({ page }) => {
  await page.goto("/search/?nervecentre");
  await expect(page.locator(".site-results a", { hasText: "Comparison with Nervecentre" })).toBeVisible();
  await page.goto("/zh-cn/search/?%E5%80%99%E8%AF%8A");
  await expect(page.locator(".site-results li").first()).toBeVisible();
});

test("the search picker leads to results", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Search this site" }).click();
  await page
    .getByRole("searchbox")
    .or(page.getByRole("textbox", { name: "Search terms" }))
    .fill("Epic");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/search\/\?Epic$/);
  await expect(page.locator(".site-results a").first()).toBeVisible();
});

test("the skip link is the first thing the keyboard reaches and it moves to the content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(":focus")).toHaveText("Skip to main content");
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});

test("a missing address answers 404 with the site's own page", async ({ page }) => {
  const response = await page.goto("/does-not-exist/");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveText("Page not found");
  await expect(page.locator(".site-header")).toHaveCSS("display", "block");
  const theme = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue("--color-base-100"),
  );
  expect(theme).not.toBe("");
});
