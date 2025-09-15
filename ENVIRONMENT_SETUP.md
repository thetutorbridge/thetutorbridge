# Environment Variables Setup Guide

## Required Environment Variables

Your application requires the following environment variables to function properly:

### Supabase Configuration
```bash
# Your Supabase project URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# Your Supabase anon/public key (safe for client-side use)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here

# Your Supabase service role key (server-side only, keep secret!)
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key-here
```

## How to Set Up Environment Variables

### For Local Development
1. Create a `.env.local` file in your project root
2. Add the environment variables above
3. Replace the placeholder values with your actual Supabase credentials

### For Production
1. Create a `.env.production` file in your project root
2. Add the environment variables above
3. Replace the placeholder values with your actual Supabase credentials
4. Make sure to never commit these files to git (they're already in .gitignore)

### Alternative: Using Vercel Environment Variables
If you're deploying to Vercel:
1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add each variable for the appropriate environments (Production, Preview, Development)

## Where to Find Your Supabase Credentials

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to Settings > API
4. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

## Security Notes

- ✅ `NEXT_PUBLIC_*` variables are safe to expose to the client
- ❌ `SUPABASE_SERVICE_ROLE_KEY` should NEVER be exposed to the client
- ✅ All `.env*` files are already in `.gitignore` and won't be committed
- ✅ Use different Supabase projects for development and production

## Troubleshooting

If you see errors like "Supabase environment variables not configured":
1. Check that your `.env.local` or `.env.production` file exists
2. Verify the variable names are exactly as shown above
3. Make sure there are no extra spaces or quotes around the values
4. Restart your development server after adding environment variables

## Example .env.local file
```bash
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NODE_ENV=development
```
