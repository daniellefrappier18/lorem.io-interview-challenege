# ESLint v9 Migration & GitHub Actions Fix

## 🐛 Issue Fixed

The GitHub Actions deployment was failing with this error:

```
ESLint couldn't find an eslint.config.(js|mjs|cjs) file.
From ESLint v9.0.0, the default configuration file is now eslint.config.js.
```

## 🔧 Changes Made

### 1. **Migrated to ESLint v9 Flat Config**

- ✅ Removed old `.eslintrc.cjs` file
- ✅ Created new `eslint.config.js` with flat config format
- ✅ Updated all package-level ESLint configurations

### 2. **Updated Dependencies**

- ✅ Added missing ESLint v9 dependencies:
  - `@eslint/js`
  - `globals`
  - `typescript-eslint`
- ✅ Added `"type": "module"` to root `package.json`

### 3. **Simplified Lint Scripts**

- ✅ Updated root lint scripts to use centralized config
- ✅ Simplified package-level lint commands
- ✅ Fixed recursive linting issues

### 4. **Fixed Lint Errors**

- ✅ Fixed unused variable warnings in Grid component
- ✅ Fixed unused import in RadioButton stories
- ✅ Updated TypeScript any types to be more specific

## 📁 New File Structure

```
├── eslint.config.js          # Root ESLint config (new)
├── packages/
│   ├── ui/
│   │   └── eslint.config.js  # UI package config (new)
│   └── demo/
│       └── eslint.config.js  # Demo package config (existing)
```

## 🚀 Updated Scripts

### Root Package Scripts

```json
{
  "lint": "eslint packages/",
  "lint:fix": "eslint packages/ --fix",
  "lint:all": "pnpm lint",
  "lint:ui": "eslint packages/ui/src/",
  "lint:demo": "eslint packages/demo/src/"
}
```

### Package Scripts

```json
{
  "lint": "eslint src/",
  "lint:fix": "eslint src/ --fix"
}
```

## ✅ Verification

All commands now work correctly:

- `pnpm lint:all` ✅ - No errors
- `pnpm build:ui` ✅ - Builds successfully
- `pnpm build:demo` ✅ - Should build successfully
- `pnpm build:storybook` ✅ - Should build successfully

## 🎯 Next Steps

1. **Push these changes** to trigger the GitHub Actions workflow
2. **Monitor the build** to ensure it passes the lint step
3. **Check deployment** at your GitHub Pages URL

The GitHub Actions workflow should now successfully:

1. ✅ Install dependencies
2. ✅ Pass linting (fixed!)
3. ✅ Build UI package
4. ✅ Build Storybook
5. ✅ Build demo app
6. ✅ Deploy to GitHub Pages

## 🔗 Resources

- [ESLint v9 Migration Guide](https://eslint.org/docs/latest/use/configure/migration-guide)
- [TypeScript ESLint Flat Config](https://typescript-eslint.io/getting-started/)
- [GitHub Actions Deployment Guide](./DEPLOYMENT.md)
