<script lang="ts">
  import { SITE_URL } from "./site";

  let {
    title,
    description,
    path,
    noindex = false,
  }: { title: string; description: string; path: string; noindex?: boolean } = $props();

  const fullTitle = $derived(path === "/" ? title : `${title} | Patient Administration System`);
</script>

<svelte:head>
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  {#if noindex}
    <meta name="robots" content="noindex" />
  {:else}
    <link rel="canonical" href={`${SITE_URL}${path === "/" ? "" : path}`} />
  {/if}
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
</svelte:head>
