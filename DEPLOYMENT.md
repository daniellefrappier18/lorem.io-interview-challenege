# GitHub Pages Deployment Setup

This repository is configured to automatically deploy to GitHub Pages using GitHub Actions.

## 🚀 Automatic Deployment

The deployment happens automatically when you:

- Push to the `main` branch
- Create a pull request to `main` (build only, no deployment)
- Manually trigger the workflow

## 📋 Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select "**GitHub Actions**"
5. Save the settings

### 2. Repository Structure

After deployment, your site will have:

- **Main page**: Project overview with links to demo and storybook
- **Demo app**: `/demo/` - Interactive React application
- **Storybook**: `/storybook/` - Component library documentation

### 3. Workflow Details

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will:

1. **Install dependencies** using pnpm
2. **Run linting** to ensure code quality
3. **Build the UI package** (TypeScript compilation)
4. **Build Storybook** for component documentation
5. **Build the demo app** with proper base path
6. **Create a landing page** linking to both applications
7. **Deploy to GitHub Pages** (only on main branch)

### 4. Local Development

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev:all          # Start both UI (Storybook) and demo
pnpm dev:ui           # Start Storybook only
pnpm dev:demo         # Start demo app only

# Build for production
pnpm build            # Build everything
pnpm build:ui         # Build UI package only
pnpm build:demo       # Build demo app only
pnpm build:storybook  # Build Storybook only

# Linting and formatting
pnpm lint:all         # Lint all packages
pnpm format:all       # Format all packages
```

### 5. Accessing Your Deployed Site

Once deployed, your site will be available at:

```
https://[your-username].github.io/lorem.io-interview-challenege/
```

- Demo App: `https://[your-username].github.io/lorem.io-interview-challenege/demo/`
- Storybook: `https://[your-username].github.io/lorem.io-interview-challenege/storybook/`

### 6. Troubleshooting

**Build fails?**

- Check that all dependencies are properly installed
- Ensure TypeScript compiles without errors locally
- Verify that linting passes: `pnpm lint:all`

**Demo app shows blank page?**

- Check browser console for errors
- Verify the base path is correctly set in `packages/demo/vite.config.ts`

**Storybook not loading?**

- Ensure all stories are properly exported
- Check that Storybook builds locally: `cd packages/ui && pnpm build-storybook`

## 🔧 Customization

You can customize the deployment by modifying:

- `.github/workflows/deploy.yml` - Workflow configuration
- `packages/demo/vite.config.ts` - Demo app build settings
- Root `package.json` - Build scripts and dependencies

## 📱 Features Deployed

- **Chat Component**: Interactive chat interface with mode selection
- **Component Library**: Full Storybook documentation
- **Responsive Design**: Mobile-friendly interface
- **Accessibility**: ARIA labels, focus management, keyboard navigation
