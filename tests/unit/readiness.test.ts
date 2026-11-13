import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { READINESS } from "../../src/lib/readiness";
import { formatPercent, readinessHtml } from "../../src/lib/server/render";

const page = readFileSync("locales/en-001/topics/path-to-production/index.md", "utf8");
const used = [...page.matchAll(/^\{\{readiness:([a-z0-9-]+)\}\}$/gm)].map((match) => match[1]);

describe("readiness estimates", () => {
  it("are whole percentages from 0 to 100 in steps of 5, which the stylesheet colours", () => {
    for (const [id, value] of Object.entries(READINESS)) {
      expect(Number.isInteger(value) && value >= 0 && value <= 100 && value % 5 === 0, id).toBe(true);
    }
  });

  it("are each used once on the page, and the page uses no other", () => {
    expect([...used].sort()).toEqual(Object.keys(READINESS).sort());
    expect(new Set(used).size).toBe(used.length);
  });

  it("render as Lily's slider, read-only, with the figure in words beside it", () => {
    const html = readinessHtml("dpia", "Data protection impact assessment", "en-001");
    expect(html).toContain('type="range"');
    expect(html).toMatch(/class="slider site-readiness-slider\s*"/);
    expect(html).toContain('value="40"');
    expect(html).toContain("disabled");
    expect(html).toContain('aria-label="Data protection impact assessment: readiness estimate"');
    expect(html).toContain('aria-valuetext="40%"');
    expect(html).toContain("Estimate: 40%");
    expect(html).not.toContain("\n");
  });

  it("shows Western digits in every script", () => {
    expect(formatPercent(40, "ar-sa")).toMatch(/40/);
    expect(formatPercent(40, "hi-in")).toMatch(/40/);
  });

  it("refuses an item with no estimate", () => {
    expect(() => readinessHtml("no-such-item", "x", "en-001")).toThrow(/no readiness estimate/);
  });
});
