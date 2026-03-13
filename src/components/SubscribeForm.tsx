'use client';

import { useState } from 'react';

interface SubscribeFormProps {
  locale: string;
}

export default function SubscribeForm({ locale }: SubscribeFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setStatus('loading');
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setMessage(locale === 'zh-TW' 
          ? '✅ 訂閱成功！我們會每天發送最新資訊給你' 
          : '✅ Subscription successful! We will send you daily updates');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong');
      }
    } catch (error) {
      setStatus('error');
      setMessage(locale === 'zh-TW' 
        ? '❌ 發生錯誤，請稍後再試' 
        : '❌ An error occurred, please try again');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md">
      <div className="flex flex-col gap-4 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={locale === 'zh-TW' ? '輸入你的 email' : 'Enter your email'}
          required
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800"
          disabled={status === 'loading' || status === 'success'}
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
        >
          {status === 'loading' 
            ? (locale === 'zh-TW' ? '處理中...' : 'Processing...')
            : (locale === 'zh-TW' ? '訂閱' : 'Subscribe')}
        </button>
      </div>
      
      {message && (
        <p className={`mt-4 text-center ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </form>
  );
}
