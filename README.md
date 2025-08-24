# lorem.io Interview Challenge

A monorepo containing a React demo application and a shared UI component library built with TypeScript, Vite, and Storybook.

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`

- **pnpm** (recommended package manager for monorepos)
  - Install globally: `npm install -g pnpm`
  - Verify installation: `pnpm --version`

## Project Structure

```
lorem.io-interview-challenge/
├── packages/
│   ├── demo/          # React demo application
│   └── ui/            # Shared UI component library
├── package.json       # Root package.json with workspace configuration
└── README.md         # This file
```

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd lorem.io-interview-challenge
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```
   This will install dependencies for all packages in the monorepo.

## Available Scripts

### Development

- **Run both demo and Storybook simultaneously**

  ```bash
  pnpm dev:all
  ```

  Starts both the demo application at `http://localhost:5173` and Storybook at `http://localhost:6006`

- **Run the demo application**

  ```bash
  pnpm dev
  ```

  Starts the demo application at `http://localhost:5173`

- **Run Storybook**
  ```bash
  pnpm storybook
  ```
  Starts Storybook at `http://localhost:6006` to view and test UI components

### Building

- **Build all packages**

  ```bash
  pnpm build
  ```

- **Build specific package**
  ```bash
  pnpm --filter demo build
  pnpm --filter ui build
  ```

### Other Commands

- **Run tests**

  ```bash
  pnpm test
  ```

- **Type checking**

  ```bash
  pnpm type-check
  ```

- **Linting**
  ```bash
  pnpm lint
  ```

## Packages

### Demo (`packages/demo`)

A React application showcasing the UI components with a contact form and responsive grid layout.

### UI (`packages/ui`)

A shared component library containing reusable UI components like Button, Input, Grid, etc. Components are documented in Storybook with interactive examples and accessibility guidelines.

## Technologies Used

- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Storybook** - Component documentation and testing
- **CSS Modules** - Scoped styling
- **pnpm** - Package manager with workspace support

## Development Workflow

1. Start both the demo app and Storybook with a single command:

   ```bash
   pnpm dev:all
   ```

   Or start them separately:

   ```bash
   # Terminal 1
   pnpm dev

   # Terminal 2
   pnpm storybook
   ```

2. Make changes to components in the `ui` package
3. See changes reflected in both Storybook and the demo app
4. Use Storybook for component development and testing
5. Use the demo app to see components in a real application context

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Test in both Storybook and the demo app
4. Ensure all tests pass with `pnpm test`
5. Submit a pull request

## Troubleshooting

- **Port conflicts**: If ports 5173 or 6006 are in use, the dev servers will automatically use alternative ports
- **Installation issues**: Try deleting `node_modules` and `pnpm-lock.yaml`, then run `pnpm install` again
- **TypeScript errors**: Run `pnpm type-check` to see detailed type errors
