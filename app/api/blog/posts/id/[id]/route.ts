import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();
    const { id } = params;

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ post: data });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();
    const { id } = params;
    const body = await request.json();

    const {
      title,
      slug,
      content,
      excerpt,
      featured_image,
      author_name,
      author_linkedin,
      author_image,
      tags,
      status,
      meta_title,
      meta_description,
      meta_keywords
    } = body;

    // Calculate read time if content is provided
    let readTime;
    if (content) {
      const wordCount = JSON.stringify(content).split(' ').length;
      readTime = Math.ceil(wordCount / 200);
    }

    const updateData: any = {
      updated_at: new Date().toISOString()
    };

    if (title) updateData.title = title;
    if (slug) updateData.slug = slug;
    if (content) updateData.content = content;
    if (excerpt) updateData.excerpt = excerpt;
    if (featured_image) updateData.featured_image = featured_image;
    if (author_name) updateData.author_name = author_name;
    if (author_linkedin) updateData.author_linkedin = author_linkedin;
    if (author_image) updateData.author_image = author_image;
    if (tags) updateData.tags = tags;
    if (status) updateData.status = status;
    if (meta_title) updateData.meta_title = meta_title;
    if (meta_description) updateData.meta_description = meta_description;
    if (meta_keywords) updateData.meta_keywords = meta_keywords;
    if (readTime) updateData.read_time = readTime;

    // Set published_at if status is being changed to published
    if (status === 'published') {
      updateData.published_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }

    return NextResponse.json({ post: data });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();
    const { id } = params;

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}