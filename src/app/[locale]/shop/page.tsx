import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

interface ShopPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ShopPageProps) {
  const { locale } = await params;
  
  return {
    title: locale === 'zh-TW' ? '🛒 AI 數位產品商店' : '🛒 AI Digital Shop',
    description: locale === 'zh-TW' 
      ? 'AI 數位產品商店 - 提示詞包、每日新聞、部署教學' 
      : 'AI Digital Products - Prompt Packs, Daily News, Setup Tutorial',
  };
}

export default async function ShopPage({ params }: ShopPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();

  const products = [
    {
      id: 1,
      icon: '🤖',
      title: locale === 'zh-TW' ? 'AI 寫作助手提示詞包' : 'AI Writing Assistant Prompt Pack',
      description: locale === 'zh-TW' 
        ? '每日更新 AI 熱門話題 + 現成提示詞模板，讓你輕鬆產出高質量內容' 
        : 'Daily updated AI hot topics + ready-to-use prompt templates',
      price: locale === 'zh-TW' ? '免費體驗' : 'Free',
      features: [
        locale === 'zh-TW' ? '每日熱門話題更新' : 'Daily trending topics',
        locale === 'zh-TW' ? '現成提示詞模板' : 'Ready-to-use prompts',
        locale === 'zh-TW' ? '內容創作必備工具' : 'Content creation tool',
      ],
      cta: locale === 'zh-TW' ? '立即獲取' : 'Get Now',
      link: '/articles'
    },
    {
      id: 2,
      icon: '📰',
      title: locale === 'zh-TW' ? '每日 AI 新聞摘要精華' : 'Daily AI News Digest',
      description: locale === 'zh-TW' 
        ? '每天 5 條 AI 新聞 + 5 條科技趨勢，一分鐘掌握當天最重要趨勢' 
        : '5 AI news + 5 tech trends daily, master trends in 1 minute',
      price: locale === 'zh-TW' ? '免費' : 'Free',
      features: [
        locale === 'zh-TW' ? '每天 5+5 條精選新聞' : '5+5 curated news daily',
        locale === 'zh-TW' ? '一分鐘掌握趨勢' : 'Master trends in 1 min',
        locale === 'zh-TW' ? '適合忙碌的專業人士' : 'For busy professionals',
      ],
      cta: locale === 'zh-TW' ? '立即訂閱' : 'Subscribe',
      link: '/articles'
    },
    {
      id: 3,
      icon: '🚀',
      title: locale === 'zh-TW' ? 'OpenClaw 部署教學' : 'OpenClaw Deployment Tutorial',
      description: locale === 'zh-TW' 
        ? '一對一教學，幫你設定 AI 員工，打造專屬自動化團隊' 
        : 'One-on-one tutorial to set up your AI team',
      price: locale === 'zh-TW' ? '諮詢報價' : 'Contact for Quote',
      features: [
        locale === 'zh-TW' ? '一對一專業教學' : 'One-on-one tutorial',
        locale === 'zh-TW' ? '幫你設定 AI 員工' : 'Help set up AI employees',
        locale === 'zh-TW' ? '打造專屬自動化團隊' : 'Build your automation team',
      ],
      cta: locale === 'zh-TW' ? '聯繫諮詢' : 'Contact Us',
      link: '/articles'
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-6xl px-4">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold">🛒 AI 數位產品商店</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {locale === 'zh-TW' 
                ? '找到最適合你的 AI 工具和資源' 
                : 'Find the best AI tools and resources for you'}
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div 
                key={product.id}
                className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="mb-4 text-5xl">{product.icon}</div>
                <h2 className="mb-2 text-xl font-bold">{product.title}</h2>
                <p className="mb-4 flex-1 text-gray-600 dark:text-gray-300">
                  {product.description}
                </p>
                
                <div className="mb-4">
                  <span className="text-2xl font-bold text-green-600">{product.price}</span>
                </div>

                <ul className="mb-6 space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <span className="mr-2 text-green-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={product.link}
                  className="mt-auto rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  {product.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white">
            <h2 className="mb-4 text-2xl font-bold">
              {locale === 'zh-TW' ? '需要客製化服務？' : 'Need Custom Services?'}
            </h2>
            <p className="mb-6">
              {locale === 'zh-TW' 
                ? '有特殊需求？歡迎聯繫我們的 AI 客服團隊！' 
                : 'Special requirements? Contact our AI support team!'}
            </p>
            <Link
              href="/articles"
              className="inline-block rounded-full bg-white px-8 py-3 font-semibold text-blue-600 transition-colors hover:bg-gray-100"
            >
              {locale === 'zh-TW' ? '聯繫我們' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
