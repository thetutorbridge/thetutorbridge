# Environment Variables Setup Guide

This guide explains how to set up environment variables for different deployment environments.

## 📋 Required Environment Variables

### 1. Supabase Configuration (Required for Blog System)
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

**How to get these:**
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings → API
4. Copy the "Project URL" and "anon public" key

### 2. Email Configuration (Required for Contact Forms)
```bash
CONTACT_EMAIL_USER=your_email@gmail.com
CONTACT_EMAIL_PASS=your_app_password_here
ADMIN_EMAIL=admin@thetutorbridge.com
```

**How to get these:**
1. Use a Gmail account for sending emails
2. Enable 2-factor authentication
3. Generate an "App Password" (not your regular password)
4. Use the app password in `CONTACT_EMAIL_PASS`

## 🚀 Deployment Environments

### Local Development (.env.local)
Create a `.env.local` file in your project root:
```bash
# Copy from env.example and fill in your actual values
cp env.example .env.local
```

### Vercel Production Deployment

#### Option 1: Vercel Dashboard
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `CONTACT_EMAIL_USER`
   - `CONTACT_EMAIL_PASS`
   - `ADMIN_EMAIL`

#### Option 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add CONTACT_EMAIL_USER
vercel env add CONTACT_EMAIL_PASS
vercel env add ADMIN_EMAIL
```

### GitHub Actions (if using CI/CD)
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🔒 Security Best Practices

### 1. Never Commit Sensitive Data
- ✅ `.env.local` is already in `.gitignore`
- ✅ Use environment variables in production
- ❌ Never hardcode secrets in your code

### 2. Use Different Values for Different Environments
```bash
# Development
NEXT_PUBLIC_SUPABASE_URL=https://dev-project.supabase.co
CONTACT_EMAIL_USER=dev@example.com

# Production
NEXT_PUBLIC_SUPABASE_URL=https://prod-project.supabase.co
CONTACT_EMAIL_USER=contact@thetutorbridge.com
```

### 3. Validate Environment Variables
Add this to your `lib/env.ts`:
```typescript
export function validateEnv() {
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'CONTACT_EMAIL_USER',
    'CONTACT_EMAIL_PASS',
    'ADMIN_EMAIL'
  ]

  for (const var_name of required) {
    if (!process.env[var_name]) {
      throw new Error(`Missing required environment variable: ${var_name}`)
    }
  }
}
```

## 🧪 Testing Environment Variables

### Test Supabase Connection
```bash
node test-blog-creation.js
```

### Test Email Configuration
```bash
# Test contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
```

## 📝 Troubleshooting

### Common Issues

1. **"Missing environment variable" error**
   - Check if all required variables are set
   - Restart your development server after adding variables

2. **Supabase connection fails**
   - Verify your Supabase URL and key
   - Check if your Supabase project is active
   - Ensure RLS policies are configured correctly

3. **Email sending fails**
   - Verify Gmail credentials
   - Check if 2FA is enabled and app password is used
   - Ensure `ADMIN_EMAIL` is a valid email address

### Debug Commands
```bash
# Check if environment variables are loaded
node -e "console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)"

# Test Supabase connection
node test-connection.js

# Test blog creation
node test-blog-creation.js
```

## 🔄 Environment Variable Updates

After updating environment variables:
1. **Local**: Restart your development server
2. **Vercel**: Redeploy your application
3. **Test**: Verify functionality works as expected

## 📞 Support

If you encounter issues:
1. Check this guide first
2. Verify all environment variables are set correctly
3. Test with the provided test scripts
4. Check Vercel deployment logs for errors 