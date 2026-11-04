// Locale copies, per the locale rule (spec/locale/index.md). Hand-written sources: en-001, cy-gb, zh-cn. Everything
// else is derived, so that a copy cannot drift: `node scripts/derive-locales.mjs` writes them, and `--check` fails if
// any differs. Also writes the README.md symlink and the .locale-peer-id of every page. A peer id is derived from the
// en-001 path, so it is byte-identical across locales whatever the slug is.
import { createHash } from "node:crypto";
import {
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative } from "node:path";

const ROOT = new URL("../locales/", import.meta.url).pathname;
const check = process.argv.includes("--check");
const problems = [];

/** Text that must never change spelling: proper nouns, code, and link targets. */
const GUARD = /(`[^`]*`|```[\s\S]*?```|\]\([^)]*\)|Velindre Cancer Centre|https?:\/\/\S+)/g;

const US = [
  [/\bbehaviour/g, "behavior"],
  [/\bBehaviour/g, "Behavior"],
  [/\borganisation/g, "organization"],
  [/\bOrganisation/g, "Organization"],
  [/\blicences\b/g, "licenses"],
  [/\blicence\b/g, "license"],
  [/\bLicence\b/g, "License"],
  [/\bcancelled\b/g, "canceled"],
  [/\bCancelled\b/g, "Canceled"],
  [/\bcentralised\b/g, "centralized"],
  [/\brecognise/g, "recognize"],
  [/\bprioritise/g, "prioritize"],
  [/\bjudgement/g, "judgment"],
];

const OXFORD = [
  [/\borganisation/g, "organization"],
  [/\bOrganisation/g, "Organization"],
  [/\bcentralised\b/g, "centralized"],
  [/\brecognise/g, "recognize"],
  [/\bprioritise/g, "prioritize"],
];

function convert(text, rules) {
  return text
    .split(GUARD)
    .map((part, index) => (index % 2 === 1 ? part : rules.reduce((value, [from, to]) => value.replace(from, to), part)))
    .join("");
}

const same = (text) => text;
const DERIVED = [
  ["en-001", "en-gb", same],
  ["en-001", "en-us", (text) => convert(text, US)],
  ["en-001", "en-gb-oxendict", (text) => convert(text, OXFORD)],
  ["cy-gb", "cy-001", same],
  ["zh-cn", "zh-001", same],
];

function put(file, content) {
  const current = existsSync(file) ? readFileSync(file, "utf8") : null;
  if (current === content) return;
  if (check) problems.push(`stale: ${relative(ROOT, file)}`);
  else {
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, content);
  }
}

function folders(folder) {
  const children = readdirSync(folder, { withFileTypes: true }).filter((entry) => entry.isDirectory());
  return [folder, ...children.flatMap((child) => folders(join(folder, child.name)))];
}

function pageFolders(locale) {
  const base = join(ROOT, locale);
  return existsSync(base) ? folders(base).filter((folder) => existsSync(join(folder, "index.md"))) : [];
}

function finish(folder) {
  const link = join(folder, "README.md");
  const missing = !existsSync(link) || !lstatSync(link).isSymbolicLink();
  if (missing && check) problems.push(`no README.md symlink: ${relative(ROOT, folder)}`);
  if (missing && !check) {
    rmSync(link, { force: true });
    symlinkSync("index.md", link);
  }
}

// Peer ids come from en-001 and are carried to translations through `peer:` in each translation's frontmatter.
function peerId(path) {
  return createHash("md5").update(`patient-administration-system:${path}`).digest("hex");
}

for (const folder of pageFolders("en-001")) {
  const path = relative(join(ROOT, "en-001"), folder).replace(/^topics\/?/, "");
  put(join(folder, ".locale-peer-id"), `${peerId(path)}\n`);
  finish(folder);
}
for (const locale of ["cy-gb", "zh-cn"]) {
  for (const folder of pageFolders(locale)) {
    const peer = readFileSync(join(folder, "index.md"), "utf8").match(/^peer: (.*)$/m);
    if (!peer) throw new Error(`no peer: line in ${folder}`);
    put(join(folder, ".locale-peer-id"), `${peerId(peer[1] === "home" ? "" : peer[1])}\n`);
    finish(folder);
  }
}
for (const [source, target, transform] of DERIVED) {
  for (const folder of pageFolders(source)) {
    const destination = join(ROOT, target, relative(join(ROOT, source), folder));
    put(join(destination, "index.md"), transform(readFileSync(join(folder, "index.md"), "utf8")));
    put(join(destination, ".locale-peer-id"), readFileSync(join(folder, ".locale-peer-id"), "utf8"));
    finish(destination);
  }
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
