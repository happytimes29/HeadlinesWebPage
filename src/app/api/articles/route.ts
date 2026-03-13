import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase admin client with service role key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { slug, locale, title, content, category, summary } = body;
    
    if (!slug || !locale || !title || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: slug, locale, title, content' },
        { status: 400 }
      );
    }

    // Generate slug if not provided
    const articleSlug = slug || title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const { data, error } = await supabaseAdmin
      .from('articles')
      .insert({
        slug: articleSlug,
        locale: locale || 'zh-TW',
        title,
        content,
        category: category || '科技趨勢',
        summary: summary || '',
        published_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      article: data 
    }, { status: 201 });
    
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
