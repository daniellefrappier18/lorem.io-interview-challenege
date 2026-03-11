#!/usr/bin/env tsx
/**
 * Testing Agent
 *
 * Analyzes a source file and recommends which test types are needed:
 *   - Unit tests
 *   - Storybook interaction tests
 *   - E2E tests
 *   - Accessibility tests
 *
 * Usage:
 *   pnpm test:suggest <path-to-file>
 *
 * Example:
 *   pnpm test:suggest packages/ui/src/components/chat/ModeModal.tsx
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
  console.error("Usage: pnpm test:suggest <path-to-file>");
  console.error(
    "Example: pnpm test:suggest packages/ui/src/components/chat/ModeModal.tsx"
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

// ─── Tool implementations ────────────────────────────────────────────────────

function readFile(filePath: string): string {
  const resolved = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(REPO_ROOT, filePath);

  // Safety: must be inside the repo
  if (!resolved.startsWith(REPO_ROOT)) {
    return `Error: path "${filePath}" is outside the repository root.`;
  }

  try {
    return fs.readFileSync(resolved, "utf-8");
  } catch {
    return `Error: could not read "${filePath}". File may not exist.`;
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

async function grepFiles(pattern: string, directory: string): Promise<string> {
  const searchDir = path.resolve(REPO_ROOT, directory);
  if (!searchDir.startsWith(REPO_ROOT)) {
    return `Error: directory "${directory}" is outside the repository root.`;
  }

  const results: string[] = [];

  function walk(dir: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile() && /\.(ts|tsx|js|jsx)$/.test(entry.name)) {
        try {
          const content = fs.readFileSync(full, "utf-8");
          const regex = new RegExp(pattern, "gm");
          const lines = content.split("\n");
          lines.forEach((line, i) => {
            if (regex.test(line)) {
              const rel = path.relative(REPO_ROOT, full);
              results.push(`${rel}:${i + 1}: ${line.trim()}`);
            }
          });
        } catch {
          // skip unreadable files
        }
      }
    }
  }

  walk(searchDir);
  if (results.length === 0) return "No matches found.";
  return results.slice(0, 60).join("\n");
}

// ─── Tool definitions ────────────────────────────────────────────────────────

const tools: Anthropic.Tool[] = [
  {
    name: "read_file",
    description:
      "Read the full contents of a file in the repository. Paths are relative to the repo root or absolute.",
    input_schema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "File path relative to repo root, e.g. packages/ui/src/components/chat/ModeModal.tsx",
        },
      },
      required: ["path"],
    },
  },
  {
    name: "glob_files",
    description:
      "Find files matching a glob pattern within the repository. Returns a newline-separated list of matching paths.",
    input_schema: {
      type: "object",
      properties: {
        pattern: {
          type: "string",
          description: "Glob pattern relative to repo root, e.g. packages/ui/src/components/chat/*.tsx",
        },
      },
      required: ["pattern"],
    },
  },
  {
    name: "grep_files",
    description:
      "Search for a regex pattern across source files in a directory. Returns matching lines with file:line context.",
    input_schema: {
      type: "object",
      properties: {
        pattern: {
          type: "string",
          description: "JavaScript regex pattern to search for",
        },
        directory: {
          type: "string",
          description: "Directory to search in, relative to repo root, e.g. packages/ui/src",
        },
      },
      required: ["pattern", "directory"],
    },
  },
];

// ─── System prompt ───────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are a senior testing engineer specializing in React component libraries.

You are analyzing a TypeScript/React monorepo with the following setup:
- pnpm workspaces with two packages: \`ui\` (component library) and \`demo\` (demo app)
- Storybook 9 with @storybook/addon-a11y for accessibility checks and @storybook/testing-library for interaction tests
- No unit test framework is installed yet (Vitest + @testing-library/react would need to be added)
- No E2E test framework is installed yet (Playwright would need to be added)
- Components use CSS Modules and TypeScript with strict mode

Your job is to:
1. Read the target file and any related files (imports, sibling components, existing stories, parent consumers)
2. Analyze the code thoroughly
3. Output a structured test recommendation report

For each of the four test types, determine if it is recommended and why:

**Unit Tests** (Vitest + @testing-library/react)
Recommend when: custom hooks, pure utility logic, non-trivial state management, complex event handlers, multiple prop permutations, business logic that doesn't depend on visual rendering

**Storybook Tests** (play() functions using @storybook/testing-library)
Recommend when: UI component with distinct visual states/variants, keyboard interactions, user event sequences, composable components, hover/focus states

**E2E Tests** (Playwright)
ONLY recommend for files in \`packages/demo\` (the application). Never recommend E2E tests for files in \`packages/ui\` (the component library) — isolated components are not real application pages and cannot be meaningfully E2E tested outside of Storybook, which is already covered by Storybook Tests above.
Recommend for demo files when: complete user flows spanning multiple components, form submission end-to-end, navigation between views, real browser-only behaviors (scroll, media queries), critical user journeys

**Accessibility Tests** (axe-core via @storybook/addon-a11y + manual a11y assertions in stories)
Recommend when: ARIA roles/attributes/labels, focus trapping, keyboard navigation, modals/dialogs/overlays, form elements, screen reader announcements, color contrast, visible focus indicators

Format your final report as clean Markdown:

## Test Recommendation: [ComponentName]

### Summary
One paragraph describing what the component does and its testing surface.

### Recommendation Matrix

| Test Type | Recommended | Priority | Rationale |
|---|---|---|---|
| Unit Tests | ✅ Yes / ❌ No | High / Medium / Low / N/A | ... |
| Storybook Tests | ✅ Yes / ❌ No | High / Medium / Low / N/A | ... |
| E2E Tests | ✅ Yes / ❌ No | High / Medium / Low / N/A | ... |
| Accessibility Tests | ✅ Yes / ❌ No | High / Medium / Low / N/A | ... |

### [For each RECOMMENDED type] Test Cases

List 3–6 specific, concrete test cases referencing actual prop names, state variables, and behaviors in the code.

### Setup Required

List only what needs to be installed (with exact pnpm add commands), or "No additional setup needed" if everything is in place.

Be specific and practical. Reference actual prop names, method names, and behaviors from the code.`;

// ─── Save report ─────────────────────────────────────────────────────────────

function saveReport(content: string) {
  const outputDir = path.join(REPO_ROOT, "test-suggestions");
  fs.mkdirSync(outputDir, { recursive: true });

  const componentName = path.basename(absolutePath, path.extname(absolutePath));
  const date = new Date().toISOString().split("T")[0];
  const outputPath = path.join(outputDir, `${componentName}.md`);

  const header = `> Generated by testing-agent on ${date}\n> File analyzed: \`${relativePath}\`\n\n`;
  fs.writeFileSync(outputPath, header + content, "utf-8");

  console.log(`\n📄 Report saved to: test-suggestions/${componentName}.md`);
}

// ─── Agent loop ──────────────────────────────────────────────────────────────

async function runTestingAgent() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error(
      "Error: ANTHROPIC_API_KEY environment variable is not set.\n" +
        "Set it with: export ANTHROPIC_API_KEY=sk-ant-..."
    );
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });

  console.log(`\n🔍 Testing Agent analyzing: ${relativePath}\n`);
  console.log("─".repeat(60));

  const messages: Anthropic.MessageParam[] = [
    {
      role: "user",
      content: `Analyze the file at: ${relativePath}

Read the file and any closely related files (components it imports, existing story files, parent components that use it) to understand the full context. Then produce a detailed test recommendation report for: ${path.basename(absolutePath)}`,
    },
  ];

  let iterations = 0;
  const MAX_ITERATIONS = 15;

  while (iterations < MAX_ITERATIONS) {
    iterations++;

    const response = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 8192,
      thinking: { type: "adaptive" },
      system: SYSTEM_PROMPT,
      tools,
      messages,
    });

    // Append assistant response to history
    messages.push({ role: "assistant", content: response.content });

    if (response.stop_reason === "end_turn") {
      // Print and save the final text response
      for (const block of response.content) {
        if (block.type === "text") {
          console.log("\n" + block.text);
          saveReport(block.text);
        }
      }
      break;
    }

    if (response.stop_reason === "tool_use") {
      const toolUseBlocks = response.content.filter(
        (b): b is Anthropic.ToolUseBlock => b.type === "tool_use"
      );

      // Show progress
      for (const tool of toolUseBlocks) {
        const input = tool.input as Record<string, string>;
        const detail = input.path ?? input.pattern ?? `${input.pattern} in ${input.directory}`;
        console.log(`  → ${tool.name}(${detail})`);
      }

      // Execute tools
      const toolResults: Anthropic.ToolResultBlockParam[] = [];
      for (const tool of toolUseBlocks) {
        let result: string;
        const input = tool.input as Record<string, string>;

        if (tool.name === "read_file") {
          result = readFile(input.path);
        } else if (tool.name === "glob_files") {
          result = await globFiles(input.pattern);
        } else if (tool.name === "grep_files") {
          result = await grepFiles(input.pattern, input.directory);
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

    // Unexpected stop reason
    console.error(`Unexpected stop_reason: ${response.stop_reason}`);
    break;
  }

  if (iterations >= MAX_ITERATIONS) {
    console.error("\nReached maximum iterations without completing.");
  }
}

runTestingAgent().catch((err) => {
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
