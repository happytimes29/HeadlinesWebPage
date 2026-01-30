import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { getArticles } from '@/lib/supabase';

interface ArticlesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ArticlesPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t('nav.articles'),
    description: t('site.tagline'),
  };
}

export default async function ArticlesPage({ params }: ArticlesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const articles = await getArticles(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <h1 className="mb-8 text-3xl font-bold">{t('nav.articles')}</h1>

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
                  ? '尚無文章，敬請期待！'
                  : locale === 'zh-CN'
                  ? '暂无文章，敬请期待！'
                  : 'No articles yet. Stay tuned!'}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
