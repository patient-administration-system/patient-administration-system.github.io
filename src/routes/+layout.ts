// Every page is plain HTML written at build time; there is no server. The browser code is what the picker bar and
// the search page need. `trailingSlash` gives each page its own index.html, which GitHub Pages serves unambiguously
// where a language folder and a language home page would otherwise share a name.
export const prerender = true;
export const trailingSlash = "always";
