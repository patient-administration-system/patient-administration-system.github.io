import { describe, expect, it } from "vitest";
import { parseStatus } from "../../scripts/parse-status.mjs";

describe("parseStatus", () => {
  it("reads the measures between the markers, without the backticks", () => {
    const markdown = [
      "| Not this | 1 |",
      "<!-- status:begin -->",
      "| Measure | Count |",
      "|---|---|",
      "| of which `#[ignore]`d (need PostgreSQL) | 401 |",
      "| Migrations | 57 |",
      "<!-- status:end -->",
    ].join("\n");
    expect(parseStatus(markdown)).toEqual({ "of which #[ignore]d (need PostgreSQL)": 401, Migrations: 57 });
  });

  it("refuses a page with no block or no rows, so a changed format cannot publish an empty table", () => {
    expect(() => parseStatus("nothing here")).toThrow("no status block");
    expect(() => parseStatus("<!-- status:begin --><!-- status:end -->")).toThrow("no rows");
  });
});
