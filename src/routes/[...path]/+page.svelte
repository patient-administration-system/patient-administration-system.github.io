<script lang="ts">
  import { InsetText } from "@lilydesignsystem/svelte-headless";
  import { ISSUES_URL } from "#lib/constants.js";
  import Home from "#lib/Home.svelte";
  import { fill, ui } from "#lib/i18n.js";
  import Meta from "#lib/Meta.svelte";
  import Search from "#lib/Search.svelte";
  import { formatDate } from "#lib/status.js";

  let { data }: { data: import("./$types").PageData } = $props();
  const m = $derived(ui(data.locale));
</script>

{#if data.kind === "search"}
  <Meta title={m.searchTitle} description={m.searchDescription} noindex />
  <Search locale={data.locale} />
{:else if data.kind === "home"}
  <Meta title={data.meta.title ?? ""} description={data.meta.description ?? ""} />
  <Home locale={data.locale} meta={data.meta} html={data.html} actions={data.actions} />
{:else}
  <Meta title={data.meta.title ?? ""} description={data.meta.description ?? ""} />
  <div class="site-width site-page">
    <h1>{data.meta.title}</h1>
    {#if data.meta.checked}
      <InsetText>
        <p>
          {fill(m.compareNotice, { date: formatDate(data.meta.checked, data.locale) })}
          <a href={ISSUES_URL}>{m.compareFix}</a>.
        </p>
      </InsetText>
    {/if}
    <!-- eslint-disable-next-line svelte/no-at-html-tags -- written by this project in locales/, at build time -->
    {@html data.html}
  </div>
{/if}
