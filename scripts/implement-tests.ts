#!/usr/bin/env tsx
/**
 * Test Implementation Agent
 *
 * Reads a test recommendation report from test-suggestions/ and implements
 * the actual test files. Runs a separate Agent SDK subagent per test type
 * in parallel so each has a small, focused context.
 *
 * Usage:
 *   pnpm test:implement <path-to-component>
 *
 * Example:
 *   pnpm test:implement packages/ui/src/components/chat/ModeModal.tsx
 *
 * Prerequisite: run `pnpm test:suggest <path>` first to generate the report.
 */

import { query } from "@anthropic-ai/claude-agent-sdk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

config({ path: path.join(REPO_ROOT, ".env"), override: true });

// ─── CLI args ────────────────────────────────────────────────────────────────

const inputPath = process.argv[2];

if (!inputPath) {
  console.error("Usage: pnpm test:implement <path-to-component>");
  console.error(
    "Example: pnpm test:implement packages/ui/src/components/chat/ModeModal.tsx"
  );
  process.exit(1);
}

const absolutePath = path.isAbsolute(inputPath)
  ? inputPath
  : path.resolve(process.cwd(), inputPath);

if (!fs.existsSync(absolutePath)) {
  console.error(`File not found: ${absolutePath}`);
  process.exit(1);
}

const relativePath = path.relative(REPO_ROOT, absolutePath);
const componentName = path.basename(absolutePath, path.extname(absolutePath));
const componentDir = path.dirname(absolutePath);
const componentRelDir = path.relative(REPO_ROOT, componentDir);
const reportPath = path.join(REPO_ROOT, "test-suggestions", `${componentName}.md`);

if (!fs.existsSync(reportPath)) {
  console.error(
    `No report found at test-suggestions/${componentName}.md\n` +
      `Run first: pnpm test:suggest ${relativePath}`
  );
  process.exit(1);
}

// ─── Report parsing ───────────────────────────────────────────────────────────

function isRecommended(report: string, testType: string): boolean {
  const regex = new RegExp(`\\|\\s*${testType}\\s*\\|\\s*✅\\s*Yes`, "i");
  return regex.test(report);
}

// ─── Subagent runner ──────────────────────────────────────────────────────────

async function runSubagent(label: string, systemPrompt: string, userPrompt: string): Promise<void> {
  console.log(`\n[${label}] Starting...`);

  for await (const message of query({
    prompt: userPrompt,
    options: {
      cwd: REPO_ROOT,
      allowedTools: ["Read", "Write", "Edit", "Glob", "Grep"],
      permissionMode: "bypassPermissions",
      allowDangerouslySkipPermissions: true,
      model: "claude-opus-4-6",
      systemPrompt,
      maxTurns: 20,
    },
  })) {
    if ("result" in message) {
      console.log(`[${label}] Done.`);
    }
  }
}

// ─── Per-type prompts ─────────────────────────────────────────────────────────

function unitTestSystemPrompt(): string {
  return `You are a senior testing engineer implementing unit tests for a React TypeScript component library.

Project setup:
- pnpm monorepo: \`packages/ui\` (component library) and \`packages/demo\` (demo app)
- TypeScript strict mode, CSS Modules
- Vitest + @testing-library/react installed in packages/ui for unit tests

The component lives at: ${relativePath}
Its directory: ${componentRelDir}

Your job:
1. Read the test recommendation report: test-suggestions/${componentName}.md
2. Read the component source: ${relativePath}
3. Read any related files you need for context (CSS, sibling components)
4. Implement the unit test file

## File to write
\`${componentRelDir}/${componentName}.test.tsx\`

Also check whether \`packages/ui/vitest.config.ts\` exists; if not, write one that:
- Uses @vitejs/plugin-react
- Maps CSS Module imports to an identity proxy
- Sets up jsdom environment and @testing-library/jest-dom

## Code quality rules
- Use: vitest, @testing-library/react, @testing-library/user-event, @testing-library/jest-dom
- Use \`vi.fn()\` for mock callbacks
- Write complete, runnable files — no "// TODO" placeholders
- Import paths must be correct relative to the file being written
- All test descriptions should reference actual prop/behavior names

## jest-dom matchers (REQUIRED)
To enable matchers like \`toBeInTheDocument\`, \`toBeVisible\`, etc., you MUST do one of:

**Option A — import in the test file itself (simplest):**
\`\`\`ts
import '@testing-library/jest-dom';
\`\`\`

**Option B — vitest.config.ts setupFiles:**
\`\`\`ts
// vitest.config.ts
export default defineConfig({
  test: {
    setupFiles: ['./src/test-setup.ts'],
  },
});
// src/test-setup.ts
import '@testing-library/jest-dom';
\`\`\`

Without one of these, TypeScript will error: "Property 'toBeInTheDocument' does not exist on type 'Assertion<HTMLElement>'".
Prefer Option A (import directly in the test file) unless a setupFiles is already configured.`;
}

