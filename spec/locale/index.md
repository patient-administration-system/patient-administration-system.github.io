# Locales

How this site supports several locales. It follows the rule `locales-for-global-sharing-with-svelte`.

## Locales

| Code             | Source                                           | Label                   |
| ---------------- | ------------------------------------------------ | ----------------------- |
| `en-001`         | Written by hand; the source of truth             | English (World)         |
| `en-gb`          | Copy of `en-001`                                 | English (Great Britain) |
| `en-us`          | Derived from `en-001`: American spelling         | English (United States) |
| `en-gb-oxendict` | Derived from `en-001`: -ize spelling             | English (Oxford)        |
| `cy-gb`          | Written by hand, first draft                     | Cymraeg (Prydain Fawr)  |
| `cy-001`         | Copy of `cy-gb`                                  | Cymraeg (Byd)           |
| `zh-cn`          | Written by hand, first draft, Simplified Chinese | 中文（中国）            |
| `zh-001`         | Copy of `zh-cn`                                  | 中文（世界）            |

The rule lists more locales. The maintainer chose English, Welsh and Mandarin for now.

## Content

`locales/<code>/index.md` is the home page. `locales/<code>/topics/<slug>/index.md` is a page, and a page may have pages inside it, as `compare/epic` does. Every page folder holds `index.md`, a `README.md` symlink to it, and `.locale-peer-id`.

Slugs belong to each locale. `compare` is `cymharu` in Welsh and `对比` in Chinese. Nothing assumes they match: the peer id says "this page, in locale X". It is 32 lowercase hexadecimal characters and a newline, the same in every locale.

Never edit a derived locale. Edit the source, then run `pnpm run locales`. The build runs `node scripts/derive-locales.mjs --check` and fails if a copy has drifted.

A translation names its peer with a `peer:` line, the page's `en-001` path. The home page uses `peer: home`.

## Addresses

`en-001` lives at the root, which is its canonical address, and also at `/en-001/`. Other locales live at `/<code>/<slug>/`. Each locale has `/<code>/sitemap.xml`, and the site has `/sitemap.xml`.

## Interface text

`src/lib/i18n.ts` holds all interface text, reached through `ui(locale)`. The picker labels are in `LOCALE_LABELS` in `src/lib/locales.ts`, and the picker is ordered by code.

## Rules for writing

- Links, inline code and `{{values}}` must match `en-001` exactly (`tests/unit/locales.test.ts`).
- Internal links name the `en-001` path, such as `[text](topic:compare/epic)`. The link goes to the peer in the reader's locale.
- Translate serially, by hand, not with subagents. Mark first drafts: every Welsh and Chinese page shows a draft notice from `ui(locale).draftNotice`.
- Keep proper nouns unconverted. `scripts/derive-locales.mjs` guards them, along with code and link targets.
