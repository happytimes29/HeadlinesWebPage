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
      month: 'short',
      day: 'numeric',
    }
  );

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-border hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1">
      <Link href={`/${locale}/articles/${article.slug}`} className="block p-7">
        {/* Category Badge */}
        {article.category && (
          <span className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {article.category}
          </span>
        )}
        
        {/* Title */}
        <h2 className="mb-3 text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
          {article.title}
        </h2>
        
        {/* Summary */}
        {article.summary && (
          <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-muted">
            {article.summary}
          </p>
        )}
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <time className="text-xs text-muted/70">{formattedDate}</time>
          <span className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-all group-hover:opacity-100">
            {t('article.readMore')}
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  );
}