import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const supabase = createClient();
    const { slug } = params;

    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Increment view count
    await supabase
      .from('blog_posts')
      .update({ view_count: (data.view_count || 0) + 1 })
      .eq('id', data.id);

    return NextResponse.json({ post: data });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}