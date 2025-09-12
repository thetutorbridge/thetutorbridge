'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

interface AdminLayoutProps {
  children: React.ReactNode
}

interface AdminSignInFormProps {
  onSignIn: (email: string, password: string) => void
  isLoading: boolean
  error: string | null
  userEmail?: string
}

function AdminSignInForm({ onSignIn, isLoading, error, userEmail }: AdminSignInFormProps) {
  const [email, setEmail] = useState(userEmail || '')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      onSignIn(email, password)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Admin Access Required
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in with your admin credentials
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Need admin access? Contact the system administrator.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        
        if (userError || !user) {
          setUser(null)
          setIsAdmin(false)
          setIsLoading(false)
          return
        }

        setUser(user)

        // Check if user is admin
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('email')
          .eq('email', user.email)
          .maybeSingle()

        if (adminError) {
          console.error('Admin check error:', adminError)
          setAuthError('Error checking admin status')
          setIsAdmin(false)
        } else if (!adminData) {
          setAuthError(`Email ${user.email} is not authorized for admin access`)
          setIsAdmin(false)
        } else {
          setIsAdmin(true)
          setAuthError(null)
        }
      } catch (error) {
        console.error('Auth check error:', error)
        setAuthError('Authentication error occurred')
        setIsAdmin(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleSignIn = async (email: string, password: string) => {
    setIsSigningIn(true)
    setAuthError(null)
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setAuthError(error.message)
        return
      }

      if (data.user) {
        setUser(data.user)
        // Re-check admin status after sign in
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('email')
          .eq('email', data.user.email)
          .maybeSingle()

        if (adminError || !adminData) {
          setAuthError(`Email ${data.user.email} is not authorized for admin access`)
          setIsAdmin(false)
        } else {
          setIsAdmin(true)
          setAuthError(null)
        }
      }
    } catch (error) {
      setAuthError('Sign in failed')
    } finally {
      setIsSigningIn(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <div className="text-gray-600">Checking admin access...</div>
        </div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return <AdminSignInForm 
      onSignIn={handleSignIn} 
      isLoading={isSigningIn} 
      error={authError}
      userEmail={user?.email}
    />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
              <span className="text-sm text-gray-500">Welcome, {user.email}</span>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="/blog" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                View Blog
              </a>
              <button
                onClick={async () => {
                  await supabase.auth.signOut()
                  router.push('/')
                }}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <a
              href="/admin"
              className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium"
            >
              Dashboard
            </a>
            <a
              href="/admin/blog"
              className="border-b-2 border-red-600 text-red-600 py-4 px-1 text-sm font-medium"
            >
              Blog Posts
            </a>
            <a
              href="/admin/blog/new"
              className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium"
            >
              New Post
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
