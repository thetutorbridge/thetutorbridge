import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
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

// Database types
export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string
          content: string
          author: string
          published_at: string | null
          updated_at: string
          tags: string[]
          featured_image: string | null
          read_time: number
          status: 'draft' | 'published'
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt: string
          content: string
          author: string
          published_at?: string | null
          updated_at?: string
          tags: string[]
          featured_image?: string | null
          read_time?: number
          status?: 'draft' | 'published'
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          author?: string
          published_at?: string | null
          updated_at?: string
          tags?: string[]
          featured_image?: string | null
          read_time?: number
          status?: 'draft' | 'published'
          created_at?: string
        }
      }
    }
  }
} 