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
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted transition-all hover:border-primary hover:text-primary hover:bg-primary/10">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted transition-all hover:border-primary hover:text-primary hover:bg-primary/10">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted transition-all hover:border-primary hover:text-primary hover:bg-primary/10">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
            </a>
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