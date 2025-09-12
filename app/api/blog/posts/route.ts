import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'published';
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status !== 'all') {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }

    return NextResponse.json({ posts: data });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const body = await request.json();

    const {
      title,
      slug,
      content,
      excerpt,
      featured_image,
      author_name = 'Rishabh Jain',
      author_linkedin = 'https://www.linkedin.com/in/rishabh-jain-33b946214/',
      author_image = 'Rishabh Jain.jpeg',
      author_avatar = 'Rishabh Jain.jpeg', // Handle both field names
      tags = [],
      status = 'draft',
      meta_title,
      meta_description,
      meta_keywords = []
    } = body;

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json({ error: 'Missing required fields: title and content are required' }, { status: 400 });
    }

    // Generate slug if not provided
    const finalSlug = slug || title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    // Calculate read time (average 200 words per minute)
    const wordCount = JSON.stringify(content).split(' ').length;
    const readTime = Math.ceil(wordCount / 200);

    const postData = {
      title,
      slug: finalSlug,
      content,
      excerpt,
      featured_image,
      author_name,
      author_linkedin,
      author_image: author_image || author_avatar, // Use either field
      tags,
      status,
      meta_title: meta_title || title,
      meta_description,
      meta_keywords,
      read_time: readTime,
      published_at: status === 'published' ? new Date().toISOString() : null
    };

    const { data, error } = await supabase
      .from('blog_posts')
      .insert([postData])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      console.error('Post data:', postData);
      return NextResponse.json({ 
        error: 'Failed to create post', 
        details: error.message,
        code: error.code 
      }, { status: 500 });
    }

    return NextResponse.json({ post: data });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}