# patient-administration-system.github.io

The public website of the [Patient Administration System](https://github.com/patient-administration-system/patient-administration-system), at <https://patient-administration-system.github.io>.

Built with SvelteKit 3, Svelte 5 and the Lily Design System (`@lilydesignsystem/svelte-headless` and the `corporate` theme from `@lilydesignsystem/themes`). Every page is prerendered to plain HTML. There is no server, and no JavaScript reaches the browser.

## Run it

Needs Node 26 and pnpm.

```sh
pnpm install
pnpm run dev
```

## Check it

```sh
pnpm run check && pnpm run lint && pnpm test
pnpm run build && pnpm exec playwright test   # axe, 320-pixel reflow, keyboard and 404 tests against build/
```

## Publish it

Every push to `main` runs the checks and deploys to GitHub Pages (`.github/workflows/pages.yml`). A weekly run and a manual run do the same, to pick up new numbers.

## Where the numbers come from

`pnpm run status:sync` reads the generated table in the main repository's `spec/14-implementation-status.md` into `src/lib/status.json`. CI runs it before each build. If GitHub cannot be reached, the committed snapshot is used and the page shows that snapshot's date.

Do not type a count into a page. Use `measure()` from `src/lib/status.ts`, which fails the build if a measure is renamed.

## Rules for the content

- Say what is true of the main repository today. The site must not claim more than its README, `AI_STATEMENT.md` and `governance/production-readiness.md` do.
- Keep the look neutral. Do not use Lily's NHS themes, NHS colours or NHS logos: this is not an official NHS website.
- The site is in English only for now. The main project's translations are first drafts awaiting fluent review.

## Licence

MIT, Apache-2.0, BSD-3-Clause, GPL-2.0 or GPL-3.0, at your option. See [`LICENSE.md`](LICENSE.md).
