import type { Article } from '@/lib/supabase';

interface JsonLdProps {
  article: Article;
  locale: string;
}

export default function JsonLd({ article, locale }: JsonLdProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const articleUrl = `${siteUrl}/${locale}/articles/${article.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary || article.content.slice(0, 160),
    datePublished: article.published_at,
    dateModified: article.updated_at,
    url: articleUrl,
    inLanguage: locale,
    author: {
      '@type': 'Person',
      name: 'JK',
      description:
        'Electronic Hardware Engineer with experience in wireless routers, smartphones, and e-bikes',
      jobTitle: 'Hardware Engineer',
      knowsAbout: [
        'AI Applications',
        'Electronics Engineering',
        'Wireless Technology',
        'Embedded Systems',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'JK Space',
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    ...(article.category && {
      articleSection: article.category,
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
