// A small stand-in for GitHub Pages: serves build/, redirects a folder to its trailing slash, and answers a miss
// with 404.html.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const port = Number(process.argv[2] ?? 4273);
const root = join(process.cwd(), "build");
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".txt": "text/plain",
  ".xml": "application/xml",
};

createServer(async (request, response) => {
  const url = new URL(request.url, "http://localhost");
  const clean = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, "");
  const path = join(root, clean);
  try {
    const info = await stat(path);
    if (info.isDirectory() && !url.pathname.endsWith("/")) {
      response.writeHead(301, { location: `${url.pathname}/${url.search}` }).end();
      return;
    }
    const file = info.isDirectory() ? join(path, "index.html") : path;
    const body = await readFile(file);
    response.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" }).end(body);
  } catch {
    response.writeHead(404, { "content-type": types[".html"] }).end(await readFile(join(root, "404.html")));
  }
}).listen(port);
