import { createAdminClient } from './supabase';

export interface User {
  id: string;
  email: string;
  name: string;
  country?: string;
  academic_level?: string;
  created_at: string;
  updated_at: string;
}

export interface StudyGuideUsage {
  id: string;
  user_id?: string;
  session_id?: string;
  topic: string;
  language: string;
  tokens_used?: number;
  cost_usd?: number;
  generated_at: string;
  ip_address?: string;
  user_agent?: string;
}

export interface UsageStats {
  total_guides: number;
  remaining_free: number;
  is_registered: boolean;
  needs_registration: boolean;
  needs_upgrade: boolean;
}

// Freemium limits
export const FREEMIUM_LIMITS = {
  ANONYMOUS_LIMIT: 2,      // 2 free guides without registration
  REGISTERED_LIMIT: 3,     // 3 total free guides with registration
  REGISTRATION_BONUS: 1    // +1 guide after registration
};

// Generate a session ID for anonymous users
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Get session ID from localStorage or generate new one
export function getSessionId(): string {
  if (typeof window === 'undefined') return generateSessionId();
  
  let sessionId = localStorage.getItem('study_guide_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem('study_guide_session_id', sessionId);
  }
  return sessionId;
}

// Check usage stats for a user or session
export async function checkUsageStats(userId?: string, sessionId?: string): Promise<UsageStats> {
  const supabase = createAdminClient();
  
  try {
    let query = supabase
      .from('study_guide_usage')
      .select('*');
    
    if (userId) {
      query = query.eq('user_id', userId);
    } else if (sessionId) {
      query = query.eq('session_id', sessionId);
    } else {
      throw new Error('Either userId or sessionId must be provided');
    }
    
    const { data: usage, error } = await query;
    
    if (error) {
      console.error('Error checking usage stats:', error);
      
      // If table doesn't exist, return default stats (graceful fallback)
      if (error.code === '42P01') {
        console.log('📊 Database tables not created yet, using default stats');
        return {
          total_guides: 0,
          remaining_free: FREEMIUM_LIMITS.ANONYMOUS_LIMIT,
          is_registered: !!userId,
          needs_registration: false,
          needs_upgrade: false
        };
      }
      
      throw error;
    }
    
    const total_guides = usage?.length || 0;
    const is_registered = !!userId;
    const max_free = is_registered ? FREEMIUM_LIMITS.REGISTERED_LIMIT : FREEMIUM_LIMITS.ANONYMOUS_LIMIT;
    const remaining_free = Math.max(0, max_free - total_guides);
    const needs_registration = !is_registered && total_guides >= FREEMIUM_LIMITS.ANONYMOUS_LIMIT;
    const needs_upgrade = total_guides >= FREEMIUM_LIMITS.REGISTERED_LIMIT;
    
    return {
      total_guides,
      remaining_free,
      is_registered,
      needs_registration,
      needs_upgrade
    };
    
  } catch (error) {
    console.error('Error in checkUsageStats:', error);
    
    // Fallback to default stats if anything fails
    return {
      total_guides: 0,
      remaining_free: FREEMIUM_LIMITS.ANONYMOUS_LIMIT,
      is_registered: !!userId,
      needs_registration: false,
      needs_upgrade: false
    };
  }
}

// Register a new user
export async function registerUser(userData: {
  email: string;
  name: string;
  country?: string;
  academic_level?: string;
}): Promise<User> {
  const supabase = createAdminClient();
  
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single();
    
    if (error) {
      console.error('Error registering user:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error in registerUser:', error);
    throw error;
  }
}

// Log study guide usage
export async function logStudyGuideUsage(usageData: {
  user_id?: string;
  session_id?: string;
  topic: string;
  language: string;
  tokens_used?: number;
  cost_usd?: number;
  ip_address?: string;
  user_agent?: string;
}): Promise<void> {
  const supabase = createAdminClient();
  
  try {
    const { error } = await supabase
      .from('study_guide_usage')
      .insert([usageData]);
    
    if (error) {
      console.error('Error logging usage:', error);
      
      // If table doesn't exist, just log and continue
      if (error.code === '42P01') {
        console.log('📊 Database tables not created yet, skipping usage logging');
        return;
      }
      
      throw error;
    }
    
    console.log('📊 Usage logged successfully');
  } catch (error) {
    console.error('Error in logStudyGuideUsage:', error);
    // Don't throw here to avoid breaking the main flow
  }
}

// Get user by email
export async function getUserByEmail(email: string): Promise<User | null> {
  const supabase = createAdminClient();
  
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();
    
    if (error) {
      console.error('Error getting user by email:', error);
      
      // If table doesn't exist, return null
      if (error.code === '42P01') {
        console.log('📊 Database tables not created yet, returning null user');
        return null;
      }
      
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error in getUserByEmail:', error);
    // Return null instead of throwing to prevent UI breaks
    return null;
  }
}
