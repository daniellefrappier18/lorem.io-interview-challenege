#!/usr/bin/env tsx
/**
 * Test Implementation Agent
 *
 * Reads a test recommendation report from test-suggestions/ and implements
 * the actual test files: unit tests, Storybook stories with play(), and E2E tests.
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
      "Write content to a file in the repository. Creates the file and any missing parent directories. Use this to create test files.",
    input_schema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "File path relative to repo root, e.g. packages/ui/src/components/chat/ModeModal.test.tsx",
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

// ─── System prompt ───────────────────────────────────────────────────────────

const componentRelDir = path.relative(REPO_ROOT, componentDir);

const SYSTEM_PROMPT = `You are a senior testing engineer implementing tests for a React TypeScript component library.

Project setup:
- pnpm monorepo: \`packages/ui\` (component library) and \`packages/demo\` (demo app)
- Storybook 9 with @storybook/addon-a11y already installed
- TypeScript strict mode, CSS Modules
- Vitest + @testing-library/react installed in packages/ui for unit tests
- Playwright installed at root for E2E tests against the demo app only

The component lives at: ${relativePath}
Its directory: ${componentRelDir}

Your job:
1. Read the test recommendation report and the component source file
2. Read any existing related files (stories, CSS, sibling components) for context
3. Implement ALL recommended test files with real, working code
4. Write each file using the write_file tool

## File placement conventions

**Unit tests** → \`${componentRelDir}/${componentName}.test.tsx\`
  - Also write \`packages/ui/vitest.config.ts\` if it doesn't exist
  - Use: vitest, @testing-library/react, @testing-library/user-event, @testing-library/jest-dom
  - Import CSS modules via identity proxy (configure in vitest.config.ts)
  - Use \`vi.fn()\` for mock callbacks

**Storybook stories** → \`${componentRelDir}/${componentName}.stories.tsx\`
  - If this file already exists, READ it first, then update it with play() functions
  - Use Storybook 9 CSF3 format with \`Meta\` and \`StoryObj\` types from \`@storybook/react\`
  - Use \`@storybook/test\` (bundled with Storybook 9) for \`within\`, \`userEvent\`, \`expect\`
  - Each story should have a \`play\` function with real assertions

**E2E tests** — ONLY if the component is in \`packages/demo\` (the application).
  Never write E2E tests for \`packages/ui\` components. Component-level interaction
  testing is handled by Storybook play() functions above. If the report recommends
  E2E tests for a ui component, skip them.

## Code quality rules
- Write complete, runnable files — no "// TODO" placeholders
- Import paths must be correct relative to the file being written
- CSS Module imports in tests should use \`vi.mock\` or vitest config moduleNameMapper
- All test descriptions should be specific and reference actual prop/behavior names
- Storybook stories must export a valid \`default\` Meta object and named story exports`;

// ─── Agent loop ──────────────────────────────────────────────────────────────

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

  console.log(`\n🔨 Test Implementation Agent`);
  console.log(`   Component: ${relativePath}`);
  console.log(`   Report:    test-suggestions/${componentName}.md`);
  console.log("\n" + "─".repeat(60));

  const filesWritten: string[] = [];

  const messages: Anthropic.MessageParam[] = [
    {
      role: "user",
      content: `Implement the tests for: ${relativePath}

Start by reading:
1. The recommendation report: test-suggestions/${componentName}.md
2. The component source: ${relativePath}
3. Any related files (existing stories, sibling components, CSS)

Then implement ALL recommended test types by writing the actual test files.`,
    },
  ];

  let iterations = 0;
  const MAX_ITERATIONS = 20;

  while (iterations < MAX_ITERATIONS) {
    iterations++;

    const response = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 16000,
      thinking: { type: "adaptive" },
      system: SYSTEM_PROMPT,
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

    console.error(`Unexpected stop_reason: ${response.stop_reason}`);
    break;
  }

  if (filesWritten.length > 0) {
    console.log("\n✅ Files written:");
    for (const f of filesWritten) {
      console.log(`   ${f}`);
    }
  }

  if (iterations >= MAX_ITERATIONS) {
    console.error("\nReached maximum iterations without completing.");
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
