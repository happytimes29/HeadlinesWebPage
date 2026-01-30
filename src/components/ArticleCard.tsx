import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import type { Article } from '@/lib/supabase';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const t = useTranslations();
  const locale = useLocale();

  const formattedDate = new Date(article.published_at).toLocaleDateString(
    locale === 'zh-TW' ? 'zh-TW' : locale === 'zh-CN' ? 'zh-CN' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  return (
    <article className="group rounded-lg border border-border bg-surface p-6 transition-colors hover:border-primary/50 hover:bg-surface-hover">
      <Link href={`/${locale}/articles/${article.slug}`}>
        {article.category && (
          <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {article.category}
          </span>
        )}
        <h2 className="mb-2 text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
          {article.title}
        </h2>
        {article.summary && (
          <p className="mb-4 line-clamp-2 text-sm text-muted">
            {article.summary}
          </p>
        )}
        <div className="flex items-center justify-between">
          <time className="text-xs text-muted">{formattedDate}</time>
          <span className="text-sm font-medium text-primary">
            {t('article.readMore')} &rarr;
          </span>
        </div>
      </Link>
    </article>
  );
}
