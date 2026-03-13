import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { getArticles } from '@/lib/supabase';

// Force dynamic rendering for daily content
export const dynamic = 'force-dynamic';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t('site.name'),
    description: t('site.tagline'),
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  
  // Get today's articles only
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  // Get all recent articles and filter by today's date
  const allArticles = await getArticles(locale, 20);
  const todayArticles = allArticles.filter(article => {
    const articleDate = new Date(article.published_at).toISOString().split('T')[0];
    return articleDate === todayStr;
  });

  // Use today's articles, fallback to most recent if none today
  const articles = todayArticles.length > 0 ? todayArticles : allArticles.slice(0, 6);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border bg-gradient-to-b from-surface to-background py-20">
          <div className="mx-auto max-w-5xl px-4 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="text-primary">JK</span> Space
            </h1>
            <p className="mb-2 text-2xl font-semibold text-foreground">
              {t('home.hero.title')}
            </p>
            <p className="mx-auto max-w-2xl text-lg text-muted">
              {t('home.hero.subtitle')}
            </p>
          </div>
        </section>

        {/* Latest Articles */}
        <section className="py-16">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold">{t('home.latestArticles')}</h2>
              <Link
                href={`/${locale}/articles`}
                className="text-sm font-medium text-primary hover:underline"
              >
                {t('home.viewAll')} &rarr;
              </Link>
            </div>

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
        </section>
      </main>

      <Footer />
    </div>
  );
}
