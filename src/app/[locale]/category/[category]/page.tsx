import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { getArticlesByCategory } from '@/lib/supabase';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// SEO: Generate static params for categories
export async function generateStaticParams() {
  return [
    { category: 'ai-ying-yong-gong-ju' },
    { category: 'ke-ji-qu-shi' },
    { category: 'zi-wo-cheng-chang' },
  ];
}

interface CategoryPageProps {
  params: Promise<{ locale: string; category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { locale, category } = await params;
  
  const categoryNames: Record<string, Record<string, string>> = {
    'zh-TW': {
      'ai-ying-yong-gong-ju': 'AI 應用工具',
      'ke-ji-qu-shi': '科技趨勢',
      'zi-wo-cheng-chang': '自我成長',
    },
    'zh-CN': {
      'ai-ying-yong-gong-ju': 'AI 应用工具',
      'ke-ji-qu-shi': '科技趋势',
      'zi-wo-cheng-chang': '自我成长',
    },
    'en': {
      'ai-ying-yong-gong-ju': 'AI Tools',
      'ke-ji-qu-shi': 'Tech Trends',
      'zi-wo-cheng-chang': 'Self Growth',
    },
  };

  const categoryName = categoryNames[locale]?.[category] || category;
  const descriptions: Record<string, Record<string, string>> = {
    'zh-TW': {
      'ai-ying-yong-gong-ju': '探索最新 AI 應用工具，包括 ChatGPT、Claude 等 AI 助手的使用技巧與教學',
      'ke-ji-qu-shi': '掌握科技趨勢，了解最新技術發展與產業動態',
      'zi-wo-cheng-chang': '個人成長與學習心得，幫助你成為更好的自己',
    },
  };

  return {
    title: `${categoryName} | JK Space`,
    description: descriptions['zh-TW']?.[category] || `${categoryName} articles`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale, category } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  
  // Map URL category to DB category
  const categoryMap: Record<string, string> = {
    'ai-ying-yong-gong-ju': 'AI 應用工具',
    'ke-ji-qu-shi': '科技趨勢',
    'zi-wo-cheng-chang': '自我成長',
  };
  
  const dbCategory = categoryMap[category] || category;
  const articles = await getArticlesByCategory(dbCategory, locale);

  const categoryNames: Record<string, Record<string, string>> = {
    'zh-TW': {
      'ai-ying-yong-gong-ju': 'AI 應用工具',
      'ke-ji-qu-shi': '科技趨勢',
      'zi-wo-cheng-chang': '自我成長',
    },
    'zh-CN': {
      'ai-ying-yong-gong-ju': 'AI 应用工具',
      'ke-ji-qu-shi': '科技趋势',
      'zi-wo-cheng-chang': '自我成长',
    },
    'en': {
      'ai-ying-yong-gong-ju': 'AI Tools',
      'ke-ji-qu-shi': 'Tech Trends',
      'zi-wo-cheng-chang': 'Self Growth',
    },
  };

  const categoryName = categoryNames[locale]?.[category] || category;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <h1 className="mb-8 text-3xl font-bold">{categoryName}</h1>

          {articles.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-surface p-12 text-center">
              <p className="text-muted">
                {locale === 'zh-TW'
                  ? '尚無文章'
                  : locale === 'zh-CN'
                  ? '暂无文章'
                  : 'No articles'}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
