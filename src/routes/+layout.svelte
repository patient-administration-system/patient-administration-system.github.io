<script lang="ts">
  import "../app.css";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { Footer, Header, InsetText, NavigationMenu, SkipLink } from "@lilydesignsystem/svelte-headless";
  import PickerBar from "@lilydesignsystem/svelte-picker-bar";
  import type { Snippet } from "svelte";
  import { REPO_URL } from "#lib/constants.js";
  import { ui } from "#lib/i18n.js";
  import { LOCALES, LOCALE_LABELS, type Locale, localePath, textDirection } from "#lib/locales.js";

  let { data, children }: { data: import("./$types").LayoutData; children: Snippet } = $props();

  const locale = $derived(data.locale);
  const m = $derived(ui(locale));
  const here = $derived(decodeURI(page.url.pathname));
  const links = $derived([
    { href: localePath(locale, ""), label: m.brand, current: data.isHome },
    ...data.nav.map((item) => ({ href: item.href, label: item.label, current: here === item.href })),
  ]);
  // The 404 file is served at any missing address, so it has no router and no working pickers.
  const interactive = $derived(page.route.id !== "/404");

  function changeLanguage(code: string): void {
    // The picker also reports the language it starts on. A full load gets the right <html lang> from the file.
    if (code === locale) return;
    const target = data.alternates.find((alternate) => alternate.locale === (code as Locale));
    if (target) location.assign(target.href);
  }

  // Footer and hero links to another locale go through the router, which leaves <html> as it was.
  $effect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = textDirection(locale);
  });

  const email = (url: string, title: string) =>
    `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
  const repo = (path: string) => `${REPO_URL}/blob/main/${path}`;
</script>

<SkipLink href="#content" label={m.skip} />
<Header class="site-header">
  <div class="site-width site-header-row">
    <a class="site-brand" href={localePath(locale, "")}>{m.brand}</a>
    <NavigationMenu label={m.mainNav} class="site-nav">
      {#each data.nav as item (item.href)}
        <a href={item.href} aria-current={here === item.href ? "page" : undefined}>{item.label}</a>
      {/each}
      <a href={REPO_URL}>{m.github}</a>
    </NavigationMenu>
  </div>
  {#if interactive}
    <div class="site-width">
      <PickerBar
        class="site-pickers"
        role="group"
        aria-label={m.preferences}
        labels={m.picker}
        {links}
        searchProps={{ action: localePath(locale, "search"), navigate: (href: string) => goto(href) }}
        themesUrl="/themes/"
        themeProps={{ defaultValue: "corporate", storageKey: "pas-site-theme" }}
        locales={[...LOCALES]}
        localeProps={{ value: locale, localeLabels: LOCALE_LABELS, onChange: changeLanguage }}
        timeZoneProps={{ locale, storageKey: "pas-site-time-zone" }}
        textSizeProps={{ sizeLabels: m.sizes, storageKey: "pas-site-text-size" }}
        shareTargets={[{ id: "email", label: m.picker.email, href: email, newTab: false }]}
        shareProps={{
          title: m.brand,
          copyLabel: m.picker.copy,
          copiedLabel: m.picker.copied,
          copyFailedLabel: m.picker.copyFailed,
        }}
      />
    </div>
  {/if}
</Header>
<main id="content" tabindex="-1">
  {#if m.draftNotice}
    <div class="site-width site-draft">
      <InsetText><p>{m.draftNotice}</p></InsetText>
    </div>
  {/if}
  {@render children()}
</main>
<Footer class="site-footer">
  <div class="site-width site-footer-columns">
    <p>{m.footer}</p>
    <ul>
      <li><a href={repo("LICENSE.md")}>{m.licence}</a></li>
      <li><a href={repo("AI_STATEMENT.md")}>{m.aiStatement}</a></li>
      <li><a href={repo("SECURITY.md")}>{m.security}</a></li>
      <li><a href={repo("CONTRIBUTING.md")}>{m.contribute}</a></li>
    </ul>
    <ul aria-label={m.languages}>
      {#each data.alternates as alternate (alternate.locale)}
        <li>
          <a
            href={alternate.href}
            lang={alternate.locale}
            dir={textDirection(alternate.locale)}
            hreflang={alternate.locale}
            aria-current={alternate.locale === locale ? "true" : undefined}>{LOCALE_LABELS[alternate.locale]}</a
          >
        </li>
      {/each}
    </ul>
  </div>
</Footer>
