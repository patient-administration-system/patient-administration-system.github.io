<script lang="ts">
  import { ActionLink, Hero, Statistic } from "@lilydesignsystem/svelte-headless";
  import { fill, ui } from "./i18n";
  import { type Locale, TRANSLATIONS, localePath } from "./locales";
  import { measure, retrievedOn } from "./status";

  let {
    locale,
    meta,
    html,
    actions,
  }: {
    locale: Locale;
    meta: Record<string, string>;
    html: string;
    actions: { primary: { href: string; label: string }; secondary: { href: string; label: string } };
  } = $props();

  const m = $derived(ui(locale));
  const stats = $derived([
    { title: m.stats.requirements, value: measure("Functional requirements") + measure("Non-functional requirements") },
    { title: m.stats.tests, value: measure("Rust test functions (server, front-end, migrations)") },
    { title: m.stats.routes, value: measure("Server route registrations") },
    { title: m.stats.languages, value: measure("UI locale catalogues") },
  ]);
</script>

<Hero class="site-hero">
  <div class="site-width">
    <h1>{meta.headline}</h1>
    <p class="site-subheadline">{meta.subheadline}</p>
    <p class="site-lead">{meta.introduction}</p>
    <div class="site-actions">
      <ActionLink href={actions.primary.href} class="site-button">{actions.primary.label}</ActionLink>
      <ActionLink href={actions.secondary.href} class="site-button site-button-quiet"
        >{actions.secondary.label}</ActionLink
      >
    </div>
    <p class="site-translations">
      {m.translations}
      {#each TRANSLATIONS as translation, index (translation.locale)}
        {#if index > 0}<span>,&nbsp;</span>{/if}<a
          href={localePath(translation.locale, "") === "/" ? "/en-001/" : localePath(translation.locale, "")}
          lang={translation.locale}>{translation.name}</a
        >
      {/each}
    </p>
  </div>
</Hero>

<div class="site-width site-page">
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- written by this project in locales/, at build time -->
  {@html html}

  <h2>{m.numbers}</h2>
  <div class="site-stats">
    {#each stats as stat (stat.title)}
      <Statistic title={stat.title} value={String(stat.value)} />
    {/each}
  </div>
  <p class="site-note">{fill(m.retrieved, { date: retrievedOn(locale) })}</p>
</div>
