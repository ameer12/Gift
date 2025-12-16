# Monorepo Setup Complete ✅

## Structure Changed

**Before:**
```
├── frontend/
│   ├── package.json
│   └── node_modules/
├── backend/
│   ├── package.json
│   └── node_modules/
└── package.json
```

**After (Monorepo):**
```
├── frontend/
├── backend/
├── package.json (consolidated)
└── node_modules/ (single, shared)
```

## What Changed

1. ✅ **Merged all dependencies** into root `package.json`
2. ✅ **Deleted** `frontend/package.json`
3. ✅ **Deleted** `backend/package.json`
4. ✅ **Updated** scripts to run from root
5. ✅ **Updated** vite.config.js for root execution
6. ✅ **Updated** .gitignore

## Installation

```bash
# Remove old node_modules (if they exist)
rm -rf frontend/node_modules backend/node_modules

# Install all dependencies from root
npm install
```

## Available Scripts

Run everything from the **root folder**:

```bash
# Development (runs both frontend & backend)
npm run dev

# Frontend only
npm run dev:frontend

# Backend only
npm run dev:backend

# Build frontend
npm run build

# Preview frontend build
npm run preview

# Start backend (production)
npm start

# Seed database
npm run seed

# Seed large database (215 items)
npm run seed:large
```

## Benefits

✅ **Single node_modules** - Saves disk space
✅ **Faster installs** - No duplicate dependencies
✅ **Easier management** - One package.json to maintain
✅ **Simpler CI/CD** - Single install command
✅ **Better dependency resolution** - No version conflicts

## Important Notes

- All commands run from **root directory**
- Frontend runs on `http://127.0.0.1:3000`
- Backend runs on `http://localhost:5000`
- No need to `cd` into frontend/backend anymore
- Vite config updated to work from root

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp backend/.env.example backend/.env

# 3. Seed database
npm run seed:large

# 4. Start development
npm run dev
```

That's it! 🚀
