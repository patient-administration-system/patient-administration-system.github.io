// A small stand-in for GitHub Pages: serves build/, maps /path to /path.html and answers a miss with 404.html.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const port = Number(process.argv[2] ?? 4273);
const root = join(process.cwd(), "build");
const types = { ".html": "text/html", ".css": "text/css", ".svg": "image/svg+xml", ".txt": "text/plain" };

async function find(pathname) {
  const clean = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, "");
  for (const candidate of [clean, `${clean}.html`, join(clean, "index.html")]) {
    try {
      return { body: await readFile(join(root, candidate)), file: candidate };
    } catch {
      // Try the next candidate.
    }
  }
  return null;
}

createServer(async (request, response) => {
  const found = await find(new URL(request.url, "http://localhost").pathname);
  const result = found ?? { body: await readFile(join(root, "404.html")), file: "404.html" };
  response.writeHead(found ? 200 : 404, { "content-type": types[extname(result.file)] ?? "application/octet-stream" });
  response.end(result.body);
}).listen(port);
