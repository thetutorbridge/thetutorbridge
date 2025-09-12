-- Create admin_users table (for access control)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create blog_posts table (updated schema)
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  author_name TEXT,
  author_avatar TEXT,
  author_linkedin TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  meta_title TEXT,
  meta_description TEXT,
  tags TEXT[],
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create blog_categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create blog_post_categories junction table
CREATE TABLE IF NOT EXISTS blog_post_categories (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  category_id UUID REFERENCES blog_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_tags ON blog_posts USING GIN(tags);
CREATE INDEX idx_blog_posts_author_name ON blog_posts(author_name);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_blog_posts_updated_at 
    BEFORE UPDATE ON blog_posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample admin user (replace with your email)
INSERT INTO admin_users (email) VALUES ('your-email@example.com') ON CONFLICT (email) DO NOTHING;

-- Insert sample data
INSERT INTO blog_posts (
  title,
  slug,
  excerpt,
  content,
  author_name,
  author_linkedin,
  tags,
  featured_image,
  status,
  published_at,
  meta_title,
  meta_description
) VALUES 
(
  'How to Excel in Mathematics: A Complete Guide for Students',
  'how-to-excel-in-mathematics',
  'Discover proven strategies and techniques to master mathematics and build a strong foundation for academic success.',
  '{"type":"doc","content":[{"type":"heading","attrs":{"level":1},"content":[{"type":"text","text":"How to Excel in Mathematics: A Complete Guide for Students"}]},{"type":"paragraph","content":[{"type":"text","text":"Mathematics is often considered one of the most challenging subjects for students. However, with the right approach and mindset, anyone can excel in math. In this comprehensive guide, we''ll explore proven strategies that can help you master mathematics and build a strong foundation for academic success."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Understanding the Fundamentals"}]},{"type":"paragraph","content":[{"type":"text","text":"The key to excelling in mathematics lies in understanding the fundamental concepts. Many students struggle because they try to memorize formulas without understanding the underlying principles."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"1. Build a Strong Foundation"}]},{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Start with basic arithmetic operations"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Master fractions, decimals, and percentages"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Understand the concept of variables and equations"}]}]}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"2. Practice Regularly"}]},{"type":"paragraph","content":[{"type":"text","text":"Mathematics is a skill that improves with practice. Set aside dedicated time each day to solve problems and work through exercises."}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"3. Use Visual Learning"}]},{"type":"paragraph","content":[{"type":"text","text":"Many mathematical concepts become clearer when visualized. Use diagrams, graphs, and models to understand abstract concepts."}]}]}',
  'Dr. Sarah Johnson',
  'https://linkedin.com/in/sarah-johnson',
  ARRAY['Mathematics', 'Study Tips', 'Academic Success'],
  '/blog/math-excellence.jpg',
  'published',
  '2024-01-15T10:00:00Z',
  'How to Excel in Mathematics: A Complete Guide for Students',
  'Discover proven strategies and techniques to master mathematics and build a strong foundation for academic success.'
),
(
  'The Science of Effective Learning: Techniques That Actually Work',
  'science-of-effective-learning',
  'Explore evidence-based learning techniques that can significantly improve your academic performance and retention.',
  '# The Science of Effective Learning: Techniques That Actually Work

Learning is a complex process that involves various cognitive functions working together. Understanding how our brain processes and retains information can help us develop more effective study strategies.

## The Science Behind Learning

### Spaced Repetition
Research shows that spacing out your study sessions over time is more effective than cramming. This technique helps strengthen neural connections and improves long-term retention.

### Active Recall
Instead of passively reading or highlighting, actively test yourself on the material. This forces your brain to retrieve information, making it more likely to stick.

### Interleaving
Mix different types of problems or subjects during study sessions. This approach helps you learn to distinguish between different concepts and apply the right strategy.

## Evidence-Based Study Techniques

### 1. The Feynman Technique
Named after physicist Richard Feynman, this technique involves explaining complex concepts in simple terms. If you can''t explain it simply, you don''t understand it well enough.

### 2. Mind Mapping
Create visual representations of information to help your brain make connections and remember concepts more effectively.

### 3. The Pomodoro Technique
Work in focused 25-minute intervals with short breaks. This helps maintain concentration and prevents mental fatigue.

## Optimizing Your Study Environment

### Physical Environment
- Choose a quiet, well-lit space
- Minimize distractions
- Keep your study area organized

### Mental State
- Get adequate sleep
- Stay hydrated
- Take regular breaks

## Technology and Learning

### Digital Tools
- Use apps for spaced repetition
- Create digital flashcards
- Utilize online resources and tutorials

### Avoiding Digital Distractions
- Use website blockers during study sessions
- Put your phone in another room
- Use apps that track your productivity

## Conclusion

Effective learning is not about spending more time studying, but about using the right techniques. By incorporating these evidence-based strategies into your study routine, you can improve your academic performance and make learning more enjoyable.

Remember, everyone learns differently, so experiment with these techniques to find what works best for you.',
  'Prof. Michael Chen',
  ARRAY['Learning', 'Study Techniques', 'Cognitive Science'],
  '/blog/effective-learning.jpg',
  10,
  'published',
  '2024-01-20T14:30:00Z'
),
(
  'Career Planning for High School Students: Start Early, Succeed Often',
  'career-planning-high-school',
  'Learn how early career planning can set you up for success and help you make informed decisions about your future.',
  '# Career Planning for High School Students: Start Early, Succeed Often

Career planning is not just for college students or adults. Starting early in high school can give you a significant advantage in achieving your career goals.

## Why Start Early?

### Building a Strong Foundation
Early career exploration helps you understand your interests, strengths, and values. This self-awareness is crucial for making informed decisions about your future.

### Academic Preparation
Knowing your career goals early allows you to choose the right courses, extracurricular activities, and experiences that align with your aspirations.

### Networking Opportunities
Starting early gives you more time to build relationships with mentors, professionals, and peers who can guide your career development.

## Steps to Effective Career Planning

### 1. Self-Assessment
- Identify your interests and passions
- Assess your strengths and weaknesses
- Understand your values and priorities
- Consider your personality type

### 2. Research Career Options
- Explore different industries and professions
- Learn about job requirements and qualifications
- Understand salary expectations and job outlook
- Research educational requirements

### 3. Set Goals and Create a Plan
- Define short-term and long-term goals
- Create a timeline for achieving your goals
- Identify the steps needed to reach each milestone
- Set up regular check-ins to track your progress

## Tools and Resources

### Career Assessment Tools
- Personality tests (Myers-Briggs, Holland Code)
- Interest inventories
- Skills assessments
- Values clarification exercises

### Information Resources
- Career websites and databases
- Professional associations
- Industry publications
- Job shadowing opportunities

## Building Relevant Experience

### Internships and Volunteering
Gain hands-on experience in your field of interest through internships, volunteer work, or part-time jobs.

### Extracurricular Activities
Participate in clubs, competitions, and activities that relate to your career interests.

### Skill Development
Focus on developing both technical and soft skills that are relevant to your chosen career path.

## Overcoming Common Challenges

### Uncertainty About the Future
It''s normal to feel uncertain about your career path. Focus on exploring options rather than making final decisions.

### Pressure from Others
Don''t let others'' expectations dictate your career choices. Choose a path that aligns with your interests and values.

### Fear of Making the Wrong Choice
Remember that career paths are not linear. You can always change direction and pursue new opportunities.

## Conclusion

Early career planning is an investment in your future. By starting the process in high school, you give yourself the time and resources needed to make informed decisions and build a strong foundation for success.

The key is to stay curious, keep learning, and be open to new opportunities as they arise.',
  'Career Counselor Lisa Rodriguez',
  ARRAY['Career Planning', 'High School', 'Future Planning'],
  '/blog/career-planning.jpg',
  12,
  'published',
  '2024-01-25T09:15:00Z'
);

-- Enable Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_categories ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "Public can view published blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can manage blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Users can check admin status" ON admin_users;

-- blog_posts policies
CREATE POLICY "Public can read published posts" ON blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can read all posts" ON blog_posts
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admin_users WHERE email = auth.email())
  );

