// The readiness estimates on the path-to-production page, one per item, shared by every locale. A page names an item
// with {{readiness:<id>}} on a line of its own, under the item's heading. These are judgements, not measurements: keep
// them in step with governance/path-to-production.md in the main repository, which gives the reason for each.

/** When the estimates were last reviewed against the main repository. */
export const READINESS_REVIEWED = "2026-11-13";

/** Percent done, 0 to 100, by item. */
export const READINESS: Record<string, number> = {
  "clinical-safety": 15,
  dpia: 40,
  "penetration-test": 0,
  "cyber-essentials": 0,
  dspt: 0,
  mfa: 85,
  "api-authentication": 70,
  "operator-sign-in": 0,
  "identity-proofing": 60,
  backups: 70,
  alerting: 40,
  availability: 0,
  consent: 90,
  receipts: 80,
  carriers: 10,
  translations: 10,
  accessibility: 30,
  usability: 0,
  "dependency-checks": 100,
  "required-ci": 60,
  sbom: 100,
};

export function readiness(id: string): number {
  const value = READINESS[id];
  if (value === undefined) throw new Error(`no readiness estimate called "${id}"`);
  return value;
}
