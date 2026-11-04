<script lang="ts">
  import {
    InsetText,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableTD,
    TableTH,
  } from "@lilydesignsystem/svelte-headless";
  import Meta from "#lib/Meta.svelte";
  import { repo } from "#lib/site.js";
  import { allMeasures, measure, retrievedOn } from "#lib/status.js";

  const open = [
    "A named Clinical Safety Officer (DCB0129)",
    "DPIA sign-off",
    "Real carrier contracts",
    "An external penetration test",
    "Usability testing with patients and staff",
    "Fluent review of the translations",
  ];
</script>

<Meta
  title="Status"
  description="What is built in the Patient Administration System, what is still open, and what it needs from people before anyone can use it for real."
  path="/status"
/>

<div class="site-width site-page">
  <h1>Status</h1>
  <p class="site-lead">Built and tested. Not yet in production use. Nothing has been published to a registry.</p>

  <InsetText>
    <p>
      Do not run this with real patients yet. Read the
      <a href={repo("governance/production-readiness.md")}>production readiness checklist</a> first. An unticked item there
      means not done.
    </p>
  </InsetText>

  <h2>What it still needs</h2>
  <p>
    Most of what remains cannot be written as code. These need a person or an outside party. The work queue has
    {measure("Tasks open")} open tasks in all.
  </p>
  <ul class="site-links">
    {#each open as item (item)}
      <li>{item}</li>
    {/each}
  </ul>

  <h2>The current counts</h2>
  <div class="site-scroll">
    <Table label="Current counts from the repository">
      <TableHead>
        <TableRow>
          <TableTH>Measure</TableTH>
          <TableTH>Count</TableTH>
        </TableRow>
      </TableHead>
      <TableBody>
        {#each allMeasures as [name, count] (name)}
          <TableRow>
            <TableTD>{name}</TableTD>
            <TableTD>{count}</TableTD>
          </TableRow>
        {/each}
      </TableBody>
    </Table>
  </div>
  <p class="site-note">
    Generated in the repository and retrieved on {retrievedOn}. The source is
    <a href={repo("spec/14-implementation-status.md")}>the implementation status chapter</a>.
  </p>
</div>
