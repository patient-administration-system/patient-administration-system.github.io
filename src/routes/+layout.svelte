<script lang="ts">
  import "@lilydesignsystem/themes/corporate.css";
  import "../app.css";
  import { Footer, Header, NavigationMenu, SkipLink } from "@lilydesignsystem/svelte-headless";
  import { page } from "$app/state";
  import type { Snippet } from "svelte";
  import { NAV, REPO_URL, repo } from "#lib/site.js";

  let { children }: { children: Snippet } = $props();
</script>

<SkipLink href="#content" label="Skip to main content" />
<Header class="site-header">
  <div class="site-width site-header-row">
    <a class="site-brand" href="/">Patient Administration System</a>
    <NavigationMenu label="Main" class="site-nav">
      {#each NAV as item (item.href)}
        <a href={item.href} aria-current={page.url.pathname === item.href ? "page" : undefined}>{item.label}</a>
      {/each}
      <a href={REPO_URL}>GitHub</a>
    </NavigationMenu>
  </div>
</Header>
<main id="content" tabindex="-1">
  {@render children()}
</main>
<Footer class="site-footer">
  <div class="site-width site-footer-columns">
    <p>
      An open-source project, built and tested but not yet in production use. This is not an official NHS website, and
      nothing here is clinical advice.
    </p>
    <ul>
      <li><a href={repo("LICENSE.md")}>Licence</a></li>
      <li><a href={repo("AI_STATEMENT.md")}>AI statement</a></li>
      <li><a href={repo("SECURITY.md")}>Report a security problem</a></li>
      <li><a href={repo("CONTRIBUTING.md")}>Contribute</a></li>
    </ul>
  </div>
</Footer>
