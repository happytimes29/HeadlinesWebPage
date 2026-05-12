'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { locales, localeNames, type Locale } from '@/i18n/config';

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
            <span className="text-sm font-bold text-white">JK</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">{t('site.name')}</span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8">
          <Link
            href={`/${locale}`}
            className="text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            {t('nav.home')}
          </Link>
          <Link
            href={`/${locale}/articles`}
            className="text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            {t('nav.articles')}
          </Link>
          <Link
            href={`/${locale}/subscribe`}
            className="text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            {t('nav.home') === '首頁' ? '📧 訂閱' : '📧 Subscribe'}
          </Link>

          {/* Language Switcher */}
          <div className="relative group">
            <button className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              {localeNames[locale as Locale]}
            </button>
            <div className="absolute right-0 top-full mt-2 hidden min-w-[130px] rounded-xl border border-border bg-surface-elevated py-2 shadow-xl group-hover:block">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={`/${l}`}
                  className={`block px-4 py-2 text-sm transition-colors hover:bg-surface-hover ${
                    l === locale ? 'text-primary font-medium' : 'text-foreground'
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