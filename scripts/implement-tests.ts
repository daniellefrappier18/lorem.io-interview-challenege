#!/usr/bin/env tsx
/**
 * Test Implementation Agent
 *
 * Reads a test recommendation report from test-suggestions/ and implements
 * the actual test files. Runs a separate agent per test type to avoid
 * hitting token limits with a single large conversation.
 *
 * Usage:
 *   pnpm test:implement <path-to-component>
 *
 * Example:
 *   pnpm test:implement packages/ui/src/components/chat/ModeModal.tsx
 *
 * Prerequisite: run `pnpm test:suggest <path>` first to generate the report.
 */

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { glob } from "fs/promises";
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

// ─── Tool implementations ────────────────────────────────────────────────────

function readFile(filePath: string): string {
  const resolved = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(REPO_ROOT, filePath);

  if (!resolved.startsWith(REPO_ROOT)) {
    return `Error: path "${filePath}" is outside the repository root.`;
  }

  try {
    return fs.readFileSync(resolved, "utf-8");
  } catch {
    return `Error: could not read "${filePath}". File may not exist.`;
  }
}

function writeFile(filePath: string, content: string): string {
  const resolved = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(REPO_ROOT, filePath);

  if (!resolved.startsWith(REPO_ROOT)) {
    return `Error: path "${filePath}" is outside the repository root.`;
  }

  try {
    fs.mkdirSync(path.dirname(resolved), { recursive: true });
    fs.writeFileSync(resolved, content, "utf-8");
    return `Successfully wrote ${path.relative(REPO_ROOT, resolved)}`;
  } catch (err) {
    return `Error writing file: ${String(err)}`;
  }
}

async function globFiles(pattern: string): Promise<string> {
  try {
    const matches: string[] = [];
    for await (const f of glob(pattern, { cwd: REPO_ROOT })) {
      matches.push(f);
    }
    if (matches.length === 0) return "No files matched.";
    return matches.sort().join("\n");
  } catch (err) {
    return `Error: ${String(err)}`;
  }
}

// ─── Tool definitions ────────────────────────────────────────────────────────

const tools: Anthropic.Tool[] = [
  {
    name: "read_file",
    description: "Read the full contents of a file in the repository.",
    input_schema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "File path relative to repo root",
        },
      },
      required: ["path"],
    },
  },
  {
    name: "write_file",
    description:
      "Write content to a file in the repository. Creates the file and any missing parent directories.",
    input_schema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description:
            "File path relative to repo root, e.g. packages/ui/src/components/chat/ModeModal.test.tsx",
        },
        content: {
          type: "string",
          description: "Full file content to write",
        },
      },
      required: ["path", "content"],
    },
  },
  {
    name: "glob_files",
    description: "Find files matching a glob pattern within the repository.",
    input_schema: {
      type: "object",
      properties: {
        pattern: {
          type: "string",
          description: "Glob pattern relative to repo root",
        },
      },
      required: ["pattern"],
    },
  },
];

// ─── Shared agent loop ────────────────────────────────────────────────────────

async function runAgentLoop(
  client: Anthropic,
  systemPrompt: string,
  userMessage: string,
  label: string
): Promise<string[]> {
  const filesWritten: string[] = [];

  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: userMessage },
  ];

  let iterations = 0;
  const MAX_ITERATIONS = 12;

  while (iterations < MAX_ITERATIONS) {
    iterations++;

    const response = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 16000,
      thinking: { type: "adaptive" },
      system: systemPrompt,
      tools,
      messages,
    });

    messages.push({ role: "assistant", content: response.content });

    if (response.stop_reason === "end_turn") {
      for (const block of response.content) {
        if (block.type === "text") {
          console.log("\n" + block.text);
        }
      }
      break;
    }

    if (response.stop_reason === "tool_use") {
      const toolUseBlocks = response.content.filter(
        (b): b is Anthropic.ToolUseBlock => b.type === "tool_use"
      );

      const toolResults: Anthropic.ToolResultBlockParam[] = [];

      for (const tool of toolUseBlocks) {
        const input = tool.input as Record<string, string>;
        let result: string;

        if (tool.name === "read_file") {
          console.log(`  → read_file(${input.path})`);
          result = readFile(input.path);
        } else if (tool.name === "write_file") {
          console.log(`  ✍️  write_file(${input.path})`);
          result = writeFile(input.path, input.content);
          if (!result.startsWith("Error")) {
            filesWritten.push(input.path);
          }
        } else if (tool.name === "glob_files") {
          console.log(`  → glob_files(${input.pattern})`);
          result = await globFiles(input.pattern);
        } else {
          result = `Unknown tool: ${tool.name}`;
        }

        toolResults.push({
          type: "tool_result",
          tool_use_id: tool.id,
          content: result,
        });
      }

      messages.push({ role: "user", content: toolResults });
      continue;
    }

    console.error(`[${label}] Unexpected stop_reason: ${response.stop_reason}`);
    break;
  }

  if (iterations >= MAX_ITERATIONS) {
    console.error(`\n[${label}] Reached maximum iterations without completing.`);
  }

  return filesWritten;
}

