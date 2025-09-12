import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Debug logging
console.log('Environment variables check:')
console.log('SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing')
console.log('SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Set' : '❌ Missing')
console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅ Set' : '❌ Missing')

// Only create Supabase client if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey ? createSupabaseClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js/2.53.0'
    }
  }
}) : null

// Service role client for admin operations (only available on server side)
export const supabaseAdmin = supabaseUrl && supabaseServiceKey ? createSupabaseClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js/2.53.0'
    }
  }
}) : null

// Database types
export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: any // JSONB
          excerpt: string | null
          featured_image: string | null
          author_name: string | null
          author_avatar: string | null
          author_linkedin: string | null
          status: 'draft' | 'published'
          published_at: string | null
          meta_title: string | null
          meta_description: string | null
          tags: string[]
          view_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: any // JSONB
          excerpt?: string | null
          featured_image?: string | null
          author_name?: string | null
          author_avatar?: string | null
          author_linkedin?: string | null
          status?: 'draft' | 'published'
          published_at?: string | null
          meta_title?: string | null
          meta_description?: string | null
          tags?: string[]
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: any // JSONB
          excerpt?: string | null
          featured_image?: string | null
          author_name?: string | null
          author_avatar?: string | null
          author_linkedin?: string | null
          status?: 'draft' | 'published'
          published_at?: string | null
          meta_title?: string | null
          meta_description?: string | null
          tags?: string[]
          view_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      admin_users: {
        Row: {
          id: string
          email: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
        }
      }
      blog_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
        }
      }
      blog_post_categories: {
        Row: {
          post_id: string
          category_id: string
        }
        Insert: {
          post_id: string
          category_id: string
        }
        Update: {
          post_id?: string
          category_id?: string
        }
      }
    }
  }
}

// Helper function to create a Supabase client
export function createClient() {
  // Check if we're on the server side
  if (typeof window === 'undefined') {
    // Server-side: use service role for admin operations
    if (!supabaseAdmin) {
      throw new Error('Supabase service role key not configured')
    }
    return supabaseAdmin
  } else {
    // Client-side: create a new client instance
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase environment variables not configured')
    }
    return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
      },
      global: {
        headers: {
          'X-Client-Info': 'supabase-js/2.53.0'
        }
      }
    })
  }
} 