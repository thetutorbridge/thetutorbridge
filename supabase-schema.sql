-- Create blog_posts table
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tags TEXT[] DEFAULT '{}',
  featured_image TEXT,
  read_time INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX idx_blog_posts_tags ON blog_posts USING GIN(tags);

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

-- Insert sample data
INSERT INTO blog_posts (
  title,
  slug,
  excerpt,
  content,
  author,
  tags,
  featured_image,
  read_time,
  status,
  published_at
) VALUES 
(
  'How to Excel in Mathematics: A Complete Guide for Students',
  'how-to-excel-in-mathematics',
  'Discover proven strategies and techniques to master mathematics and build a strong foundation for academic success.',
  '# How to Excel in Mathematics: A Complete Guide for Students

Mathematics is often considered one of the most challenging subjects for students. However, with the right approach and mindset, anyone can excel in math. In this comprehensive guide, we''ll explore proven strategies that can help you master mathematics and build a strong foundation for academic success.

## Understanding the Fundamentals

The key to excelling in mathematics lies in understanding the fundamental concepts. Many students struggle because they try to memorize formulas without understanding the underlying principles.

### 1. Build a Strong Foundation
- Start with basic arithmetic operations
- Master fractions, decimals, and percentages
- Understand the concept of variables and equations

### 2. Practice Regularly
Mathematics is a skill that improves with practice. Set aside dedicated time each day to solve problems and work through exercises.

### 3. Use Visual Learning
Many mathematical concepts become clearer when visualized. Use diagrams, graphs, and models to understand abstract concepts.

## Effective Study Techniques

### Problem-Solving Approach
1. **Read the problem carefully** - Understand what is being asked
2. **Identify given information** - List all the data provided
3. **Choose the right method** - Select the appropriate mathematical approach
4. **Solve step by step** - Show your work clearly
5. **Verify your answer** - Check if your solution makes sense

### Common Mistakes to Avoid
- Rushing through problems without understanding
- Not showing your work
- Skipping the verification step
- Memorizing without understanding

## Advanced Strategies

### 1. Connect Concepts
Mathematics is interconnected. Try to see how different topics relate to each other.

### 2. Use Technology
Leverage calculators, graphing software, and online resources to enhance your learning.

### 3. Join Study Groups
Collaborating with peers can provide new perspectives and help clarify difficult concepts.

## Conclusion

Excelling in mathematics requires dedication, practice, and the right approach. By building a strong foundation, practicing regularly, and using effective study techniques, you can master this essential subject.

Remember, mathematics is not just about numbers—it''s about logical thinking and problem-solving skills that will serve you throughout your academic and professional life.',
  'Dr. Sarah Johnson',
  ARRAY['Mathematics', 'Study Tips', 'Academic Success'],
  '/blog/math-excellence.jpg',
  8,
  'published',
  '2024-01-15T10:00:00Z'
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

-- Create policies for public read access to published posts
CREATE POLICY "Public can view published blog posts" ON blog_posts
  FOR SELECT USING (status = 'published');

-- Create policies for authenticated users to manage posts
CREATE POLICY "Authenticated users can manage blog posts" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated'); 