CREATE POLICY "Admins can insert posts" ON blog_posts
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE email = auth.email())
  );

CREATE POLICY "Admins can update posts" ON blog_posts
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM admin_users WHERE email = auth.email())
  );

CREATE POLICY "Admins can delete posts" ON blog_posts
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM admin_users WHERE email = auth.email())
  );

-- admin_users policies
CREATE POLICY "Users can check admin status" ON admin_users
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- blog_categories policies
CREATE POLICY "Public can read categories" ON blog_categories
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage categories" ON blog_categories
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE email = auth.email())
  );

-- blog_post_categories policies
CREATE POLICY "Public can read post categories" ON blog_post_categories
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage post categories" ON blog_post_categories
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE email = auth.email())
  );

-- Create blog-images storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for blog-images bucket
CREATE POLICY "Admin users can upload blog images" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'blog-images' 
  AND EXISTS (SELECT 1 FROM admin_users WHERE email = auth.email())
);

CREATE POLICY "Admin users can update blog images" ON storage.objects
FOR UPDATE TO authenticated
USING (
  bucket_id = 'blog-images' 
  AND EXISTS (SELECT 1 FROM admin_users WHERE email = auth.email())
);

CREATE POLICY "Admin users can delete blog images" ON storage.objects
FOR DELETE TO authenticated
USING (
  bucket_id = 'blog-images' 
  AND EXISTS (SELECT 1 FROM admin_users WHERE email = auth.email())
);

-- Public can read images
CREATE POLICY "Anyone can view blog images" ON storage.objects
FOR SELECT TO public
USING (bucket_id = 'blog-images'); 