function storiesSystemPrompt(): string {
  return `You are a senior testing engineer implementing Storybook stories for a React TypeScript component library.

Project setup:
- pnpm monorepo: \`packages/ui\` (component library) and \`packages/demo\` (demo app)
- Storybook 9 with @storybook/addon-a11y already installed
- TypeScript strict mode, CSS Modules

The component lives at: ${relativePath}
Its directory: ${componentRelDir}

Your job:
1. Read the test recommendation report: test-suggestions/${componentName}.md
2. Read the component source: ${relativePath}
3. Check if \`${componentRelDir}/${componentName}.stories.tsx\` already exists and read it if so
4. Read any related files you need for context (CSS, sibling components)
5. Write (or update) the stories file with play() functions

## File to write
\`${componentRelDir}/${componentName}.stories.tsx\`

## Code quality rules
- Use Storybook 9 CSF3 format with \`Meta\` and \`StoryObj\` types from \`@storybook/react\`
- Use \`@storybook/test\` (bundled with Storybook 9) for \`within\`, \`userEvent\`, \`expect\`
- Each story should have a \`play\` function with real assertions
- Export a valid \`default\` Meta object and named story exports
- Write complete, runnable files — no "// TODO" placeholders
- Import paths must be correct relative to the file being written`;
}

function e2eSystemPrompt(): string {
  return `You are a senior testing engineer implementing Playwright E2E tests for a demo application.

Project setup:
- pnpm monorepo: \`packages/ui\` (component library) and \`packages/demo\` (demo app)
- Playwright installed at repo root for E2E tests against the demo app (baseURL: http://localhost:5173)

The file lives at: ${relativePath}
Its directory: ${componentRelDir}

Your job:
1. Read the test recommendation report: test-suggestions/${componentName}.md
2. Read the source file: ${relativePath}
3. Read related files as needed for context (CSS, child components, component library source)
4. Write the Playwright E2E test file

## File to write
\`e2e/${componentName}.spec.ts\`

## Code quality rules
- Use Playwright test utilities: \`test\`, \`expect\`, \`type Page\`
- Write complete, runnable files — no "// TODO" placeholders
- Test descriptions should reference actual user flows and behaviors
- Always add \`test.use({ baseURL: 'http://localhost:5173' });\` at the top (the default playwright.config.ts points at Storybook on 6006, not the demo app)

## CRITICAL: Common Playwright gotchas in this codebase

### Visually hidden native inputs (radio buttons, checkboxes)
The \`RadioButton\` component renders the native \`<input type="radio">\` with \`position: absolute; opacity: 0\`.
\`getByLabel('Label text').check()\` will fail — the input is invisible and may be outside the viewport.
**Always click the visible \`<label>\` wrapper instead:**
\`\`\`ts
// ❌ Wrong — input is hidden
await page.getByLabel('Aperture Science').check();

// ✅ Correct — click the visible label
await page.locator('label').filter({ hasText: 'Aperture Science' }).click();
await expect(page.getByLabel('Aperture Science')).toBeChecked(); // assertion still works
\`\`\`

### Custom placeholder divs
Some components (e.g. \`Chat\`) render the placeholder as a \`<div>{placeholder}</div>\`, NOT as a native \`placeholder\` attribute on a textarea/input.
\`getByPlaceholder()\` will find nothing.
**Use \`getByText()\` instead:**
\`\`\`ts
// ❌ Wrong
await expect(page.getByPlaceholder('Ask me anything…')).toBeVisible();

// ✅ Correct
await expect(page.getByText('Ask me anything…')).toBeVisible();
\`\`\`
Always read the component source to check whether placeholder is a native attribute or a rendered div.

### Uncontrolled textarea / ref-based components
The \`Chat\` textarea is uncontrolled — it reads and clears its value via \`ref.current.value\`.
Playwright's \`fill()\` sets the DOM value but bypasses React's synthetic events, so \`ref.current.value\` stays empty and clear-on-send won't work.
**Use \`page.keyboard.type()\` after clicking the element to fire real input events:**
\`\`\`ts
// ❌ Wrong — fill() bypasses React events, ref.current.value stays empty
await chatTextarea.fill('Hello');
await chatTextarea.press('Enter'); // nothing clears

// ✅ Correct — keyboard.type() fires real input events
await chatTextarea.click();
await page.keyboard.type('Hello');
await page.locator('[aria-label="Send message"]').click();
await expect(chatTextarea).toHaveValue('');
\`\`\`

### Unicode vs ASCII punctuation
Always match the exact characters used in the source. The demo app uses Unicode ellipsis \`…\` (U+2026), not three ASCII dots \`...\`.
Check the source file before writing any string assertions.`;
}

