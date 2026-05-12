import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WritePageClient from './WritePageClient';

export const dynamic = 'force-dynamic';

interface WritePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: WritePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  
  return {
    title: locale === 'zh-TW' ? '✍️ 寫作' : '✍️ Write',
    robots: 'noindex, nofollow', // Don't show in search engines
  };
}

export default async function WritePage({ params }: WritePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <WritePageClient locale={locale} />
      </main>
      
      <Footer />
    </div>
  );
}