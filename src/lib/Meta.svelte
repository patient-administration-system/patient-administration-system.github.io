<script lang="ts">
  import { page } from "$app/state";
  import { SITE_URL } from "./constants";

  let { title, description, noindex = false }: { title: string; description: string; noindex?: boolean } = $props();

  const fullTitle = $derived(page.data.isHome ? title : `${title} | ${page.data.brand}`);
</script>

<svelte:head>
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  {#if noindex}
    <meta name="robots" content="noindex" />
  {:else}
    <link rel="canonical" href={`${SITE_URL}${page.data.canonical}`} />
    {#each page.data.alternates as alternate (alternate.locale)}
      <link rel="alternate" hreflang={alternate.locale} href={`${SITE_URL}${alternate.href}`} />
    {/each}
  {/if}
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
</svelte:head>
