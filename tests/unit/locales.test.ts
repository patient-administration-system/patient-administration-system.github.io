import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { LOCALES, localePath, parsePath } from "../../src/lib/locales";

function folders(folder: string): string[] {
  const children = readdirSync(folder, { withFileTypes: true }).filter((entry) => entry.isDirectory());
  return [folder, ...children.flatMap((child) => folders(join(folder, child.name)))];
}

function pages(locale: string) {
  return folders(join("locales", locale))
    .filter((folder) => existsSync(join(folder, "index.md")))
    .map((folder) => ({
      folder,
      peer: readFileSync(join(folder, ".locale-peer-id"), "utf8"),
      text: readFileSync(join(folder, "index.md"), "utf8"),
    }));
}

/** Link targets and inline code, which must not differ between translations. */
function fixed(text: string): string[] {
  const links = [...text.matchAll(/\]\(([^)]+)\)/g)].map((match) => match[1] ?? "");
  const code = [...text.replace(/```[\s\S]*?```/g, "").matchAll(/`([^`]+)`/g)].map((match) => match[1] ?? "");
  return [...links, ...code].sort();
}

const english = new Map(pages("en-001").map((page) => [page.peer, page]));

describe.each([...LOCALES])("locale %s", (locale) => {
  const own = pages(locale);

  it("has every page, each with a 32-character peer id and a README symlink", () => {
    expect(own.map((page) => page.peer).sort()).toEqual([...english.keys()].sort());
    for (const page of own) {
      expect(page.peer).toMatch(/^[0-9a-f]{32}\n$/);
      expect(existsSync(join(page.folder, "README.md"))).toBe(true);
    }
  });

  it("has the same links and code as English, and every live value", () => {
    for (const page of own) {
      const source = english.get(page.peer)!;
      expect(fixed(page.text), page.folder).toEqual(fixed(source.text));
      expect(page.text.match(/\{\{[^}]+\}\}/g) ?? [], page.folder).toEqual(source.text.match(/\{\{[^}]+\}\}/g) ?? []);
    }
  });
});

describe("American and Oxford spelling", () => {
  it("leaves no British forms in en-us", () => {
    for (const page of pages("en-us")) {
      const words = page.text.replace(/\]\([^)]*\)/g, "](x)");
      expect(words, page.folder).not.toMatch(/\b(organisation|licence|behaviour|cancelled)\b/i);
    }
  });

  it("uses -ize in Oxford spelling and keeps licence", () => {
    const text = pages("en-gb-oxendict")
      .map((page) => page.text)
      .join("");
    expect(text).toContain("organization");
    expect(text).not.toContain("organisation");
    expect(text).toContain("licence");
  });
});

describe("addresses", () => {
  it("puts English at the root and other locales under their code", () => {
    expect(localePath("en-001", "compare/epic")).toBe("/compare/epic/");
    expect(localePath("zh-cn", "对比/epic")).toBe("/zh-cn/对比/epic/");
    expect(localePath("cy-gb", "")).toBe("/cy-gb/");
  });

  it("reads native-script slugs from an encoded address", () => {
    expect(parsePath("/zh-cn/%E5%AF%B9%E6%AF%94/epic/")).toEqual({
      locale: "zh-cn",
      slug: "对比/epic",
      prefixed: true,
    });
    expect(parsePath("/compare/epic/")).toEqual({ locale: "en-001", slug: "compare/epic", prefixed: false });
  });
});
