export const SITE_URL = "https://patient-administration-system.github.io";
export const REPO_URL = "https://github.com/patient-administration-system/patient-administration-system";

/** A link to a file on the main branch of the main repository. */
export function repo(path: string): string {
  return `${REPO_URL}/blob/main/${path}`;
}

/** A link to a folder on the main branch of the main repository. */
export function repoTree(path: string): string {
  return `${REPO_URL}/tree/main/${path}`;
}

export const NAV = [
  { href: "/features", label: "Features" },
  { href: "/architecture", label: "Architecture" },
  { href: "/status", label: "Status" },
  { href: "/trust", label: "Safety and trust" },
  { href: "/get-started", label: "Get started" },
];

/** Every prerendered page a search engine should know about. */
export const PAGES = ["/", ...NAV.map((item) => item.href)];
