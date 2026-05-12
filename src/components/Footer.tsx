'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                <span className="text-sm font-bold text-white">JK</span>
              </div>
              <span className="text-lg font-semibold">{t('site.name')}</span>
            </div>
            <p className="text-sm text-muted">
              {t('site.tagline')}
            </p>
          </div>
          
          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted">
            <a href={`/${'zh-TW'}/articles`} className="transition-colors hover:text-foreground">
              {t('nav.articles')}
            </a>
            <a href={`/${'zh-TW'}/subscribe`} className="transition-colors hover:text-foreground">
              {t('nav.home') === '首頁' ? '📧 訂閱' : '📧 Subscribe'}
            </a>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center gap-4 pt-8 border-t border-border/50">
          <div className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-border to-transparent" />
          <p className="text-sm text-muted/60">
            &copy; {currentYear} {t('site.name')}. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}