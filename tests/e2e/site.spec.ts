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
  await expect(page.locator(".site-translations")).toContainText("العربية");
  await expect(page.locator(".site-translations")).toContainText("हिन्दी");
});

test("translated pages carry the right language, a draft notice and their own slugs", async ({ page }) => {
  await page.goto("/cy-gb/");
  await expect(page.locator("html")).toHaveAttribute("lang", "cy-gb");
  await expect(page.locator(".site-draft")).toContainText("Drafft cyntaf");
  await page.goto("/zh-cn/对比/");
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-cn");
  await expect(page.locator("h1")).toHaveText("对比");
});

test("Arabic reads right to left, with code left to right and a Gregorian date", async ({ page }) => {
  await page.goto("/ar-sa/مقارنة/epic/");
  await expect(page.locator("html")).toHaveAttribute("lang", "ar-sa");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator(".site-draft")).toContainText("مسودة أولى");
  await expect(page.locator("main")).toContainText("2026");
  await expect(page.locator("main")).toContainText("نوفمبر");
  const inset = page.locator(".site-page .inset-text").first();
  const side = await inset.evaluate((element) => getComputedStyle(element).borderRightWidth);
  expect(side).toBe("5px");
  await page.goto("/ar-sa/دليل-تعليمي/");
  const block = page.locator(".code-block pre").first();
  expect(await block.evaluate((element) => getComputedStyle(element).direction)).toBe("ltr");
});

test("Hindi carries its language, its draft notice and its own slugs", async ({ page }) => {
  await page.goto("/hi-in/तुलना/");
  await expect(page.locator("html")).toHaveAttribute("lang", "hi-in");
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  await expect(page.locator(".site-draft")).toContainText("पहला मसौदा");
  await expect(page.locator("h1")).toHaveText("तुलना");
});

test("following a language link updates the page's language and direction", async ({ page }) => {
  await page.goto("/");
  await page.locator('.site-translations a[lang="ar-001"]').click();
  await expect(page).toHaveURL(/\/ar-001\/$/);
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator("html")).toHaveAttribute("lang", "ar-001");
  await page.locator('.site-translations a[lang="en-001"]').click();
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
});

test("search finds Arabic and Hindi words", async ({ page }) => {
  await page.goto("/ar-sa/search/?%D8%A7%D9%84%D8%AA%D8%B0%D9%83%D9%8A%D8%B1");
  await expect(page.locator(".site-results li").first()).toBeVisible();
  await page.goto("/hi-in/search/?%E0%A4%B0%E0%A4%BF%E0%A4%AE%E0%A4%BE%E0%A4%87%E0%A4%82%E0%A4%A1%E0%A4%B0");
  await expect(page.locator(".site-results li").first()).toBeVisible();
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

test("the theme choice is kept in local storage and a cookie, and only once it is made", async ({ page, context }) => {
  await page.goto("/");
  const kept = async () => ({
    stored: await page.evaluate(() => localStorage.getItem("pas-site-theme")),
    cookie: (await context.cookies()).find((c) => c.name === "pas-site-theme")?.value ?? null,
  });
  expect(await kept()).toEqual({ stored: null, cookie: null });
  await page.getByRole("button", { name: "Theme" }).click();
  await page.getByRole("option", { name: "Dark", exact: true }).click();
  await expect.poll(kept).toEqual({ stored: "dark", cookie: "dark" });
});

test("every page's footer links to the privacy page, in its own language", async ({ page }) => {
  for (const [start, title] of <[string, string][]>[
    ["/", "Privacy"],
    ["/cy-gb/", "Preifatrwydd"],
    ["/ar-sa/", "الخصوصية"],
    ["/hi-in/", "गोपनीयता"],
    ["/zh-cn/", "隐私"],
  ]) {
    await page.goto(start);
    await page.getByRole("contentinfo").getByRole("link", { name: title, exact: true }).click();
    await expect(page.getByRole("heading", { level: 1, name: title })).toBeVisible();
    for (const key of ["pas-site-theme", "pas-site-time-zone", "pas-site-text-size"]) {
      await expect(page.getByRole("main").getByText(key, { exact: true }).first()).toBeVisible();
    }
  }
});

test("all 65 themes are published", () => {
  expect(readdirSync("build/themes").filter((file) => file.endsWith(".css"))).toHaveLength(65);
});

// Slow, so it runs on request: THEME_SWEEP=1 pnpm exec playwright test -g "every theme".
test("every theme passes axe on eight pages", async ({ page }) => {
  test.skip(!process.env.THEME_SWEEP);
  test.setTimeout(40 * 60_000);
  const themes = readdirSync("build/themes").map((file) => file.replace(/\.css$/, ""));
  const failures: string[] = [];
  await page.goto("/");
  for (const theme of themes) {
    await page.evaluate((name) => localStorage.setItem("pas-site-theme", name), theme);
    for (const path of [
      "/",
      "/compare/",
      "/compare/epic/",
      "/tutorial/",
      "/trust/",
      "/ar-sa/",
      "/ar-sa/مقارنة/epic/",
      "/hi-in/",
    ]) {
      await page.goto(path, { waitUntil: "domcontentloaded", timeout: 60_000 });
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      await page.waitForTimeout(150);
      const { violations } = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      failures.push(...violations.map((v) => `${theme} ${path} ${v.id}: ${v.nodes[0]?.html}`));
    }
  }
  expect(failures).toEqual([]);
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
