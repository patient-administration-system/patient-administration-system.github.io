<script lang="ts">
  import { ActionLink, Card, Hero, InsetText, Statistic } from "@lilydesignsystem/svelte-headless";
  import Meta from "#lib/Meta.svelte";
  import { REPO_URL, repo } from "#lib/site.js";
  import { measure, retrievedOn } from "#lib/status.js";

  const stats = [
    { title: "Functional requirements", value: measure("Functional requirements") },
    { title: "Rust tests", value: measure("Rust test functions (server, front-end, migrations)") },
    { title: "API routes", value: measure("Server route registrations") },
    { title: "Languages in the UI", value: measure("UI locale catalogues") },
  ];
</script>

<Meta
  title="Patient Administration System"
  description="An open-source Patient Administration System for the NHS in Wales: appointments, reminders, waiting lists, and the measurement that shows whether any of it is fair."
  path="/"
/>

<Hero class="site-hero">
  <div class="site-width">
    <p class="site-kicker">Open source. Administrative, not clinical.</p>
    <h1>Patient administration that shows its working</h1>
    <p class="site-lead">
      Appointments, reminders and replies, waiting lists, transport and virtual-visit requests for the NHS in Wales, and
      the measurement that shows whether any of it is fair.
    </p>
    <div class="site-actions">
      <ActionLink href="/features" class="site-button">See what it does</ActionLink>
      <ActionLink href={REPO_URL} class="site-button site-button-quiet">Read the source</ActionLink>
    </div>
  </div>
</Hero>

<div class="site-width site-page">
  <InsetText>
    <p>
      <strong>Status: built and tested, not yet in production use.</strong> What remains is mostly people and contracts,
      such as a Clinical Safety Officer and an external penetration test. <a href="/status">See what is still open</a>.
    </p>
  </InsetText>

  <section aria-labelledby="numbers">
    <h2 id="numbers">Counted from the repository, not written by hand</h2>
    <div class="site-stats">
      {#each stats as stat (stat.title)}
        <Statistic title={stat.title} value={String(stat.value)} />
      {/each}
    </div>
    <p class="site-note">Retrieved from the main branch on {retrievedOn}.</p>
  </section>

  <section aria-labelledby="why">
    <h2 id="why">Built around the patient who misses out</h2>
    <div class="site-cards">
      <Card heading="Reminders that escalate, safely" headingLevel={3}>
        <p>
          A patient who stays silent is escalated to a person to phone. Opt-outs, quiet hours and consent are enforced
          in one place.
        </p>
      </Card>
      <Card heading="A miss triggers contact" headingLevel={3}>
        <p>
          Missing an appointment never discharges anyone automatically. On an urgent pathway, a cancellation is held for
          a person to look at.
        </p>
      </Card>
      <Card heading="Fairness you can measure" headingLevel={3}>
        <p>
          A privacy-safe analytics feed hides small cells and limits queries, so a health board can look for unfair
          patterns without seeing identifiers.
        </p>
      </Card>
    </div>
  </section>

  <section aria-labelledby="read">
    <h2 id="read">Read the evidence</h2>
    <ul class="site-links">
      <li><a href={repo("spec/index.md")}>The specification</a>, the single source of truth for behaviour</li>
      <li><a href={repo("tasks.md")}>The work queue</a>, with every open item</li>
      <li><a href={repo("governance/production-readiness.md")}>The production readiness checklist</a></li>
    </ul>
  </section>
</div>
