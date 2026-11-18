// Dependency-free build: concatenates src/css/*.css and bundles src/js ES modules
// into one self-contained dist/index.html (the live host serves a single file).
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = (p) => join(root, "src", p);

export function buildCss() {
  return readdirSync(src("css")).filter((f) => f.endsWith(".css")).sort()
    .map((f) => readFileSync(src("css/" + f), "utf8").trim()).join("\n");
}

const JS_ORDER = ["env", "hero", "marquee", "reveal", "tilt", "scroll", "protect", "main"];

export function buildJs() {
  const body = JS_ORDER.map((name) => {
    const code = readFileSync(src(`js/${name}.js`), "utf8")
      .replace(/^import\s[^;]*;\s*$/gm, "")
      .replace(/^export\s+/gm, "");
    return `// --- ${name}.js ---\n${code.trim()}`;
  }).join("\n\n");
  return `(() => {\n"use strict";\n${body}\n})();`;
}

export function build({ write = true } = {}) {
  const tpl = readFileSync(src("index.html"), "utf8");
  const html = tpl.replace("/*__CSS__*/", () => buildCss()).replace("/*__JS__*/", () => buildJs());
  if (write) writeFileSync(join(root, "index.html"), html);
  return html;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const html = build();
  console.log(`built index.html (${html.length} bytes)`);
}
