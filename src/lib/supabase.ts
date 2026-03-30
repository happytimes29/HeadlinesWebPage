import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null;

export type Article = Database['public']['Tables']['articles']['Row'] & {
  images?: string[] | null;
  source_url?: string | null;
  source_date?: string | null;
};

export async function getArticles(
  locale: string,
  limit?: number
): Promise<Article[]> {
  if (!supabase) {
    console.warn('Supabase client not initialized');
    return [];
  }

  let query = supabase
    .from('articles')
    .select('*')
    .eq('locale', locale)
    .order('published_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching articles:', error);
    return [];
  }

  return data ?? [];
}

export async function getArticleBySlug(
  slug: string,
  locale: string
): Promise<Article | null> {
  if (!supabase) {
    console.warn('Supabase client not initialized');
    return null;
  }

  // Decode the slug to handle URL encoding
  const decodedSlug = decodeURIComponent(slug);
  
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', decodedSlug)
    .eq('locale', locale)
    .single();

  if (error) {
    // Try with original slug if decoded doesn't work
    const { data: data2, error: error2 } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('locale', locale)
      .single();
    
    if (error2) {
      console.error('Error fetching article:', error);
      return null;
    }
    return data2;
  }

  return data;
}

export async function getArticlesByCategory(category: string, locale: string) {
  if (!supabase) {
    console.warn('Supabase client not initialized');
    return [];
  }

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('category', category)
    .eq('locale', locale)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles by category:', error);
    return [];
  }

  return data;
}

export async function getAllArticleSlugs() {
  if (!supabase) {
    console.warn('Supabase client not initialized');
    return [];
  }

  const { data, error } = await supabase
    .from('articles')
    .select('slug, locale');

  if (error) {
    console.error('Error fetching article slugs:', error);
    return [];
  }

  return data;
}
