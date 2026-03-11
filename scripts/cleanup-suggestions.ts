#!/usr/bin/env tsx
/**
 * Test Suggestions Cleanup
 *
 * Removes generated test suggestion reports from test-suggestions/.
 *
 * Usage:
 *   pnpm test:cleanup              # remove all reports
 *   pnpm test:cleanup Chat         # remove test-suggestions/Chat.md
 *   pnpm test:cleanup Chat App     # remove multiple
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SUGGESTIONS_DIR = path.resolve(__dirname, "..", "test-suggestions");

const targets = process.argv.slice(2);

if (!fs.existsSync(SUGGESTIONS_DIR)) {
  console.log("test-suggestions/ directory does not exist. Nothing to clean.");
  process.exit(0);
}

if (targets.length === 0) {
  // Remove all reports
  const files = fs.readdirSync(SUGGESTIONS_DIR).filter((f) => f.endsWith(".md"));
  if (files.length === 0) {
    console.log("test-suggestions/ is already empty.");
    process.exit(0);
  }
  for (const file of files) {
    fs.unlinkSync(path.join(SUGGESTIONS_DIR, file));
    console.log(`  🗑  Removed test-suggestions/${file}`);
  }
  console.log(`\nRemoved ${files.length} report(s).`);
} else {
  // Remove specific reports
  let removed = 0;
  for (const target of targets) {
    const name = target.endsWith(".md") ? target : `${target}.md`;
    const filePath = path.join(SUGGESTIONS_DIR, name);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`  🗑  Removed test-suggestions/${name}`);
      removed++;
    } else {
      console.warn(`  ⚠️  Not found: test-suggestions/${name}`);
    }
  }
  console.log(`\nRemoved ${removed} report(s).`);
}
