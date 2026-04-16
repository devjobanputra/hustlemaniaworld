'use client';

// ============================================================================
// Hustle Mania — Spatial Login Page
// ============================================================================

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      // Redirect to home on success
      window.location.href = '/';
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col pointer-events-none z-10 pt-24 pb-12">
      <div className="flex-1 flex items-center justify-center pointer-events-auto px-4">
        <div className="glass-panel p-8 w-full max-w-md animate-slide-up flex flex-col gap-6">
          
          <div className="text-center pb-4">
            <h1 className="text-display-md text-hm-on-surface mb-2">CLOCK IN</h1>
            <p className="text-label-sm text-hm-text-muted">
              ACCESS YOUR ACCOUNT
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {error && (
              <div className="bg-[#FF3B30]/10 border border-[#FF3B30]/30 px-4 py-3">
                <p className="text-label-sm text-[#FF3B30]">{error}</p>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label htmlFor="login-email" className="text-label-sm text-hm-text-muted">
                EMAIL ADDRESS
              </label>
              <input
                id="login-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-[rgba(13,13,13,0.5)] border border-glass-border px-4 text-hm-on-surface font-sans text-sm focus:outline-none focus:border-hm-brand-red transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="login-password" className="text-label-sm text-hm-text-muted">
                PASSWORD
              </label>
              <input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="h-12 bg-[rgba(13,13,13,0.5)] border border-glass-border px-4 text-hm-on-surface font-sans text-sm focus:outline-none focus:border-hm-brand-red transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-label-lg tracking-widest mt-2"
            >
              {loading ? 'AUTHENTICATING...' : 'CLOCK IN'}
            </button>
          </form>

          <div className="flex items-center gap-4 my-2">
            <div className="h-px flex-1 bg-glass-border" />
            <span className="text-label-sm text-hm-text-muted">OR</span>
            <div className="h-px flex-1 bg-glass-border" />
          </div>

          <Link
            href="/auth/register"
            className="btn-ghost w-full py-4 text-label-lg tracking-widest text-center"
          >
            CREATE NEW ACCOUNT
          </Link>
          
        </div>
      </div>
    </div>
  );
}