// ─── Main orchestrator ───────────────────────────────────────────────────────

async function runImplementAgent() {
  const report = fs.readFileSync(reportPath, "utf-8");

  console.log(`\n🔨 Test Implementation Agent`);
  console.log(`   Component: ${relativePath}`);
  console.log(`   Report:    test-suggestions/${componentName}.md`);
  console.log("\n" + "─".repeat(60));

  const tasks: Promise<void>[] = [];
  const isDemo = relativePath.startsWith("packages/demo");

  // Unit tests and Storybook stories are only for packages/ui components.
  // Demo app files are tested via E2E only.
  if (isDemo) {
    console.log("⏭️  Unit tests and Storybook skipped — demo app files use E2E only.");
  } else {
    if (isRecommended(report, "Unit Tests")) {
      tasks.push(
        runSubagent(
          "unit-tests",
          unitTestSystemPrompt(),
          `Implement unit tests for: ${relativePath}

Read the recommendation report (test-suggestions/${componentName}.md) and component source, then write the unit test file.`
        )
      );
    } else {
      console.log("⏭️  Unit tests not recommended — skipping.");
    }

    if (isRecommended(report, "Storybook Tests")) {
      tasks.push(
        runSubagent(
          "storybook",
          storiesSystemPrompt(),
          `Implement Storybook stories with play() functions for: ${relativePath}

Read the recommendation report (test-suggestions/${componentName}.md) and component source, then write the stories file.`
        )
      );
    } else {
      console.log("⏭️  Storybook tests not recommended — skipping.");
    }
  }
  if (isRecommended(report, "E2E Tests") && isDemo) {
    tasks.push(
      runSubagent(
        "e2e",
        e2eSystemPrompt(),
        `Implement Playwright E2E tests for: ${relativePath}

Read the recommendation report (test-suggestions/${componentName}.md) and source file, then write the E2E test file.`
      )
    );
  } else if (isRecommended(report, "E2E Tests") && !isDemo) {
    console.log("⏭️  E2E tests skipped — component is in packages/ui (not packages/demo).");
  }

  if (tasks.length === 0) {
    console.log("\n⚠️  No test types recommended. Nothing to implement.");
    return;
  }

  console.log(`\n🚀 Running ${tasks.length} subagent(s) in parallel...`);
  await Promise.all(tasks);
  console.log("\n✅ All agents complete.");
}

runImplementAgent().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
