import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type Article = Database['public']['Tables']['articles']['Row'];

export async function getArticles(
  locale: string,
  limit?: number
): Promise<Article[]> {
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
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('locale', locale)
    .single();

  if (error) {
    console.error('Error fetching article:', error);
    return null;
  }

  return data;
}

export async function getArticlesByCategory(category: string, locale: string) {
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
  const { data, error } = await supabase
    .from('articles')
    .select('slug, locale');

  if (error) {
    console.error('Error fetching article slugs:', error);
    return [];
  }

  return data;
}
