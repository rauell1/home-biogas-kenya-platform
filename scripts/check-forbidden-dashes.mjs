import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import process from "node:process";

const excludedDirectories = new Set([
  ".agents",
  ".git",
  ".next",
  "graphify-out",
  "node_modules",
  "public",
]);

const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mjs",
  ".sql",
  ".ts",
  ".tsx",
  ".txt",
]);

const forbiddenDash = /[\u2013\u2014]/g;
const violations = [];

async function inspect(path) {
  for (const entry of await readdir(path, { withFileTypes: true })) {
    if (entry.isDirectory() && excludedDirectories.has(entry.name)) continue;

    const entryPath = join(path, entry.name);
    if (entry.isDirectory()) {
      await inspect(entryPath);
      continue;
    }

    if (!textExtensions.has(extname(entry.name))) continue;

    const content = await readFile(entryPath, "utf8");
    for (const match of content.matchAll(forbiddenDash)) {
      const before = content.slice(0, match.index);
      const line = before.split("\n").length;
      const column = match.index - before.lastIndexOf("\n");
      violations.push(`${relative(process.cwd(), entryPath)}:${line}:${column}`);
    }
  }
}

await inspect(process.cwd());

if (violations.length > 0) {
  console.error("Forbidden en dash or em dash found:");
  for (const violation of violations) console.error(`  ${violation}`);
  console.error("Use a comma, colon, parentheses, or an ordinary hyphen instead.");
  process.exit(1);
}

console.log("Punctuation check passed: no en dashes or em dashes.");
