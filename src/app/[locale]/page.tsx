import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { getArticles } from '@/lib/supabase';

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
        {/* Hero Section - Clean & Bold */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-b from-surface/50 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
          
          <div className="relative mx-auto max-w-4xl px-6 py-28 text-center">
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-muted">
              {t('site.name')}
            </p>
            <h1 className="mb-8 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              <span className="gradient-text">{t('home.hero.title')}</span>
            </h1>
            <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
        </section>

        {/* Featured Articles - Large Cards */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-tight">{t('home.latestArticles')}</h2>
              <Link
                href={`/${locale}/articles`}
                className="group flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
              >
                {t('home.viewAll')}
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {articles && articles.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article: any) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-border bg-surface/50 p-16 text-center">
                <div className="mb-4 text-5xl">🌱</div>
                <p className="text-lg text-muted">
                  {locale === 'zh-TW'
                    ? '尚無文章，敬請期待！'
                    : locale === 'zh-CN'
                    ? '暂无文章，敬请期待！'
                    : 'No articles yet. Stay tuned!'}
                </p>
                <p className="mt-2 text-sm text-muted/60">
                  {locale === 'zh-TW'
                    ? '思維的種子即將發芽'
                    : locale === 'zh-CN'
                    ? '思维的种子即将发芽'
                    : 'The seed of wisdom is about to sprout'}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="border-t border-border bg-surface/30">
          <div className="mx-auto max-w-2xl px-6 py-16 text-center">
            <h2 className="mb-4 text-2xl font-semibold">
              {locale === 'zh-TW' ? '📬 訂閱更新' : locale === 'zh-CN' ? '📬 订阅更新' : '📬 Subscribe for Updates'}
            </h2>
            <p className="mb-8 text-muted">
              {locale === 'zh-TW'
                ? '第一時間收到新文章通知'
                : locale === 'zh-CN'
                ? '第一时间收到新文章通知'
                : 'Get notified when new articles are published'}
            </p>
            <Link
              href={`/${locale}/subscribe`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-medium text-white transition-all hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/25"
            >
              {locale === 'zh-TW' ? '立即訂閱' : locale === 'zh-CN' ? '立即订阅' : 'Subscribe Now'}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}