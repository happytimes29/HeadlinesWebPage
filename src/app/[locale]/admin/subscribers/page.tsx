import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { createClient } from '@supabase/supabase-js';

// Admin page - no need for auth in this demo
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yqmuxdjwyoeogyftjhyf.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxbXV4ZGp3eW9lb2d5ZnRqaHlmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM1NDQ5MiwiZXhwIjoyMDg4OTMwNDkyfQ.VVqu61pYek8HnX4OMtelaNGy6lLSB_iux5oW-er_5I8';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export const dynamic = 'force-dynamic';

interface AdminSubscribersPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AdminSubscribersPageProps) {
  const { locale } = await params;
  
  return {
    title: locale === 'zh-TW' ? '📋 訂閱者管理' : '📋 Subscribers Admin',
  };
}

export default async function AdminSubscribersPage({ params }: AdminSubscribersPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Fetch subscribers
  const { data: subscribers, error } = await supabase
    .from('subscribers')
    .select('*')
    .order('subscribed_at', { ascending: false });

  const subscriberCount = subscribers?.length || 0;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">📋 訂閱者管理</h1>
            <div className="text-sm text-gray-500">
              總訂閱人數：<span className="font-bold text-blue-600">{subscriberCount}</span> 人
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
              <div className="text-2xl font-bold text-blue-600">{subscriberCount}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">總訂閱人數</div>
            </div>
            <div className="rounded-lg bg-green-50 p-6 dark:bg-green-900/20">
              <div className="text-2xl font-bold text-green-600">{subscriberCount}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">活躍訂閱</div>
            </div>
            <div className="rounded-lg bg-purple-50 p-6 dark:bg-purple-900/20">
              <div className="text-2xl font-bold text-purple-600">0</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">今日新增</div>
            </div>
          </div>

          {/* Subscribers Table */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">語言</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">訂閱時間</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">狀態</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {subscribers && subscribers.length > 0 ? (
                  subscribers.map((sub: any) => (
                    <tr key={sub.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className="font-medium">{sub.email}</span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {sub.locale || 'zh-TW'}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {new Date(sub.subscribed_at).toLocaleString('zh-TW')}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                          {sub.status || 'active'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                      目前還沒有訂閱者
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Export Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => {
                if (subscribers && subscribers.length > 0) {
                  const csv = ['Email,語言,訂閱時間,狀態', ...subscribers.map((s: any) => 
                    `${s.email},${s.locale || 'zh-TW'},${new Date(s.subscribed_at).toISOString()},${s.status || 'active'}`
                  )].join('\n');
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'subscribers.csv';
                  a.click();
                }
              }}
              disabled={!subscribers || subscribers.length === 0}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:bg-gray-400"
            >
              📥 匯出 CSV
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
