import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleContent from '@/components/ArticleContent';
import JsonLd from '@/components/JsonLd';
import { getArticleBySlug, getAllArticleSlugs } from '@/lib/supabase';
import { locales } from '@/i18n/config';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface ArticlePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllArticleSlugs();
    if (!slugs || slugs.length === 0) {
      return [];
    }
    return slugs.map(({ slug, locale }) => ({ locale, slug }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticleBySlug(slug, locale);

  if (!article) {
    return { title: 'Article Not Found' };
  }

  const alternateLanguages: Record<string, string> = {};
  for (const l of locales) {
    alternateLanguages[l] = `/${l}/articles/${slug}`;
  }

  return {
    title: article.title,
    description: article.summary || article.content.slice(0, 160),
    openGraph: {
      title: article.title,
      description: article.summary || article.content.slice(0, 160),
      type: 'article',
      publishedTime: article.published_at,
      modifiedTime: article.updated_at,
      locale: locale,
      alternateLocale: locales.filter((l) => l !== locale),
    },
    alternates: {
      canonical: `/${locale}/articles/${slug}`,
      languages: alternateLanguages,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const article = await getArticleBySlug(slug, locale);

  if (!article) {
    notFound();
  }

  const formattedDate = new Date(article.published_at).toLocaleDateString(
    locale === 'zh-TW' ? 'zh-TW' : locale === 'zh-CN' ? 'zh-CN' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd article={article} locale={locale} />
      <Header />

      <main className="flex-1 py-12">
        <article className="mx-auto max-w-3xl px-4">
          {/* Article Header */}
          <header className="mb-8">
            {article.category && (
              <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {article.category}
              </span>
            )}
            <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted">
              <time dateTime={article.published_at}>
                {t('article.publishedOn')} {formattedDate}
              </time>
            </div>
          </header>

          {/* Article Content */}
          <div className="mb-12">
            <ArticleContent content={article.content} />
          </div>

          {/* Summary Section (GEO Optimization) */}
          {article.summary && (
            <section className="mb-8 rounded-lg border border-border bg-surface p-6">
              <h2 className="mb-4 text-lg font-semibold text-primary">
                {t('article.summary')}
              </h2>
              <div className="text-foreground/90">
                {article.summary.split('\n').map((line, index) => (
                  <p key={index} className="mb-2">
                    {line.startsWith('- ') ? (
                      <span className="flex items-start gap-2">
                        <span className="text-primary">&#x2022;</span>
                        <span>{line.slice(2)}</span>
                      </span>
                    ) : (
                      line
                    )}
                  </p>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
