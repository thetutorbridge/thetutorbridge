# MCP Setup Guide for TheTutorBridge

This guide will help you recreate the MCP (Model Context Protocol) configuration after cloning this repository.

## Prerequisites

- Clone the repository from GitHub
- Install dependencies: `npm install --legacy-peer-deps`
- Have your Supabase project reference ready

## Step 1: Create .mcp.json File

In the root directory of the project, create a file named `.mcp.json` with the following content:

```json
{
  "mcpServers": {
    "supabase-thetutorbridge": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp?project_ref=zkphbzcomixukygigpka"
    }
  }
}
```

## Step 2: Verify Your Supabase Project Reference

The `project_ref` in the URL above is `zkphbzcomixukygigpka`. This connects to your Supabase project.

If you need to change the project reference:
1. Go to your Supabase dashboard
2. Find your project reference (usually in the project settings or URL)
3. Replace `zkphbzcomixukygigpka` in the `.mcp.json` file with your project reference

## Step 3: Environment Variables

Make sure you also have your `.env.local` file configured with:
- Supabase URL
- Supabase anon key
- Any other API keys required by the project

## Step 4: Test the Setup

After creating the `.mcp.json` file and setting up environment variables:

```bash
npm run dev
```

The MCP server will now be available for Claude Code to use when working with your Supabase database.

## What is MCP?

MCP (Model Context Protocol) allows Claude Code to:
- Query your Supabase database directly
- List tables and schemas
- Execute SQL queries
- Apply migrations
- Get logs and advisors
- Manage Edge Functions
- Work with development branches

## Notes

- `.mcp.json` should NOT be committed to GitHub (it's in .gitignore or should be)
- Each developer on the team needs to create their own `.mcp.json` file
- The project reference should match your Supabase project

## Quick Setup Command

You can also create the file quickly with this command:

```bash
cat > .mcp.json << 'EOF'
{
  "mcpServers": {
    "supabase-thetutorbridge": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp?project_ref=zkphbzcomixukygigpka"
    }
  }
}
EOF
```

---

That's it! Your MCP configuration is now ready to use with Claude Code.
