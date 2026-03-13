import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SubscribeForm from '@/components/SubscribeForm';

export const dynamic = 'force-dynamic';

interface SubscribePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: SubscribePageProps) {
  const { locale } = await params;
  
  return {
    title: locale === 'zh-TW' ? '📧 免費訂閱' : '📧 Free Subscribe',
    description: locale === 'zh-TW' 
      ? '免費訂閱每日 AI 新聞精華' 
      : 'Subscribe to daily AI news digest for free',
  };
}

export default async function SubscribePage({ params }: SubscribePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const benefits = [
    {
      icon: '📰',
      title: locale === 'zh-TW' ? '每日精選新聞' : 'Daily Curated News',
      description: locale === 'zh-TW' 
        ? '每天收到 5 條 AI 新聞 + 5 條科技趨勢' 
        : 'Receive 5 AI news + 5 tech trends daily'
    },
    {
      icon: '⏰',
      title: locale === 'zh-TW' ? '節省時間' : 'Save Time',
      description: locale === 'zh-TW' 
        ? '一分鐘掌握當天最重要趨勢' 
        : 'Master the most important trends in 1 minute'
    },
    {
      icon: '🎁',
      title: locale === 'zh-TW' ? '獨家內容' : 'Exclusive Content',
      description: locale === 'zh-TW' 
        ? '訂閱戶專屬提示詞模板' 
        : 'Subscriber-only prompt templates'
    },
    {
      icon: '🔔',
      title: locale === 'zh-TW' ? '即時通知' : 'Instant Notifications',
      description: locale === 'zh-TW' 
        ? '第一時間掌握最新 AI 動態' 
        : 'Be the first to know AI updates'
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-4xl px-4">
          {/* Hero */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold">📧 免費訂閱</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {locale === 'zh-TW' 
                ? '每日收到最新 AI 趨勢，不錯過任何重要資訊' 
                : 'Receive the latest AI trends daily, never miss important updates'}
            </p>
          </div>

          {/* Benefits */}
          <div className="mb-12 grid gap-6 md:grid-cols-2">
            {benefits.map((benefit, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
              >
                <span className="text-3xl">{benefit.icon}</span>
                <div>
                  <h3 className="font-semibold">{benefit.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {benefit.description}
                  }
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Subscribe Form */}
          <div className="rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-8 dark:from-blue-900/20 dark:to-purple-900/20">
            <h2 className="mb-6 text-center text-2xl font-bold">
              {locale === 'zh-TW' ? '立即免費訂閱！' : 'Subscribe Now for Free!'}
            </h2>
            <SubscribeForm locale={locale} />
          </div>

          {/* Note */}
          <p className="mt-8 text-center text-sm text-gray-500">
            {locale === 'zh-TW' 
              ? '🔒 我們重視您的隱私，絕不會 spam 或分享您的 email' 
              : '🔒 We respect your privacy, no spam or sharing your email'}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
