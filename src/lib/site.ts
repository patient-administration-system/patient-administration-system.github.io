export const SITE_URL = "https://patient-administration-system.github.io";
export const REPO_URL = "https://github.com/patient-administration-system/patient-administration-system";

const blob = (path: string) => `${REPO_URL}/blob/main/${path}`;
const tree = (path: string) => `${REPO_URL}/tree/main/${path}`;

export const NAV = [
  { path: "/features/", key: "features" },
  { path: "/architecture/", key: "architecture" },
  { path: "/status/", key: "status" },
  { path: "/trust/", key: "trust" },
  { path: "/get-started/", key: "getStarted" },
] as const;

/** Every page that exists in every language. */
export const PATHS = ["/", ...NAV.map((item) => item.path)];

/** Link names used by the `[text](name)` syntax in the message catalogues. */
export const LINKS = {
  spec: blob("spec/index.md"),
  specTree: tree("spec"),
  tasks: blob("tasks.md"),
  readiness: blob("governance/production-readiness.md"),
  noshow: blob("governance/noshow-model.md"),
  chaos: blob("governance/chaos-testing.md"),
  differencing: blob("governance/analytics-differencing.md"),
  clinicalSafety: blob("governance/clinical-safety.md"),
  dpia: blob("governance/dpia.md"),
  accessibility: blob("governance/accessibility-statement.md"),
  dtac: tree("docs/united-kingdom"),
  governance: blob("governance/README.md"),
  ai: blob("AI_STATEMENT.md"),
  install: blob("INSTALL.md"),
  contributing: blob("CONTRIBUTING.md"),
  security: blob("SECURITY.md"),
  licence: blob("LICENSE.md"),
  deployment: blob("operations/deployment.md"),
  runbook: blob("operations/runbook.md"),
  statusChapter: blob("spec/14-implementation-status.md"),
  rust: tree("patient-administration-system-with-rust"),
  ui: tree("patient-administration-system-ui-with-svelte"),
  dashboard: tree("patient-administration-system-frontend"),
  podman: tree("podman"),
} as const;

export type LinkName = keyof typeof LINKS;

/** Pages of this site that the catalogues link to, by the same syntax. */
export const PAGE_LINKS: Record<string, string> = { statusPage: "/status/" };
