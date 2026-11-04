<script lang="ts">
  import { SummaryList, SummaryListItem } from "@lilydesignsystem/svelte-headless";
  import Meta from "#lib/Meta.svelte";
  import { repo, repoTree } from "#lib/site.js";
</script>

<Meta
  title="Safety and trust"
  description="The rules the Patient Administration System's tests enforce, how AI was used to write it, and what nobody has reviewed yet."
  path="/trust"
/>

<div class="site-width site-page">
  <h1>Safety and trust</h1>
  <p class="site-lead">
    These are the rules the system holds itself to, and an honest account of what has not been checked.
  </p>

  <h2>Rules that are tested</h2>
  <SummaryList label="Rules the tests enforce">
    <SummaryListItem term="Support only">
      No score may reduce what a patient is offered, reorder or withhold a slot, overbook, or delay a contact.
    </SummaryListItem>
    <SummaryListItem term="A miss triggers contact">
      It never triggers discharge. Urgent-pathway services hold a cancellation for a person.
    </SummaryListItem>
    <SummaryListItem term="Consent first">
      Opt-outs and quiet hours are enforced at the one choke point every message passes.
    </SummaryListItem>
    <SummaryListItem term="Privacy-safe analytics">
      Small cells are hidden, with no identifiers and a daily query budget.
      <a href={repo("governance/analytics-differencing.md")}>Read what this does not prevent</a>.
    </SummaryListItem>
    <SummaryListItem term="Gated features stay off">
      A gated feature does nothing until a switch is set and named people have approved it.
    </SummaryListItem>
    <SummaryListItem term="Safe reply links"
      >Single-use hashed tokens. Opening a link reads; only a form post acts.</SummaryListItem
    >
  </SummaryList>

  <h2>How AI was used</h2>
  <p>
    Much of the repository was written with an AI assistant, Anthropic's Claude, at the maintainer's direction. That
    includes code, tests, specifications, governance drafts and translations.
  </p>
  <ul class="site-links">
    <li>Human review is not complete. Nobody has independently audited the code or documents.</li>
    <li>Every translation other than English is an AI draft that no first-language speaker has reviewed.</li>
    <li>Governance documents are drafts from the code. They are not clinical, legal or privacy advice.</li>
    <li>The software contains no machine-learning model and makes no automated decision about a patient.</li>
  </ul>
  <p><a href={repo("AI_STATEMENT.md")}>Read the full AI statement</a>.</p>

  <h2>Governance documents</h2>
  <ul class="site-links">
    <li><a href={repo("governance/clinical-safety.md")}>Clinical safety</a></li>
    <li><a href={repo("governance/dpia.md")}>Data protection impact assessment</a></li>
    <li><a href={repo("governance/accessibility-statement.md")}>Accessibility statement</a></li>
    <li><a href={repoTree("docs/united-kingdom")}>NHS DTAC self-assessment</a></li>
    <li><a href={repo("governance/README.md")}>Everything else in governance</a></li>
  </ul>
  <p>These are drafts and self-assessments, not sign-offs.</p>
</div>
