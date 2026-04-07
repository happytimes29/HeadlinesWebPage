import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleContent from '@/components/ArticleContent';
import JsonLd from '@/components/JsonLd';
import { getArticleBySlug, getAllArticleSlugs, getAdjacentArticles } from '@/lib/supabase';
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

  // Fetch adjacent articles
  const adjacent = await getAdjacentArticles(slug, locale);
  const articleWithAdjacent = { ...article, adjacent } as any;

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

          {/* Featured Image */}
          {article.images && article.images.length > 0 && (
            <div className="mb-8">
              <img
                src={article.images[0]}
                alt={article.title}
                className="w-full rounded-lg object-cover max-h-[400px]"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="mb-12">
            <ArticleContent content={article.content} />
          </div>

          {/* Source Section */}
          {article.source_url && (
            <section className="mb-8 rounded-lg border border-border bg-surface p-6">
              <h2 className="mb-4 text-lg font-semibold text-primary">
                {t('article.source') || '來源'}
              </h2>
              <div className="text-foreground/90">
                <p className="mb-2">
                  <span className="font-medium">原文連結：</span>
                  <a
                    href={article.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline hover:opacity-80"
                  >
                    {article.source_url}
                  </a>
                </p>
                {article.source_date && (
                  <p className="text-sm text-muted">
                    發布日期：{new Date(article.source_date).toLocaleDateString('zh-TW')}
                  </p>
                )}
              </div>
            </section>
          )}

          {/* Previous / Next Navigation */}
          {articleWithAdjacent.adjacent && (
            <nav className="mt-8 flex justify-between gap-4 border-t border-border pt-8">
              {articleWithAdjacent.adjacent.prev ? (
                <Link
                  href={`/${locale}/articles/${articleWithAdjacent.adjacent.prev.slug}`}
                  className="group flex flex-1 items-center rounded-lg border border-border bg-surface p-4 transition-colors hover:border-primary/50 hover:bg-primary/5"
                >
                  <span className="text-sm text-muted">← 上一篇</span>
                  <span className="ml-2 font-medium text-foreground group-hover:text-primary line-clamp-1">
                    {articleWithAdjacent.adjacent.prev.title}
                  </span>
                </Link>
              ) : <div className="flex-1" />}
              {articleWithAdjacent.adjacent.next ? (
                <Link
                  href={`/${locale}/articles/${articleWithAdjacent.adjacent.next.slug}`}
                  className="group flex flex-1 items-center justify-end rounded-lg border border-border bg-surface p-4 transition-colors hover:border-primary/50 hover:bg-primary/5"
                >
                  <span className="mr-2 font-medium text-foreground group-hover:text-primary line-clamp-1">
                    {articleWithAdjacent.adjacent.next.title}
                  </span>
                  <span className="text-sm text-muted">下一篇 →</span>
                </Link>
              ) : <div className="flex-1" />}
            </nav>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
