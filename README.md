# patient-administration-system.github.io

The public website of the [Patient Administration System](https://github.com/patient-administration-system/patient-administration-system), at <https://patient-administration-system.github.io>.

A welcoming introduction for patients, clinic teams, health boards and developers: benefits, features, a tutorial, and comparisons with other systems. Built with SvelteKit 3, Svelte 5 and the Lily Design System. Every page is prerendered, so there is no server. The browser code is what the Lily picker bar and the search page need; without it, every page still reads and links correctly.

## Run it

Needs Node 26 and pnpm.

```sh
pnpm install
pnpm run dev
```

## Check it

```sh
pnpm run check && pnpm run lint && pnpm test
pnpm run build && pnpm exec playwright test   # axe and 320-pixel reflow on every page, then each picker
THEME_SWEEP=1 pnpm exec playwright test -g "every theme"   # axe on five pages in all 57 themes; slow
```

## Publish it

Every push to `main` runs the checks and deploys to GitHub Pages (`.github/workflows/pages.yml`). A weekly run and a manual run do the same, to pick up new numbers.

## Where things live

| Path                         | What                                                                         |
| ---------------------------- | ---------------------------------------------------------------------------- |
| `locales/<code>/`            | Page content in Markdown. See [`spec/locale/index.md`](spec/locale/index.md) |
| `src/lib/i18n.ts`            | Interface text                                                               |
| `src/lib/server/`            | Reads the Markdown and renders it with Lily's class hooks                    |
| `scripts/derive-locales.mjs` | Makes the regional copies, and checks they have not drifted                  |
| `scripts/sync-status.mjs`    | Fetches the counts from the main repository                                  |

## Where the numbers come from

`pnpm run status:sync` reads the generated table in the main repository's `spec/14-implementation-status.md` into `src/lib/status.json`. CI runs it before each build. If GitHub cannot be reached, the committed snapshot is used and the page shows that snapshot's date.

Do not type a count into a page. Use `{{count:Measure name}}`, which fails the build if a measure is renamed.

## Rules for the content

- Say what is true of the main repository today. A page must not claim more than its README, `AI_STATEMENT.md` and `governance/production-readiness.md` do. Quote no outcome figures until there are real ones.
- Keep the fact that the system is not in use with real patients prominent, above all on comparison pages.
- A comparison with a named product uses public sources that the page lists, states the date they were checked, and shows where this project falls short. Use no vendor logos. Recheck the sources when you change a page, and update `checked:`.
- The default look is neutral, because this is not an official NHS website. The theme picker offers all 57 Lily themes, including NHS and GOV.UK ones, as the maintainer chose. Do not make one of those the default.

## Licence

MIT, Apache-2.0, BSD-3-Clause, GPL-2.0 or GPL-3.0, at your option. See [`LICENSE.md`](LICENSE.md).
