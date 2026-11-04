<script lang="ts">
  import { CodeBlock } from "@lilydesignsystem/svelte-headless";
  import Meta from "#lib/Meta.svelte";
  import { repo } from "#lib/site.js";

  const run = `git clone https://github.com/patient-administration-system/patient-administration-system.git
cd patient-administration-system
podman compose -f podman/compose.yml up -d
export DATABASE_URL=postgres://pas:pas_dev_password@localhost:5432/pas
cargo run -p patient-administration-system-migrations --bin pas-migrate -- up
cargo run -p patient-administration-system
cd patient-administration-system-ui-with-svelte && pnpm install && pnpm run dev`;
</script>

<Meta
  title="Get started"
  description="Run the Patient Administration System on your own machine for development with Rust, Node, pnpm and Podman."
  path="/get-started"
/>

<div class="site-width site-page">
  <h1>Get started</h1>
  <p class="site-lead">Run it on your own machine for development. This setup is not for real patient data.</p>

  <h2>You will need</h2>
  <ul class="site-links">
    <li>The Rust toolchain named in <code>rust-toolchain.toml</code></li>
    <li>Node 26 with pnpm</li>
    <li>Podman</li>
  </ul>

  <h2>Run it</h2>
  <div class="site-scroll">
    <CodeBlock label="Commands to run the system"><pre><code>{run}</code></pre></CodeBlock>
  </div>
  <p>
    The API starts on port 8080, with Swagger UI at <code>/swagger-ui/</code>, and the UI on port 5173.
    <a href={repo("INSTALL.md")}>The install guide</a> has the full steps, including per-user authentication.
  </p>

  <h2>Going further</h2>
  <ul class="site-links">
    <li><a href={repo("CONTRIBUTING.md")}>How a change is made</a></li>
    <li>
      <a href={repo("operations/deployment.md")}>Deployment</a> and
      <a href={repo("operations/runbook.md")}>the runbook</a>
    </li>
    <li><a href={repo("SECURITY.md")}>Reporting a security problem</a></li>
  </ul>
</div>
