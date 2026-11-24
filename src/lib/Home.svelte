<script lang="ts">
  import { ActionLink, Hero } from "@lilydesignsystem/svelte-headless";
  import { ui } from "./i18n";
  import { type Locale, TRANSLATIONS, localePath, textDirection } from "./locales";

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
</script>

<Hero class="site-hero">
  <div class="site-width">
    <h1>{meta.headline}</h1>
    <p class="site-subheadline">{meta.subheadline}</p>
    <p class="site-lead">{meta.introduction}</p>
    <div class="site-actions">
      <ActionLink href={actions.primary.href} class="site-button">{actions.primary.label}</ActionLink>
      <ActionLink href={actions.secondary.href} class="site-button site-button-quiet">
        {actions.secondary.label}
      </ActionLink>
    </div>
    <p class="site-translations">
      {m.translations}
      {#each TRANSLATIONS as translation, index (translation.locale)}
        {#if index > 0}<span>{m.separator}&nbsp;</span>{/if}<a
          href={localePath(translation.locale, "") === "/" ? "/en-001/" : localePath(translation.locale, "")}
          lang={translation.locale}
          dir={textDirection(translation.locale)}
        >
          {translation.name}
        </a>
      {/each}
    </p>
  </div>
</Hero>

<div class="site-width site-page">
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- written by this project in locales/, at build time -->
  {@html html}
</div>