// ─── Report parsing ───────────────────────────────────────────────────────────

function isRecommended(report: string, testType: string): boolean {
  // Look for the test type row in the Recommendation Matrix table
  // Matches lines like: | Unit Tests | ✅ Yes | ...
  const regex = new RegExp(
    `\\|\\s*${testType}\\s*\\|\\s*✅\\s*Yes`,
    "i"
  );
  return regex.test(report);
}

// ─── Per-type system prompts ─────────────────────────────────────────────────

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
- All test descriptions should reference actual prop/behavior names`;
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

// ─── Main orchestrator ───────────────────────────────────────────────────────

async function runImplementAgent() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error(
      "Error: ANTHROPIC_API_KEY environment variable is not set.\n" +
        "Set it with: export ANTHROPIC_API_KEY=sk-ant-..."
    );
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });
  const report = fs.readFileSync(reportPath, "utf-8");

  console.log(`\n🔨 Test Implementation Agent`);
  console.log(`   Component: ${relativePath}`);
  console.log(`   Report:    test-suggestions/${componentName}.md`);
  console.log("\n" + "─".repeat(60));

  const allFilesWritten: string[] = [];

  // ── Unit tests ──────────────────────────────────────────────────────────────
  if (isRecommended(report, "Unit Tests")) {
    console.log("\n📋 Running unit test agent...");
    console.log("─".repeat(60));
    const files = await runAgentLoop(
      client,
      unitTestSystemPrompt(),
      `Implement unit tests for: ${relativePath}

Read the recommendation report and component source, then write the unit test file.`,
      "unit-tests"
    );
    allFilesWritten.push(...files);
  } else {
    console.log("\n⏭️  Unit tests not recommended — skipping.");
  }

  // ── Storybook stories ───────────────────────────────────────────────────────
  if (isRecommended(report, "Storybook Tests")) {
    console.log("\n📋 Running Storybook stories agent...");
    console.log("─".repeat(60));
    const files = await runAgentLoop(
      client,
      storiesSystemPrompt(),
      `Implement Storybook stories with play() functions for: ${relativePath}

Read the recommendation report and component source, then write the stories file.`,
      "storybook"
    );
    allFilesWritten.push(...files);
  } else {
    console.log("\n⏭️  Storybook tests not recommended — skipping.");
  }

  // ── E2E tests ────────────────────────────────────────────────────────────────
  // E2E tests are only for packages/demo. If the report recommends them for a
  // ui package component, we skip (as per project conventions).
  const isDemo = relativePath.startsWith("packages/demo");
  if (isRecommended(report, "E2E Tests") && isDemo) {
    console.log("\n📋 Running E2E test agent...");
    console.log("─".repeat(60));
    const files = await runAgentLoop(
      client,
      `You are a senior testing engineer implementing Playwright E2E tests for a demo application.

Project setup:
- pnpm monorepo: \`packages/ui\` (component library) and \`packages/demo\` (demo app)
- Playwright installed at repo root for E2E tests against the demo app

The file lives at: ${relativePath}
Its directory: ${componentRelDir}

Your job:
1. Read the test recommendation report: test-suggestions/${componentName}.md
2. Read the source file: ${relativePath}
3. Read related files as needed for context
4. Write the Playwright E2E test file

## File to write
Place test file at \`e2e/${componentName}.spec.ts\`

## Code quality rules
- Use Playwright test utilities: \`test\`, \`expect\`, \`Page\`
- Write complete, runnable files — no "// TODO" placeholders
- Test descriptions should reference actual user flows and behaviors`,
      `Implement Playwright E2E tests for: ${relativePath}

Read the recommendation report and source file, then write the E2E test file.`,
      "e2e"
    );
    allFilesWritten.push(...files);
  } else if (isRecommended(report, "E2E Tests") && !isDemo) {
    console.log(
      "\n⏭️  E2E tests skipped — component is in packages/ui (not packages/demo)."
    );
  }

  // ── Summary ─────────────────────────────────────────────────────────────────
  if (allFilesWritten.length > 0) {
    console.log("\n✅ Files written:");
    for (const f of allFilesWritten) {
      console.log(`   ${f}`);
    }
  } else {
    console.log("\n⚠️  No files were written.");
  }
}

runImplementAgent().catch((err) => {
  if (err instanceof Anthropic.AuthenticationError) {
    console.error("Authentication failed. Check your ANTHROPIC_API_KEY.");
  } else if (err instanceof Anthropic.RateLimitError) {
    console.error("Rate limited. Please try again later.");
  } else if (err instanceof Anthropic.APIError) {
    console.error(`API error ${err.status}: ${err.message}`);
  } else {
    console.error("Unexpected error:", err);
  }
  process.exit(1);
});
