-- Run this SQL in your Supabase SQL Editor to create the freemium tables

-- Create users table for freemium model
CREATE TABLE IF NOT EXISTS public.users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  country VARCHAR(100),
  academic_level VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create study guide usage tracking table
CREATE TABLE IF NOT EXISTS public.study_guide_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  session_id VARCHAR(255),
  topic TEXT NOT NULL,
  language VARCHAR(10) NOT NULL DEFAULT 'english',
  tokens_used INTEGER,
  cost_usd DECIMAL(10, 6),
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  ip_address INET,
  user_agent TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_usage_user_id ON public.study_guide_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_session_id ON public.study_guide_usage(session_id);
CREATE INDEX IF NOT EXISTS idx_usage_generated_at ON public.study_guide_usage(generated_at);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_guide_usage ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table
CREATE POLICY "Users can read their own data" ON public.users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own data" ON public.users
  FOR UPDATE USING (auth.uid()::text = id::text);

CREATE POLICY "Service role can access all users" ON public.users
  FOR ALL USING (auth.role() = 'service_role');

-- Create RLS policies for study_guide_usage table
CREATE POLICY "Users can read their own usage" ON public.study_guide_usage
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Service role can access all usage data" ON public.study_guide_usage
  FOR ALL USING (auth.role() = 'service_role');

-- Allow anonymous usage tracking (for session-based tracking)
CREATE POLICY "Allow anonymous usage tracking" ON public.study_guide_usage
  FOR INSERT WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for users table
CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON public.users 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
