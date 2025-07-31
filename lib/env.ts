/**
 * Environment Variables Validation
 * This utility helps ensure all required environment variables are set
 */

export interface EnvironmentConfig {
  supabase: {
    url: string
    anonKey: string
  }
  email: {
    user: string
    pass: string
    admin: string
  }
}

export function validateEnv(): EnvironmentConfig {
  const required = {
    supabase: {
      url: 'NEXT_PUBLIC_SUPABASE_URL',
      anonKey: 'NEXT_PUBLIC_SUPABASE_ANON_KEY'
    },
    email: {
      user: 'CONTACT_EMAIL_USER',
      pass: 'CONTACT_EMAIL_PASS',
      admin: 'ADMIN_EMAIL'
    }
  }

  const missing: string[] = []

  // Check Supabase variables
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    missing.push(required.supabase.url)
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    missing.push(required.supabase.anonKey)
  }

  // Check Email variables
  if (!process.env.CONTACT_EMAIL_USER) {
    missing.push(required.email.user)
  }
  if (!process.env.CONTACT_EMAIL_PASS) {
    missing.push(required.email.pass)
  }
  if (!process.env.ADMIN_EMAIL) {
    missing.push(required.email.admin)
  }

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }

  return {
    supabase: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    },
    email: {
      user: process.env.CONTACT_EMAIL_USER!,
      pass: process.env.CONTACT_EMAIL_PASS!,
      admin: process.env.ADMIN_EMAIL!
    }
  }
}

export function getEnvConfig(): EnvironmentConfig {
  try {
    return validateEnv()
  } catch (error) {
    console.error('Environment validation failed:', error)
    throw error
  }
}

// Optional: Environment-specific configurations
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production'
}

export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development'
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
} 