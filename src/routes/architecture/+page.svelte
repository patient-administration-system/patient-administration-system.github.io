<script lang="ts">
  import { Table, TableBody, TableHead, TableRow, TableTD, TableTH } from "@lilydesignsystem/svelte-headless";
  import Meta from "#lib/Meta.svelte";
  import { repoTree } from "#lib/site.js";

  const parts = [
    {
      name: "The API",
      built: "Rust, Axum, SeaORM",
      role: "Every rule, and REST, FHIR R5 and HL7 v2 over HTTP and MLLP",
      path: "patient-administration-system-with-rust",
    },
    {
      name: "The UI",
      built: "SvelteKit 3, Svelte 5, Lily Design System",
      role: "Staff views, and patient sign-in to see their own appointments",
      path: "patient-administration-system-ui-with-svelte",
    },
    {
      name: "The ops dashboard",
      built: "Rust, Loco",
      role: "A server-rendered dashboard that runs in parallel to the UI",
      path: "patient-administration-system-frontend",
    },
    {
      name: "The development stack",
      built: "PostgreSQL 18, Keycloak 26.8, Redis 8",
      role: "Run with Podman",
      path: "podman",
    },
  ];
</script>

<Meta
  title="Architecture"
  description="How the Patient Administration System is built: a Rust API, a SvelteKit UI, and identity delegated to separate services."
  path="/architecture"
/>

<div class="site-width site-page">
  <h1>Architecture</h1>
  <p class="site-lead">
    The system holds appointments and waits, not identities. A person is an opaque identifier here, and who they are
    lives in another service.
  </p>

  <ol class="site-layers" aria-label="The parts of the system, from people down to the services it calls">
    <li><strong>People</strong><span>Patients, by message, link, keypad or portal. Staff, in the UI.</span></li>
    <li><strong>The UI and the ops dashboard</strong><span>SvelteKit, and server-rendered Loco.</span></li>
    <li><strong>The API</strong><span>Rust, with PostgreSQL. REST, FHIR R5 and HL7 v2.</span></li>
    <li>
      <strong>Delegated over HTTP</strong>
      <span><code>person-service</code> for patients, <code>worker-service</code> for practitioners.</span>
    </li>
  </ol>

  <h2>What is in the repository</h2>
  <div class="site-scroll">
    <Table label="Parts of the repository">
      <TableHead>
        <TableRow>
          <TableTH>Part</TableTH>
          <TableTH>Built with</TableTH>
          <TableTH>Job</TableTH>
        </TableRow>
      </TableHead>
      <TableBody>
        {#each parts as part (part.name)}
          <TableRow>
            <TableTD><a href={repoTree(part.path)}>{part.name}</a></TableTD>
            <TableTD>{part.built}</TableTD>
            <TableTD>{part.role}</TableTD>
          </TableRow>
        {/each}
      </TableBody>
    </Table>
  </div>

  <h2>The spec comes first</h2>
  <p>
    A behavioural change is one change: a spec edit, a code edit and a test edit together. Each functional requirement
    names the test that proves it. <a href={repoTree("spec")}>Read the specification</a>.
  </p>
</div>
