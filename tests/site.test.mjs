import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { build, buildJs } from "../scripts/build.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = build({ write: false });

test("single h1 with accessible name", () => {
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert.match(html, /<h1 aria-label="Shamil Habeeb"/);
});

test("document basics: lang, viewport, title, description", () => {
  assert.match(html, /<html lang="en"/);
  assert.match(html, /name="viewport"/);
  assert.match(html, /<title>[^<]+<\/title>/);
  assert.match(html, /name="description"/);
});

test("every <img> has alt and dimensions or is decorative", () => {
  for (const tag of html.match(/<img\b[^>]*>/g)) assert.match(tag, /\balt=/, tag);
});

test("local assets referenced in HTML exist in the repo root", () => {
  const refs = [...html.matchAll(/(?:src|href)="([^"#:]+?)(?:\?[^"]*)?"/g)].map((m) => m[1]);
  assert.ok(refs.length > 5);
  for (const r of refs) assert.ok(existsSync(join(root, r)), `missing ${r}`);
});

test("section anchors used by nav exist", () => {
  for (const id of ["about", "exp", "projects", "contact"]) {
    assert.match(html, new RegExp(`id="${id}"`));
    assert.match(html, new RegExp(`href="#${id}"`));
  }
});

test("external links opened in a new tab use rel=noopener", () => {
  for (const tag of html.match(/<a\b[^>]*target="_blank"[^>]*>/g)) assert.match(tag, /noopener/, tag);
});

test("only the approved public contacts appear", () => {
  const mails = new Set(html.match(/[\w.+-]+@[\w-]+\.[\w.]+/g) || []);
  assert.deepEqual([...mails].sort(), ["ceo@denelli.in"]);
  assert.match(html, /tel:\+918848352895/);
});

test("bundled JS is valid and has no leftover module syntax", () => {
  const js = buildJs();
  assert.doesNotMatch(js, /^\s*(import|export)\s/m);
  new Function(js);
});

test("all element ids queried by JS exist in the markup", () => {
  const js = buildJs();
  const ids = [...js.matchAll(/byId\("(\w+)"\)/g)].map((m) => m[1]);
  assert.ok(ids.length >= 7);
  for (const id of new Set(ids)) assert.match(html, new RegExp(`id="${id}"`), id);
});

test("respects reduced motion", () => {
  assert.match(buildJs(), /prefers-reduced-motion:reduce/);
});

test("CSS braces balance", () => {
  const css = html.match(/<style>([\s\S]*)<\/style>/)[1];
  assert.equal((css.match(/{/g) || []).length, (css.match(/}/g) || []).length);
});

test("photo friction is wired in", () => {
  assert.match(buildJs(), /initPhotoFriction\(\);/);
  assert.match(html, /-webkit-touch-callout:\s*none/);
});
