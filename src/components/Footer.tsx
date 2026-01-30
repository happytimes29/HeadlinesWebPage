'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">JK</span>
            <span className="text-sm text-muted">
              {t('site.tagline')}
            </span>
          </div>
          <div className="text-sm text-muted">
            &copy; {currentYear} {t('site.name')}. {t('footer.copyright')}
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-muted">
          {t('footer.builtWith')}
        </div>
      </div>
    </footer>
  );
}
