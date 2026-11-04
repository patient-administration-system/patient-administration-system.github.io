// Refreshes src/lib/status.json from the main repository, so the numbers on the site are generated rather
// than written. CI runs this before every build. If GitHub cannot be reached, the committed snapshot stays,
// with its own date, and the page says how old it is.
import { writeFile } from "node:fs/promises";
import { parseStatus } from "./parse-status.mjs";

const url =
  "https://raw.githubusercontent.com/patient-administration-system/patient-administration-system/main/spec/14-implementation-status.md";

try {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const measures = parseStatus(await response.text());
  const retrievedOn = new Date().toISOString().slice(0, 10);
  await writeFile(
    new URL("../src/lib/status.json", import.meta.url),
    JSON.stringify({ retrievedOn, measures }, null, 2) + "\n",
  );
  console.log(`status.json refreshed: ${Object.keys(measures).length} measures`);
} catch (error) {
  console.warn(`Keeping the committed status.json: ${error.message}`);
}
