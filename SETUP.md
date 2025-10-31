# Project Setup Guide

This guide helps you set up the project correctly and avoid common issues.

## Quick Start

```bash
npm run setup
```

This single command will:
1. Install all dependencies with the correct settings
2. Start the development server

## Manual Setup

If you prefer manual setup:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Common Issues & Solutions

### 1. Dependency Conflicts

**Issue**: `ERESOLVE could not resolve` errors during installation

**Solution**: The project uses `.npmrc` file that automatically handles this. If you encounter issues:
```bash
npm install --legacy-peer-deps
```

### 2. Git Repository Corruption

**Issue**: `fatal: bad object refs/remotes/origin/main` or similar git errors

**Solution**:
```bash
# Check for corrupted references
ls -la .git/refs/remotes/origin/

# Remove corrupted files (files with spaces or numbers)
rm -f .git/refs/remotes/origin/*\ *

# Re-fetch from origin
git fetch origin
```

**Prevention**:
- Always commit and push changes regularly
- Don't interrupt git operations
- Keep backups of your work

### 3. Missing node_modules

**Issue**: `command not found` errors when running npm scripts

**Solution**: Install dependencies first:
```bash
npm install --legacy-peer-deps
```

### 4. Port Already in Use

**Issue**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**: Kill the process using port 3000:
```bash
# Find process ID
lsof -ti:3000

# Kill the process
kill -9 $(lsof -ti:3000)

# Or use killall
killall node
```

## Dependency Information

### Key Dependencies

- **Next.js**: 15.2.4
- **React**: 19
- **date-fns**: 4.1.0
- **react-day-picker**: ^9.4.3 (compatible with date-fns 4.x)

### Why .npmrc?

The project uses `legacy-peer-deps=true` in `.npmrc` to handle peer dependency conflicts automatically. This is necessary because some packages haven't updated their peer dependency ranges yet.

## Git Best Practices

1. **Before making changes**:
   ```bash
   git pull origin main
   ```

2. **After making changes**:
   ```bash
   git add .
   git commit -m "Your message"
   git push origin main
   ```

3. **If you encounter issues**:
   - Check git status: `git status`
   - Verify remote: `git remote -v`
   - Check for corruption: `git fsck --full`

## Backup & Recovery

### Creating a Backup

```bash
cd ..
cp -r thetutorbridge thetutorbridge_backup_$(date +%Y%m%d_%H%M%S)
```

### Recovering from a Fresh Clone

If you need to start fresh while preserving your changes:

```bash
# 1. Rename current directory
mv thetutorbridge thetutorbridge_old

# 2. Clone fresh copy
git clone https://github.com/thetutorbridge/thetutorbridge.git

# 3. Install dependencies
cd thetutorbridge
npm run setup

# 4. Copy your changes from thetutorbridge_old if needed
```

## Environment Variables

Make sure you have the necessary `.env.local` file with:
- Supabase credentials
- API keys
- Other configuration

(Never commit `.env` files - they're in `.gitignore`)

## Getting Help

If you encounter issues not covered here:
1. Check the error message carefully
2. Search for the error online
3. Check the project's GitHub issues
4. Ask for help with specific error messages

## Maintenance Scripts

The project includes several utility scripts in `package.json`:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linter
- `npm run setup` - Complete setup (install + dev)
