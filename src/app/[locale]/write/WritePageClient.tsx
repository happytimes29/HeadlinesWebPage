'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface WritePageClientProps {
  locale: string;
}

export default function WritePageClient({ locale }: WritePageClientProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  
  const [form, setForm] = useState({
    title: '',
    content: '',
    summary: '',
    category: '科技趨勢'
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const categories = locale === 'zh-TW' 
    ? ['科技', '金融理財', '創業', '軟體開發', '產業觀察', '其他']
    : ['Tech', 'Finance', 'Startup', 'Software Development', 'Industry Insights', 'Other'];

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - in production, this should be server-validated
    // For now, we'll do client-side check and you can set WRITE_PASSWORD env var
    if (password === 'jk2026write' || password === 'jk2026') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError(locale === 'zh-TW' ? '密碼錯誤' : 'Incorrect password');
      setPassword('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.title || !form.content) {
      setStatus('error');
      setMessage(locale === 'zh-TW' ? '標題和內容必填' : 'Title and content are required');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/write-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, locale })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(locale === 'zh-TW' ? '✅ 文章發布成功！' : '✅ Article published successfully!');
        setForm({ title: '', content: '', summary: '', category: '科技趨勢' });
        
        // Redirect to home after 2 seconds
        setTimeout(() => {
          router.push(`/${locale}`);
          router.refresh();
        }, 2000);
      } else {
        setStatus('error');
        setMessage(data.error || (locale === 'zh-TW' ? '發布失敗' : 'Failed to publish'));
      }
    } catch (error) {
      setStatus('error');
      setMessage(locale === 'zh-TW' ? '❌ 發生錯誤，請稍後再試' : '❌ An error occurred');
    }
  };

  // Password screen
  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-md px-4 py-24">
        <h1 className="mb-8 text-3xl font-bold text-center">
          {locale === 'zh-TW' ? '🔐 寫作頁面' : '🔐 Write Page'}
        </h1>
        
        <form onSubmit={handlePasswordSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block font-medium">
              {locale === 'zh-TW' ? '請輸入密碼' : 'Enter password'}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 dark:border-gray-600 dark:bg-gray-800"
              placeholder={locale === 'zh-TW' ? '密碼' : 'Password'}
              autoFocus
            />
          </div>
          
          {authError && (
            <p className="text-center text-red-600">{authError}</p>
          )}
          
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            {locale === 'zh-TW' ? '驗證' : 'Verify'}
          </button>
        </form>
      </div>
    );
  }

  // Write form (after password verification)
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {locale === 'zh-TW' ? '✍️ 寫作' : '✍️ Write'}
        </h1>
        <button
          onClick={() => {
            setIsAuthenticated(false);
            setPassword('');
          }}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          {locale === 'zh-TW' ? '登出' : 'Logout'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-2 block font-medium">
            {locale === 'zh-TW' ? '標題 *' : 'Title *'}
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 dark:border-gray-600 dark:bg-gray-800"
            placeholder={locale === 'zh-TW' ? '輸入文章標題' : 'Enter article title'}
            disabled={status === 'loading'}
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            {locale === 'zh-TW' ? '分類' : 'Category'}
          </label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 dark:border-gray-600 dark:bg-gray-800"
            disabled={status === 'loading'}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            {locale === 'zh-TW' ? '摘要（可選）' : 'Summary (optional)'}
          </label>
          <textarea
            value={form.summary}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
            rows={2}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 dark:border-gray-600 dark:bg-gray-800"
            placeholder={locale === 'zh-TW' ? '輸入文章摘要' : 'Enter article summary'}
            disabled={status === 'loading'}
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            {locale === 'zh-TW' ? '內容 *' : 'Content *'}
          </label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            required
            rows={15}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 dark:border-gray-600 dark:bg-gray-800 font-mono text-sm"
            placeholder={locale === 'zh-TW' ? '輸入文章內容（支援 Markdown）' : 'Enter article content (Markdown supported)'}
            disabled={status === 'loading'}
          />
        </div>

        {message && (
          <p className={`text-center ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
          >
            {status === 'loading' 
              ? (locale === 'zh-TW' ? '發布中...' : 'Publishing...')
              : (locale === 'zh-TW' ? '發布文章' : 'Publish Article')}
          </button>
          
          <button
            type="button"
            onClick={() => router.push(`/${locale}`)}
            className="rounded-lg border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
          >
            {locale === 'zh-TW' ? '取消' : 'Cancel'}
          </button>
        </div>
      </form>
    </div>
  );
}