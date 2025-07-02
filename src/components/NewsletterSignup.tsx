'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

const WIN95_BORDERS = {
  raised: "border-t-white border-l-white border-r-gray-800 border-b-gray-800",
  sunken: "border-t-gray-800 border-l-gray-800 border-r-white border-b-white",
} as const;

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error);
      }
    } catch {
      setStatus('error');
      setMessage('Error processing subscription. Please try again.');
    }
  };

  return (
    <div className={cn(
      "border-2 bg-[#c0c0c0] p-4 mb-6",
      WIN95_BORDERS.raised
    )}>
      <div className={cn(
        "bg-white p-4 border-2",
        WIN95_BORDERS.sunken
      )}>
        <h3 className="text-lg font-bold font-['MS Sans Serif'] text-[#000080] mb-3">
          📧 Newsletter
        </h3>
        <p className="text-sm font-['MS Sans Serif'] text-gray-700 mb-4">
          Get notified about new posts directly in your email! You will receive a confirmation email after subscribing.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={status === 'loading'}
              className={cn(
                "w-full px-2 py-1 border-2 font-['MS Sans Serif'] text-sm",
                WIN95_BORDERS.sunken,
                "focus:outline-none disabled:bg-gray-200"
              )}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading' || !email}
            className={cn(
              "px-4 py-1 border-2 bg-[#c0c0c0] font-['MS Sans Serif'] text-sm",
              WIN95_BORDERS.raised,
              "hover:bg-[#d4d0c8] active:border-t-gray-800 active:border-l-gray-800 active:border-r-white active:border-b-white",
              "disabled:bg-gray-300 disabled:text-gray-500"
            )}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {message && (
          <div className={cn(
            "mt-3 p-2 border-2 text-sm font-['MS Sans Serif']",
            status === 'success'
              ? "bg-green-100 border-green-400 text-green-700"
              : "bg-red-100 border-red-400 text-red-700"
          )}>
            {message}
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-gray-300">
          <p className="text-xs font-['MS Sans Serif'] text-gray-600 mb-2">
            Or follow via RSS:
          </p>
          <a
            href="/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-block px-3 py-1 border-2 bg-[#c0c0c0] font-['MS Sans Serif'] text-xs",
              WIN95_BORDERS.raised,
              "hover:bg-[#d4d0c8] active:border-t-gray-800 active:border-l-gray-800 active:border-r-white active:border-b-white"
            )}
          >
            🔗 RSS Feed
          </a>
        </div>
      </div>
    </div>
  );
}
