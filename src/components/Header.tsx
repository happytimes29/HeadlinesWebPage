'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { locales, localeNames, type Locale } from '@/i18n/config';

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <span className="text-lg font-semibold">{t('site.name')}</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href={`/${locale}`}
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            {t('nav.home')}
          </Link>
          <Link
            href={`/${locale}/articles`}
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            {t('nav.articles')}
          </Link>
          <Link
            href={`/${locale}/shop`}
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            🛒 商店
          </Link>
          <Link
            href={`/${locale}/subscribe`}
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            📧 訂閱
          </Link>

          {/* Language Switcher */}
          <div className="relative group">
            <button className="flex items-center gap-1 rounded-md px-2 py-1 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground">
              {localeNames[locale as Locale]}
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="absolute right-0 top-full hidden min-w-[120px] rounded-md border border-border bg-surface py-1 shadow-lg group-hover:block">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={`/${l}`}
                  className={`block px-4 py-2 text-sm transition-colors hover:bg-surface-hover ${
                    l === locale ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {localeNames[l]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
