<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { fill, ui } from "./i18n";
  import type { Locale } from "./locales";

  type Entry = { href: string; title: string; description: string; text: string };

  let { locale }: { locale: Locale } = $props();
  const m = $derived(ui(locale));

  // The query is only known in the browser: this page is one file, written at build time.
  let index = $state<Entry[]>([]);
  let ready = $state(false);
  onMount(async () => {
    const response = await fetch(`/search-index/${locale}.json`);
    index = await response.json();
    ready = true;
  });

  const query = $derived.by(() => {
    if (!ready) return "";
    try {
      return decodeURIComponent(page.url.search.slice(1)).trim();
    } catch {
      return "";
    }
  });
  // Substring matching, so that it also works for Chinese, which has no spaces between words.
  const results = $derived.by(() => {
    const words = query.toLocaleLowerCase(locale).split(/\s+/).filter(Boolean);
    return words.length ? index.filter((entry) => words.every((word) => entry.text.includes(word))) : [];
  });
</script>

<div class="site-width site-page">
  <h1>{m.searchTitle}</h1>
  <noscript><p>{m.searchNeedsScript}</p></noscript>
  {#if !query}
    <p class="site-lead">{m.searchPrompt}</p>
  {:else if results.length === 0}
    <p class="site-lead">{fill(m.searchNone, { query })}</p>
  {:else}
    <p class="site-lead">{fill(m.searchResults, { query })}</p>
    <ul class="site-results">
      {#each results as result (result.href)}
        <li>
          <a href={result.href}>{result.title}</a>
          <p>{result.description}</p>
        </li>
      {/each}
    </ul>
  {/if}
</div>
