export const locales = ['en', 'zh-TW', 'zh-CN'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  'zh-TW': '繁體中文',
  'zh-CN': '简体中文',
};

export function getLocaleFromCountry(country: string | null): Locale {
  if (!country) return defaultLocale;

  switch (country.toUpperCase()) {
    case 'TW':
      return 'zh-TW';
    case 'CN':
      return 'zh-CN';
    default:
      return 'en';
  }
}
