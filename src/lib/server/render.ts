// Turns a page's Markdown into HTML that uses Lily's class hooks, so that every theme styles it.
// [text](topic:compare/epic) names a page by its en-001 path; the link goes to that page's peer in this locale.
// [text](repo:path) and [text](tree:path) go to the main repository. {{count:Name}} and {{date}} fill in live values.
// {{readiness:id}}, on a line of its own under a level-3 heading, becomes Lily's Slider showing that item's estimate.
import { Slider } from "@lilydesignsystem/svelte-headless";
import { Marked, type Token, type Tokens } from "marked";
import { render } from "svelte/server";
import { fill, ui } from "../i18n";
import { type Locale } from "../locales";
import { readiness } from "../readiness";
import { measure, retrievedOn } from "../status";
import { findPage, pageHref, peerOf, type Page } from "./content";

const REPO = "https://github.com/patient-administration-system/patient-administration-system";

function fillValues(body: string, locale: Locale): string {
  return body
    .replace(/\{\{count:([^}]+)\}\}/g, (_, name: string) => String(measure(name)))
    .replaceAll("{{date}}", retrievedOn(locale));
}

/** A percentage in Western digits, as every figure on the site is. */
export function formatPercent(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale, { style: "percent", numberingSystem: "latn" }).format(value / 100);
}

/**
 * The estimate for one item: Lily's Slider, rendered here so that it is in the prerendered page, and the figure in
 * words beside it. It is read-only (disabled): it shows a judgement, it does not take one.
 */
export function readinessHtml(id: string, item: string, locale: Locale): string {
  const value = readiness(id);
  const percent = formatPercent(value, locale);
  const m = ui(locale);
  const { body } = render(Slider, {
    props: {
      label: fill(m.readinessLabel, { item }),
      value,
      disabled: true,
      "aria-valuetext": percent,
      class: "site-readiness-slider",
    },
  });
  const slider = body.replace(/<!--[^>]*-->/g, "").replace(/\s*\n\s*/g, " ");
  return `<div class="site-readiness" data-readiness="${id}">${slider}<p class="site-readiness-value">${m.readinessEstimate}: ${percent}</p></div>`;
}

/** Replaces each {{readiness:id}} line, labelling it with the level-3 heading above it. */
function fillReadiness(body: string, locale: Locale): string {
  let heading = "";
  return body
    .split("\n")
    .map((line) => {
      const title = line.match(/^###\s+(.+)$/);
      if (title) heading = (title[1] ?? "").replace(/[*_`]/g, "").trim();
      const item = line.match(/^\{\{readiness:([a-z0-9-]+)\}\}$/);
      if (!item) return line;
      if (!heading) throw new Error(`{{readiness:${item[1]}}} has no level-3 heading above it`);
      return readinessHtml(item[1] ?? "", heading, locale);
    })
    .join("\n");
}

function resolveHref(href: string, locale: Locale): string {
  if (href.startsWith("repo:")) return `${REPO}/blob/main/${href.slice(5)}`;
  if (href.startsWith("tree:")) return `${REPO}/tree/main/${href.slice(5)}`;
  if (href.startsWith("topic:")) {
    const source = findPage("en-001", href.slice(6));
    const target = source && peerOf(source, locale);
    if (!target) throw new Error(`no page for link ${href} in ${locale}`);
    return pageHref(target);
  }
  return href;
}

function createMarked(): Marked {
  const marked = new Marked({
    gfm: true,
    renderer: {
      blockquote({ tokens }) {
        return `<div class="inset-text" role="note">${this.parser.parse(tokens)}</div>`;
      },
      code({ text }) {
        const escaped = text.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
        return `<div class="code-block" tabindex="0"><pre lang="en" dir="ltr"><code>${escaped}</code></pre></div>`;
      },
    },
  });
  return marked;
}

function renderTable(marked: Marked, tokens: Token[]): string {
  return marked
    .parser(tokens)
    .replaceAll("<table>", '<div class="site-scroll" tabindex="0"><table class="table">')
    .replaceAll("</table>", "</table></div>");
}

/** A level-2 section whose content is level-3 headings becomes a row of cards. */
function renderSection(marked: Marked, tokens: Token[]): string {
  const first = tokens.findIndex((token) => token.type === "heading" && (token as Tokens.Heading).depth === 3);
  if (first < 0) return renderTable(marked, tokens);
  const cards: string[] = [];
  let current: Token[] = [];
  for (const token of tokens.slice(first)) {
    if (token.type === "heading" && (token as Tokens.Heading).depth === 3 && current.length) {
      cards.push(`<article class="card">${renderTable(marked, current)}</article>`);
      current = [];
    }
    current.push(token);
  }
  if (current.length) cards.push(`<article class="card">${renderTable(marked, current)}</article>`);
  return `${renderTable(marked, tokens.slice(0, first))}<div class="site-cards">${cards.join("")}</div>`;
}

export function renderPage(page: Page): string {
  const marked = createMarked();
  const tokens = marked.lexer(fillReadiness(fillValues(page.body, page.locale), page.locale));
  marked.walkTokens(tokens, (token) => {
    if (token.type === "link") (token as Tokens.Link).href = resolveHref((token as Tokens.Link).href, page.locale);
  });
  const sections: Token[][] = [[]];
  for (const token of tokens) {
    if (token.type === "heading" && (token as Tokens.Heading).depth === 2) sections.push([]);
    sections.at(-1)?.push(token);
  }
  return sections.map((section) => renderSection(marked, section)).join("");
}

/** Plain words for search. */
export function pageText(page: Page, locale: Locale): string {
  const text = [page.meta.title, page.meta.description, page.meta.headline, page.meta.introduction, page.body]
    .join(" ")
    .replace(/\{\{readiness:[^}]+\}\}/g, " ")
    .replace(/\]\([^)]*\)/g, " ")
    .replace(/[#*|`[\]>_-]+/g, " ")
    .replace(/\s+/g, " ");
  return text.toLocaleLowerCase(locale);
}
